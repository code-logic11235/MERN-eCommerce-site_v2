import React from "react";
import ReactDOM from "react-dom/client"
import App from "./app.js";
import {Provider} from 'react-redux'
import { store } from "./redux/store.js";
import { BrowserRouter as Router } from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
    //provider to create redux store
<Provider store = {store}> 
    <Router>
        <App />
    </Router>   
</Provider>

);
// try route base code splitting React applications using React.lazy or @loadable/component for route-based splitting.