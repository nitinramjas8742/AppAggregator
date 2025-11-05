import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext({
  isLoggedIn: false,
  user: null,       // { email, ... } or null
  token: null,
  login: (token) => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  // Parse token into user info
  const parseToken = useCallback((t) => {
    if (!t) return null;
    try {
      const decoded = jwtDecode(t);
      // decoded.sub contains the subject (email) if that's what you store
      return decoded;
    } catch (e) {
      console.warn("Invalid token:", e);
      return null;
    }
  }, []);

  useEffect(() => {
    const u = parseToken(token);
    setUser(u);
  }, [token, parseToken]);

  const login = useCallback((t) => {
    localStorage.setItem("token", t);
    setToken(t);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
  }, []);

  const value = useMemo(() => ({
    isLoggedIn: !!token,
    user,
    token,
    login,
    logout
  }), [token, user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
