import React from 'react';
import {useEffect} from 'react';
import {Route, useHistory} from 'react-router-dom';


function ProtectedRoute({component: Component, ...rest}) {
    const history = useHistory();
    useEffect(() => {
        if (!localStorage.getItem('FBIdToken')){
            history.push("/")
        }
       
    }, [])

    return (
       <Route
       {...rest}
       render={
           props=>{
              
               return <Component {...props}/>
           
           }
       }
       />
    );
};

export default ProtectedRoute;
