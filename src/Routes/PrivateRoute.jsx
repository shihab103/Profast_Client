import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loading from '../Pages/Home Page/Home/Shared/Loading/Loadding';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth();
    const location = useLocation();
    

    if(loading){
        return <Loading/>
    }

    if(!user){
        <Navigate state={{from: location.pathname}} to={'/login'}></Navigate>
    }

    return children;
};

export default PrivateRoute;