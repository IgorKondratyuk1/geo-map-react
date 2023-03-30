import React from 'react';
import ReactDOM from 'react-dom/client';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {RouterProvider} from "react-router-dom";
import {router} from "./routing";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);
