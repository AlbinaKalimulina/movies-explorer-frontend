// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ element: Component, ...props }) {
//   return props.loggedIn ? (
//     <Component {...props} />
//   ) : (
//     <Navigate to="/" replace />
//   );
// }


import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...props }) => {
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to='/' replace />
    // props.loggedIn ? <Component {...props} /> : <Navigate to='/' replace />
  )
};

export default ProtectedRoute;


// import React, {useEffect, useState} from 'react';
// import {Route, Redirect} from 'react-router-dom';

// const ProtectedRoute = ({component: Component, ...props}) => {
//     const [loggedIn, setLoggedIn] = useState(true);

//     useEffect(() => {
//         if (!localStorage.getItem('jwt')) {
//             setLoggedIn(false);
//         }
//     }, []);

//     return (
//         <Route>
//             {
//                 () => loggedIn ? <Component {...props} /> : <Redirect to="/"/>
//             }
//         </Route>
//     )
// }

// export default ProtectedRoute;