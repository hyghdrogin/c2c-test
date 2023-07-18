# c2c-test
This Repo contains assessment test for Crop2Cash

## Documentation

- A detailed documentation of the api can be found here: [API Documentation](https://documenter.getpostman.com/view/21130368/2s946h9CmG)

- Clone the project

- cd into the project's folder and run **yarn install** to install dependencies

- Create a .env file and check src/config/index.js folder for all environment keys name

- Run **yarn dev** to start the server

## Routes:

There are 2 routes in this API endpoint:

- Create Order
  - POST request to "https://127.0.0.1:<port>/farmers/"
  - PAYLOAD - { first_name, last_name, age, phone_number, address, crops }
- Read Orders
  - GET request to "https://127.0.0.1:<port>/farmers/"

## HTTP Request

All API requests are made by sending a secure HTTPS request using one of the following methods:

- POST Create a resource
- GET Get a resource or list of resources

For POST, the body of your request must be a JSON payload.

## HTTP Response code

Each response will be returned with one of the following HTTP status codes:

- 200 OK Successful request
- 400 Bad Request There was a problem with the request
- 500 Server Error Server error


