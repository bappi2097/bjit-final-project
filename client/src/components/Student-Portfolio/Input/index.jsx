import { Fragment, useEffect } from "react";
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

    const inputClasses = !inputHasError
        ? `${classes.form__control}`
        : `${classes.form__control} ${classes.invalid}`;
    return (
        <Fragment>

            <div className={inputClasses}>
                <label htmlFor={props.id}>{props.label}</label>
                <input
                    type={props.type}
                    id={props.id}
                    value={enteredInput}
                    onBlur={inputBlurHandler}
                    onChange={inputChangeHandler}
                />
            </div>
            {inputHasError && (
                <p className={classes.error_text}>
                    {props.label ? props.label : "Input"} must be valid
                </p>
            )}
        </Fragment>
    );
};
export default Input;