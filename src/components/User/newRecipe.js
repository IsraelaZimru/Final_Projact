import { useEffect } from "react";
import { useHistory } from "react-router";

const NewRecipe = ({ connected, hasPageAaccess }) => {
    let history = useHistory();

    useEffect(() => {
        hasPageAaccess(connected, history)
    }, [connected])



    return <h1 className="display-2"> newRecipe page</h1>
}

export default NewRecipe;