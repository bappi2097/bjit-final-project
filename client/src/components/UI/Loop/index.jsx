import { Fragment } from "react"

const Loop = (props) => {
    const count = props.count ? props.count : 1;
    let childrens = [];
    for (let i = 0; i < count; i++) {
        childrens.push(props.children);
    }
    return (
        <Fragment>
            {childrens}
        </Fragment>
    )
}

export default Loop;