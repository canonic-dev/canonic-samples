# Canonic Forms

A simple mobile responsive implementation of forms using `React` and `Ant Design` as Frontend Frameworks and **Canonic** as a **Backend**. The web-app looks like this:

![Screenshot](./screenshots/canonic-forms.png)

The app follows a tabbed layout, each tab representing a separate form. One you fill out the required details, on submit it'll make a `POST` request to the canonic's sample project and sumit your details.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Components

---

### Contact Form

It is a self contained form that let's user submit their contact information to your backend project. It first validates fields, shows up errors if any, takes the filled values and creates an entry in the backend. It uses the `useContactUs` hook which contains the code to make an API call to the backend.

### Get a Demo

It is a self contained form that let's user submit their contact information for your platform demo purposes. It first validates fields, shows up errors if any, takes the filled values and creates an entry in the backend. It uses the `useGetDemo` hook which contains the code to make an API call to the backend.

![Screenshot](./screenshots/entry.png)
