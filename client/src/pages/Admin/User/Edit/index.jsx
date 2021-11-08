import { Link, useParams } from "react-router-dom";
import classes from "./style.module.scss";
import { MdOutlineArrowBack } from "react-icons/md";
import Card from "../../../../components/UI/Card";
import Input from "../../../../components/Landing/Input";
import ImageInput from "../../../../components/Landing/ImageInput";
import { useEffect, useReducer } from "react";
import Textarea from "../../../../components/Landing/Textarea";
import { get, post } from "../../../../services/api";
import { toast } from "react-toastify";

const formReducer = (state, action) => {
    switch (action.type) {
        case "IMAGE_URL_INPUT":
            return {
                ...state,
                imageUrl: action.value,
            };
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
        case "FIRST_NAME_INPUT":
            return {
                ...state,
                firstName: action.value,
                firstNameIsValid: action.isValid,
                formIsValid: true,
            };
        case "LAST_NAME_INPUT":
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

        case "FIRST_NAME_ERROR": {
            return {
                ...state,
                firstNameError: action.value
            };
        }
        case "LAST_NAME_ERROR": {
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
    imageUrl: "",
    imageFresh: false,
    email: "",
    firstName: "",
    lastName: "",
    image: "",
    isAdmin: 0,
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

const EditUser = () => {
    const { id } = useParams();
    const [formState, dispatchState] = useReducer(formReducer, initialFormData);

    const emailValue = (value, isValid = false) => {
        dispatchState({ type: "EMAIL_INPUT", value, isValid });
    };

    const firstNameValue = (value, isValid = false) => {
        dispatchState({ type: "FIRST_NAME_INPUT", value, isValid });
    };

    const lastNameValue = (value, isValid = false) => {
        dispatchState({ type: "LAST_NAME_INPUT", value, isValid });
    };

    const imageChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "IMAGE_INPUT", value, isValid });
    }
    const isAdminChangeHandler = (value, isValid = true) => {
        dispatchState({ type: "IS_ADMIN_INPUT", value, isValid });
    }

    useEffect(() => {
        get("/admin/user/" + id).then(response => {
            dispatchState({ type: "FIRST_NAME_INPUT", value: response.data.data.first_name, isValid: true });
            dispatchState({ type: "LAST_NAME_INPUT", value: response.data.data.last_name, isValid: true });
            dispatchState({ type: "EMAIL_INPUT", value: response.data.data.email, isValid: true });
            dispatchState({ type: "IMAGE_URL_INPUT", value: (response.data.data.image ? process.env.REACT_APP_IMAGE_URL + response.data.data.image : null), isValid: true });
            dispatchState({ type: "IS_ADMIN_INPUT", value: response.data.data.is_admin, isValid: true });
        })
    }, [])
    const formSubmitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("image", formState.image);
        formData.append("first_name", formState.firstName);
        formData.append("last_name", formState.lastName);
        formData.append("email", formState.email);
        formData.append("is_admin", formState.isAdmin);

        post("/admin/user/" + id, formData).then(response => {
            toast.success(response.data.message);
        }).catch(errors => {
            console.log(errors);
            toast.error(errors.data.message);
        })
    }
    return (
        <Card>
            <Link className={`${classes.btn} ${classes.btn_primary}`} to="/user"><MdOutlineArrowBack />&nbsp;Back</Link>
            <form onSubmit={formSubmitHandler}>
                <h2>User</h2>
                <ImageInput
                    width="100px"
                    height="100px"
                    onImageChange={(value) => value}
                    onImageFile={imageChangeHandler}
                    label="Input Image"
                    fresh={formState.imageFresh}
                    image={formState.imageUrl}
                />
                <Input
                    error={formState.firstNameError}
                    type="text"
                    id="first_name"
                    label="First Name"
                    defaultValue={formState.firstName}
                    inputValues={firstNameValue}
                    validation={(value) => value.length > 2}
                />

                <Input
                    error={formState.lastNameError}
                    type="text"
                    id="last_name"
                    label="Last Name"
                    defaultValue={formState.lastName}
                    inputValues={lastNameValue}
                    validation={(value) => value.length > 2}
                />

                <Input
                    error={formState.emailError}
                    type="email"
                    id="email"
                    label="Email"
                    defaultValue={formState.email}
                    inputValues={emailValue}
                    validation={(value) => value.includes("@")}
                />

                <label>User Type</label>
                <select onChange={isAdminChangeHandler} defaultValue={formState.isAdmin}>
                    <option value={0}>User</option>
                    <option value={1}>Admin</option>
                </select>


                <button className={`${classes.btn} ${classes.btn_primary}`}>Save</button>
            </form>
        </Card>
    )
}

export default EditUser;