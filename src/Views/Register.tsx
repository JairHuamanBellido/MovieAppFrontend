import React, { Fragment } from "react";
import InputLogin from "../components/InputEspecial";
import { updateState } from "../shared/updateState";
import { UserService } from "../service/user.service";

import AutoBind from "auto-bind";
import { Redirect } from "react-router";

import "../css/Register.css";
import { Link } from "react-router-dom";
interface IState {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    redirect: boolean;
    avatar: any;
    imgShowing: any;
}

export default class Register extends React.Component<{}, IState>{

    constructor(props) {
        super(props);
        AutoBind.react(this);


    }


    state: IState = {
        firstName: "",
        lastName: "",
        password: "",
        username: "",
        redirect: false,
        avatar: "https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-creador-de-avatar-masculino.jpg",
        imgShowing: "https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-creador-de-avatar-masculino.jpg"

    }

    handleChange(e) {

        const { name, value } = e.target;

        this.setState(updateState<IState>(name, value));
    }


    async submit() {

        await UserService.register(this.state).then(() => {
            this.setState(updateState<IState>("redirect", true));

        })

    }

    loadFile(e) {


        this.setState(updateState<IState>("avatar", e.target.files[0]))

        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState(updateState<IState>("imgShowing", reader.result))
        }

        reader.readAsDataURL(e.target.files[0]);

    }
    render() {
        if (!this.state.redirect) {
            return (
                <Fragment>

                    <div className="register-container">
                        {/* <form method="POST" encType="multipart/form-data" action="http://localhost:3005/api/users"> */}

                        <div className="header">
                            <Link to="/">
                                <h1 >Movie</h1>
                            </Link>
                            <p>Best movie in one place</p>
                        </div>

                        <div className="avatar-field">
                            <img id="output" width="96" alt="avatar" height="96" src={this.state.imgShowing} />
                            <p><label htmlFor="file">Upload image</label></p>
                            <input type="file" accept="image/*" name="avatar" id="file" onChange={this.loadFile}
                                style={{ display: "none" }} />
                        </div>


                            <InputLogin
                                isSecure={false}
                                name="firstName"
                                textPlaceholder="First Name"
                                value={this.state.firstName}
                                handleChange={this.handleChange}

                            />
                            <InputLogin
                                isSecure={false}
                                name="lastName"
                                textPlaceholder="Last Name"
                                value={this.state.lastName}
                                handleChange={this.handleChange}

                            />
                   
                        
                            <InputLogin
                                isSecure={false}
                                name="username"
                                textPlaceholder="Username"
                                value={this.state.username}
                                handleChange={this.handleChange}

                            />
                            <InputLogin
                                isSecure={true}
                                name="password"
                                textPlaceholder="Password"
                                value={this.state.password}
                                handleChange={this.handleChange}

                            />
                        

                        {/* <button type="submit">Registrar</button> */}
                        <button onClick={this.submit}>Sign Up</button>
                        {/* </form> */}
                    </div>
                </Fragment>
            )
        }
        return (
            <Redirect to="/" />
        )
    }
}