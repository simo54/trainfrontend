# Trainfrontend

# Stack

- [Node.js](https://nodejs.org/)
- [REACT.JS](https://reactjs.org/) (User Interface) using functional components
- JS/JSX (blog logic)
- CSS (external styling)
- GIT/GITHUB (feature branches)

# API

- [TrainApi](https://github.com/Natascha2020/TrainAPI.git) (default API for usage)

# How to run locally

- System requirements: [Node.js](https://nodejs.org/)
- Fork the repository
- Clone it to your local repo
- Run "npm install" to install dependencies
- Run "npm start" to run local server

# Features

- Main overview lists all stops and trains
- Filter functionality in main overview to see all trains by specific stop
- Mover view to list all trains not in maintenance
- Update functionality in mover view so send speficic train to specific stop
- Maintenace view to send specific train into maintenance (not available for usage)
- Modular, reusable component structure

| File               | Description                                                           |
| ------------------ | --------------------------------------------------------------------- |
| index.js           | React.JS base file                                                    |
| App.js             | Base app with list view of all post                                   |
| MainOverview.js    | List overview of trains and stops, filter trains by stop              |
| Mover.js           | List all trains not in maintenance, update stopid state               |
| Maintenance.js     | Lists all trains with maintenance status and update maintenance state |
| CardMaintenance.js | Detail component for one row element of maintenance table             |

# Credit

- Tab icon provided by [Smashicons](https://www.flaticon.com/authors/smashicons)
