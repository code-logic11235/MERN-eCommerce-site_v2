import React from "react";
import ReactDOM from "react-dom/client"
import App from "./app.js";
import {Provider} from 'react-redux'
import { store } from "./redux/store.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
    //provider to create redux store
<Provider store = {store}> 
    <App /> 
</Provider>

);
// try route base code splitting React applications using React.lazy or @loadable/component for route-based splitting.