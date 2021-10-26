import React, { Fragment, useEffect, useRef } from "react";
import classes from "./style.module.scss";

import placeholder from "../../../pages/Landing/assets/img/placeholder.svg";
const ImageInput = (props) => {
    const image = useRef();
    const input_img = useRef();
    const imageInputHandler = (e) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            image.current.src = e.target.result;
            props.onImageChange(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
        props.onImageFile(e.target.files[0]);
        image.current.src = placeholder;
    };

    const width = props.width ? props.width : "80px";
    const height = props.height ? props.height : "80px";
    const customClass = props.className ? props.className : "";
    const customStyle = props.style ? props.style : {};
    var customImage = props.image ? props.image : placeholder;

    // if (props.fresh) {
    //     image.current.src = props.image ? props.image : placeholder;
    // }
    return (
        <Fragment>
            {props.label && <label>{props.label}</label>}
            <div className={`${classes.img_div} ${customClass}`} style={customStyle}>
                <button type="button" className={classes.img_btn} style={{ width: width, height: height }}>
                    <img
                        ref={image}
                        className={classes.show_img}
                        src={customImage}
                        alt="Dummy"
                    />
                </button>
                <input
                    onInput={imageInputHandler}
                    ref={input_img}
                    className={classes.img_input}
                    style={{ width: width, height: height }}
                    type="file"
                    accept="image/*"
                />
            </div>
        </Fragment>

    );
};

export default ImageInput;
