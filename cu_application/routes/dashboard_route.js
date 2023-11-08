// const { adminAssess, assess, cantAssess, dashboardUser, dashboardAdmin, settings, apply } = require("/Users/victorezekiel/cu_application/controllers/new_dashboard.js");
const express = require("express");
const router = express.Router();
const {homeUsernameGet, settingsUserGet, applyGet, cantAssessGet, assessGet, adminHomeGet, adminSettingsGet, homeUsernamePost, settingsUserPost, applyPost, cantAssessPost, assessPost, adminHomePost, adminSettingsPost} = require("/Users/victorezekiel/cu_application/controllers/new_dashboard.js");

// // -------- post using local modules --------
// app.post("/dashboard/:username", dashboardUser);
// app.post("/settings/:username", settings);
// app.post("/apply/:username", apply);
// app.post("/dashboard_admin/:username", dashboardAdmin);
// app.post("/dashboard/assess/:username", assess);
// app.post("/dashboard/cant_assess", cantAssess)
// // app.post("/dashboard/admin_access/:username", adminAssess);

// // -------- get using local modules --------
// app.get("/dashboard/:username", dashboardUser);
// app.get("/settings/:username", settings);
// app.get("/apply/:username", apply);
// app.get("/dashboard_admin/:username", dashboardAdmin);
// app.get("/dashboard/assess/:username", assess);
// app.get("/dashboard/cant_assess", cantAssess)
// // app.get("/dashboard/admin_access/:username", adminAssess);

// ---------------- new routes ----------
router.get("/dashboard/home/:username", homeUsernameGet);
router.get("/dashboard/settings/:username", settingsUserGet);
router.get("/dashboard/apply/:username", applyGet);
router.get("/dashboard/cant_assess/:username", cantAssessGet);
router.get("/dashboard/assess", assessGet);
router.get("/dashboard_admin/home/:username", adminHomeGet);

// ---------------- new routes ----------
// app.post("/dashboard/home/:username", homeUsernamePost);
// app.post("/dashboard/settings/:username", settingsUserPost);
router.post("/dashboard/apply/:username", applyPost);
// app.post("/dashboard/cant_assess/:username", cantAssessPost);
router.post("/dashboard/assess", assessPost);
// app.post("/dashboard_admin/home/:username", adminHomePost);

module.exports = router;