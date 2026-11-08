const express = require('express');
const {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
} = require('./launches.controller')

const  launchesRouter = express.Router();

// we are using the launchesRouter for all the routes that start with /launches. So, if we get a request that starts with /launches, we will use the launchesRouter to handle that request.
// '/' is macthiching the root of the lanchesRouter whish is /launches in this case
launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id', httpAbortLaunch);


module.exports = launchesRouter;
