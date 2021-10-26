import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import classes from "./style.module.scss";
import { MdOutlineArrowBack } from "react-icons/md";
import Card from "../../../../components/UI/Card";
import Input from "../../../../components/Landing/Input";
import { useReducer } from "react";
import Textarea from "../../../../components/Landing/Textarea";
import { post } from "../../../../services/api";
import { toast } from "react-toastify";

const formReducer = (state, action) => {
    switch (action.type) {
        case "NAME_INPUT":
            return {
                ...state,
                name: action.value,
                nameIsValid: action.isValid,
                formIsValid: action.isValid && state.designIsValid,
            };
        case "DESIGN_INPUT":
            return {
                ...state,
                design: action.value,
                designIsValid: action.isValid,
                formIsValid: action.isValid && state.nameIsValid,
            };
        case "CLEAR_FORM": {
            return {
                name: "",
                design: "",
                nameIsValid: false,
                designIsValid: false,
                formIsValid: false
            }
        }
        default:
            return { ...state };
    }
};
const initialFormData = {
    name: "",
    design: "",
    nameIsValid: false,
    designIsValid: false,
    formIsValid: false
};

const AddTheme = () => {
    const [formState, dispatchState] = useReducer(formReducer, initialFormData);
    const history = useHistory();


    const nameChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "NAME_INPUT", value, isValid });
    }
    const contentsChangeHandler = (value, isValid = true) => {
        dispatchState({ type: "DESIGN_INPUT", value, isValid });
    }
    const formSubmitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", formState.name);
        formData.append("design", formState.design);

        post("/admin/theme", formData).then(response => {
            toast.success(response.data.message);
            dispatchState({ type: "CLEAR_FORM" });
            history.push({
                pathname: "/theme"
            });
        }).catch(errors => {
            toast.error(errors.data.message);
        })
    }
    return (
        <Card>
            <Link className={`${classes.btn} ${classes.btn_primary}`} to="/theme"><MdOutlineArrowBack />&nbsp;Back</Link>
            <form onSubmit={formSubmitHandler}>
                <h2>Theme</h2>
                <Input
                    label="Name"
                    type="text"
                    id="name"
                    defaultValue={formState.name}
                    inputValues={nameChangeHandler}
                    validation={(value) => value.length > 5}
                />

                <Textarea
                    label="Design"
                    id="design"
                    defaultValue={formState.design}
                    inputValues={contentsChangeHandler}
                    validation={(value) => value.length > 5}
                    height="100px"
                />

                <button className={`${classes.btn} ${classes.btn_primary}`}>Save</button>
            </form>
        </Card>
    )
}

export default AddTheme;