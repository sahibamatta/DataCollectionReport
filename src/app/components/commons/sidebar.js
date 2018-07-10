import React from "react";
import "../../html/assets/css/global.css";
import "../../html/assets/css/style.css";
import "../../html/assets/css/reset.css";


export class SidebarClass extends React.Component {

    render() {
        return (


            <sidebar className="dashboard-link">
                <ul className="clearfix">
                    <li>
                        <a href="/CreateUser">Create User</a>
                    </li>
                    <li>
                        <a href="/UpdateUser">Update User</a>
                    </li>
                    <li>
                        <a href="/DeleteUser">Delete User</a>
                    </li>
                    <li>
                        <a href="/Wallet">Wallet</a>
                    </li>
                    <li>
                        <a href="/AmountTransferReport">Amount Transfer Report</a>
                    </li>
                    <li>
                        <a href="/BlockedUserReport">Blocked User Report</a>
                    </li>

                </ul>
            </sidebar>
        );
    }
}