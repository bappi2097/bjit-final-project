import classes from "./style.module.scss";

const Container = (props) => {
    const Type = props.type ? props.type : 'div';
    const styles = `${classes.container} ${props.className}`;
    return (
        <Type className={styles}>
            {props.children}
        </Type>
    );
}
export default Container;