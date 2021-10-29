import classes from "./style.module.scss";

const Card = (props) => {
    const Type = props.type ? props.type : 'div';
    const styles = `${classes.card} ${props.className}`;

    const clickHandler = (...data) => {
        if (props.onClick) {
            props.onClick(...data);
        }
    }

    const style = props.style ? props.style : {};

    return (
        <Type className={styles} onClick={clickHandler} style={{ ...style }}>
            {props.children}
        </Type>
    );
}
export default Card;