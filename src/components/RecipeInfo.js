import 'bootstrap/dist/css/bootstrap.min.css'
// import { useEffect } from "react";
import { useHistory } from "react-router";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from "@fortawesome/free-solid-svg-icons";



const RecipeInfo = ({ connected, hasPageAaccess, selectRecipe, onselect }) => {
    let history = useHistory();

    // useEffect(() => {
    //     hasPageAaccess(connected, history)
    // }, [connected])

    const exit = () => {
        onselect({})
        history.push("/")
    }

    return <Container fluid className="mx-0">
        <Row>
            <Col lg={5} id="introduction">
                <h1 className="display-3"> {selectRecipe.name}</h1>
                <ul horizontal id="listStyle">
                    <li className="px-2">views: {selectRecipe.views}</li>
                    {/* <li className="px-2">comments: { }</li> */}
                    <li className="px-2">preparation Time: {selectRecipe.info.preparationTime}</li>
                    <li className="px-2">Cooking/Baking Time: </li>
                    <li className="px-2">by: {selectRecipe.userID}</li>
                </ul>
                <h4 className="mt-5"><u>discription:</u> {selectRecipe.info.discription}</h4>
                <div className="mt-5">
                    <Button variant="outline-dark" onClick={exit}>return to Home Page</Button>
                    <Button variant="outline-dark" className="ml-2" onClick={() => console.log(selectRecipe)}>cheeking</Button>

                </div>
            </Col>
            <Col lg={7} className=" mx-0 px-0">
                <img alt="food pic" src={selectRecipe.pic} style={{ height: '450px', width: '900px' }}></img>
            </Col>
        </Row>
        <Row className="styleRow">
            <Col className="my-5">
                <h1 className="mt-4">Ingredients:</h1>
                <p>To create a shopping list -<br></br> highlight the missing ingredients and click on the print icon</p>
                {selectRecipe.info.ingredients.map(([amount, item], i) =>
                    <Form.Check key={i} className="checkItems" column="lg" lg={2} type="checkbox" label={`${amount} ${item}`} />
                )}
                {/* <hr></hr> */}
            </Col>
            {/* </Row>
        <Row> */}
            <Col className="my-5 styleBorder">
                <h1 className="my-4">Directions:</h1>
                {selectRecipe.info.instructions.map((step, i) =>
                    <div>
                        <h3>
                            <FontAwesomeIcon icon={faUtensils} className="mr-3" />
                            Step {i + 1}
                        </h3>
                        <p>{step}</p>
                    </div>
                )}
                {/* <hr></hr> */}
            </Col>
        </Row>
        <Button variant="outline-dark" onClick={exit}>return to Home Page</Button>


        <Row>
            <h1 className="display-3">Comments section</h1>

        </Row>
    </Container>
}

export default RecipeInfo;