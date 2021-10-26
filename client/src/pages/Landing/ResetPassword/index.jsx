import classes from "./style.module.scss";
import Container from "../../../components/UI/Container";
import Card from "../../../components/UI/Card";
import Input from "../../../components/Landing/Input";
import { useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import { post } from "../../../services/api";
import { toast } from "react-toastify";

const formReducer = (state, action) => {
    switch (action.type) {
        case "PASSWORD_INPUT":
            return {
                ...state,
                password: action.value,
                passwordIsValid: action.isValid,
                formIsValid:
                    action.isValid &&
                    state.passwordConfirmationIsValid,
            };
        case "PASSWORD_CONFIRMATION_INPUT":
            return {
                ...state,
                passwordConfirmation: action.value,
                passwordConfirmationIsValid: action.isValid && state.passwordValue === action.value,
                formIsValid:
                    action.isValid &&
                    state.passwordIsValid &&
                    state.passwordValue === state.passwordConfirmationValue,
            };
        case "PASSWORD_ERROR": {
            return {
                ...state,
                passwordError: action.value
            };
        }
        case "CLEAR_ERROR": {
            return {
                ...state,
                passwordError: ""
            }
        }
        default:
            return { ...state };
    }
};

const initialFormData = {
    password: "",
    passwordConfirmation: "",
    passwordIsValid: false,
    passwordConfirmationIsValid: false,
    formIsValid: false,
    passwordError: "",
};
const ResetPassword = () => {
    const [formState, dispatchState] = useReducer(formReducer, initialFormData);
    const history = useHistory();
    const { remember_token } = useParams();

    const passwordValue = (value, isValid = false) => {
        dispatchState({ type: "PASSWORD_INPUT", value, isValid });
    };


    const passwordConfirmationValue = (value, isValid = false) => {
        dispatchState({ type: "PASSWORD_CONFIRMATION_INPUT", value, isValid });
    };

    const signupFormSubmitHandler = (event) => {
        event.preventDefault();
        const user = {
            "password": formState.password,
            "password_confirmation": formState.passwordConfirmation,
        }
        dispatchState({ type: "CLEAR_ERROR" });
        post("user/reset-password/" + remember_token, user).then((response) => {
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
                        <h1>Reset Password</h1>
                    </div>

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
                        Reset &nbsp;
                    </button>
                </form>
            </Card>
        </Container>
    )
}

export default ResetPassword;