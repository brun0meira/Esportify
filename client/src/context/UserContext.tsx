import React, { createContext, useState } from 'react';

type UserContextType = {
  loggedInUserId: string;
  setLoggedInUserId: React.Dispatch<React.SetStateAction<string>>;
};

const UserContext = createContext<UserContextType>({
  loggedInUserId: "",
  setLoggedInUserId: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loggedInUserId, setLoggedInUserId] = useState<string>('');

  return (
    <UserContext.Provider value={{ loggedInUserId, setLoggedInUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;