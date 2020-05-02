import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...props }) => {
    console.log("Props from Component thru PRoute: ", props);
        retrun (
            <Route 
                {...props}
                render={() => {
                    if(localStorage.getItem('token')) {
                        return <Component />;
                    } else {
                        return <Redirect to="/login" />;
                    }
                }}
                />
            );
};

export default PrivateRoute;