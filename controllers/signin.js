
const handleSignin = (req, res, knex, bcrypt) =>{

    if(!email || !password){
        return res.status(400).json("Invalid form submission.")
    }

    knex.select('email', 'hash').from('login')
        .where('email','=',req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if(isValid){
                 return knex.select('*').from('users')
                    .where('email','=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable to get user.'))
            }else{
                res.status(400).json('wrong credentials.');
            }
        })
        .catch(err => res.status(400).json('wrong credentials.'));

}

module.exports ={
    handleSignin : handleSignin
}