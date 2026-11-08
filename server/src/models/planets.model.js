const { parse } = require('csv-parse');
//file system module we can use it to open and read files among other things
//fs.createReadStream() method creates a readable stream to read data from a file. It takes the path of the file as an argument and returns a readable stream that can be used to read the contents of the file.
const fs = require('fs');

const path = require('path')

const habitablePlanets = [];

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;

}

/*
const promise = new Promise((resolve, reject) => {
  // asynchronous operation
  resolve(data);
})
promise.then((result) => {})

const rsult = await promise;
console.log(result);
*/
function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            // .pipe() connects the readable stream returned by fs.createReadStream() to the writable stream returned by parse(). This allows us to read the contents of the CSV file and parse it into a JavaScript object. 
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', (data) => {
                if (isHabitablePlanet(data)) {
                    habitablePlanets.push(data);
                }

            })
            .on('error', (err) => {
                console.error(err);
                reject(err);
            })
            .on('end', () => {
                console.log(`habitablePlanets: ${habitablePlanets.length} found`);
                resolve();

            })
    })
}

const getAllPlanets = () => {
    return habitablePlanets;
}

module.exports = {
    loadPlanetsData,
    getAllPlanets
}