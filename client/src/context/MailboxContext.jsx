import React, { createContext, useContext, useState } from "react";

const MailboxContext = createContext();

export const MailboxProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Actions globales
  const handleRefresh = () => {
    setLoading(true);
    // Simule une requête
    setTimeout(() => {
      console.log("Données actualisées !");
      setLoading(false);
    }, 1000);
  };

  const handleDeleteSelected = () => {
    console.log("Messages supprimés !");
  };

  const handleMarkAsRead = () => {
    console.log("Messages marqués comme lus !");
  };

  const handleMarkAsReplied = () => {
    console.log("Messages marqués comme répondus !");
  };

  return (
    <MailboxContext.Provider
      value={{
        loading,
        searchTerm,
        setSearchTerm,
        handleRefresh,
        handleDeleteSelected,
        handleMarkAsRead,
        handleMarkAsReplied,
      }}
    >
      {children}
    </MailboxContext.Provider>
  );
};

// Custom hook pour accéder facilement au contexte
export const useMailbox = () => useContext(MailboxContext);
