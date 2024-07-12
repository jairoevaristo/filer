import { ReactNode, useState, useEffect, useMemo } from 'react';

import { api } from '@/libs/axios'
;
import { AuthContext } from './auth-context';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get('/auth/verify-token');
        setIsAuthenticated(data.isAuthenticated);

      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const values = useMemo(() => ({
    isAuthenticated,
    setIsAuthenticated,
    loading
  }), [isAuthenticated, setIsAuthenticated, loading])

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};
