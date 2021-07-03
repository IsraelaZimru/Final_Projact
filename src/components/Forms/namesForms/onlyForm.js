function Form({ onCatchInput, onaddName }) {
    return <div className="mt-3 text-center">
        <form>
            <h5><em> Add New Name:</em></h5>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => onCatchInput(e.target)}
                    id="nameInput"></input>
            </div>
            <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => { e.preventDefault(); onaddName(e.target) }}>
                Submit
            </button>
        </form>
    </div>
}

export default Form;