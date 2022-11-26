import React from 'react';
import ReactDOM from "react-dom";
import router from './Components/Router'
import { RouterProvider } from "react-router-dom";

const App = () => {
    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}
 
ReactDOM.render(<App/>, document.getElementById("root"));