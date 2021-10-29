import Card from "../../../components/UI/Card";
import classes from "./style.module.scss";
import { useContext, useReducer } from "react";
import { Link, useHistory } from "react-router-dom";
import Input from "../../../components/Landing/Input";
import Container from "../../../components/UI/Container";
import { post } from "../../../services/api";
import AuthContext from "../../../store/auth-context";
import { toast } from "react-toastify";
import axios from "axios";

const formReducer = (state, action) => {
    switch (action.type) {
        case "EMAIL_INPUT":
            return {
                ...state,
                email: action.value,
                emailIsValid: action.isValid,
                formIsValid: action.isValid && state.passwordIsValid,
            };
        case "PASSWORD_INPUT":
            return {
                ...state,
                password: action.value,
                passwordIsValid: action.isValid,
                formIsValid: state.emailIsValid && action.isValid,
            };
        default:
            return { ...state };
    }
};
const initialFormData = {
    email: "",
    password: "",
    emailIsValid: false,
    passwordIsValid: false,
    formIsValid: false,
};

const Login = () => {
    const [formState, dispatchState] = useReducer(formReducer, initialFormData);
    const history = useHistory();
    const authContext = useContext(AuthContext);

    const loginSubmitHandler = async (event) => {
        event.preventDefault();
        const credentials = {
            email: formState.email,
            password: formState.password
        };
        post("user/login", credentials).then(response => {
            const user = response.data.data.user;
            authContext.onLogin(
                user.id,
                user.email,
                user.first_name + user.last_name ? user.last_name : "",
                user.is_admin === 1,
                response.data.data.access_token
            );
            if (localStorage.getItem("isLoggedIn") === "1") {
                const token = localStorage.getItem("token");
                axios.defaults.headers = token ? { "Authorization": "Bearer " + token } : {};
                toast.success(response.data.message);
                history.push({
                    pathname: "/dashboard",
                });
            }
        }).catch(errors => {
            toast.error(errors.data.message);
        })
    };

    const emailValues = (value, isValid = false) => {
        dispatchState({ type: "EMAIL_INPUT", value, isValid });
    };

    const passwordValues = (value, isValid = false) => {
        dispatchState({ type: "PASSWORD_INPUT", value, isValid });
    };
    return (
        <Container className={classes.login__container}>
            <Card className={classes.login__card}>
                <form onSubmit={loginSubmitHandler} autoComplete={'off'}>
                    <div>
                        <h1>Sign In</h1>
                    </div>
                    <Input
                        type="email"
                        id="email"
                        label="Email"
                        inputValues={emailValues}
                        validation={(value) => value.includes("@")}
                    />

                    <Input
                        type="password"
                        id="password"
                        label="Password"
                        inputValues={passwordValues}
                        validation={(value) => value.length > 7}
                    />
                    <button
                        disabled={!formState.formIsValid}
                        className={`${classes.btn} ${classes.btn_primary}`}
                    >
                        Sign In
                    </button>
                    <Link to="/forget-password" className={classes.forget__password}>
                        Forget Password?
                    </Link>
                </form>
                <Card className={classes.signup__div}>
                    <p>
                        Don't have an account?&nbsp;
                        <Link to="/signup">Sign Up</Link>
                    </p>
                </Card>
            </Card>
        </Container>
    );
};

export default Login;