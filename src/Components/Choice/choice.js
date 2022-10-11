import "./choice.css";

export function Choice(props) {
    
    let style = !props.gameState ? "2px solid rgba(0,0,0,100)" : props.borderColor;

    return (
    <button onClick={props.clickHandler} style={{border: style}} disabled={props.gameState}>
        {props.color}
    </button>
    )
} 