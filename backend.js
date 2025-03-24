const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();
app.use(express.json());

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
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Fehlende Daten" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await dbConnection.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
    res.json({ message: "Benutzer erstellt", userId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: "Fehler bei der Registrierung", message: err.message });
  }
});

// Login mit Passwortprüfung
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Fehlende Daten" });

  try {
    const [rows] = await dbConnection.query("SELECT * FROM users WHERE username = ?", [username]);
    if (rows.length === 0) return res.status(401).json({ error: "Benutzer nicht gefunden" });

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Falsches Passwort" });

    req.session.user = { id: user.id, username: user.username };
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
  
  // 🚪 Logout & Session löschen
  app.post("/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Ausgeloggt" });
    });
  });

const PORT = process.env.PORT || 3000; // Plesk gibt den Port vor
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
