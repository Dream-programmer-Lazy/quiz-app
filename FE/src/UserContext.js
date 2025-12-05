import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('');

  return (
    <UserContext.Provider value={{ user, setUser, userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
};
