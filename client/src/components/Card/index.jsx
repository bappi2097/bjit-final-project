import classes from "./style.module.scss";

const Card = (props) => {
    const Type = props.type ? props.type : 'div';
    const styles = `${classes.card} ${props.className}`;
    return (
        <Type className={styles}>
            {props.children}
        </Type>
    );
}
export default Card;