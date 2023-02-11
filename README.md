# Kidnet - Online portal for kidney patients
This is a simple online portal for kidney patients to put relevant information for potential recruiters.\
It has a create account, authentication function (only using username for now for simplicity, if this were
to be deployed IRL there will be more security measures).\
In the profile page, the user can add a description about themselves, their skills, what they can and
cannot do as kidney patients, as well as their weekly dialysis schedules.\
For each user, a public profile is also created which can be accessed by anyone without logging in, and
they can send the user a message with their contact information for follow-ups.\
These messages are visible in the messages section of the user's account, which they can access from
their profile, with options to send an email to the person, or to delete the message.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\
A Node Express server is used for the backend, and MySQL running in Docker for database storage.\
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