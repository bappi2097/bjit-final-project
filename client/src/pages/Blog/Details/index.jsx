import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Card from "../../../components/UI/Card";
import Container from "../../../components/UI/Container"
import { get, post } from "../../../services/api";
import ReactHtmlParser from 'react-html-parser';
import classes from "./style.module.scss";
import Textarea from "../../../components/Landing/Textarea";
import { toast } from "react-toastify";

const Details = () => {
    const [blogPost, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [reload, setReload] = useState(0);
    const { slug } = useParams();
    useEffect(() => {
        get("/user/blog-post/single/" + slug).then(response => {
            setPost(response.data.data);

        }).catch(errors => {
            console.log(errors);
        })
    }, [])
    useEffect(() => {
        get("/user/blog-comment/comments/" + blogPost.id).then(response => {
            setComments(response.data.data);
        }).catch(errors => {
            console.log(errors);
        })
    }, [reload, blogPost])
    const formSubmitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("comment", comment);
        formData.append("blog_post_id", blogPost.id);
        post("/user/blog-comment", formData).then(response => {
            setComment("");
            setReload(Math.random());
            toast.success(response.data.message);
        }).catch(errors => {
            toast.error(errors.data.message);
        })
    }
    const commentChangeHandler = (value, isValid = false) => {
        setComment(value);
    }
    return (
        <Container>
            <Card className={classes.post_div}>
                <h3 className={classes.title}>Title: {blogPost.title}</h3>
                <div className={classes.summery}>
                    <h3>Summery</h3>
                    <p>
                        {blogPost.summery}
                    </p>
                </div>
                {
                    blogPost.image && <img src={process.env.REACT_APP_IMAGE_URL + blogPost.image} alt="" />
                }
                {ReactHtmlParser(blogPost.contents)}
            </Card>
            <Card>
                <form onSubmit={formSubmitHandler}>
                    <Textarea
                        label="Comment"
                        id="comment"
                        defaultValue={comment}
                        inputValues={commentChangeHandler}
                        validation={(value) => true}
                        height="100px"
                    />

                    <button className={`${classes.btn} ${classes.btn_primary}`}>Comment</button>
                </form>
            </Card>
            <Card>
                {comments && comments.map((value, index) => {
                    const date = new Date(value.created_at);
                    const time = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
                    return (
                        <Card key={"comment" + index} style={{ marginBottom: "20px" }}>
                            <div style={{ marginBottom: "10px", marginLeft: "-20px", fontWeight: "bold" }}>
                                {value.user.full_name}<br />
                                <p style={{ fontWeight: "200", fontSize: "12px" }}>
                                    {time}
                                </p>
                            </div>
                            <div>
                                {value.comment}
                            </div>
                        </Card>
                    )
                })}
            </Card>
        </Container>
    )
}
export default Details;