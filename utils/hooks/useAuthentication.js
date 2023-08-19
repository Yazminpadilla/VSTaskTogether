import {useState, useEffect} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase' // May be wrong

export function useAuthentication() {
  // https://beta.reactjs.org/reference/react/useState
  const [user, setUser] = useState(undefined); 

  // https://beta.reactjs.org/reference/react/useEffect
  useEffect(() => {
    // https://firebase.google.com/docs/auth/web/start#web-version-9
    const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
      } else {
        // User is signed out
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatusChanged;
  }, []);

  return {
    user
  };
}
