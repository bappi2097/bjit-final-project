import classes from "./style.module.scss";
import Container from "../../../components/UI/Container";
import Card from "../../../components/UI/Card";
import Input from "../../../components/Landing/Input";
import { useReducer } from "react";
import { useHistory } from "react-router-dom";
const formReducer = (state, action) => {
    switch (action.type) {
        case "EMAIL_INPUT":
            return {
                ...state,
                email: action.value,
                emailIsValid: action.isValid,
                formIsValid:
                    action.isValid &&
                    state.passwordIsValid &&
                    state.fullNameIsValid,
            };
        case "FULLNAME_INPUT":
            return {
                ...state,
                fullName: action.value,
                fullNameIsValid: action.isValid,
                formIsValid:
                    state.emailIsValid &&
                    state.passwordIsValid &&
                    action.isValid,
            };
        case "PASSWORD_INPUT":
            return {
                ...state,
                password: action.value,
                passwordIsValid: action.isValid,
                formIsValid:
                    state.emailIsValid &&
                    action.isValid &&
                    state.fullNameIsValid,
            };
        default:
            return { ...state };
    }
};

const initialFormData = {
    email: "",
    fullName: "",
    password: "",
    emailIsValid: false,
    fullNameIsValid: false,
    passwordIsValid: false,
    formIsValid: false,
};
const SignUp = () => {
    const [formState, dispatchState] = useReducer(formReducer, initialFormData);
    // const { sendRequest } = useHttp(signUp);
    const history = useHistory();


    const emailValues = (value, isValid = false) => {
        dispatchState({ type: "EMAIL_INPUT", value, isValid });
    };

    const fullNameValues = (value, isValid = false) => {
        dispatchState({ type: "FULLNAME_INPUT", value, isValid });
    };

    const passwordValues = (value, isValid = false) => {
        dispatchState({ type: "PASSWORD_INPUT", value, isValid });
    };
    const signupFormSubmitHandler = (event) => {
        event.preventDefault();
        // addUser({
        //     email: formState.email,
        //     fullName: formState.fullName,
        //     password: formState.password,
        // });
        // sendRequest({
        //     email: formState.email,
        //     fullName: formState.fullName,
        //     password: formState.password,
        // });
        history.push({
            pathname: "/login",
        });
    }
    return (
        <Container className={classes.signup__container}>
            <Card className={classes.signup__card}>
                <form method="post" onSubmit={signupFormSubmitHandler}>
                    <div>
                        <h1>Sign Up</h1>
                    </div>
                    <Input
                        type="email"
                        id="email"
                        label="Email"
                        inputValues={emailValues}
                        validation={(value) => value.includes("@")}
                    />
                    <Input
                        type="text"
                        id="fullname"
                        label="Full Name"
                        inputValues={fullNameValues}
                        validation={(value) => value.length > 2}
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
                        Sign up{" "}
                    </button>
                </form>
            </Card>
        </Container>
    )
}

export default SignUp;