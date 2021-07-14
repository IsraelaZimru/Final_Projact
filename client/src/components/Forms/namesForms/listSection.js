
function ListSection({ instructions, removeName }) {
    return <div>
        <h3 className="text-center">List of Names:</h3>
        <ol className="list-group text-center">
            {instructions.map((instruction, i) => <li
                key={i}
                className="list-group-item"
                onClick={() => removeName(instruction)}>{instruction}</li>)}
        </ol>
    </div>
}

export default ListSection