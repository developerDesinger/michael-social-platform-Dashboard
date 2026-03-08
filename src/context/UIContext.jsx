import React, { createContext, useState, useContext } from "react";
import Toast from "../components/Toast";
import GlobalLoader from "../components/GlobalLoader";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const [loader, setLoader] = useState({
    isVisible: false,
    message: "Loading...",
  });

  const showToast = (message, type = "success", duration = 4000) => {
    setToast({ message, type, duration });
  };

  const hideToast = () => {
    setToast(null);
  };

  const showLoader = (message = "Loading...") => {
    setLoader({ isVisible: true, message });
  };

  const hideLoader = () => {
    setLoader({ isVisible: false, message: "Loading..." });
  };

  return (
    <UIContext.Provider
      value={{
        showToast,
        hideToast,
        showLoader,
        hideLoader,
      }}
    >
      {children}

      {/* Global Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={hideToast}
        />
      )}

      {/* Global Loader */}
      {loader.isVisible && <GlobalLoader message={loader.message} />}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within UIProvider");
  }
  return context;
};
