import classes from "./style.module.scss";

const Container = (props) => {
    const Type = props.type ? props.type : 'div';
    const styles = `${classes.container} ${props.className}`;
    const style = props.style ? props.style : {};
    return (
        <Type className={styles} style={{ ...style }}>
            {props.children}
        </Type>
    );
}
export default Container;