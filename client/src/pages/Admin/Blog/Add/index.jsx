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
                formIsValid: action.isValid && state.nameIsValid && state.contentsIsValid,
            };
        case "NAME_INPUT":
            return {
                ...state,
                imageFresh: false,
                name: action.value,
                nameIsValid: action.isValid,
                formIsValid: state.imageIsValid && action.isValid && state.contentsIsValid,
            };
        case "CONTENTS_INPUT":
            return {
                ...state,
                imageFresh: false,
                contents: action.value,
                contentsIsValid: action.isValid,
                formIsValid: state.imageIsValid && action.isValid && state.nameIsValid,
            };
        case "CLEAR_FORM": {
            return {
                image: "",
                name: "",
                contents: "",
                imageFresh: true,
                imageIsValid: false,
                nameIsValid: false,
                contentsIsValid: false,
                formIsValid: false
            }
        }
        default:
            return { ...state };
    }
};
const initialFormData = {
    imageFresh: false,
    image: "",
    name: "",
    contents: "",
    imageIsValid: false,
    nameIsValid: false,
    contentsIsValid: false,
    formIsValid: false
};

const AddWebsiteType = () => {
    const [formState, dispatchState] = useReducer(formReducer, initialFormData);
    const history = useHistory();

    const nameChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "NAME_INPUT", value, isValid });
    }
    const imageChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "IMAGE_INPUT", value, isValid });
    }
    const contentsChangeHandler = (value, isValid = true) => {
        dispatchState({ type: "CONTENTS_INPUT", value, isValid });
    }
    const formSubmitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("image", formState.image);
        formData.append("name", formState.name);
        formData.append("contents", formState.contents);

        post("/admin/website-type", formData).then(response => {
            toast.success(response.data.message);
            history.push({
                pathname: "/website-type"
            });
        }).catch(errors => {
            toast.error(errors.data.message);
        })
    }
    return (
        <Card>
            <Link className={`${classes.btn} ${classes.btn_primary}`} to="/website-type"><MdOutlineArrowBack />&nbsp;Back</Link>
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
                    label="Name"
                    type="text"
                    id="name"
                    defaultValue={formState.name}
                    inputValues={nameChangeHandler}
                    validation={(value) => value.length > 1}
                />

                <Textarea
                    label="Content"
                    id="contents"
                    defaultValue={formState.contents}
                    inputValues={contentsChangeHandler}
                    validation={(value) => true}
                    height="100px"
                />

                <button className={`${classes.btn} ${classes.btn_primary}`}>Save</button>
            </form>
        </Card>
    )
}

export default AddWebsiteType;