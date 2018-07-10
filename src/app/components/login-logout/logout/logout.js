import React from "react";
import { HeaderLogout } from "./headerLogout";
import { LogoutForm } from "./logoutForm";
import { Footer } from "../../commons/footer";

export class Logout extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <HeaderLogout />
                <LogoutForm/>
                <Footer />
            </div>
        );
    }
}
