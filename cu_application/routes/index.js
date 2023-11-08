const express = require("express");
const path = require("path");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose(); //verbose allows for easy debugging

// -------- import internal modules -------
const { login_get, login_post, register_get, register_post } = require("/Users/victorezekiel/cu_application/controllers/new_auth.js");

// --------  server configuration ------
router.get("/", login_get);

// ------- post routes ----------
router.post("/", login_post);

// -------- load static folders --------
router.use("/static", express.static("static"))

module.exports = router;

// ------- old ---------
// // -------- using global modules --------
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// // -------- using local modules --------
// app.post("/login", login );
// app.post("/register", register);
// app.use("/admin_assess", adminAssess);
// app.use("/admin_dashboard", dashboardAdmin);
// app.post("/settings", settings);
// app.use("/cantassess", cantAssess);
// app.use("/apply", apply);
// app.use("/assess", assess);

// // -------- load static folders --------
// app.use("/static", express.static("static"))