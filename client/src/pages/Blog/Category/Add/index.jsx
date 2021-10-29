import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router";
import classes from "./style.module.scss";
import { MdOutlineArrowBack } from "react-icons/md";
import Card from "../../../../components/UI/Card";
import Input from "../../../../components/Landing/Input";
import { useReducer } from "react";
import { post } from "../../../../services/api";
import { toast } from "react-toastify";
import Container from "../../../../components/UI/Container";

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

const AddCategory = () => {
    const [formState, dispatchState] = useReducer(formReducer, initialFormData);
    const history = useHistory();
    const { websiteSlug } = useParams();

    const nameChangeHandler = (value, isValid = false) => {
        dispatchState({ type: "NAME_INPUT", value, isValid });
    }
    const formSubmitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", formState.name);

        post("/user/blog-category", formData).then(response => {
            toast.success(response.data.message);
            history.push({
                pathname: "/blog/category"
            });
        }).catch(errors => {
            toast.error(errors.data.message);
        })
    }
    return (
        <Container>
            <div className={`${classes.row} ${classes.justify_content_center}`}>
                <Link to={`/blog/category`} className={`${classes.btn} ${classes.btn_link}`}>Category</Link>
                <Link to={`/blog/post/create`} className={`${classes.btn} ${classes.btn_link}`}>Create Post</Link>
            </div>
            <Card>
                <Link className={`${classes.btn} ${classes.btn_primary}`} to={`/blog/${websiteSlug}/category`}><MdOutlineArrowBack />&nbsp;Back</Link>
                <form onSubmit={formSubmitHandler}>
                    <h2>Blog Category</h2>

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
        </Container>
    )
}

export default AddCategory;