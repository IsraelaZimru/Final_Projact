import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faPrint } from "@fortawesome/free-solid-svg-icons";
import facebook from '../imgs/facebook2.png'
import whatapp from '../imgs/whatapp2.jfif'



const RecipeInfo = ({ hasPageAaccess, onselect }) => {
    let { id } = useParams()
    let history = useHistory();
    const [selectRecipe, setSelectRecipe] = useState({
        name: "",
        image: "",
        addedDate: "",
        views: 0,
        likes: 0,
        date: "",
        userID: "",
        Servings: 0,
        diets: [],
        ingredients: [],
        instructions: [],
        prepTimeMins: 0,
        CookingTime: 0,
        description: "",
        categories: [],

    })

    useEffect(() => {
        window.scrollTo(0, 0);
        getRecipe(id)
    }, [])

    const updateStateRecipe = (data) => {
        if (data) {
            setSelectRecipe(prev => data)
        }
    }
    const getRecipe = async (id) => {
        try {
            const chosenRecipe = await onselect(id)
                .then(data => setSelectRecipe(prev => data))
                .catch(err => alert("error", err))
            console.log(chosenRecipe);
            // const getdata = await updateStateRecipe(chosenRecipe)
        } catch (err) {
            console.log(err);
        }
    }

    const printRecipe = () => {
        window.print()
    }
    const exit = () => {
        onselect({})
        history.push("/")
    }

    return <Container fluid className="mx-0">
        <Row id="introduction" className="align-items-center">
            <Col lg={5} >
                <h1 className="display-3"> {selectRecipe.name}</h1>
                <ul horizontal id="listStyle">
                    <li className="px-2">Views: {selectRecipe.views}</li>
                    {/* <li className="px-2">comments: { }</li> */}
                    <li className="px-2">Preparation Time: {selectRecipe.prepTimeMins}</li>
                    <li className="px-2">Cooking Time: {selectRecipe.CookingTime}</li>
                    <li className="px-2">By: {selectRecipe.username}</li>
                </ul>
                <h4 className="mt-5"><u>Description:</u> {selectRecipe.description}</h4>
                <div className="my-5 notPrint">
                    <Button variant="outline-dark" onClick={exit}>Return to Home Page</Button>
                </div>
            </Col>
            <Col lg={7} className=" mx-0 px-0">
                <img id="imgFood" alt="food pic" src={selectRecipe.image} style={{ minHeight: '552px', maxHeight: '552px', width: 'inherit', objectFit: "cover" }}></img>
            </Col>
        </Row>
        <Row className="styleRow justify-content-md-center text-center p-3">
            <Card
                className="mb-2"
                id="styleCardInfo"
            >
                <Row className="justify-content-md-center text-center p-3">
                    <Col>
                        <h4><u>Date:</u></h4>
                        <p>{selectRecipe.date.slice(0, selectRecipe.date.indexOf("T")).split("-").reverse().join("-")}</p>
                    </Col>
                    <Col>
                        <h4><u>Difficulty:</u></h4>
                        <p className="text-capitalize">{selectRecipe.level}</p>
                    </Col>
                    <Col>
                        <h4><u>Categories:</u></h4>
                        {selectRecipe.categories.map((type, i) => <p key={i}>{type}</p>)}
                    </Col>
                    <Col>
                        <h4><u>diets:</u></h4>
                        {selectRecipe.diets.map((type, i) => <p key={i}>{type}</p>)}
                    </Col>
                    <Col>
                        <h4><u>Servings:</u></h4>
                        <h4>{selectRecipe.Servings}</h4>
                    </Col>
                </Row>
            </Card>
        </Row>
        <div className="pagebreak"> </div>
        <Row className="styleRow">
            <Col className="my-5">
                <h1 className="mt-4">Ingredients:</h1>
                <p>
                    <a style={{ marginRight: "5px" }} target="_blank" rel="noreferrer" href={`https://api.whatsapp.com/send?text=http://localhost:3000/recipe_details/${selectRecipe.id}`} data-action="share/whatsapp/share">
                        <img alt="facebook" src={whatapp} style={{ maxHeight: "16px", width: "34px" }} />

                    </a>
                    <a target="_blank" rel="noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000/recipe_details/${selectRecipe.id}`} class="fb-xfbml-parse-ignore">
                        <img alt="facebook" src={facebook} style={{ maxHeight: "16px", width: "34px" }} />
                    </a>
                    <FontAwesomeIcon icon={faPrint} className="mx-2 mb-0 pb-0" onClick={printRecipe} style={{ cursor: "pointer" }} />

                </p>
                <p>To create a shopping list -<br></br> highlight the missing ingredients and click on the print icon</p>
                {selectRecipe.ingredients && selectRecipe.ingredients.map((ingredient, i) =>
                    <Form.Check key={i} className="checkItems" column="lg" lg={2} type="checkbox" label={ingredient} />
                )}
                {/* <hr></hr> */}
            </Col>
            {/* </Row>
        <Row> */}
            <Col className="my-5 styleBorder">
                <h1 className="my-4">Directions:</h1>
                {selectRecipe.instructions && selectRecipe.instructions.map((step, i) =>
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
        <Row className="justify-content-center p-3">
            <div className="text-center notPrint">
                <Button className="mr-2" variant="outline-warning" onClick={exit}>Go Back to Home Page</Button>
            </div>
        </Row>

    </Container>
}

export default RecipeInfo;