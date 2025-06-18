# 🕒 ZERA – Zeiterfassungsrapportapplikation

ZERA is a Vue 3 and Express-based web app for digital time tracking and work reporting.
It enables users to log their working hours, manage daily and weekly reports, and visualize their schedules in a clean, interactive UI.

---

## 🚀 Features

* ⏱️ Time entry and editing
* 📅 Calendar views for daily/weekly reports
* 🧮 Automatic calculation of total work hours
* 🔐 User authentication and session handling
* 🎨 Responsive UI using Tailwind CSS

---

## 🛠️ Tech Stack

* **Frontend:** Vue 3 + Vite + Tailwind CSS
* **Backend:** Node.js + Express
* **Database:** MySQL (MariaDB compatible)
* **Styling:** Tailwind CSS

---

## ⚠️ Known Issues

* The backend is not fully functional — there is currently no live database connection.
* The app works in theory and runs on localhost with some manual setup.
* The user will need to create the necessary database tables manually. Two SQL files will be provided to assist with this setup.
* Basic local testing has been successful, assuming the correct database setup is in place.

---

## ⚙️ Setup Instructions

### Requirements

* Node.js (v18 or later recommended)
* MySQL or MariaDB

### Installation

Clone the project:

```bash
git clone https://github.com/davide-muzzi/zera.git
cd zera
```

### Install dependencies

```bash
npm install
```

### Database Setup

Before running the app, set up the database:

1. Open your MariaDB client.
2. Copy and execute the provided SQL scripts to create the required tables.
3. Ensure your database configuration matches the backend settings.

### Run the app

After setting up the database, start the backend using:

```bash
npm run test
```