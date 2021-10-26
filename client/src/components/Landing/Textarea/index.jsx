import { Fragment, useEffect, useState } from "react";
import classes from "./style.module.scss";
import useInput from "./use-input";
const Textarea = (props) => {
    const {
        value: enteredInput,
        isValid,
        hasError: inputHasError,
        valueChangeHandler: inputChangeHandler,
        inputBlurHandler,
    } = useInput(props.validation);
    const [inputValue, setInputValue] = useState(enteredInput);

    useEffect(() => {
        setInputValue(enteredInput);
        props.inputValues(enteredInput, isValid);
    }, [enteredInput, isValid]);

    useEffect(() => {
        setInputValue(props.defaultValue);
    }, [props.defaultValue])

    const inputClasses = !inputHasError
        ? `${classes.form__control}`
        : `${classes.form__control} ${classes.invalid}`;
    let style = {};
    if (props.width) {
        style = { width: props.width };
    }
    if (props.height) {
        style = { ...style, height: props.height };
    }
    if (props.style) {
        style = { ...style, ...props.style };
    }

    return (
        <Fragment>
            <div className={`${inputClasses} ${props.className}`}>
                <label htmlFor={props.id}>{props.label}</label>
                <textarea
                    id={props.id}
                    onBlur={inputBlurHandler}
                    onChange={inputChangeHandler}
                    style={style}
                    defaultValue={inputValue}
                ></textarea>
            </div>
            {props.error && (
                <p className={classes.error_text}>
                    {props.error}
                </p>
            )}
            {inputHasError && (
                <p className={classes.error_text}>
                    {props.label ? props.label : "Textarea"} must be valid
                </p>
            )}
        </Fragment>
    );
};
export default Textarea;