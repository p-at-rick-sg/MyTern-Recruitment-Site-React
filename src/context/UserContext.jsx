import {createContext, useState, useRef} from 'react';

export const UserContext = createContext();
export function UserProvider({children}) {
  //Add all the stuff we will keep in context below

  const [pageTitle, setPageTitle] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const [user, setUser] = useState({
    email: 'test',
    firstName: 'first',
    role: 'none',
    type: 'none',
    exp: 'not set',
  });

  const updateUser = async newUserObj => {
    try {
      await setUser(prevUser => ({...prevUser, ...newUserObj})); // Merge new data
    } catch (err) {
      console.error('updaing user state failed: ', err);
    }
  };

  const checkRemaining = expires => {
    var d = new Date();
    var seconds = Math.round(d.getTime() / 1000);
    const remainingSecs = expires - seconds;
    console.log('Remaining Seconds', remainingSecs);
  };

  const checkSession = async () => {
    //check the context state user
    console.log();
  };

  const logout = () => {
    console.log('logout function');
    sessionStorage.clear('access');
    sessionStorage.clear('role');
    setUser({
      email: null,
      firstName: null,
      role: null,
      type: null,
      exp: null,
    });
  };

  //here  are the items we will pass to the context
  const value = {
    pageTitle,
    setPageTitle,
    authenticated,
    setAuthenticated,
    user,
    updateUser,
    logout,
    checkSession,
  };

  //return the context provider below using thew value object above

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
