
const handleProfileId = (req, res, knex) => {
    const { id } = req.params;
    knex.select('*').where({id}).from('users')
    .then(user => {
        if(user.length){
           res.json(user[0]);
        }else{
            res.status(400).json('Not Found.');
        }
    })
    .catch(err=>res.status(400).json('Error getting user.'));
}

module.exports = {
    handleProfileId : handleProfileId
}