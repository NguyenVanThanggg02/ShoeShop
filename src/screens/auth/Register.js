import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { listToast } from "../../constants";
import { setToast } from "../../redux/features";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleRegister = () => {
        if (password !== confirmPassword) {
            setPasswordMatchError(true);
            return;
        } else {
            setPasswordMatchError(false);
            axios
                .post("http://localhost:9999/users/register", {
                    username: username,
                    password: password,
                })
                .then((response) => {
                    if (response.data.status) {
                        dispatch(
                            setToast({ ...listToast[0], detail: `${response.data.message}` })
                        );
                        navigate("/login")
                    } else {
                        dispatch(
                            setToast({ ...listToast[1], detail: `Register failed!` })
                        );
                    }
                })
                .catch((error) => {
                    dispatch(
                        setToast({ ...listToast[2], detail: `${error}!` })
                    );
                });
        }
    };

    return (
        <div className="h-screen">
            <div className="flex align-items-center justify-content-center my-auto h-full" >
                <Form className="card bg-color m-4 w-5">
                    <div>
                        <div style={{ textAlign: "center" }}>
                            <div className="font-bold m-2" >
                                ShoeShoe
                            </div>
                            <div
                                className="font-bold m-2 text-blue-300"
                                style={{ fontSize: "25px", fontWeight: "bold" }}
                            >
                                Create an Account
                            </div>
                            <div className="m-2">
                                Please fill in the form to create an account.
                            </div>
                        </div>
                        <div className="m-2">
                            <Form.Control
                                style={{ height: "55px" }}
                                type="text"
                                placeholder="Email Address"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="m-2">
                            <Form.Control
                                style={{ height: "55px" }}
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="m-2">
                            <Form.Control
                                style={{ height: "55px" }}
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {passwordMatchError && (
                                <div className="m-2 text-xs" style={{ color: "red" }}>
                                    confirmPassword is wrrong !
                                </div>
                            )}
                        </div>

                        <div className="m-2" style={{ textAlign: "center" }}>
                            <Button
                                className="bg-blue-300"
                                style={{
                                    width: "100%",
                                    height: "55px",
                                    fontWeight: "bold",
                                }}
                                onClick={handleRegister}
                            >
                                Register
                            </Button>
                        </div>
                        <hr />
                        <div
                            className="m-2"
                            style={{ textAlign: "center", marginBottom: "20px" }}
                        >
                            <span>Already have an account? </span>
                            <Link to={"/login"} className="text-blue-300">
                                Login here
                            </Link>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Register;
