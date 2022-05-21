import { useState, useEffect } from 'react';

const uid = 'a1b2c3d4';

function useUser() {
  const [userId, setUserId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setUserId(uid);
    setIsLoggedIn(!!uid);
  }, []);

  return { userId, isLoggedIn };
}

export default useUser;
