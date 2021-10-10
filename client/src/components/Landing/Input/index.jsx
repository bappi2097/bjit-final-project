import { useEffect } from "react";
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

    useEffect(() => {
        props.inputValues(enteredInput, isValid);
    }, [enteredInput, isValid]);

    const emailInputClasses = !inputHasError
        ? `${classes.form__control}`
        : `${classes.form__control} ${classes.invalid}`;
    return (
        <div className={emailInputClasses}>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                type={props.type}
                id={props.id}
                className={classes.email}
                value={enteredInput}
                onBlur={inputBlurHandler}
                onChange={inputChangeHandler}
            />
            {inputHasError && (
                <p className={classes.error_text}>
                    {props.label ? props.label : "Input"} must be valid
                </p>
            )}
        </div>
    );
};
export default Input;