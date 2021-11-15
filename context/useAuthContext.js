import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  useCallback,
} from 'react';
import loginWithCookies from '../helpers/APICalls/loginWithCookies';
import logoutAPI from '../helpers/APICalls/logout';
const RCTNetworking = require('react-native/Libraries/Network/RCTNetworking');

export const AuthContext = createContext({
  loggedInUser: undefined,
  updateLoginContext: () => null,
  logout: () => null,
});

export const AuthProvider = ({ children }) => {
  // default undefined before loading, once loaded provide user or null if logged out
  const [loggedInUser, setLoggedInUser] = useState();

  const updateLoginContext = useCallback((data) => {
    setLoggedInUser(data.user);
  }, []);

  const logout = useCallback(async () => {
    // needed to remove token cookie
    await logoutAPI();
    RCTNetworking.clearCookies(() => {});
    setLoggedInUser(null);
  }, []);

  // use our cookies to check if we can login straight away
  useEffect(() => {
    const checkLoginWithCookies = async () => {
      await loginWithCookies().then((data) => {
        if (data.success) {
          updateLoginContext(data.success);
        } else {
          // don't need to provide error feedback as this just means user doesn't have saved cookies or the cookies have not been authenticated on the backend
          setLoggedInUser(null);
          // history.push('/login');
        }
      });
    };
    checkLoginWithCookies();
  }, [updateLoginContext]);

  return (
    <AuthContext.Provider value={{ loggedInUser, updateLoginContext, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
