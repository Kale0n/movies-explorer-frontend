import "./Heading.css"

function Heading (props) {
    return (
        <div className="heading">
            <h2 className="heading__heading">{props.heading}</h2>
            <hr className="heading__divider" />
        </div>
    )
}

export default Heading

