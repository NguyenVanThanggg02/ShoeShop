import axios from "axios";
import { React, useState } from "react";
import { Button, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { listToast } from "../../constants";
import { setToast } from "../../redux/features";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        axios
            .post("http://localhost:9999/users/login", {
                username: email,
                password: password,
            })
            .then((response) => {
                if (response.data.user) {
                    console.log(response.data.user);
                    dispatch(
                        setToast({ ...listToast[0], detail: "Log in successfully!" })
                    );
                    // Lưu thông tin người dùng vào local storage
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    // Chuyển hướng người dùng đến trang chính
                    navigate("/")
                } else {
                    dispatch(
                        setToast({ ...listToast[1], detail: `${response.data.message}` })
                    );
                }
            })
            .catch((error) => {
                dispatch(
                    setToast({ ...listToast[1], detail: `Error sending login request! ` })
                );
            });
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
                                Hi, Wellcome Back
                            </div>
                            <div className="m-2">Enter your credentials to continue</div>
                        </div>
                        <div className="m-2">
                            <Form.Control
                                style={{ height: "55px" }}
                                type="email"
                                placeholder="Email Address / Username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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

                        <Row className="m-2">
                            <div className="formgrid grid mb-3">
                                <div className="field col">
                                    <input type={"checkbox"} /> Keep me logged in
                                </div>
                                <div
                                    className="field col text-right mr-3 "
                                >
                                    <Link className="text-blue-300" to={"/forgotpassword"} >
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>
                        </Row>
                        <div className="m-2" style={{ textAlign: "center" }}>
                            <Button
                                className="bg-blue-300"
                                style={{
                                    width: "100%",
                                    height: "55px",
                                    fontWeight: "bold",
                                }}
                                onClick={handleLogin}
                            >
                                Sign in
                            </Button>
                        </div>
                        <hr />
                        <div
                            className="m-2"
                            style={{ textAlign: "center", marginBottom: "20px" }}
                        >
                            <Link to={"/register"} style={{ color: "black" }}>
                                Don't have an account?
                            </Link>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};
export default Login;
