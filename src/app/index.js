import React from "react";
import { render } from "react-dom";
import { UpdateUser } from "./components/report/update-user/updateuser";
import { Router, Route, browserHistory } from "react-router";

class App extends React.Component {

    constructor(props) {
        super(props)
           

    }

    
    render() {
        return (

            <Router history={browserHistory}>
               
                <Route path="PropertyReport" components={UpdateUser}  />
                
            </Router>
        );
    }
}

render(<App />, window.document.getElementById("app"));