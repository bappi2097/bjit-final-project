import { Fragment, useEffect, useState } from "react";
import classes from "./style.module.scss";
import useInput from "./use-input";
const Input = (props) => {
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
    return (
        <Fragment>
            <div className={`${inputClasses} ${props.className}`}>
                <label htmlFor={props.id}>{props.label}</label>
                <input
                    type={props.type}
                    id={props.id}
                    value={inputValue}
                    onBlur={inputBlurHandler}
                    onChange={inputChangeHandler}
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