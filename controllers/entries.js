const clarifai = require('clarifai');

const app = new clarifai.App({
    apiKey: '2eb8e255a44f4f50959f2e83b98dd58e'
   });

const handleApiCall = (req, res) => {
    app.models.predict(
      clarifai.FACE_DETECT_MODEL,
      req.body.input)
      .then(resp=> res.json(resp))
      .catch(err=>res.status(400).json('Unable work with API.'));
}


const handleEntries = (req, res, knex) => {
    const { id } = req.body;
    knex('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>res.json(entries))
    .catch(err=>res.status(400).json('Unable getting entries.'));
}

module.exports = {
    handleEntries : handleEntries,
    handleApiCall : handleApiCall
}