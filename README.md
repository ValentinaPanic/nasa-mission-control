# 🚀 NASA Mission Control

A full-stack app for scheduling space missions to habitable exoplanets found by NASA's Kepler telescope.

Built while taking the **[Complete Node.js Developer: Zero to Mastery](https://zerotomastery.io/courses/learn-node-js/)** course.

> **Note:** The React frontend came with the course. **My work was the backend:** a REST API built with Node.js and Express that handles CRUD operations for launches and serves planet data parsed from a real NASA dataset.

---

## ✨ Features

- **Habitable planet discovery:** streams and parses NASA's Kepler CSV dataset at server startup and filters it down to potentially habitable planets
- **Launch management (CRUD):** create, list, and abort missions
- **Input validation:** rejects requests with missing fields or invalid dates and returns clear error messages
- **Serves the production frontend:** Express serves the built React app and supports client-side routing

## 🛠️ Tech Stack

**Backend (my focus)**
- Node.js
- Express 5
- csv-parse (stream-based CSV parsing)
- morgan (HTTP request logging)
- cors
- nodemon (development)

**Frontend (provided by the course)**
- React, React Router, Arwes UI

## 🏗️ Architecture

The API uses an **MVC-style** structure that separates routing, request handling, and data logic:

```
server/
├── data/
│   └── kepler_data.csv          # NASA Kepler exoplanet dataset
└── src/
    ├── server.js                # Creates the HTTP server and loads data before listening
    ├── app.js                   # Express app: middleware, routers, static files
    ├── models/                  # Data and business logic
    │   ├── planets.model.js
    │   └── launches.model.js
    └── routes/                  # Routers and controllers (HTTP layer)
        ├── planets/
        │   ├── planets.router.js
        │   └── planets.controller.js
        └── launches/
            ├── launches.router.js
            └── launches.controller.js
```

## 🪐 How Habitable Planets Are Chosen

The Kepler dataset is read as a **stream** (`fs.createReadStream` piped into `csv-parse`), so the whole file never has to sit in memory at once. A planet counts as habitable when it is:

| Criteria | Field | Condition |
|---|---|---|
| Confirmed exoplanet | `koi_disposition` | `CONFIRMED` |
| Receives Earth-like stellar flux | `koi_insol` | between `0.36` and `1.11` |
| Earth-like size | `koi_prad` | less than `1.6` Earth radii |

The server waits for this data to finish loading before it starts accepting requests.

## 📡 API Endpoints

Base URL: `http://localhost:8000`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/planets` | Get all habitable planets |
| `GET` | `/launches` | Get all launches |
| `POST` | `/launches` | Schedule a new launch |
| `DELETE` | `/launches/:id` | Abort a launch by flight number |

### Create a launch

**`POST /launches`**

```json
{
  "mission": "Kepler Exploration X",
  "rocket": "Explorer IS1",
  "launchDate": "December 27, 2030",
  "target": "Kepler-442 b"
}
```

**Response `201 Created`**

```json
{
  "mission": "Kepler Exploration X",
  "rocket": "Explorer IS1",
  "launchDate": "2030-12-27T00:00:00.000Z",
  "target": "Kepler-442 b",
  "customers": ["NASA", "ZTM"],
  "upcoming": true,
  "success": true,
  "flightNumber": 101
}
```

**Errors `400 Bad Request`**
- `{ "error": "Missing required launch property" }`
- `{ "error": "Invalid launch date" }`

### Abort a launch

**`DELETE /launches/:id`** marks the launch as `upcoming: false` and `success: false`.

**Errors `400 Bad Request`**
- `{ "error": "Launch with ID <id> not found" }`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/ValentinaPanic/nasa-mission-control.git
cd nasa-mission-control
npm install          # installs both server and client dependencies
```

### Run in development

```bash
npm run watch
```
- API: http://localhost:8000
- Frontend: http://localhost:3000

### Run in production mode

```bash
npm run deploy
```
This builds the React app into `server/public` and serves the whole app from http://localhost:8000.

## 📚 What I Learned

- Organizing an Express app with routers, controllers, and models
- Designing RESTful endpoints with correct HTTP methods and status codes
- Processing large files efficiently with **Node.js streams**
- Wrapping event-based code in **Promises** and using `async/await` so data loads before the server starts
- Express middleware: JSON body parsing, CORS, logging, and serving static files
- Serving a single-page application with a catch-all route
- Validating and sanitizing incoming request data

## 🔮 Next Steps

- [ ] Persist data with MongoDB (it's in memory right now)
- [ ] Add automated tests with Jest and Supertest
- [ ] API versioning (`/v1`)
- [ ] Pull real launch data from the SpaceX API
- [ ] Deploy with Docker on AWS

## 🙏 Acknowledgements

- [Zero to Mastery](https://zerotomastery.io/) – Andrei Neagoie & Adam Odziemkowski
- [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/) – Kepler dataset
