# EXPRESS-PROJECT-TEMPLATE

## Backend Setup

Make sure you have node installed [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

### `npm install nodemon -g`

Before setting up the server install nodemon as a global dependency.<br />
Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.<br />

In the project directory:
Create a `.env file` from the provided `env.example` file

You can now run the following commands:
### `npm install`

Install all packages and dependencies required to run the project

### `npm run start:dev`

Runs the server in the development mode on [http://localhost:5000](http://localhost:5000).<br />
The server will reload if you make edits in the code.<br />

You can access the swagger documentation on [http://localhost:5000/api-docs/](http://localhost:5000/api-docs/)<br />

All errors generated will be logged in `log/error.log` file.<br />
All exceptions generated will be logged in `log/exceptions.log` file.<br />

### `npm run start:prod`
Runs the server in production mode
