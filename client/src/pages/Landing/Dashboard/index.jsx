import Container from "../../../components/UI/Container";
import Card from "../../../components/UI/Card";
import Input from "../../../components/Landing/Input";
import classes from "./style.module.scss";
import cv from "../assets/img/cv.jpg";
import { useEffect, useReducer, useState } from "react";
import { get, post } from "../../../services/api";
import { toast } from "react-toastify";
import ImageInput from "../../../components/Landing/ImageInput";
import { useHistory } from "react-router";

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
        case "IMAGE_URL":
            return {
                ...state,
                imageUrl: action.value,
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
    imageUrl: "",
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
const Dashboard = () => {
    const [formState, dispatchState] = useReducer(formReducer, initialFormData);
    const history = useHistory();
    const [theme, setTheme] = useState([]);
    const [websiteType, setWebsiteType] = useState([]);
    const [navbarsData, setNavbarsData] = useState([]);
    const nameChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "NAME_INPUT", value, isValid });
    }
    const slugChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "SLUG_INPUT", value, isValid });
    }
    const navbarChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "NAVBAR_INPUT", value: value.target.value, isValid });
    }
    const websiteTypeChangeHandler = (value, isValid = true) => {
        console.log(value);
        dispatchState({ type: "WEBSITE_TYPE_INPUT", value: value, isValid });
    }
    const themeChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "THEME_INPUT", value: value, isValid });
    }
    const imageChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "IMAGE_INPUT", value, isValid });
    }
    useEffect(() => {
        get("/user/website/has").then(response => {
            const imageTemp = response.data.data.website.image ? process.env.REACT_APP_IMAGE_URL + response.data.data.website.image : "";
            dispatchState({ type: "NAME_INPUT", value: response.data.data.website.name });
            dispatchState({ type: "SLUG_INPUT", value: response.data.data.website.slug });
            dispatchState({ type: "IMAGE_URL", value: imageTemp });
        }).catch(errors => {
            console.log(errors);
        })
    }, [])
    const submitHandler = () => {
        const formData = new FormData();
        formData.append("name", formState.name);
        formData.append("slug", formState.slug);
        formData.append("logo", formState.image);
        formData.append("theme_id", "1");
        formData.append("navbar_id", "1");
        formData.append("website_type_id", "1");
        formData.append("design", "nothing");
        formData.append("contents", "nothing");

        post("/user/website", formData).then(response => {
            toast.success(response.data.message);
            history.push({
                pathname: "/builder"
            });
        }).catch(errors => {
            toast.error(errors.data.message);
        });
    }


    useEffect(() => {
        get("user/theme").then(response => {
            setTheme(response.data.data);
        }).catch(errors => {
            toast.error(errors);
        })
        get("user/website-type").then(response => {
            setWebsiteType(response.data.data);
        }).catch(errors => {
            toast.error(errors.data.message);
        })
        get("user/navbar").then(response => {
            setNavbarsData(response.data.data);
        }).catch(error => {
            toast.error(error.data.message);
        });
    }, [])


    return (
        <Container>
            <div className={classes.website_type_container}>
                {/* <div className={classes.website_type_header}>
                    <h2>Choose your website type</h2>
                </div>
                <div className={classes.website_type_body}>
                    {websiteType && websiteType.map((value, index) => {
                        const image = value.image ? process.env.REACT_APP_IMAGE_URL + value.image : cv;
                        return (
                            <Card key={"user-website-type" + index} className={classes.website_type} onClick={() => { websiteTypeChangeHandler(value.id) }}>
                                <img src={image} alt="CV" />
                                <p>{value.name}</p>
                            </Card>
                        )
                    })}

                </div>
                <div className={classes.website_type_header}>
                    <h2>Choose Website Theme</h2>
                </div>
                <div className={classes.website_theme_body}>
                    {theme && theme.map((value, index) => {
                        return (
                            <Card key={"user-theme" + index} className={classes.website_theme} onClick={() => { themeChangeHandler(value.id) }}>
                                <p>{value.name}</p>
                            </Card>
                        )
                    })}

                </div> */}
                <Card>
                    <ImageInput
                        width="100px"
                        height="100px"
                        onImageChange={(value) => value}
                        onImageFile={imageChangeHandler}
                        label="Input Logo"
                        fresh={formState.imageFresh}
                        image={formState.imageUrl}
                    />
                    {/* <label>Navbar</label>
                    <select onChange={navbarChangeHandler}>
                        <option>Choose</option>
                        {navbarsData && navbarsData.map(column => {
                            return (
                                <option key={"navbarsData" + column.id} value={column.id}>{column.name}</option>
                            )
                        })}
                    </select> */}
                    <Input defaultValue={formState.name} className={classes.website__domain} validation={(value) => (value.length > 6)} id="website_title" inputValues={nameChangeHandler} label="Website Name" type="text" />
                    <Input defaultValue={formState.slug} className={classes.website__domain} validation={(value) => { const regex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/g; return regex.test(value); }} id="website_title" inputValues={slugChangeHandler} label="Website Path" type="text" />
                    <button className={`${classes.btn} ${classes.btn_primary} ${classes.btn_next}`} onClick={submitHandler}>Save</button>
                </Card>
            </div>
        </Container>
    )
}

export default Dashboard;