# Caching REST API, that fetches data from OpenWeather API, stores it to PostgreSQL database and return from database upon a request.

## Technology used: Nest.js, PostgreSQL, TypeORM, Axios.

## To run API, add .env file, similar to provided .env.example

## Note: to send calls to OpenWeather API, you need to be subscribed.

## Test start

### To start test server, follow this steps:

1.  `npm i`
2.  `npm run start:dev`

### To start prod server, follow this steps:

1.  `npm i`
2.  `npm run build`
3.  `npm run start:prod`

### To run docker container, use this command:

1.  `docker-compose up`

### This will create docker container with running instance of API and PostgreSQL database to store data.

### Information about API endpoints provided in `test.http` documentation file. From this file endpopints can be tested via REST client. Or use Postman for that.
