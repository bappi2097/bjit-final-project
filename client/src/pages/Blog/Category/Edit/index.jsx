import { Link, useParams } from "react-router-dom";
import classes from "./style.module.scss";
import { MdOutlineArrowBack } from "react-icons/md";
import Card from "../../../../components/UI/Card";
import Input from "../../../../components/Landing/Input";
import { useEffect, useReducer } from "react";
import { get, post } from "../../../../services/api";
import { toast } from "react-toastify";

const formReducer = (state, action) => {
    switch (action.type) {
        case "NAME_INPUT":
            return {
                ...state,
                name: action.value,
                nameIsValid: action.isValid,
                formIsValid: action.isValid,
            };
        case "CLEAR_FORM": {
            return {
                name: "",
                nameIsValid: false,
                formIsValid: false
            }
        }
        default:
            return { ...state };
    }
};
const initialFormData = {
    name: "",
    nameIsValid: false,
    formIsValid: false
};

const EditCategory = () => {
    const { id } = useParams();
    const [formState, dispatchState] = useReducer(formReducer, initialFormData);

    const nameChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "NAME_INPUT", value, isValid });
    }

    useEffect(() => {
        get("/user/blog-category/" + id).then(response => {
            dispatchState({ type: "NAME_INPUT", value: response.data.data.name, isValid: true });
        })
    }, [])
    const formSubmitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("name", formState.name);

        post("/user/blog-category/" + id, formData).then(response => {
            toast.success(response.data.message);
        }).catch(errors => {
            console.log(errors);
            toast.error(errors.data.message);
        })
    }
    return (
        <Card>
            <Link className={`${classes.btn} ${classes.btn_primary}`} to={`/blog/category`}><MdOutlineArrowBack />&nbsp;Back</Link>
            <form onSubmit={formSubmitHandler}>
                <h2>Website Type</h2>
                <Input
                    label="Name"
                    type="text"
                    id="name"
                    defaultValue={formState.name}
                    inputValues={nameChangeHandler}
                    validation={(value) => value.length > 1}
                />

                <button className={`${classes.btn} ${classes.btn_primary}`}>Save</button>
            </form>
        </Card>
    )
}

export default EditCategory;