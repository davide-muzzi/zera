var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv')

dotenv.config({path: './.env'});

const app = express();
app.use(express.json());
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 7070;
var hostname = '127.0.0.1';

console.log(process.env.SESSION_SECRET)
 // MySQL-Verbindung
 const dbOptions = {
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME,
 };
 
 const sessionStore = new MySQLStore(dbOptions);
 const dbConnection = mysql.createPool(dbOptions);
 
 // Session Middleware
 app.use(
   session({
     key: "session_id",
     secret: process.env.SESSION_SECRET,
     store: sessionStore,
     resave: false,
     saveUninitialized: false,
     cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 },
   })
 );
 
 // Registrierung eines neuen Benutzers
 app.post("/register", async (req, res) => {
   const { email, password } = req.body;
   if (!email || !password) return res.status(400).json({ error: "Fehlende Daten" });
 
   try {
     const hashedPassword = await bcrypt.hash(password, 10);
     const [result] = await dbConnection.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);
     res.json({ message: "Benutzer erstellt", userId: result.insertId });
   } catch (err) {
     res.status(500).json({ error: "Fehler bei der Registrierung", message: err.message });
   }
 });
 
 // Login mit Passwortprüfung
 app.post("/login", async (req, res) => {
   const { email, password } = req.body;
   if (!email || !password) return res.status(400).json({ error: "Fehlende Daten" });
 
   try {
     const [rows] = await dbConnection.query("SELECT * FROM users WHERE email = ?", [email]);
     if (rows.length === 0) return res.status(401).json({ error: "Benutzer nicht gefunden" });
 
     const user = rows[0];
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) return res.status(401).json({ error: "Falsches Passwort" });
 
     req.session.user = { id: user.id, email: user.email };
     res.json({ message: "Erfolgreich eingeloggt", user: req.session.user });
   } catch (err) {
     res.status(500).json({ error: "Fehler beim Login" });
   }
 });
 
 // Geschützte Route (nur für eingeloggte Nutzer)
  app.get("/profile", (req, res) => {
     if (!req.session.user) return res.status(401).json({ error: "Nicht eingeloggt" });
     res.json({ message: "Willkommen im geschützten Bereich!", user: req.session.user });
   });

   // sending shift start to db
   app.post("/start", async (req, res) => {
    if (!req.session.user) return res.status(401).json({ error: "Nicht eingeloggt" });
    const { current_date, current_time } = req.body;
    if (!current_time || !current_date) return res.status(400).json({ error: "Fehlende Daten" });

    try {
      const [result] = await dbConnection.query("UPDATE shifts SET ActualStartTime = ? WHERE Date =?", [current_time, current_date]);
      res.json({ message: "Shift started", time: result.insertId });
    } catch (err) {
      res.status(500).json({ error: "Problem during the process", message: err.message });
    }
  });

  // sending shift end to db
   app.post("/end", async (req, res) => {
    if (!req.session.user) return res.status(401).json({ error: "Nicht eingeloggt" });
    const { current_date, current_time } = req.body;
    if (!current_time || !current_date) return res.status(400).json({ error: "Fehlende Daten" });

    try {
      const [result] = await dbConnection.query("UPDATE shifts SET ActualEndTime = ? WHERE Date =?", [current_time, current_date]);
      res.json({ message: "Shift started", time: result.insertId });
    } catch (err) {
      res.status(500).json({ error: "Problem during the process", message: err.message });
    }
  });
   
   // 🚪 Logout & Session löschen
   app.post("/logout", (req, res) => {
     req.session.destroy(() => {
       res.json({ message: "Ausgeloggt" });
     });
   });

  app.get("/shifts", async (req, res) => {
    if (!req.session.user) return res.status(401).json({ error: "Nicht eingeloggt" });

    try {
      const [result] = await dbConnection.query("select ROUND((SUM(HOUR(ActualEndTime))- SUM(HOUR(ActualStartTime))) +  ((SUM(MINUTE(ActualEndTime)) - SUM(MINUTE(ActualStartTime)))/60)) as 'Time' from shifts where MONTH(date) = MONTH(CURDATE()) AND YEAR(date) = YEAR(CURDATE());");
      res.json({ message: "Getting time worked", time: result.insertId });
    } catch (err) {
      res.status(500).json({ error: "Problem during the process", message: err.message });
    }
   });

 // const PORT = process.env.PORT || 3000; // Plesk gibt den Port vor
 app.listen(port, () => console.log(`Server läuft auf Port ${port}`));
 