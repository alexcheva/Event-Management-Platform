import { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info"
  });
  
   const notify = (message, severity = "info") => {
    setSnackbar({open: true, message, severity});
   };

   const handleClose = () =>{
    setSnackbar({ ...snackbar, open: false });
   };

   return (
    <NotificationContext.Provider value={{notify}}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={handleClose}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
   )
}

export const useNotification = () => useContext(NotificationContext);