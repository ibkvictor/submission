const app = require("express");
const sqlite3 = require("sqlite3");
const spawn = require("child_process").spawn;
var fs = require("fs")
const bcrypt = require("bcrypt");
const database = require("mime-db");
const { read } = require("graceful-fs");
const path = require("path");

// ---- data base connection ----
const db_name = path.join(__dirname, "data", "test.db");

const db = new sqlite3.Database(db_name, (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log("Successful connection to the database 'app.test.db'");
});

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

// ---- read rankings ----
function readRankings (data) {
    journals = {"scopus": 100, "web_of_science" : 2.9, "others" : 1}
    bank = fs.readFile('demo.txt', (err, data) => { 
        if (err){console.log(err)};
        console.log(data);
        arr_data = data.split("\n", 10);
        var bank_return = {};
        for (let i = 0; i < 10; i++) {
            values = arr_data.split(", ", 10);
            bank_return[i*10] = values.map(parseFloat);
        }
        return bank_return
    });
}

function handleHeaders (headers, data) {
    var result = {};
    for (let i = 0; i < headers.length; i++) {
        key = headers[i].toLowerCase();
        result[headers[i]] = data.key;
    }
    return result;
}

// ---- dashboard user ---- 
const dashboardUser = (req, res) => {
    try{
        const {username} = req.body;
        query = "SELECT name, username, college, department, email FROM users WHERE username = ?"
        data = new Promise((resolve, reject) => {
            db.all(query, [username], (err, data) => {
                if(err){
                    reject(err);
                    console.log(err);
                }else{
                    resolve(data);
                }
            });
        });

        d_headers = ["NAME", "USERNAME", "COLLEGE", "DEPARTMENT", "EMAIL"];
        profile_items = handleHeaders(headers, data);
        boxers = "boxers";

        res.render( "dashboard/home.html", { profile_items : profile_items, username : username })
    
    }catch(err){
        console.log(err)
        return res.status(400).send("something is wrong this is the error: " + err); // send error message
    }
};

// ---- setting ---- done
const settings = (req, res) => {
    try{
        const {password, n1_password, n2_passord} = req.body;

        if (n1_password == n2_passord){
            const hashedpassword = hashPassword(n1_password);
            query = "UPDATE users SET password = ? WHERE username = ?";
            db.run(query, [hashedpassword, username],(err)=>{
                console.log(err);
            });
        }

        res.render("dashboard/apply.html",{ username : username, journal_list : journal_list, years : years})
    
    }catch(err){
        console.log(err)
        return res.status(400).send("something is wrong this is the error: " + err); // send error message
    }
};

// const settings_get = (req, res) => {
//     try{
//         const {password, n1_password, n2_passord} = req.body;

//         if (n1_password == n2_passord){
//             const hashedpassword = hashPassword(n1_password);
//             query = "UPDATE users SET password = ? WHERE username = ?";
//             db.run(query, [hashedpassword, username],(err)=>{
//                 console.log(err);
//             });
//         }

//         res.render("dashboard/apply.html",{ username : username, journal_list : journal_list, years : years})
    
//     }catch(err){
//         console.log(err)
//         return res.status(400).send("something is wrong this is the error: " + err); // send error message
//     }
// };

// ---- apply ---- done
const apply = (req, res) => {
    try{
        const username =  req.username;
        if(req.method == "POST"){
            // if request method is POST 
            cite_score = readRankings(data);
            db_query = "UPDATE users SET score = ? WHERE username = ?";
            db.run(db_query, (cite_score, username));

            // render template
            return res.redirect("dashboard_user", username = username)
        }
        return render("apply", { username : username, journal_list : journal_list, years : years})
    
    }catch(err){
        console.log(err);
        return res.status(400).send("something is wrong this is the error: " + err); // send error message

    }
};

// ---- dashboard admin ----
const dashboardAdmin = (req, res) => {
    try{
        const {username} = req.body;
        query = "SELECT name, username, college, department, email, submission, score FROM users"
        data = new Promise((resolve, reject) => {
            db.all(query, [], (err, data) => {
                if(err){
                    reject(err);
                    console.log(err);
                }else{
                    resolve(data);
                }
            });
        });

        headers = ["NAME", "USERNAME", "COLLEGE", "DEPARTMENT", "EMAIL", "SUBMISSION_STATUS", "SCORE"];
        applicants_list = handleHeaders(headers, data);
        boxers = "boxers";

        res.render( "dashboard/admin_dashboard.html",{ username : username, applicants_list : applicants_list, boxers : boxers, headers : headers })
    
    }catch(err){
        console.log(err)
        return res.status(400).send("something is wrong this is the error: " + err); // send error message
    }
};

// ---- assess ---- done
const assess = (req, res) => {
    try{
        username = req.username;
        console.log(username);

        // the hod is selected
        query = "SELECT hod FROM users WHERE username = ?";
        hod = new Promise((resolve, reject) => {
            db.each(query, username, (err, data) => {
                resolve(hod);
            })
        });

        if(request.method == "POST"){
            req_name = req.name
            department = req.department;
            college = req.college;
            email = req.email;
            recommendation = req.recommendation;
            query = "UPDATE users SET submission = ? WHERE name = ?, department = ?", ("done", name, department)
            db.run(query, ["done", req_name, department], err => {
                if (err){console.log(err)}
            })
            return res.redirect("dashboard_user");
        }
        return res.render('dashboard/assess.html');

    }catch(err){
        console.log(err)
        return res.status(400).send("something is wrong this is the error: " + err); // send error message
    }
};

// ---- cant assess ---- done
const cantAssess = (req, res) => {
    try{
        res.render("dashboard/cant_assess");
    }catch(err){
        console.log(err)
        return res.status(400).send("something is wrong this is the error: " + err); // send error message
    }
};

// ---- admin assess ---- done
const adminAssess = (req, res) => {
    try{
        query = "SELECT name, username FROM users WHERE submission = ?";
        db.run(query, ["done"], err => {
            if (err){console.log(err)}
        });

        return res.render("dashboard/admin_assess.html",{ username : username})
    
    }catch(err){
        console.log(err)
        return res.status(400).send("something is wrong this is the error: " + err); // send error message
    }
};

// ---- read rankings ---- 
function read_rankings(){
    years = [2017, 2018, 2019, 2020, 2021]
    journal_list = {"scopus": 100,"web_of_science": 2.9, "others":1}
    fs.readFile('ratings.py', 'utf8', function(err, data){ 
        console.log(data);
    });
    return c_score
}

module.exports = { readRankings, adminAssess, cantAssess, assess, dashboardAdmin, settings, apply, dashboardUser };