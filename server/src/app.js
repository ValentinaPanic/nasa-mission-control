const express = require('express');
const path = require('path')
const cors = require('cors')
const morgan = require('morgan');

const planetsRouter = require('./routes/planets/planets.router')
const launchesRouter = require('./routes/launches/launches.router')

const app = express();

// will allow all cross origin requests
app.use(cors({
    origin: 'http://localhost:3000'
}));

// logging middleware - tells us what requests are coming in
app.use(morgan('combined'))
app.use(express.json());
// we are serving static files from the public folder. This is where our front end will be built and served from.
app.use(express.static(path.join(__dirname, '../public')))

app.use('/planets', planetsRouter);
//express will use the launchesRouter for any requests that start with /launches. This is because we are using the launchesRouter for all the routes that start with /launches. So, if we get a request that starts with /launches, we will use the launchesRouter to handle that request.
app.use('/launches',launchesRouter);

// if we get a request that doesn't match any of the above routes, we will send back the index.html file. This is so that our front end can handle routing. that's why we are using /*path as the route. This will match any route that doesn't match the above routes. We are using this because we are using React Router on the front end and we want to handle routing on the front end.
app.get('/*path', (req, res)=> {
    // public.index.html is the default file that express will serve if we don't specify a file name. So we can just use res.sendFile() to send the index.html file.
    res.sendFile(path.join(__dirname, '../public/index.html'))
})



module.exports = app;