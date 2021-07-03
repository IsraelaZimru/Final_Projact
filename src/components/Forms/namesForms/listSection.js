
function ListSection(props) {
    return <div>
        <h3 className="text-center">List of Names:</h3>
        <ol className="list-group text-center">
            {props.names.map((myName, i) => <li
                key={i}
                className="list-group-item"
                onClick={() => props.removeName(myName)}>{myName}</li>)}
        </ol>
    </div>
}

export default ListSection