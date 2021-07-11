# EXPRESS-PROJECT-TEMPLATE

## Overview


## Setup

Make sure you have node installed [https://nodejs.org/en/download/](https://nodejs.org/en/download/)<br />

Before setting up the server install nodemon:
`npm install nodemon`
I recommend setting it up as a global dependency (  `use flag -g` ) as it an important tool that can be reused in all express projects.<br />
Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.<br />

In the project directory:<br />
Create a **.env file** from the provided **env.example** file and edit required environment variables.<br />

Run `npm install` to install all packages and dependencies required to run the project.<br />

After completing the aforementioned steps you can now execute the following commands from the project directory to start the server:

`npm run start:dev`

Runs the server in the development mode on [http://localhost:5000](http://localhost:5000).<br />
Nodemon reloads the server if edits are made in the code.<br />
Note: The above mentioned command will work only if nodemon has been installed as a dependency. To start the server without installing nodemon use the command: 

You can access the swagger documentation on [http://localhost:5000/api-docs/](http://localhost:5000/api-docs/)<br />

All errors and exceptions generated will be logged in `log/error.log` and `log/exceptions.log` files respectively.<br />

`npm run start:prod`
Runs the server in production mode
