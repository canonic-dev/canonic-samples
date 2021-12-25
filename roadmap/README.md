# Roadmap

A Roadmap application built using React, Graphql and Canonic as the backend.
![Screenshot](./screenshot.png)

A sample app powered by [Canonic](https://canonic.dev/)

[Link](https://canonic-roadmap.netlify.app/)
<br/>

### Step-by-step guide to making this project
You can find the step-by-step for making this project [here](https://dev.to/canonic/how-to-build-a-customer-facing-roadmap-with-react-1gal)

### Cloning the frontend

The frontend is a simple create-react-app. After cloning, install the dependencies.

```
yarn install
```

Then start the dev server

```
yarn start
```

### Connecting with your backend

To connect this application, to your backend server.

1. You can find the sample backend project **roadmap** [here](https://app.canonic.dev/dashboard/marketplace/samples) and clone it.
2. Copy the base url from the docs
3. Go to [App.js](./src/App.js) and change the uri in the apollo client to the url you just copied

### Deploying

Generates production assets in the `public` folder.

```
yarn install
yarn build
```


### Changing access token for the backend
Be sure to change the access token in [Roadmap.js](./src/components/Roadmap/Roadmap.js). You can generate access token
for your canonic APIs by following steps mentioned [here](https://docs.canonic.dev/concepts/projects/permissions). Write & Read permissions are required by this project.