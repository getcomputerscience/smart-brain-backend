const express = require('express');
const bodyParser = require('body-parser');
<<<<<<< HEAD
const cors = require('cors');

const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const entries = require('./controllers/entries');
const profile = require('./controllers/profile');
const root = require('./controllers/root');

const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : 'nomi123',
      database : 'smart-brain'
    }
  });
=======
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
>>>>>>> 3bf2737bef18b8fac167b8ce01305788fd47ddfe

const app= express();

app.use(bodyParser.json());
app.use(cors());
<<<<<<< HEAD

app.get('/', (req,res) => { root.handleRootReq(req,res, knex)});

app.post('/signin',(req, res) => {signin.handleSignin(req, res, knex, bcrypt)} );

app.post('/register', (req, res) => { register.handleRegister(req,res,knex,bcrypt) });

app.get('/profile/:id', (req, res) => {profile.handleProfileId(req, res, knex)});

app.put('/image', (req, res) => { entries.handleEntries(req, res, knex)});

app.post('/imageurl', (req, res) => { entries.handleApiCall(req, res)});



app.listen(3001, ()=>{
    console.log('[INFO] App is running on port 3001');
});
=======

const database = {
    users : [
        {
            id: 1,
            name: 'faisal',
            email:'mf@m.com',
            password: '1234',
            entries: 0,
            joined: new Date()
        },
        {
            id: 2,
            name: 'ali',
            email:'mf1@m.com',
            password: '1234',   
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: 1,
            hash: '',
            email: 'mf@m.com'
        },
        {
            id: 2,
            hash: '',
            email: 'mf1@m.com'

        }
    ]
};

app.get('/',(req, res) =>{
    res.json(database.users);
});

app.post('/signin', (req, res) =>{

    // Load hash from your password DB.
    // bcrypt.compare("1233", '$2a$10$RupuzsN0Q53UFldiW7cXauuSWdod.n0iR8NRaJQZGl43ZnImsoW8u', function(err, res) {
    //     console.log("Actual: ",res);
    // });
    // bcrypt.compare("veggies", '$2a$10$RupuzsN0Q53UFldiW7cXauuSWdod.n0iR8NRaJQZGl43ZnImsoW8u', function(err, res) {
    //     console.log("Wrong: ",res);
    // });

    if(req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password){
            // res.json("success");
            res.json(database.users[0]);
        }else{
            req.status(400).json("Error!");
        }
    console.log(req.body);
    // res.send('sign in'); 
    // res.json('sign in'); 

});

app.post('/register', (req, res) =>{
    const {name, email, password} = req.body;
    // bcrypt.hash(password, null, null, function(err, hash) {
    //     console.log(hash);
    // });
    database.users.push(
        {
            id: 3,
            name: name,
            email:email,
            // password: password,
            entries: 0,
            joined: new Date()
        }
    );
    res.json(database.users[database.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let isFound = false;
    database.users.forEach(user => {
        if(user.id === Number(id)){
            isFound = true;
            return res.json(user);
        }
    });
    if(!isFound){
        res.status(404).json('No such user.');
    }
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    console.log("Id:", id);
    let isFound = false;
    database.users.forEach(user => {
        if(user.id === Number(id)){
            isFound = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    if(!isFound){
        res.status(404).json('No such user.');
    }

});


app.listen(3001, ()=>{
    console.log('[INFO] App is running on port 3000');
});
 
>>>>>>> 3bf2737bef18b8fac167b8ce01305788fd47ddfe
