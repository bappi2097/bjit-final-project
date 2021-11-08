import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router";
import classes from "./style.module.scss";
import { MdOutlineArrowBack } from "react-icons/md";
import Card from "../../../../components/UI/Card";
import Input from "../../../../components/Landing/Input";
import { useEffect, useReducer, useState } from "react";
import Textarea from "../../../../components/Landing/Textarea";
import { get, post } from "../../../../services/api";
import { toast } from "react-toastify";
import ImageInput from "../../../../components/Landing/ImageInput";
import CKEditor from "../../../../components/Landing/CKEditor";

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
        case "NAME_INPUT":
            return {
                ...state,
                name: action.value,
                nameIsValid: action.isValid,
                formIsValid: true
            };
        case "SUMMERY_INPUT":
            return {
                ...state,
                summery: action.value,
                summeryIsValid: action.isValid,
                formIsValid: true
            };
        case "CONTENTS_INPUT":
            return {
                ...state,
                contents: action.value,
                contentsIsValid: action.isValid,
                formIsValid: true
            };
        case "BLOG_CATEGORY_INPUT":
            return {
                ...state,
                blogCategoryId: action.value,
            };
        case "IMAGE_URL":
            return {
                ...state,
                imageUrl: action.value,
            };
        case "CLEAR_FORM": {
            return {
                name: "",
                nameIsValid: false,
                contents: "",
                contentsIsValid: false,
                formIsValid: false
            }
        }
        default:
            return { ...state };
    }
};
const initialFormData = {
    blogCategoryId: "",
    name: "",
    nameIsValid: false,
    summery: "",
    summeryIsValid: false,
    contents: "",
    contentsIsValid: false,
    image: "",
    imageIsValid: false,
    ImageUrl: "",
    formIsValid: false
};

const EditPost = () => {
    const [formState, dispatchState] = useReducer(formReducer, initialFormData);
    const history = useHistory();
    const { id } = useParams();
    const [blogCategoriesData, setBlogCategories] = useState([]);

    useEffect(() => {
        get("/admin/blog-category").then(response => {
            setBlogCategories(response.data.data);
        }).catch(error => {
            toast.error(error.data.message);
        });
    }, []);

    useEffect(() => {
        get("/admin/blog-post/" + id).then(response => {
            dispatchState({ type: "NAME_INPUT", value: response.data.data.title, isValid: true });
            dispatchState({ type: "IMAGE_URL", value: process.env.REACT_APP_IMAGE_URL + response.data.data.image, isValid: true });
            dispatchState({ type: "SUMMERY_INPUT", value: response.data.data.summery, isValid: true });
            dispatchState({ type: "BLOG_CATEGORY_INPUT", value: response.data.data.blog_category_id, isValid: true });
            dispatchState({ type: "CONTENTS_INPUT", value: response.data.data.contents, isValid: true });
        })
    }, [])




    const nameChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "NAME_INPUT", value, isValid });
    }
    const summeryChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "SUMMERY_INPUT", value, isValid });
    }
    const contentsChangeHandler = (value, isValid = true) => {
        dispatchState({ type: "CONTENTS_INPUT", value, isValid });
    }
    const websiteTypeChangeHandler = (value, isValid = true) => {
        dispatchState({ type: "BLOG_CATEGORY_INPUT", value: value.target.value });
    }
    const imageChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "IMAGE_INPUT", value, isValid });
    }
    const formSubmitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("title", formState.name);
        formData.append("image", formState.image);
        formData.append("blog_category_id", formState.blogCategoryId);
        formData.append("summery", formState.summery);
        formData.append("contents", formState.contents);
        post("/admin/blog-post/" + id, formData).then(response => {
            toast.success(response.data.message);
            // history.push({
            //     pathname: "/website"
            // });
        }).catch(errors => {
            toast.error(errors.data.message);
        });
    }
    return (
        <Card>
            <Link className={`${classes.btn} ${classes.btn_primary}`} to={`/blog`}><MdOutlineArrowBack />&nbsp;Back</Link>
            <form onSubmit={formSubmitHandler}>
                <ImageInput
                    width="100px"
                    height="100px"
                    onImageChange={(value) => value}
                    onImageFile={imageChangeHandler}
                    label="Input Logo"
                    fresh={formState.imageFresh}
                    image={formState.imageUrl}
                />
                <Input
                    label="Title"
                    type="text"
                    id="name"
                    defaultValue={formState.name}
                    inputValues={nameChangeHandler}
                    validation={(value) => value.length > 5}
                />
                <label>Website Type</label>
                <select onChange={websiteTypeChangeHandler} defaultValue={formState.blogCategoryId}>
                    <option>Choose</option>
                    {blogCategoriesData && blogCategoriesData.map(column => {
                        return (
                            <option key={"blog-categories" + column.id} value={column.id}>{column.name}</option>
                        )
                    })}
                </select>

                <CKEditor
                    label="Content"
                    id="contents"
                    defaultValue={formState.contents}
                    inputValues={contentsChangeHandler}
                    validation={(value) => true}
                    height="100px"
                />

                <Textarea
                    label="Summery"
                    id="summery"
                    defaultValue={formState.summery}
                    inputValues={summeryChangeHandler}
                    validation={(value) => true}
                    height="100px"
                />

                <button className={`${classes.btn} ${classes.btn_primary}`}>Save</button>
            </form>
        </Card>
    )
}

export default EditPost;