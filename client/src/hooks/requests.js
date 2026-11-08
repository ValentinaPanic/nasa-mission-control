const API_URL = 'http://localhost:8000';

async function httpGetPlanets() {
  // Load planets and return as JSON
  const response = await fetch(`${API_URL}/planets`);
  // this is a promise as well so we need to await it
  return await response.json();
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await response.json();
  // Load launches, sort by flight number, and return as JSON.
  return fetchedLaunches.sort((a, b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
  
  // Submit given launch data to launch system.
  try {
    return await fetch(`${API_URL}/launches`, {
    method: 'POST',
    body: JSON.stringify(launch),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  } catch(err){
    return {
      ok: false
    }
  }
}

async function httpAbortLaunch(id) {

 try {
    return await fetch(`${API_URL}/launches/${id}`,{
    method: 'DELETE',
   })
 } catch(err){
    return {
      ok: false
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};