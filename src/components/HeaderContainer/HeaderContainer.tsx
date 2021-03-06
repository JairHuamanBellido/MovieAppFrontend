import React from "react";
import { UserContext } from "../../context/UserContext";

import { AuthContext } from "../../context/AuthContext";
import SidebarComponent from "./HeaderComponent";

export default class HeaderContainer extends React.PureComponent {


    render() {

        return (

            <AuthContext.Consumer>
                {({ logout }) => (
                    <UserContext.Consumer>
                        {({ user }) => (

                            <SidebarComponent user={user} logout={logout} />
                        )}
                    </UserContext.Consumer>
                )}
            </AuthContext.Consumer>

        )
    }
}

