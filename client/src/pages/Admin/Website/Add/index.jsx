import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import classes from "./style.module.scss";
import { MdOutlineArrowBack } from "react-icons/md";
import Card from "../../../../components/UI/Card";
import Input from "../../../../components/Landing/Input";
import { useEffect, useReducer, useState } from "react";
import Textarea from "../../../../components/Landing/Textarea";
import { get, post } from "../../../../services/api";
import { toast } from "react-toastify";
import ImageInput from "../../../../components/Landing/ImageInput";

const formReducer = (state, action) => {
    switch (action.type) {
        case "NAVBAR_INPUT":
            return {
                ...state,
                navbarId: action.value,
                formIsValid: true
            };
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
        case "SLUG_INPUT":
            return {
                ...state,
                slug: action.value,
                slugIsValid: action.isValid,
                formIsValid: true
            };
        case "CONTENTS_INPUT":
            return {
                ...state,
                contents: action.value,
                contentsIsValid: action.isValid,
                formIsValid: true
            };
        case "THEME_INPUT":
            return {
                ...state,
                theme: action.value,
                themeIsValid: action.isValid,
                formIsValid: true
            };
        case "DESIGN_INPUT":
            return {
                ...state,
                design: action.value,
                designIsValid: action.isValid,
                formIsValid: true
            };
        case "WEBSITE_TYPE_INPUT":
            return {
                ...state,
                websiteTypeId: action.value,
            };
        case "USER_INPUT":
            return {
                ...state,
                userId: action.value,
            };
        case "CLEAR_FORM": {
            return {
                name: "",
                nameIsValid: false,
                design: "",
                designIsValid: false,
                theme: "",
                themeIsValid: false,
                navbarId: "",
                navbarIdIsValid: false,
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
    websiteTypeId: "",
    name: "",
    nameIsValid: false,
    slug: "",
    slugIsValid: false,
    design: "",
    designIsValid: false,
    theme: "",
    themeIsValid: false,
    navbarId: "",
    navbarIdIsValid: false,
    userId: "",
    userIdIsValid: false,
    contents: "",
    contentsIsValid: false,
    image: "",
    isAdmin: "",
    imageIsValid: false,
    formIsValid: false
};

const AddWebsite = () => {
    const [formState, dispatchState] = useReducer(formReducer, initialFormData);
    const history = useHistory();
    const [websiteTypesData, setWebsiteTypesData] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [navbarsData, setNavbarsData] = useState([]);
    const [themesData, setThemesData] = useState([]);

    useEffect(() => {
        get("/admin/website-type").then(response => {
            setWebsiteTypesData(response.data.data);
        }).catch(error => {
            console.log(error);
            toast.error(error.data.message);
        });
    }, []);

    useEffect(() => {
        get("/admin/user").then(response => {
            setUsersData(response.data.data);
        }).catch(error => {
            toast.error(error.data.message);
        });
    }, []);

    useEffect(() => {
        get("/admin/theme").then(response => {
            setThemesData(response.data.data);
        }).catch(error => {
            toast.error(error.data.message);
        });
    }, []);

    useEffect(() => {
        get("/admin/section").then(response => {
            setNavbarsData(response.data.data);
        }).catch(error => {
            toast.error(error.data.message);
        });
    }, []);


    const nameChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "NAME_INPUT", value, isValid });
    }
    const slugChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "SLUG_INPUT", value, isValid });
    }
    const navbarChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "NAVBAR_INPUT", value: value.target.value, isValid });
    }
    const designChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "DESIGN_INPUT", value, isValid });
    }
    const contentsChangeHandler = (value, isValid = true) => {
        dispatchState({ type: "CONTENTS_INPUT", value, isValid });
    }
    const websiteTypeChangeHandler = (value, isValid = true) => {
        console.log(value.target.value);
        dispatchState({ type: "WEBSITE_TYPE_INPUT", value: value.target.value });
    }
    const userChangeHandler = (value, isValid = true) => {
        dispatchState({ type: "USER_INPUT", value: value.target.value });
    }
    const themeChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "THEME_INPUT", value: value.target.value, isValid });
    }
    const imageChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "IMAGE_INPUT", value, isValid });
    }
    const formSubmitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", formState.name);
        formData.append("slug", formState.slug);
        formData.append("logo", formState.image);
        formData.append("user_id", formState.userId);
        formData.append("theme_id", formState.theme);
        formData.append("navbar_id", formState.navbarId);
        formData.append("website_type_id", formState.websiteTypeId);
        formData.append("design", formState.design);
        formData.append("contents", formState.contents);

        post("/admin/website", formData).then(response => {
            toast.success(response.data.message);
            history.push({
                pathname: "/website"
            });
        }).catch(errors => {
            toast.error(errors.data.message);
        });
    }
    return (
        <Card>
            <Link className={`${classes.btn} ${classes.btn_primary}`} to="/website"><MdOutlineArrowBack />&nbsp;Back</Link>
            <form onSubmit={formSubmitHandler}>
                <ImageInput
                    width="100px"
                    height="100px"
                    onImageChange={(value) => value}
                    onImageFile={imageChangeHandler}
                    label="Input Logo"
                    fresh={formState.imageFresh}
                />
                <h2>Section</h2>
                <Input
                    label="Name"
                    type="text"
                    id="name"
                    defaultValue={formState.name}
                    inputValues={nameChangeHandler}
                    validation={(value) => value.length > 5}
                />
                <Input
                    label="Unique Path"
                    type="text"
                    id="slug"
                    defaultValue={formState.slug}
                    inputValues={slugChangeHandler}
                    validation={(value) => value.length > 5}
                />
                <label>Website Type</label>
                <select onChange={websiteTypeChangeHandler}>
                    <option>Choose</option>
                    {websiteTypesData && websiteTypesData.map(column => {
                        return (
                            <option key={"websitesData" + column.id} value={column.id}>{column.name}</option>
                        )
                    })}
                </select>

                <label>User</label>
                <select onChange={userChangeHandler}>
                    <option>Choose</option>
                    {usersData && usersData.map(column => {
                        return (
                            <option key={"usersData" + column.id} value={column.id}>{column.full_name}</option>
                        )
                    })}
                </select>


                <label>Theme</label>
                <select onChange={themeChangeHandler}>
                    <option>Choose</option>
                    {themesData && themesData.map(column => {
                        return (
                            <option key={"themesData" + column.id} value={column.id}>{column.name}</option>
                        )
                    })}
                </select>

                <label>Navbar</label>
                <select onChange={navbarChangeHandler}>
                    <option>Choose</option>
                    {navbarsData && navbarsData.map(column => {
                        return (
                            <option key={"navbarsData" + column.id} value={column.id}>{column.name}</option>
                        )
                    })}
                </select>


                <Textarea
                    label="Content"
                    id="contents"
                    defaultValue={formState.contents}
                    inputValues={contentsChangeHandler}
                    validation={(value) => value.length > 5}
                    height="100px"
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

export default AddWebsite;