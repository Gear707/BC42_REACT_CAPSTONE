import React from 'react';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function UserRoute({ children }) {
    const { user } = useSelector((state) => state.user);

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default UserRoute;