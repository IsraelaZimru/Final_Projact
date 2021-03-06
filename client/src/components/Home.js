import { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col, Collapse, ListGroup, InputGroup, Card, Carousel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import logo2 from 'C:/Users/ישראלה/Google Drive/Experis/final project/fullstack_Project/client/src/imgs/bkgd2.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { getRecipeNames, getingredientsNames, MostRecipes } from '../DAL/api'

function Home({ connected, userName }) {
    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0);
        const getMostQuickest = async () => {
            const response = await MostRecipes()
            console.log(response);
            setRecipes(prev => ({
                quickest: response[0],
                recent: response[1],
                popular: response[2],
            }))
        }

        getMostQuickest()
    }, [])

    const [recipes, setRecipes] = useState({
        quickest: [],
        recent: [],
        popular: [],
    });

    const [details, setDetails] = useState({
        recipeName: { value: "", id: NaN },
        recipeNamelst: [],
    })

    const chooseRepice = (food) => {
        history.push(`/recipe_details/${food.id}`)
    }

    const findName = (lst, value) => lst.filter((item, i) => {
        return item.name.toLowerCase().includes(value.toLowerCase())
    });


    // const updateValue = (name, value) => {
    //     setDetails(prev => ({ ...prev, [name]: { ...prev[name], value: "" }, [name + "lst"]: [] }))
    // }

    const updateDropDown = async ({ name, value }) => {
        try {
            const apiFun = name === "recipeName" ? getRecipeNames : getingredientsNames;
            const newNamesLst = await apiFun()
            const filerOne = await findName(newNamesLst, value)
            const filterd = value ? filerOne : [];
            setDetails(prev => ({ ...prev, [name]: { ...prev[name], value }, [name + "lst"]: filterd }))
        } catch (err) {
            alert(err)
        }
    }

    return <Container fluid  >
        <div id="bkgdStyle">
            <div className="row  pt-4" id="bkgdStyle2">
                <Col md={{ span: 6, offset: 3 }} className="text-center">
                    <Form className="pt-0" id="formMedia text-center">
                        {!connected && <><h1 className="display-1 h1style mb-0"> Recipes:</h1>

                            {/* <h4 className="display-6">Here all Recipes are - easy, quick and delicious</h4> */}
                            <p > <strong>Easy and quick meal ideas and healthy recipes</strong></p>
                        </>}
                        {connected && <div>
                            <h1 className="display-4 pt-4 h1styleUser">
                                <span className="optional mx-1"> Hi {userName}!</span>
                                <br></br>
                                Search for a Recipe:</h1>
                        </div>}

                        <Form.Group
                            id="namelist">

                            <Form.Control
                                size="lg"
                                type="text"
                                autocomplete="off"
                                name="recipeName"
                                onChange={e => updateDropDown(e.target)}
                                onblur={e => updateDropDown(e.target)}
                                value={details.recipeName.value}
                                placeholder="Search for a recipe..." />
                            <ListGroup >
                                {details.recipeNamelst.slice(0, 3).map((food, i) => <ListGroup.Item
                                    onClick={() => history.push(`/recipe_details/${food.id}`)}
                                    key={i}
                                >{food.name}</ListGroup.Item>)}
                            </ListGroup>
                        </Form.Group>

                        <Button
                            onClick={() => { history.push("/AllRecipes") }}
                            variant="outline-light"
                            id="btnAdvenced"
                        >
                            Advanced Search
                        </Button>
                    </Form>
                </Col>

                {/* </Row> */}
                {/* <Row className="p-2 py-3" >
                <Col className="p-2 pt-3 text-center">
                <img src={logo2} style={{ height: '250px', width: '300px', borderRadius: "50%" }} alt="logo"></img>
                </Col>
            </Row> */}

            </div>
        </div>

        <hr className="hrMain"></hr>
        <Row className="justify-content-center mb-3">
            <Col md={{ span: 6, offset: 1 }}>
                <Row className="justify-content-center">
                    <Col className="mostPopular p-2">
                        <div
                            style={{ cursor: "pointer", marginTop: "17px" }}
                            onClick={() => history.push(`/recipe_details/${recipes.popular[0].id}`)}>
                            <Card text={'dark'}>
                                <Card.Img className="Foodsimg" variant="top" src={recipes.popular.length ? recipes.popular[0].pic : ""} style={{ minHeight: '195px', maxHeight: '235px', width: '', objectFit: "cover" }} />
                                <span >Most Popular Recipe</span>
                            </Card>
                        </div>
                        {/* <img alt="food pic" src={recipes.popular.length ? recipes.popular[0].pic : ""} style={{ minHeight: '195px', maxHeight: '145px', width: 'inherit', objectFit: "cover" }}></img> */}
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col className="mostPopular p-2">
                        <div
                            style={{ cursor: "pointer", marginTop: "17px" }}
                            onClick={() => history.push(`/recipe_details/${recipes.recent[0].id}`)}>
                            <Card text={'dark'}>
                                <Card.Img className="Foodsimg" variant="top" src={recipes.recent.length ? recipes.recent[0].pic : ""} style={{ minHeight: '195px', maxHeight: '235px', width: '', objectFit: "cover" }} />
                                <span id="tagRecent">Most Recent Recipe</span>
                            </Card>
                        </div>
                        {/* <img alt="food pic" src={recipes.recent.length ? recipes.recent[0].pic : ""} style={{ minHeight: '195px', maxHeight: '145px', width: 'inherit', objectFit: "cover" }}></img> */}
                    </Col>
                </Row>
            </Col>

            <Col md={4} className="p-auto m-auto">
                <Row className="justify-content-center">
                    <Card border="primary" style={{ width: '20rem', marginTop: "20px" }}>
                        <Card.Body>
                            <Card.Title id="h1Home">The Quickest</Card.Title>
                            <Card.Text>
                                {!!recipes.quickest.length && recipes.quickest.map((item, i) => <Row className="py-2"
                                    style={{ cursor: "pointer" }}
                                    onClick={e => chooseRepice(item)}>
                                    <Col md={5} >
                                        <img id="mediaFixImg" alt="food pic" src={item.pic} style={{ minHeight: '60px', maxHeight: '60px', width: 'inherit', objectFit: "cover" }}></img>
                                    </Col>
                                    <Col sx={7} id="fontStyle">
                                        <p>{item.name}
                                            <br></br>
                                            <FontAwesomeIcon icon={faHistory} className="m-0 p-0 mr-2" />
                                            {item.CookingTime}
                                        </p>
                                    </Col>
                                </Row>)}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Col>
        </Row>

    </Container >
}

export default Home;