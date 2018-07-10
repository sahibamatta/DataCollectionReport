import React from "react";
import "../../html/assets/css/global.css"


export class Header extends React.Component {

    logout(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {

        return (
            <header className="header">
                <div className="top-header">
                    <div className="container clearfix">
                        <a className="brands">FABHOTELS.COM</a>
                    </div>
                </div>

                <div className="sub-header">
                    <div className="container clearfix">
                    </div>
                </div>
            </header>
        );
    }
}


