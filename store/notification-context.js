import { createContext, useState } from 'react';

const NotificationContext = createContext({
  notification: null, // {title, message, status}
  showNotification: function (notifData) {},
  hideNotification: function () {},
});

export const NotificationContextProvider = ({ children }) => {
  const [activeNotification, setActiveNotification] = useState();

  const showNotificationHandler = (notifData) => {
    setActiveNotification(notifData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider>{children}</NotificationContext.Provider>
  );
};

export default NotificationContext;
