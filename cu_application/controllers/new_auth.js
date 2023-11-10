const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3");
const path = require("path");

// ---- data base connection ---- 
const db_name = "/Users/victorezekiel/cu_application/data/test.db";

const db = new sqlite3.Database(db_name, (err) => {
	if (err) {
        // console.log("the table here ");
		return console.error(err.message);
	}
	console.log("Successful connection to the database 'app.test.db'");
});

// ----- configurations -------
app.set("view engine", "ejs");

// ---- validate username ---- 
function validateUser(username){
    var query = `
        SELECT name,
        username,
        college,
        department,
        email
        FROM users
        WHERE username = ?
    `;
    // var result = false;
    return new Promise((resolve, reject) => {
        db.each(query, [username], (err, row) => {
            if(err){
                // reject(err);
                setTimeout(() => reject(new Error("Whoops!")), 1000);
                // resolve(false)
            }else{
                resolve(true);
            }
        });
    });
}

// ---- validate password ---- 
function validatePassword(username){
    var query = `
        SELECT password
        FROM users
        WHERE username = ?
    `;
    // var result = false;
    return new Promise((resolve, reject) => {
        db.each(query, [username], (err, row) => {
            if(err){
                // reject(err);
                setTimeout(() => reject(new Error("Whoops!")), 1000);
                // resolve(false)
            }else{
                resolve(row.password);
            }
        });
    });
}

// ---- hashPassword ----
async function hashPassword (password) {
    const saltRounds = 10;
  
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err){ reject(err)};
        resolve(hash);
      });
    })
  
    return hashedPassword;
}

// ---- registration ---- 
const register_get = (req, res) => {
    msg = "";
    return res.render("auth/register", {msg: msg});
};

const register_post = (req, res) => {
    const {username, 
        name,
        college,
        department,
        email, 
        password,
        password_confirm,
        passport_file, 
        publication} = req.body;
    
    const hashedpassword = hashPassword(password);

    if(!validateUser(username)){
        msg = "user already exist";
        return res.render("register", {msg: msg});
    }
    else if(password !== password_confirm){
        msg = "password does not match";
        return res.render("register", {msg: msg});
    }
    else{
        db_query = "INSERT INTO users (name, username, password, email, college, department, photograph) VALUES (?,?,?,?,?,?)"
        msg = new Promise((resolve, reject) => {
            db.each(db_query, [username], (err, row) => {
                if(err){
                        // reject(err);
                    setTimeout(() => reject(new Error("Whoops!")), 1000);
                        // resolve(false)
                }else{
                    msg = "successfully registered ${username}";
                    resolve(msg);
                }
            });
        });
        return res.render("auth/register", {msg: msg});
    }
};

// ---- login ---- 
const login_get = (req, res) => {
    failure = "";
    return res.render("auth/login", {failure: failure});
};

const login_post = (req, res) => {
    const {username, 
        password} = req.body;

    const hashedpassword = hashPassword(password);
    failure = "";

    if(!validateUser(username)){
        failure = "user does not exist";
        console.log("user does not exist");
    }
    if(password !== validatePassword(hashedpassword)){
        failure = "not successfully logged in";
        console.log("wrong password");
    }else{
        if(username != "admin"){
            failure = "successfully logged in";
            return res.redirect("dashboard/home/:username", {username : username});
        }else{
            return res.redirect("/dashboard_admin/home/:username", {username : username});
        }
    }
    return res.render("auth/login", {failure: failure});
};

module.exports = { login_get, login_post, register_get, register_post };