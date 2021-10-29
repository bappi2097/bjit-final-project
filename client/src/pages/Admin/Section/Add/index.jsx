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

const formReducer = (state, action) => {
    switch (action.type) {
        case "COMPONENT_NAME_INPUT":
            return {
                ...state,
                componentName: action.value,
                componentNameIsValid: action.isValid,
                formIsValid: true
            };
        case "NAME_INPUT":
            return {
                ...state,
                name: action.value,
                nameIsValid: action.isValid,
                formIsValid: true
            };
        case "CONTENTS_INPUT":
            return {
                ...state,
                contents: action.value,
                contentsIsValid: action.isValid,
                formIsValid: true
            };
        case "SETTING_INPUT":
            return {
                ...state,
                setting: action.value,
                settingIsValid: action.isValid,
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
        case "CLEAR_FORM": {
            return {
                name: "",
                nameIsValid: false,
                design: "",
                designIsValid: false,
                setting: "",
                settingIsValid: false,
                componentName: "",
                componentNameIsValid: false,
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
    design: " ",
    designIsValid: false,
    setting: " ",
    settingIsValid: false,
    componentName: "",
    componentNameIsValid: false,
    contents: " ",
    contentsIsValid: false,
    formIsValid: false
};

const AddSection = () => {
    const [formState, dispatchState] = useReducer(formReducer, initialFormData);
    const history = useHistory();
    const [websiteTypesData, setWebsiteTypesData] = useState([]);

    useEffect(() => {
        get("/admin/website-type").then(response => {
            setWebsiteTypesData(response.data.data);
        }).catch(error => {
            toast.error(error.data.message);
        });
    }, [])

    const nameChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "NAME_INPUT", value, isValid });
    }
    const componentNameChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "COMPONENT_NAME_INPUT", value, isValid });
    }
    const settingChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "SETTING_INPUT", value, isValid });
    }
    const designChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "DESIGN_INPUT", value, isValid });
    }
    const contentsChangeHandler = (value, isValid = true) => {
        dispatchState({ type: "CONTENTS_INPUT", value, isValid });
    }
    const websiteTypeChangeHandler = (value, isValid = true) => {
        dispatchState({ type: "WEBSITE_TYPE_INPUT", value: value.target.value });
    }
    const formSubmitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", formState.name);
        formData.append("component_name", formState.componentName);
        formData.append("design", formState.design);
        formData.append("website_type_id", formState.websiteTypeId);
        formData.append("setting", formState.setting);
        formData.append("contents", formState.contents);

        post("/admin/section", formData).then(response => {
            toast.success(response.data.message);
            history.push({
                pathname: "/section"
            });
        }).catch(errors => {
            console.log(errors);
            toast.error(errors.data.message);
        })
    }
    return (
        <Card>
            <Link className={`${classes.btn} ${classes.btn_primary}`} to="/section"><MdOutlineArrowBack />&nbsp;Back</Link>
            <form onSubmit={formSubmitHandler}>
                <h2>Section</h2>
                <Input
                    label="Name"
                    type="text"
                    id="name"
                    defaultValue={formState.name}
                    inputValues={nameChangeHandler}
                    validation={(value) => value.length > 5}
                />
                <label>Website Type</label>
                <select onChange={websiteTypeChangeHandler}>
                    {websiteTypesData && websiteTypesData.map(column => {
                        return (
                            <option key={"websiteTypesData" + column.id} value={column.id}>{column.name}</option>
                        )
                    })}
                </select>

                <Input
                    label="Component Name"
                    type="text"
                    id="component_name"
                    defaultValue={formState.componentName}
                    inputValues={componentNameChangeHandler}
                    validation={(value) => value.length > 5}
                />

                <Textarea
                    label="Setting"
                    id="setting"
                    defaultValue={formState.setting}
                    inputValues={settingChangeHandler}
                    validation={(value) => true}
                    height="100px"
                />

                <Textarea
                    label="Content"
                    id="contents"
                    defaultValue={formState.contents}
                    inputValues={contentsChangeHandler}
                    validation={(value) => true}
                    height="100px"
                />

                <Textarea
                    label="Design"
                    id="design"
                    defaultValue={formState.design}
                    inputValues={designChangeHandler}
                    validation={(value) => true}
                    height="100px"
                />

                <button className={`${classes.btn} ${classes.btn_primary}`}>Save</button>
            </form>
        </Card>
    )
}

export default AddSection;