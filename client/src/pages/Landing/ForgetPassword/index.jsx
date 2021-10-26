import Card from "../../../components/UI/Card";
import classes from "./style.module.scss";
import { useReducer } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../../components/Landing/Input";
import Container from "../../../components/UI/Container";
import { post } from "../../../services/api";
import { toast } from "react-toastify";

const formReducer = (state, action) => {
    switch (action.type) {
        case "EMAIL_INPUT":
            return {
                ...state,
                email: action.value,
                emailIsValid: action.isValid,
                formIsValid: action.isValid,
            };
        default:
            return { ...state };
    }
};
const initialFormData = {
    email: "",
    emailIsValid: false,
    formIsValid: false,
};

const ForgetPassword = () => {
    const [formState, dispatchState] = useReducer(formReducer, initialFormData);
    const history = useHistory();

    const forgetSubmitHandler = async (event) => {
        event.preventDefault();
        post("user/forget-password", { email: formState.email }).then(response => {
            if (response.data.status) {
                toast.success(response.data.message);
                history.push({
                    pathname: "/",
                });
            } else {
                toast.error(response.data.message);
            }
        }).catch(errors => {
            toast.error(errors.data.message);
        })

    };

    const emailValues = (value, isValid = false) => {
        dispatchState({ type: "EMAIL_INPUT", value, isValid });
    };

    return (
        <Container className={classes.forget__container}>
            <Card className={classes.forget__card}>
                <form onSubmit={forgetSubmitHandler} autoComplete={'off'}>
                    <div>
                        <h1>Reset Password</h1>
                    </div>
                    <Input
                        type="email"
                        id="email"
                        label="Email"
                        inputValues={emailValues}
                        validation={(value) => value.includes("@")}
                    />
                    <button
                        disabled={!formState.formIsValid}
                        className={`${classes.btn} ${classes.btn_primary}`}
                    >
                        Get Reset Password Form
                    </button>
                </form>
            </Card>
        </Container>
    );
};

export default ForgetPassword;