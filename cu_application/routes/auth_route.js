const express = require("express");
const router = express.Router();
const { login_get, login_post, register_get, register_post } = require("/Users/victorezekiel/cu_application/controllers/new_auth.js");

// -------- post using local modules --------
router.post("/auth/login", login_post);
router.post("/auth/register", register_post);

// -------- get using local modules --------
router.get("/auth/login", login_get);
router.get("/auth/register", register_get);

module.exports = router;