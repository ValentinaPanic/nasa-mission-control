
const launches = new Map();

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['NASA', 'ZTM'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch);


function existsLaunchWithId(launchId){
    return launches.has(launchId);
}

function getAllLaunches(){
       // launches is a Map, so we need to use the values() method to get an array of all the launches
    // Array.from() is used to convert the iterator returned by values() into an array
    return Array.from(launches.values());
}

function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(
        latestFlightNumber, 
        Object.assign(launch, {
            customers: ['NASA', 'ZTM'],
            upcoming:true,
            success: true,
            flightNumber: latestFlightNumber,

    })
);
}

function abortLaunchById(launchId){
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted; 
}

module.exports = {
     existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
}       
