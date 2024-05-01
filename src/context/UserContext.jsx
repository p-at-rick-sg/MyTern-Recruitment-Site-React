import {createContext, useState, useRef} from 'react';

export const UserContext = createContext();
export function UserProvider({children}) {
  //Add all the stuff we will keep in context below

  const [pageTitle, setPageTitle] = useState('');

  const [user, setUser] = useState({});

  const updateUser = async newUserObj => {
    if (user) {
      console.log('setting the user');
      try {
        setUser(prevUser => ({...prevUser, ...newUserObj}));
      } catch (err) {
        console.error('updating user state failed: ', err);
      }
    } else {
      console.warn('User state not yet available');
    }
  };

  const checkRemaining = expSeconds => {
    var d = new Date();
    var secondsNow = Math.round(d.getTime() / 1000);
    const remainingSecs = expSeconds - secondsNow;
    console.log('expiry set to: ', expSeconds);
    console.log('now is : ', secondsNow);
    console.log('Remaining Seconds', remainingSecs);
    if (remainingSecs > 300000) return true;
    if (remainingSecs < 0) return false;
  };

  const checkLocalUser = async () => {
    const tmpUserStr = sessionStorage.getItem('user');
    const tmpUserObj = JSON.parse(tmpUserStr);
    const stillValid = checkRemaining(tmpUserObj.exp);
    console.log(stillValid);
  };

  const logout = async () => {
    console.log('logout function');
    //remove data form the server
    const signoutResult = await fetch(import.meta.env.VITE_SERVER + '/auth/signout', {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      body: JSON.stringify(user.email),
    });
    const data = await signoutResult.json();
    console.log('signout response:', data);
    //remove local data
    sessionStorage.clear('user');
    setUser({});
  };

  //here  are the items we will pass to the context
  const value = {
    pageTitle,
    setPageTitle,
    user,
    updateUser,
    logout,
    checkLocalUser,
  };

  //return the context provider below using thew value object above

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
