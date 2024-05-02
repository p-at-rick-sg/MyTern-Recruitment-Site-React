import {createContext, useState, useRef} from 'react';
export const UserContext = createContext();
export function UserProvider({children}) {
  //Add all the stuff we will keep in context below

  const [showSetup, setShowSetup] = useState('');
  const [user, setUser] = useState({});

  const updateUser = async newUserObj => {
    if (user) {
      console.log('setting the user');
      try {
        setUser(prevUser => ({...prevUser, ...newUserObj}));
        return true;
      } catch (err) {
        console.error('updating user state failed: ', err);
        return false;
      }
    } else {
      console.warn('User state not yet available');
      return false;
    }
  };

  const checkRemaining = expSeconds => {
    var d = new Date();
    var secondsNow = Math.round(d.getTime() / 1000);
    const remainingSecs = expSeconds - secondsNow;
    console.log('expiry set to: ', expSeconds);
    console.log('now is : ', secondsNow);
    console.log('Remaining Seconds', remainingSecs);
    if (remainingSecs >= 300) return true;
    if (remainingSecs < 300 && remainingSecs > 0) return 'short';
    if (remainingSecs < 0) return false;
  };

  const checkLocalSession = async () => {
    const tmpUserStr = sessionStorage.getItem('user');
    console.log(tmpUserStr);
    if (tmpUserStr !== null) {
      const tmpUserObj = JSON.parse(tmpUserStr);
      console.log(tmpUserObj);
      const stillValid = checkRemaining(tmpUserObj.exp);
      console.log('valid: ', stillValid);
      if (stillValid) {
        const updated = await updateUser(tmpUserObj);
        if (updated) {
          console.log('should have updated');
          return true;
        } else {
          console.error('Failed to update user state');
          return false;
        }
      }
    }
    return false;
  };

  const logout = async () => {
    if (user && user.email) {
      try {
        const signoutResult = await fetch(import.meta.env.VITE_SERVER + '/auth/signout', {
          method: 'POST',
          withCredentials: true,
          credentials: 'include',
          body: JSON.stringify(user.email),
        });
        const data = await signoutResult.json();
        console.log('signout response:', data);
        window.location.href = '/';
      } catch (err) {
        console.error('failed on the server signout func');
      }
      try {
        sessionStorage.clear('user');
        setUser({});
        console.log('signout complete');
      } catch {
        console.error('failed to remove local data');
      }
    }
  };

  //here  are the items we will pass to the context
  const value = {
    user,
    updateUser,
    logout,
    checkLocalSession,
  };

  //return the context provider below using thew value object above

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
