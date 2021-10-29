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
        case "IMAGE_INPUT":
            return {
                ...state,
                imageFresh: false,
                image: action.value,
                imageIsValid: action.isValid,
                formIsValid: action.isValid && state.nameIsValid && state.contentsIsValid,
            };
        case "IMAGE_URL_INPUT":
            return {
                ...state,
                imageUrl: action.value,
            };
        case "NAME_INPUT":
            return {
                ...state,
                imageFresh: false,
                name: action.value,
                nameIsValid: action.isValid,
                formIsValid: state.imageIsValid && action.isValid && state.contentsIsValid,
            };
        case "SLUG_INPUT":
            return {
                ...state,
                slug: action.value,
                slugIsValid: action.isValid,
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
    imageUrl: "",
    imageFresh: false,
    image: "",
    name: "",
    slug: "",
    contents: "",
    imageIsValid: false,
    nameIsValid: false,
    slugIsValid: false,
    contentsIsValid: false,
    formIsValid: false
};

const EditWebsiteType = () => {
    const { id } = useParams();
    const [formState, dispatchState] = useReducer(formReducer, initialFormData);

    const nameChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "NAME_INPUT", value, isValid });
    }
    const slugChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "SLUG_INPUT", value, isValid });
    }
    const imageChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "IMAGE_INPUT", value, isValid });
    }
    const contentsChangeHandler = (value, isValid = true) => {
        dispatchState({ type: "CONTENTS_INPUT", value, isValid });
    }

    useEffect(() => {
        get("/admin/website-type/" + id).then(response => {
            dispatchState({ type: "NAME_INPUT", value: response.data.data.name, isValid: true });
            dispatchState({ type: "SLUG_INPUT", value: response.data.data.slug, isValid: true });
            dispatchState({ type: "IMAGE_URL_INPUT", value: response.data.data.image, isValid: true });
            dispatchState({ type: "CONTENTS_INPUT", value: response.data.data.contents, isValid: true });
        })
    }, [])
    const formSubmitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("_method", "PUT");
        if (formState.image) {
            formData.append("image", formState.image);
        }
        formData.append("name", formState.name);
        formData.append("slug", formState.slug);
        formData.append("contents", formState.contents);

        post("/admin/website-type/" + id, formData).then(response => {
            toast.success(response.data.message);
        }).catch(errors => {
            console.log(errors);
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
                    image={formState.imageUrl}
                />
                <Input
                    label="Name"
                    type="text"
                    id="name"
                    defaultValue={formState.name}
                    inputValues={nameChangeHandler}
                    validation={(value) => value.length > 1}
                />
                <Input
                    label="Slug"
                    type="text"
                    id="slug"
                    defaultValue={formState.slug}
                    inputValues={slugChangeHandler}
                    validation={(value) => { const regex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/g; return regex.test(value); }}
                />

                <Textarea
                    label="Content"
                    id="contents"
                    defaultValue={formState.contents}
                    inputValues={contentsChangeHandler}
                    validation={(value) => value.length > 5}
                    height="100px"
                />

                <button className={`${classes.btn} ${classes.btn_primary}`}>Save</button>
            </form>
        </Card>
    )
}

export default EditWebsiteType;