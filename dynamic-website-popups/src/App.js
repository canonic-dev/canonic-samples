import React from "react";
import axios from "axios";
import "./App.css";

// Replace this with your project's api url
const API_ROOT =
  "https://dynamic-notifications.can.canonic.dev/api/notifications";

// we have 2 examples / notification types
const URLS = {
  RANDOM: "/random",
  CAMPAIGN: "/30-days-of-canonic",
};

// for the buttons
const TYPES = [
  { title: "Random Popup", type: "RANDOM" },
  { title: "Popup Campaign", type: "CAMPAIGN" },
];

function App() {
  // when the data fetching completes, we set the notification object
  const [notification, setNotification] = React.useState();
  // to switch between different examples
  const [notificationType, setNotificationType] = React.useState("RANDOM");
  // the active api url from where data is to be fetched
  const activeUrl = URLS[notificationType];

  /**
   * Make an API call to fetch a notification.
   * @param {string} activeUrl the api url from where the notification will be fetched
   * @returns {Promise<Object>} A promise that resolves with the fetched notification object
   */
  const getNotification = React.useCallback(
    (activeUrl) =>
      axios(`${API_ROOT}${activeUrl}`).then(({ data }) => data.data),
    []
  );

  React.useEffect(() => {
    // fetch the notification and then set the state with the object
    // retrieved. The API call is made again whenever the activeUrl changes
    // (like when switching between examples)
    getNotification(activeUrl).then(setNotification);
  }, [getNotification, setNotification, activeUrl]);

  return (
    <div className="app">
      {/* Only render when notification is defined (api call completes) */}
      {notification && (
        <header
          className="app-notification"
          dangerouslySetInnerHTML={{ __html: notification.text }}
        />
      )}
      <section className="app-body">
        <h3>Dynamic popups and notifications</h3>
        <p>These notifications come from the data stored on your Canonic app</p>
        <nav className="ctas">
          {TYPES.map(({ title, type }) => (
            <button
              key={type}
              className={`cta ${type === notificationType ? "active" : ""}`}
              onClick={() => setNotificationType(type)}
            >
              {title}
            </button>
          ))}
        </nav>
      </section>
    </div>
  );
}

export default App;
