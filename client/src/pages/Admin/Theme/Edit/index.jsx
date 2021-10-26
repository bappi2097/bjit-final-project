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
import swal from "sweetalert";

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

const EditTheme = () => {
    const { id } = useParams();
    const [formState, dispatchState] = useReducer(formReducer, initialFormData);

    const nameChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "NAME_INPUT", value, isValid });
    }
    const designChangeHandler = (value, isValid = true) => {
        dispatchState({ type: "DESIGN_INPUT", value, isValid });
    }

    useEffect(() => {
        get("/admin/theme/" + id).then(response => {
            dispatchState({ type: "NAME_INPUT", value: response.data.data.name, isValid: true });
            dispatchState({ type: "DESIGN_INPUT", value: response.data.data.design, isValid: true });
        })
    }, [])
    const formSubmitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("name", formState.name);
        formData.append("design", formState.design);

        swal({
            title: "Are you sure?",
            text: "Do you want to update this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    post("/admin/theme/" + id, formData).then(response => {
                        swal(response.data.message, {
                            icon: "success",
                        });
                    }).catch(errors => {
                        toast.error(errors.data.message);
                    })
                } else {
                    swal("Something went wrong!");
                }
            });
    }
    return (
        <Card>
            <Link className={`${classes.btn} ${classes.btn_primary}`} to="/theme"><MdOutlineArrowBack />&nbsp;Back</Link>
            <form onSubmit={formSubmitHandler}>
                <h2>Website Type</h2>
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
                    inputValues={designChangeHandler}
                    validation={(value) => value.length > 5}
                    height="100px"
                />

                <button className={`${classes.btn} ${classes.btn_primary}`}>Save</button>
            </form>
        </Card>
    )
}

export default EditTheme;