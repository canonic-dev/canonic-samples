# CRM App

The app is a demo of how you can build a CRM using React, graphql and [Canonic](https://canonic.dev/) as the **Backend**

![Screenshot](./screenshots/screenshot-1.png)

**Pull requests details are fetched from your Canonic project.**

## Links

### [Demo](https://canonic-crm.netlify.app/)

### [Tutorial](https://dev.to/canonic/crm-app-with-react-19o3)

## Running the example

### Frontend

The frontend is a simple create-react-app. After cloning, install the dependencies.

```
yarn install
```

Then start the dev server

```
yarn start
```

### Backend

You can find the sample backend project **CRM App** [here](https://app.canonic.dev/projects/61b86184b6586d0026b0b88e/graph) and clone it.

![Screenshot](./screenshots/screenshot-2.png)

Copy the base url from the docs

![Screenshot](./screenshots/screenshot-3.png)

Change the value of URI in [index.js](./src/index.js)

The example should now fetch data from the project you deployed.
