import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loading from '../Pages/Home Page/Home/Shared/Loading/Loadding';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth();

    if(loading){
        return <Loading/>
    }

    if(!user){
        <Navigate to={'/login'}></Navigate>
    }

    return children;
};

export default PrivateRoute;