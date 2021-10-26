import Container from "../../../components/UI/Container";
import Card from "../../../components/UI/Card";
import Input from "../../../components/Landing/Input";
import classes from "./style.module.scss";
import cv from "../assets/img/cv.jpg";
import Loop from "../../../components/UI/Loop";
const Dashboard = () => {
    const websiteDomainHandler = () => {
        // 
    }
    return (
        <Container>
            <div className={classes.website_type_container}>
                <div className={classes.website_type_header}>
                    <h2>Choose your website type</h2>
                </div>
                <div className={classes.website_type_body}>
                    <Loop count={4}>
                        <Card className={classes.website_type}>
                            <img src={cv} alt="CV" />
                            <p>CV</p>
                        </Card>
                    </Loop>
                </div>
                <Input className={classes.website__domain} validation={(value) => value.length > 5} id="website_title" inputValues={websiteDomainHandler} label="Website domain" type="text" />
                <div className={classes.website_theme_body}>
                    <Loop count={4}>
                        <Card className={classes.website_theme}>
                            <p>Dark</p>
                        </Card>
                    </Loop>
                </div>
                <button className={`${classes.btn} ${classes.btn_primary} ${classes.btn_next}`}>Next</button>
            </div>
        </Container>
    )
}

export default Dashboard;