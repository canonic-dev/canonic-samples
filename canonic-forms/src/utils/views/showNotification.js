import { notification } from "antd";

const showNotification = (type, details) => {
  notification[type]({
    message: details.message,
    description: details.description,
  });
};
export default showNotification;
