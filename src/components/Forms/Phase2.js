import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { Container, Row, Col, Button, Form, Card, InputGroup, ListGroup, Alert, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { unitsAndIngs } from '../../DAL/api'



function Phase2() {
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [ingsUnits, serIngsUnits] = useState([]);
    const [validated, setValidated] = useState(false);
    const [combineData, setCombineData] = useState([]);
    const [details, setDetails] = useState({
        ingredient: { isRequired: true, msg: [], pattern: /[\s\S]{1,}/, value: "", id: null, isInVaild: false },
        unit: { isRequired: true, msg: [], pattern: /[\s\S]{1,}/, value: "", id: null, isInVaild: false },
        quantity: { isRequired: true, msg: [], pattern: /[\s\S]{1,}/, value: "", isInVaild: false },
        unitlst: [],
        ingredientlst: [],
    })

    useEffect(() => {
        (async () => {
            const dataFromDb = await unitsAndIngs()
            serIngsUnits(pev => [dataFromDb[0], dataFromDb[1]])
        })()

    }, [])

    // const getUnitsNames = () => {
    //     return Units;
    // }

    // const getingredientsNames = () => {
    //     return ings;
    // }


    const checkIngredients = () => {
        if (combineData.length < 2) {
            setShow(true)
            setTimeout(() => setShow(false), 3000)
            return;
        }
        localStorage.setItem("step2", JSON.stringify(combineData));
        history.push("/newRecipe_step3")
    }

    const removeName = (data) => {
        setCombineData(prev => prev.filter(item => item !== data))
    }



    const findName = (lst, value) => lst.filter((item, i) => {
        return item.name.toLowerCase().startsWith(value.toLowerCase())
    });

    const handleSubmit = (event) => {
        let status = false;
        const checkErrors = [];
        for (const key in details) {
            if (!key.includes('lst')) {
                // console.log(key, details[key].value)
                checkErrors.push(validation({ name: key, value: details[key].value }));
            }
        }

        for (const error of checkErrors) { //if there is error msg ->submit don't happens!
            if (error) {
                setValidated(status)
                event.preventDefault();
                event.stopPropagation();
                // console.log(error, details);
                return;
            }
        }
        setValidated(!status);
        event.preventDefault();
        const data = {
            ingredient: {
                id: details.ingredient.id,
                name: details.ingredient.value,
            },
            unit: {
                id: details.unit.id,
                name: details.unit.value,
            },
            quantity: details.quantity.value
        }
        const checkDuplicates = combineData.find(ele => ele.ingredient.id === data.ingredient.id)
        if (checkDuplicates) {
            alert("You cannot select the same ingredient twice.")
            return;
        }
        console.log(combineData);
        setCombineData(prev => [...prev, data]);
        setDetails(prev => ({
            ...prev,
            "ingredient": { ...prev["ingredient"], value: "", id: "", isInVaild: false },
            "unit": { ...prev["unit"], value: "", id: "", isInVaild: false },
            "quantity": { ...prev["quantity"], value: "", isInVaild: false }
        }))
    }


    const updateValue = (type, { id, name }) => {
        setDetails(prev => ({ ...prev, [type]: { ...prev[type], value: name, id }, [type + "lst"]: [] }))
    }


    function validation({ name, value }) {
        const errorMsg = [];
        let isMsgShowing = false;
        if (value === "" || value === undefined) {
            isMsgShowing = true
            errorMsg.push(`${name} is required.`)
        } else if (details[name].isRequired && (details[name].pattern).test(value)) {
            isMsgShowing = false
        } else {
            errorMsg.push(`${name} is not valid.`)
            isMsgShowing = true
        }
        setDetails(prevDetails => ({ ...prevDetails, [name]: { ...prevDetails[name], value, isInVaild: isMsgShowing, msg: errorMsg } }))



        // console.log(details);
        return errorMsg[0] //importent for sumbit form!!!
    }


    const updateDropDown = async ({ name, value }) => {
        try {
            validation({ name, value });
            if (name === "quantity") {
                setDetails(prev => ({ ...prev, [name]: { ...prev[name], value: value.name, id: value.id } }))
            } else {
                const index = name === "unit" ? 1 : 0;
                // const newNamesLst = await getRecipeNames()
                // const newNamesLst = await apiFun()
                // console.log("newNamesLst", newNamesLst);
                const filerOne = await findName(ingsUnits[index], value)
                // console.log("filerOne", filerOne);
                const filterd = value ? filerOne.slice(0, 5) : [];
                // console.log("filterd", filterd);
                setDetails(prev => ({ ...prev, [name]: { ...prev[name], value: value.name, id: value.id }, [name + "lst"]: filterd }))

            }
        } catch (err) {
            alert(err)
        }
    }


    return <Container>
        <h1 className="display-2 text-center"> Add A New Recipe</h1>
        <Row className="phase-top">
            <Col > <Link to="/newRecipe_step1"> 1  </Link>  </Col>
            <Col className="active">2</Col>
            <Col > <Link to="/newRecipe_step3"> 3  </Link>  </Col>
        </Row>
        <Alert show={show} variant="secondary" onClose={() => setShow(false)}>
            Please add at least 2 Ingredients
        </Alert>


        <h1 className="display-4 pb-2">Ingredients:</h1>
        <Row className="align-items-center">
            <Col >
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group as={Col}
                            className="px-1"
                        >
                            <InputGroup
                                hasValidation>
                                <FormControl
                                    placeholder="Enter quantity"
                                    type="number"
                                    name="quantity"
                                    value={details.quantity.value}
                                    onChange={e => validation(e.target)}
                                    onblur={e => validation(e.target)}
                                    isInvalid={details.quantity.isInVaild}
                                    required
                                />
                                <Form.Control.Feedback type="invalid" className="feedback">
                                    {details.quantity.msg}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} className="px-1" hasValidation>
                            <Form.Control
                                type="text"
                                autocomplete="off"
                                name="unit"
                                value={details.unit.value}
                                onChange={e => updateDropDown(e.target)}
                                onblur={e => updateDropDown(e.target)}
                                placeholder="Enetr measuring unit..."
                                // className="mr-sm-1"
                                isInvalid={details.unit.isInVaild}
                                required
                            />
                            <Form.Control.Feedback type="invalid" className="feedback">
                                {details.unit.msg}
                            </Form.Control.Feedback>
                            <ListGroup>
                                {!!details.unitlst.length && details.unitlst.map((unit, i) => <ListGroup.Item
                                    key={i}
                                    onClick={() => updateValue("unit", unit)}
                                >
                                    {unit.name}</ListGroup.Item>)}
                            </ListGroup>
                        </Form.Group>

                        <Form.Group as={Col} hasValidation className="px-1">
                            <Form.Control
                                type="text"
                                autocomplete="off"
                                name="ingredient"
                                value={details.ingredient.value}
                                onChange={e => updateDropDown(e.target)}
                                onblur={e => updateDropDown(e.target)}
                                placeholder="Enetr ingredient..."
                                // className="mr-sm-1"
                                isInvalid={details.ingredient.isInVaild}
                                required
                            />
                            <Form.Control.Feedback type="invalid" className="feedback">
                                {details.ingredient.msg}
                            </Form.Control.Feedback>
                            <ListGroup id="diplayZ">
                                {!!details.ingredientlst.length && details.ingredientlst.map((ing, i) => <ListGroup.Item
                                    key={i}
                                    onClick={() => updateValue("ingredient", ing)}
                                >
                                    {ing.name}</ListGroup.Item>)}
                            </ListGroup>
                        </Form.Group>




                        <Col>
                            <Button type="submit" className="mb-2" variant="warning"> Submit </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
            <Col md="5">
                {!combineData.length && <div className="text-center justify-content-center" id="msgNoIngredient">
                    <div id="noIngredient">
                    </div>
                    <h4>
                        No ingredient was selected...
                    </h4>
                </div>}
                <div>
                    <ol className="list-group">
                        {!!combineData.length && combineData.map((data, i) => <li
                            key={i}
                            className="list-group-item">
                            <FontAwesomeIcon
                                onClick={() => removeName(data)}
                                icon={faTrashAlt}
                                className="mr-3"
                            />
                            | Ingredient {i + 1} : {data.quantity} {data.unit.name} {data.ingredient.name}</li>)}
                    </ol>
                </div>

            </Col>
        </Row>
        <Row className="text-center my-3 justify-content-center">
            <div >
                <Button
                    variant="primary"
                    onClick={checkIngredients}  >
                    Click here to proceed to the last step
                </Button>
            </div>
        </Row>
    </Container>
}

export default Phase2;
