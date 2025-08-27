"use client";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext({
  token: "",
  setToken: (value) => {},
  userData: null,
  setUserData: (value) => {},
});

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getUserProfile();
    }
  }, [token]);

  async function getUserProfile() {
    try {
      const { data } = await axios.get(
        "https://linked-posts.routemisr.com/users/profile-data",
        {
          headers: {
            token: token,
          },
        }
      );

      if (data.message === "success") {
        setUserData(data.user);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <authContext.Provider value={{ token, setToken, userData, setUserData }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
