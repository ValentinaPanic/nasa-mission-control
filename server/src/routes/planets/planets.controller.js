const {getAllPlanets} = require('../../models/planets.model')

function httpGetAllPlanets(req, res) {
    // return is optionall here. better to be explicit but express doesn't need it
 return res.status(200).json(getAllPlanets())

}

module.exports = {
    httpGetAllPlanets
}