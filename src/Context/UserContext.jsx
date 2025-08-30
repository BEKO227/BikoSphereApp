import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  // Only fetch if there's a token
  async function getUserData() {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const { data } = await axios.get(
        'https://linked-posts.routemisr.com/users/profile-data',
        {
          headers: { token }
        }
      );

      if (data.message === 'success') {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      setUser(null); 
      localStorage.removeItem('token');
    }
  }

  // Run once when provider mounts
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <UserContext.Provider value={{ getUserData, user, setUser}}>
      {children}
    </UserContext.Provider>
  );
}
