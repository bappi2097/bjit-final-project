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
                    state.firstNameIsValid &&
                    state.lastNameIsValid,
            };
        case "FIRSTNAME_INPUT":
            return {
                ...state,
                firstName: action.value,
                firstNameIsValid: action.isValid,
                formIsValid:
                    state.emailIsValid &&
                    state.passwordIsValid &&
                    action.isValid &&
                    state.lastNameIsValid,
            };
        case "LASTNAME_INPUT":
            return {
                ...state,
                lastName: action.value,
                lastNameIsValid: action.isValid,
                formIsValid:
                    state.emailIsValid &&
                    state.passwordIsValid &&
                    action.isValid &&
                    state.firstNameIsValid,
            };
        case "PASSWORD_INPUT":
            return {
                ...state,
                password: action.value,
                passwordIsValid: action.isValid,
                formIsValid:
                    state.emailIsValid &&
                    action.isValid &&
                    state.firstNameIsValid &&
                    state.lastNameIsValid,
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
    firstNameIsValid: false,
    lastNameIsValid: false,
    passwordIsValid: false,
    formIsValid: false,
};
const SignUp = () => {
    const [formState, dispatchState] = useReducer(formReducer, initialFormData);
    // const { sendRequest } = useHttp(signUp);
    const history = useHistory();


    const emailValue = (value, isValid = false) => {
        dispatchState({ type: "EMAIL_INPUT", value, isValid });
    };

    const firstNameValue = (value, isValid = false) => {
        dispatchState({ type: "FULLNAME_INPUT", value, isValid });
    };

    const lastNameValue = (value, isValid = false) => {
        dispatchState({ type: "FULLNAME_INPUT", value, isValid });
    };

    const passwordValue = (value, isValid = false) => {
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
                        type="text"
                        id="first_name"
                        label="First Name"
                        inputValues={firstNameValue}
                        validation={(value) => value.length > 2}
                    />

                    <Input
                        type="text"
                        id="last_name"
                        label="Last Name"
                        inputValues={lastNameValue}
                        validation={(value) => value.length > 2}
                    />

                    <Input
                        type="email"
                        id="email"
                        label="Email"
                        inputValues={emailValue}
                        validation={(value) => value.includes("@")}
                    />

                    <Input
                        type="password"
                        id="password"
                        label="Password"
                        inputValues={passwordValue}
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