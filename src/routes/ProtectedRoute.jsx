import React from 'react';
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
    const { user } = useSelector((state) => state.user);
    const { pathname } = useLocation();

    if (!user) {
        return <Navigate to={`/signin?redirectUrl=${pathname}`} replace />;
    }

    return children;
}

export default ProtectedRoute;
