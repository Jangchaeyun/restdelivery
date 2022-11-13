import React from "react";
import ReactDOM from "react-dom";
import './index.css'

import { BrowserRouter as Router } from "react-router-dom";

import App from './App'
import { StateProvider } from "./components/context/StateProvider";
import reducer from "./components/context/reducer";
import { initalState } from "./context/initialState";

ReactDOM.render(
    <Router>
        <StateProvider initialState={initalState} reducer={reducer}>
            <App />
        </StateProvider>
    </Router>,
    document.getElementById("root")
);