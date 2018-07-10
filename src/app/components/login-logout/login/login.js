import React from "react";
import { Header } from "../../commons/header";
import {LoginForm} from "./loginForm";
import { Footer } from "../../commons/footer";

export class Login extends React.Component {
constructor(props){
    super(props);
    
}
    render() {
        return (
            <div>
                <Header/> 
                <LoginForm/>
                <Footer/>    
            </div>
        );
    }
}
