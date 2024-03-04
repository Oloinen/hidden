# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running the App

1. run `npm install`
2. run `npm run start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

You can change date env variable by creating an .env in root and setting REACT_APP_TODAY='YYYY-MM-DD'. If variable not set, app will use current date as today.

Note that you will need to rebuild app if you change the variable to see changes applied.

## Testing

You can run unit tests by running `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

You can also run cypress tests by running `npm run cypress` or `npm run cypress-headless`. Previous will open separate cypress running and allow you to control running tests. Headless mode will run on your console. 

To run cypress tests ensure following:

1. Your .env variables have not been set
2. You have started the app by running `npm run start`

First part is important because if REACT_APP_TODAY is set, app will use it instead of date value of today and tests will fail.

If you wish to manually test program.json file, it resides in /public folder. Modify it and restart the app.


