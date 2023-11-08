const express = require("express");
const path = require("path");
const app = express();
const sqlite3 = require("sqlite3").verbose(); //verbose allows for easy debugging

// -------- database connection -------
const db_name = path.join(__dirname, "data", "test.db");

const db = new sqlite3.Database(db_name, (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log("Successful connection to the database 'test.db'");
});

// -------- using global modules --------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// -------- importing local routers ----------------
var auth_router = require("/Users/victorezekiel/cu_application/routes/auth_route.js")
var dashboard_router = require("/Users/victorezekiel/cu_application/routes/dashboard_route.js")
var index_router = require("/Users/victorezekiel/cu_application/routes/index.js")

// -------- using routes ----------------
app.use("/", index_router);
app.use("/login", auth_router);
app.use("/dashboard", dashboard_router);