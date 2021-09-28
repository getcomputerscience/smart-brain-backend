const express = require('express');
const bodyParser = require('body-parser');
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


const app= express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => { root.handleRootReq(req,res, knex)});

app.post('/signin',(req, res) => {signin.handleSignin(req, res, knex, bcrypt)} );

app.post('/register', (req, res) => { register.handleRegister(req,res,knex,bcrypt) });

app.get('/profile/:id', (req, res) => {profile.handleProfileId(req, res, knex)});

app.put('/image', (req, res) => { entries.handleEntries(req, res, knex)});

app.post('/imageurl', (req, res) => { entries.handleApiCall(req, res)});



app.listen(3001, ()=>{
    console.log('[INFO] App is running on port 3001');
});

