import { Fragment, useEffect, useState } from "react";
import classes from "./style.module.scss";
import useInput from "./use-input";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "./style.css";

// Demo
// <CKEditor
//     id="contents"
//     label="Contents"
//     inputValues={contentChangeHandler}
//     validation={(value) => (true)}
// />
const Input = (props) => {
    const {
        value: enteredInput,
        isValid,
        hasError: inputHasError,
        valueChangeHandler: inputChangeHandler,
        inputBlurHandler,
        reset
    } = useInput(props.validation);

    useEffect(() => {
        props.inputValues(enteredInput, isValid);
    }, [enteredInput, isValid]);

    useEffect(() => {
        reset(props.defaultValue);
    }, [props.defaultValue])

    const inputClasses = !inputHasError
        ? `${classes.form__control}`
        : `${classes.form__control} ${classes.invalid}`;

    return (
        <Fragment>
            <div className={`${inputClasses} ${props.className}`}>
                <label htmlFor={props.id}>{props.label}</label>
                <CKEditor
                    id={props.id}
                    editor={ClassicEditor}
                    data={enteredInput}
                    config={{
                        simpleUpload: {
                            uploadUrl: 'https://myserver.herokuapp.com/image-upload'
                        }
                    }}
                    onChange={(event, editor) => {
                        inputChangeHandler(editor.getData());
                    }}
                    onBlur={inputBlurHandler}
                />
            </div>
            {props.error && (
                <p className={classes.error_text}>
                    {props.error}
                </p>
            )}
            {inputHasError && (
                <p className={classes.error_text}>
                    {props.label ? props.label : "Input"} must be valid
                </p>
            )}
        </Fragment>
    );
};
export default Input;