import { Navigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/use-auth';

export const PrivateRouter = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, loading } = useAuth()

    if (loading) return <div>Loading...</div>

    return isAuthenticated ? children : <Navigate to={ROUTES.login} />;
}