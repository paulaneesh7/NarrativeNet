/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { URL } from "../url";

const UserContext = createContext({});

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  // calling the below function with useEffect, so that it will get called only once on unmounting.
  useEffect(() => {
    getUser();
  }, []);

  // if refreshed then User will still be logged in unless and until User has logged out (check the refetchUser controller in auth_controller)
  const getUser = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/refetch", {
        withCredentials: true,
      });
      // console.log(res.data);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("This context was used outside the UserContextProvider");

  return context;
}

export { UserContextProvider, useUser };
