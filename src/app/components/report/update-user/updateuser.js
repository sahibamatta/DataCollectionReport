import React from "react";
import { Header } from "../../commons/header";
import {UpdateUserMetadata} from "./updateUserMetadata";
import { Footer } from "../../commons/footer";

export class UpdateUser extends React.Component {

    render() {
        return (
            <div>
                <Header/> 
                <UpdateUserMetadata/>
                <Footer/>    
            </div>
        );
    }
}
