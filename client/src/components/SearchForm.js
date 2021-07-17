import { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col, Collapse, ListGroup, InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import logo2 from '../imgs/logo2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getRecipeNames, getingredientsNames } from '../DAL/api'

function SearchForm({ connected, userName }) {
    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [open, setOpen] = useState(false);

    const [details, setDetails] = useState({
        recipeName: { value: "", id: NaN },
        recipeNamelst: [],
    })

    const findName = (lst, value) => lst.filter((item, i) => {
        return item.name.toLowerCase().startsWith(value.toLowerCase())
    });


    const updateValue = (name, value) => {
        setDetails(prev => ({ ...prev, [name]: { ...prev[name], value: "" }, [name + "lst"]: [] }))
    }

    const updateDropDown = async ({ name, value }) => {
        try {
            const apiFun = name === "recipeName" ? getRecipeNames : getingredientsNames;
            // const newNamesLst = await getRecipeNames()
            const newNamesLst = await apiFun()
            // console.log("newNamesLst", newNamesLst);
            const filerOne = await findName(newNamesLst, value)
            // console.log("filerOne", filerOne);
            const filterd = value ? filerOne : [];
            // console.log(filterd);
            setDetails(prev => ({ ...prev, [name]: { ...prev[name], value }, [name + "lst"]: filterd }))
        } catch (err) {
            alert(err)
        }
    }

    return <Container fluid id="bkgdStyle">
        <div id="bkgdStyle2">
            <Row>
                <Col className="text-center my-0 py-0">
                    <hr className="hrMain"></hr>
                </Col>
            </Row>
            <Row className="justify-content-center text-center pt-2" >
                <Form className="pt-1" id="formMedia">
                    {!connected && <><h1 className="display-1 h1style mb-0"> Recipes:</h1>

                        {/* <h4 className="display-6">Here all Recipes are - easy, quick and delicious</h4> */}
                        {/* <p className="display-6">Easy and quick meal ideas, healthy recipes</p> */}
                    </>}
                    {connected && <>
                        <h1 className="display-4 mb-3 "><span className="optional mx-1"> Hi {userName}!</span>
                            Search for a Recipe:</h1>
                    </>}
                    {/* <Collapse in={open}>
                        <div id="example-collapse-text">

                            <div>

                                <Form.Group
                                    controlId="formBasicPassword"
                                >
                                    <Form.Control
                                        autocomplete="off"
                                        type="text"
                                        name="ingredient"
                                        value={details.ingredient.value}
                                        onChange={e => updateDropDown(e.target)}
                                        onblur={e => updateDropDown(e.target)}
                                        placeholder="Search by ingredients..." />
                                    <ListGroup >
                                        {details.ingredientlst.map((name, i) => <ListGroup.Item
                                            key={i}
                                            onClick={() => updateValue("ingredient", name.name)}
                                        >
                                            {name}</ListGroup.Item>)}
                                    </ListGroup>
                                </Form.Group>
                            </div>
                        </div>
                    </Collapse> */}

                    <Form.Group

                    >
                        <InputGroup>
                            <InputGroup.Prepend>
                                {/* <InputGroup.Text>
                                    <FontAwesomeIcon icon={faSearch}
                                        className="ml-2 mr-0" />
                                </InputGroup.Text> */}
                            </InputGroup.Prepend>
                            <Form.Control
                                size="lg"
                                type="text"
                                autocomplete="off"
                                name="recipeName"
                                onChange={e => updateDropDown(e.target)}
                                onblur={e => updateDropDown(e.target)}
                                value={details.recipeName.value}
                                placeholder="Search for a recipe..." />
                            <ListGroup>
                                {details.recipeNamelst.map((food, i) => <ListGroup.Item
                                    onClick={() => history.push(`/recipe_details/${food.id}`)}
                                    // onClick={() => updateValue("recipeName", name)}
                                    key={i}
                                >{food.name}</ListGroup.Item>)}
                            </ListGroup>
                        </InputGroup>
                    </Form.Group>

                    <div id="groupBtn">
                        <Button variant="outline-light" type="submit" id="btnForm">
                            Search
                        </Button>
                        {/* <Button
                            onClick={() => setOpen(!open)}
                            aria-controls="example-Collapse-text"
                            aria-expanded={open}
                            variant="outline-light"
                            id="btnAdvenced"
                        >
                            Advanced Search
                        </Button> */}
                    </div>

                </Form>
            </Row>
            {/* <Row className="p-2 py-3" >
                <Col className="p-2 pt-3 text-center">
                    <img src={logo2} style={{ height: '250px', width: '300px', borderRadius: "50%" }} alt="logo"></img>
                </Col>
            </Row> */}
        </div>
        <hr className="hrMain"></hr>
    </Container>
}

export default SearchForm;