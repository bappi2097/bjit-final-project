import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import classes from "./style.module.scss";
import { MdOutlineArrowBack } from "react-icons/md";
import Card from "../../../../components/UI/Card";
import Input from "../../../../components/Landing/Input";
import ImageInput from "../../../../components/Landing/ImageInput";
import { useReducer } from "react";
import Textarea from "../../../../components/Landing/Textarea";
import { post } from "../../../../services/api";
import { toast } from "react-toastify";

const formReducer = (state, action) => {
    switch (action.type) {
        case "IMAGE_INPUT":
            return {
                ...state,
                imageFresh: false,
                image: action.value,
                imageIsValid: action.isValid,
                formIsValid: true,
            };
        case "EMAIL_INPUT":
            return {
                ...state,
                email: action.value,
                emailIsValid: action.isValid,
                formIsValid: true,
            };
        case "FIRSTNAME_INPUT":
            return {
                ...state,
                firstName: action.value,
                firstNameIsValid: action.isValid,
                formIsValid: true,
            };
        case "LASTNAME_INPUT":
            return {
                ...state,
                lastName: action.value,
                lastNameIsValid: action.isValid,
                formIsValid: true,
            };
        case "IS_ADMIN_INPUT":
            return {
                ...state,
                imageFresh: false,
                isAdmin: action.value,
                isAdminIsValid: action.isValid,
                formIsValid: true,
            };
        case "CLEAR_FORM": {
            return {
                image: "",
                name: "",
                isAdmin: "",
                imageFresh: true,
                imageIsValid: false,
                nameIsValid: false,
                isAdminIsValid: false,
                formIsValid: false
            }
        }

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
        case "CLEAR_ERROR": {
            return {
                ...state,
                firstNameError: "",
                lastNameError: "",
                emailError: "",
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
    imageFresh: false,
    image: "",
    isAdmin: "",
    imageIsValid: false,
    emailIsValid: false,
    firstNameIsValid: false,
    lastNameIsValid: false,
    isAdminIsValid: false,
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    formIsValid: false
};

const AddUser = () => {
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

    const imageChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "IMAGE_INPUT", value, isValid });
    }
    const isAdminChangeHandler = (value, isValid = true) => {
        dispatchState({ type: "IS_ADMIN_INPUT", value, isValid });
    }
    const formSubmitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("image", formState.image);
        formData.append("first_name", formState.firstName);
        formData.append("last_name", formState.lastName);
        formData.append("email", formState.email);
        formData.append("is_admin", formState.isAdmin);

        post("/admin/user", formData).then(response => {
            toast.success(response.data.message);
            history.push({
                pathname: "/user"
            });
        }).catch(errors => {
            toast.error(errors.data.message);
        })
    }
    return (
        <Card>
            <Link className={`${classes.btn} ${classes.btn_primary}`} to="/user"><MdOutlineArrowBack />&nbsp;Back</Link>
            <form onSubmit={formSubmitHandler}>
                <h2>Website Type</h2>
                <ImageInput
                    width="100px"
                    height="100px"
                    onImageChange={(value) => value}
                    onImageFile={imageChangeHandler}
                    label="Input Image"
                    fresh={formState.imageFresh}
                />
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

                <label>User Type</label>
                <select onChange={isAdminChangeHandler}>
                    <option value={0}>User</option>
                    <option value={1}>Admin</option>
                </select>

                <button className={`${classes.btn} ${classes.btn_primary}`}>Save</button>
            </form>
        </Card>
    )
}

export default AddUser;