This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\
Requires Docker and [Docker-Compose](https://github.com/docker/compose) to be installed.

# First time setup
Switch to the "docker" sub-folder and run:
### `docker-compose up`
Switch to the "hack4good2023" and "server" sub-folders, and run:
### `yarn`
or
### `npm install`
in both folders.

# Subsequent runs
## Docker
Ensure the docker container is running (via Docker Desktop or command line).

## Node server
Switch to the "server" sub-folder and run:
### `start_server.sh`

## React frontend
Switch to the "hack4good2023" sub-folder and run:
### `npm start`
or
### `yarn start`

to run the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.