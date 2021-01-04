import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {LoginPage} from "./components/pages/LoginPage";
import {Top} from "./components/pages/TopPage";

const App: React.FC = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route path="/top" component={Top}/>
                    <Route path="/login" component={LoginPage}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
