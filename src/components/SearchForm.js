import { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col, Collapse, ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getRecipeNames, getingredientsNames } from '../DAL/api'

function SearchForm({ connected, userName, setSelectedIng }) {
    const history = useHistory();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [open, setOpen] = useState(false);

    const [details, setDetails] = useState({
        recipeName: { value: "", id: NaN },
        ingredient: { value: "", id: NaN },
        recipeNamelst: [],
        ingredientlst: []
    })

    const findName = (lst, value) => lst.filter((item, i) => {
        return item.name.toLowerCase().startsWith(value.toLowerCase())
    });


    const updateValue = (name, value) => {
        if (name === "ingredient") {
            setSelectedIng(prev => [...prev, value])
        }
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
    // const handleSubmit = (event) => {
    //     const checkErrors = [];
    //     for (const key in details) {
    //         if (Object.hasOwnProperty.call(details, key)) {
    //             checkErrors.push(validation({ name: key, value: details[key].value }))

    //         }
    //     }

    //     for (const error of checkErrors) { //if there is error msg ->submit don't happens!
    //         if (error) {
    //             setValidated(false)
    //             event.preventDefault();
    //             event.stopPropagation();
    //             return;
    //         }
    //     }

    //     setValidated(true);
    //     event.preventDefault();
    //     const info = { email: details.email.value, password: details.password.value }
    //     userLoginHandler(prev => info)


    //     if (connected) {
    //         onClose()
    //     } else {
    //         setValidated(false);
    //         setShow(true)
    //     }
    // };

    // function validation({ name, value }) {
    //     const errorMsg = [];
    //     let isMsgShowing = false;
    //     if (value === "") {
    //         isMsgShowing = true
    //         errorMsg.push(`${name} is required.`)
    //     } else if (details[name].isRequired && (details[name].pattern).test(value)) {
    //         isMsgShowing = false
    //     } else {
    //         errorMsg.push(`${name} is not valid.`)
    //         isMsgShowing = true
    //     }
    //     setDetails(prevDetails => ({ ...prevDetails, [name]: { ...prevDetails[name], value, isInVaild: isMsgShowing, msg: errorMsg } }))
    //     return errorMsg[0] //importent for sumbit form!!!
    // }

    return <Container fluid id="bkgdStyle">
        <div id="bkgdStyle2">
            <Row>
                <Col className="pt-3 text-center">
                    <hr className="hrMain"></hr>
                </Col>
            </Row>
            <Row className="justify-content-center text-center pt-4" >
                <Form className="pt-2 " id="formMedia">
                    {!connected && <h1 className="display-4 mb-3"> Recipes:</h1>}
                    {connected && <>
                        <h1 className="display-4 mb-3 "><span className="optional mx-1"> Hi {userName}!</span>
                            Search for a Recipe:</h1>
                    </>}
                    <Collapse in={open}>
                        <div id="example-collapse-text">
                            {/* {connected && <div ><Form.Label >The recipes are filtered according to the user's choices:</Form.Label>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check inline type="checkbox" label="XYZ" />
                                    <Form.Check inline type="checkbox" label="XYZ" />
                                    <Form.Check inline type="checkbox" label="XYZ" />
                                    <Form.Check inline type="checkbox" label="XYZ" />
                                </Form.Group></div>} */}
                            <div>
                                {/* <Form.Label > Show me the recipes:</Form.Label> */}

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
                                            onClick={() => updateValue("ingredient", name)}
                                        >
                                            {name}</ListGroup.Item>)}
                                    </ListGroup>
                                </Form.Group>
                            </div>
                        </div>
                    </Collapse>

                    <Form.Group >
                        <Form.Control
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
                    </Form.Group>

                    <div id="groupBtn">
                        <Button variant="outline-light" type="submit" id="btnForm">
                            Search
                        </Button>
                        <Button
                            onClick={() => setOpen(!open)}
                            aria-controls="example-Collapse-text"
                            aria-expanded={open}
                            variant="outline-light"
                            id="btnAdvenced"
                        >
                            Advanced Search
                        </Button>
                    </div>

                </Form>
            </Row>
            <Row className="p-2 py-3" >
                <Col className="p-2 pt-3 text-center">
                    {/* <img src={logo2} style={{ height: '250px', width: '300px', borderRadius: "50%" }} alt="logo"></img> */}
                    {/* <h1 id="slogen">Here all Recipes are - easy, quick and delicious</h1> */}
                </Col>
            </Row>
        </div>
        <hr className="hrMain"></hr>
    </Container>
}

export default SearchForm;