const User = require("../models/user");
const {check, validationResult} = require("express-validator");
const jsonwebtoken = require('jsonwebtoken');
const { expressjwt: jwt } = require("express-jwt");
const jwtSecretKey = process.env.SECRET;


const bcrypt = require("bcrypt"); // install
const jwt = require('jsonwebtoken');

const db_name = path.join(__dirname, "data", "test.db");

const sql_create = `CREATE TABLE users (
	name TEXT,
	username TEXT,
	password TEXT,
	publication TEXT,
	photograph TEXT,
	college TEXT,
	department TEXT);
`;

const db = new sqlite3.Database(db_name, (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log("Successful connection to the database 'app.test.db'");
});

const login = async (req, res) => {
    // validate password

}

const register = async (req, res) => {
    // Existing user checking
    // Hashed password
    // User Creation
    // Token Generate
    try{

    const existingUser = await userMdoel.findOne({email: email});
    if(existingUser){
        return res.status(400).json({message: "User already exists"}); // bad request
    }

    const token = jwt.sign({email: })
    }
    catch(error){

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query("INSERT INTO users (name, username, password, email, college, department, photograph) VALUES (?,?,?,?,?,?)",(name, username, password, email, college, department, passport_file.filename) )

    username = request.form['username']
    name = request.form['name']
    college = request.form['college']
    department = request.form['department']
    email = request.form['email']
    password = request.form['password']
    passport_file = request.files['passport']
}

const sigin = (req, res) => {

}

module.exports(register, signin)

exports.register = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    const user = new User(req.body);
    user.save((err,user) => {
        if(err){
            console.log(err.message)
            return res.status(400).json({
                err: err.message
            });
        }
        res.json({
            name: user.name,
            email: user.email, 
            id: user._id
        })
    })
};

exports.signin = (req,res) => {
    //destructuring email and password from body
    const errors = validationResult(req)
    const {email, password} = req.body;
    

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "USER email does not exist"
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and pass do not match"
            })
        }

        const token = jsonwebtoken.sign({_id: user._id}, process.env.SECRET)
        //put token in cookie
        res.cookie("token", token, {expire: new Date() + 9999}); 
        //Send response to front end
        const {_id,name,email,role} = user;
        return res.json({token, user: {_id, name, email, role}})
    })
};

app.get("/register", (res, req) => {
	res.render("register");
});