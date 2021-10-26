import classes from "./style.module.scss";
import Container from "../../../components/UI/Container";
import Card from "../../../components/UI/Card";
import Input from "../../../components/Landing/Input";
import { useReducer } from "react";
import { useHistory } from "react-router-dom";
import { post } from "../../../services/api";
import { toast } from "react-toastify";

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
                    state.passwordConfirmationIsValid,
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
                    state.passwordConfirmationIsValid,
            };
        case "LASTNAME_INPUT":
            return {
                ...state,
                lastName: action.value,
                lastNameIsValid: action.isValid,
                formIsValid:
                    state.emailIsValid &&
                    state.passwordIsValid &&
                    state.firstNameIsValid &&
                    action.isValid &&
                    state.passwordConfirmationIsValid,
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
                    state.passwordConfirmationIsValid,
            };
        case "PASSWORD_CONFIRMATION_INPUT":
            return {
                ...state,
                passwordConfirmation: action.value,
                passwordConfirmationIsValid: action.isValid && state.passwordValue === action.value,
                formIsValid:
                    state.emailIsValid &&
                    action.isValid &&
                    state.firstNameIsValid &&
                    state.passwordIsValid &&
                    state.passwordValue === state.passwordConfirmationValue,
            };
        case "FIRSTNAME_ERROR": {
            return {
                ...state,
                firstNameError: action.value
            };
        }
        case "LASTNAME_ERROR": {
            return {
                ...state,
                lastNameError: action.value
            };
        }
        case "EMAIL_ERROR": {
            return {
                ...state,
                emailError: action.value
            };
        }
        case "PASSWORD_ERROR": {
            return {
                ...state,
                passwordError: action.value
            };
        }
        case "CLEAR_ERROR": {
            return {
                ...state,
                firstNameError: "",
                lastNameError: "",
                emailError: "",
                passwordError: ""
            }
        }
        default:
            return { ...state };
    }
};

const initialFormData = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirmation: "",
    emailIsValid: false,
    firstNameIsValid: false,
    lastNameIsValid: false,
    passwordIsValid: false,
    passwordConfirmationIsValid: false,
    formIsValid: false,
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
};
const SignUp = () => {
    const [formState, dispatchState] = useReducer(formReducer, initialFormData);
    const history = useHistory();


    const emailValue = (value, isValid = false) => {
        dispatchState({ type: "EMAIL_INPUT", value, isValid });
    };

    const firstNameValue = (value, isValid = false) => {
        dispatchState({ type: "FIRSTNAME_INPUT", value, isValid });
    };

    const lastNameValue = (value, isValid = false) => {
        dispatchState({ type: "LASTNAME_INPUT", value, isValid });
    };

    const passwordValue = (value, isValid = false) => {
        dispatchState({ type: "PASSWORD_INPUT", value, isValid });
    };


    const passwordConfirmationValue = (value, isValid = false) => {
        dispatchState({ type: "PASSWORD_CONFIRMATION_INPUT", value, isValid });
    };

    const signupFormSubmitHandler = (event) => {
        event.preventDefault();
        const user = {
            "first_name": formState.firstName,
            "last_name": formState.lastName,
            "email": formState.email,
            "password": formState.password,
            "password_confirmation": formState.passwordConfirmation,
        }
        dispatchState({ type: "CLEAR_ERROR" });
        post("user/register", user).then((response) => {
            if (response.data.status) {
                toast.success(response.data.message);
                history.push({
                    pathname: "/signin",
                });
            }
        }).catch((response) => {
            const errors = response.data.errors;
            if (errors) {
                for (let key in errors) {
                    switch (key) {
                        case "first_name":
                            dispatchState({ type: "FIRSTNAME_ERROR", value: errors[key].join(' ') });
                            break;
                        case "last_name":
                            dispatchState({ type: "LASTNAME_ERROR", value: errors[key].join(' ') });
                            break;
                        case "email":
                            dispatchState({ type: "EMAIL_ERROR", value: errors[key].join(' ') });
                            break;
                        case "password":
                            dispatchState({ type: "PASSWORD_ERROR", value: errors[key].join(' ') });
                            break;
                        default:
                            break;
                    }
                }
            }
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
                        error={formState.firstNameError}
                        type="text"
                        id="first_name"
                        label="First Name"
                        inputValues={firstNameValue}
                        validation={(value) => value.length > 2}
                    />

                    <Input
                        error={formState.lastNameError}
                        type="text"
                        id="last_name"
                        label="Last Name"
                        inputValues={lastNameValue}
                        validation={(value) => value.length > 2}
                    />

                    <Input
                        error={formState.emailError}
                        type="email"
                        id="email"
                        label="Email"
                        inputValues={emailValue}
                        validation={(value) => value.includes("@")}
                    />

                    <Input
                        error={formState.passwordError}
                        type="password"
                        id="password"
                        label="Password"
                        inputValues={passwordValue}
                        validation={(value) => value.length > 7}
                    />
                    <Input
                        type="password"
                        id="password_confirmation"
                        label="Confirm Password"
                        error={formState.passwordConfirmationIsValid && "Password should match"}
                        inputValues={passwordConfirmationValue}
                        validation={(value) => value.length > 7}
                    />
                    <button
                        className={`${classes.btn} ${classes.btn_primary}`}
                    >
                        Sign up &nbsp;
                    </button>
                </form>
            </Card>
        </Container>
    )
}

export default SignUp;