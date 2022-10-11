export function Score(props) {
    

    let elements = []

    for (let i = 1; i < props.scores.length; i++) {
        elements.push(<h2>{props.scores[i][0]} - {props.scores[i][1]}</h2>)
        
    }
    return (
        <div id="scoreContainer">
            <div id="scoreTitle">
                <h1>Old Scores</h1>
            </div>
            <div id="scoreLines">
                {props.scores.length === 1 ? <h2>No Record</h2> : elements}
            </div>
        </div>
    );
}