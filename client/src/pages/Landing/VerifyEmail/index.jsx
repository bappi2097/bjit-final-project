import { useParams } from "react-router";
import Container from "../../../components/UI/Container";
import classes from "./style.module.scss";
import Loader from "react-loader-spinner";
import { get } from "../../../services/api";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { useEffect } from "react";

const VerifyEmail = (props) => {
    const { remember_token } = useParams();
    const history = useHistory();
    useEffect(() => {
        get('email/verify', { remember_token: remember_token }).then(response => {
            if (response.data.status) {
                toast.success(response.data.message);
                history.push({
                    pathname: "/signin",
                });
            }
        }).catch(errors => {
            toast.error("Something went wrong!");
        });
    }, [])

    return (
        <Container className={`${classes.center} ${classes.verify__div}`}>
            <Loader
                type="Oval"
                color="#6e6e6e"
                height={100}
                width={100}
            />
            <h3>Please give a moment.</h3>
            <h2>Email Verifying...</h2>
        </Container>
    )
}

export default VerifyEmail;