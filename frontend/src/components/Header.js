import React from "react";
import {useContext} from "react";
import {UserContext} from "../userContext";
import {Link} from "react-router-dom";

function Header(props) {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        {props.title}
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <UserContext.Consumer>
                                {(context) =>
                                    context.user ? (
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/publish">
                                                    Publish
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/profile">
                                                    Profile
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/logout">
                                                    Logout
                                                </Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/login">
                                                    Login
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/register">
                                                    Register
                                                </Link>
                                            </li>
                                        </>
                                    )
                                }
                            </UserContext.Consumer>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
