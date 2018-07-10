import React from "react";
import "../../../html/assets/css/global.css";
const urlForHeader = "http://localhost:8080/WalletService/header-footer/header";

export class HeaderLogout extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    componentDidMount() {
        console.log("in componentdidmount")
        fetch(urlForHeader)
            .then(response => {
                if (!response.ok) {
                    throw Error("Network request failed");
                }
                return response.json();
            })
            .then(d => {
                console.log(d);
                this.setState({
                    header: d.header
                })

            }), () => {
                this.setState({
                    requestFailed: true
                })
            }
    }


    render() {

        return (
            <header className="header">
                <div className="top-header">
                    <div className="container clearfix">
                        <a className="brands">{this.state.header}</a>
                        <nav className="dashboard-nav">
                            <ul className="clearfix">
                                <li> <a href="/login">Login</a></li>
                            </ul>
                        </nav>
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