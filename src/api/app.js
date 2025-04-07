const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require('dotenv')

dotenv.config({path: './.env'});

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
});


db.connect(err => {
    if (err) console.error("DB-Verbindung fehlgeschlagen:", err);
    else console.log("MySQL verbunden");
});

app.get("/products", (req, res) => {
    db.query("SELECT * FROM myTable", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});


const PORT = process.env.PORT || 3000; // Plesk gibt den Port vor
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
