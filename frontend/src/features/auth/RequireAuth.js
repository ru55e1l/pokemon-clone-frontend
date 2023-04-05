import { useState, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRefreshMutation } from "../../app/api/authApiSlice";

const RequireAuth = () => {
    const location = useLocation();
    const [refresh, { isLoading }] = useRefreshMutation();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        refresh()
            .unwrap()
            .then(() => {
                setIsAuthenticated(true);
            })
            .catch((err) => {
                setIsAuthenticated(false);
            });
    }, [refresh]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // You can replace this with a proper loading component.
    }

    if (isAuthenticated) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
};

export default RequireAuth;
