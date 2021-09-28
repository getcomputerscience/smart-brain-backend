const handleRootReq = (req, res, knex) =>{
    knex.select('*').from('users')
    .then(users => res.json(users));
}

module.exports = {
    handleRootReq: handleRootReq
}