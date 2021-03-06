import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState, useRef } from "react";
import { Link, useHistory, Prompt } from "react-router-dom";
import { useParams } from "react-router";
import { Container, Row, Col, Button, Form, Card, InputGroup, ListGroup, Alert, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { unitsAndIngs } from '../../../DAL/api'



function Phase2() {
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [ingsUnits, setIngsUnits] = useState([]);
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
        window.scrollTo(0, 0);

        (async () => {
            const dataFromDb = await unitsAndIngs()
            setIngsUnits(pev => [dataFromDb[0], dataFromDb[1]])

            if (localStorage.getItem("step2")) {
                const inputsPage2ocal = JSON.parse(localStorage.getItem("step2"))
                setCombineData(prev => inputsPage2ocal)
            }

        })()

    }, [])

    const checkIngredients = () => {
        if (combineData.length < 2) {
            setShow(true)
            window.scrollTo(0, 0);
            setTimeout(() => setShow(false), 3000)
            return;
        }
        localStorage.setItem("step2", JSON.stringify(combineData));
        console.log("combineData", combineData);
        history.push("/newRecipe_step3")
    }

    const removeName = (data) => {
        setCombineData(prev => prev.filter(item => item !== data))
    }



    const findName = (lst, value) => lst.filter((item, i) => {
        return item.name.toLowerCase().startsWith(value.toLowerCase())
    });

    const handleSubmit = (event) => {
        setDetails(prev => ({
            ...prev,
            unitlst: [],
            ingredientlst: [],
        }))


        event.preventDefault();
        let status = false;
        const checkErrors = [];
        for (const key in details) {
            if (!key.includes('lst')) {
                // console.log(key, details[key].value)
                checkErrors.push(validation({ name: key, value: details[key].value }));
            }
            // if (name === "ingredient" && !!value) {
            //     if (!ingsUnits[0].includes(value)) {
            //         isMsgShowing = true
            //         errorMsg.push(`Select ${name} that exists in the website.`)
            //     }
            // }
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
        // event.preventDefault();
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
        // console.log(combineData);
        setCombineData(prev => [...prev, data]);
        const temp = {
            ...details,
            ingredient: { ...details["ingredient"], value: "", id: "", isInVaild: false },
            unit: { ...details["unit"], value: "", id: "", isInVaild: false },
            quantity: { ...details["quantity"], value: "", isInVaild: false }
        }
        setDetails(temp)
    }


    const updateValue = (type, { id, name }) => {
        setDetails(prev => ({ ...prev, [type]: { ...prev[type], value: name, id }, [type + "lst"]: [] }))
    }

    // name === "unit"
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
                if (!filerOne.length) {
                    let isMsgShowing = true
                    let errorMsg = [`Select ${name} that exists in the website.`]
                    setDetails(prevDetails => ({ ...prevDetails, [name]: { ...prevDetails[name], value: value.name, isInVaild: isMsgShowing, msg: errorMsg }, [name + "lst"]: [] }))
                    return;
                }
                const filterd = value ? filerOne.slice(0, 5) : [];
                // console.log("filterd", filterd);
                setDetails(prev => ({ ...prev, [name]: { ...prev[name], value: value.name, id: value.id }, [name + "lst"]: filterd }))

            }
        } catch (err) {
            alert(err)
        }
    }

    const formIsHalfFiled = Object.values(details)
        .filter(item => item.value && item.value !== "")
        .length > 0 && Object.values(details)
            .filter(item => item.value && item.value !== "")
            .length < 3;

    console.log("formIsHalfFiled", formIsHalfFiled);


    return <Container fluid className="mb-5">
        <h1 className="display-2 text-center"> Add A New Recipe</h1>
        <Row className="phase-top">
            <Col > <Link to="/newRecipe_step1"> 1  </Link>  </Col>
            <Col className="active">2</Col>
            <Col > <Link to="/newRecipe_step3"> 3  </Link>  </Col>
        </Row>

        <Alert show={show} variant="danger" onClose={() => setShow(false)}>
            Please add at least 2 Ingredients.
        </Alert>


        {/* <Prompt when={formIsHalfFiled} message="You have unsaved changes. Sure you want to leave?" /> */}


        <h1 className="display-4 pb-2">Ingredients:</h1>
        <p>Enter at least two ingredients.</p>
        <Row className="justify-content-center mb-4 mediaStyle">
            <Col >
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row >
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
                                placeholder="Enter measuring unit..."
                                // className="mr-sm-1"
                                isInvalid={details.unit.isInVaild}
                            />
                            <Form.Control.Feedback type="invalid" className="feedback">
                                {details.unit.msg}
                            </Form.Control.Feedback>
                            <ListGroup>
                                {!!details.unitlst.length && details.unitlst.slice(0, 3).map((unit, i) => <ListGroup.Item
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
                                placeholder="Enter ingredient"
                                // className="mr-sm-1"
                                isInvalid={details.ingredient.isInVaild}
                            // required
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
                            <Button type="submit" className="mb-2" variant="warning"> Add </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
            <Col md="5 mb-4">
                {!combineData.length && <div className="text-center justify-content-center" id="msgNoIngredient">
                    <div id="noIngredient">
                    </div>
                    <h4>
                        No Ingredients were Selected...
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
        <Row className="text-center my-3 mx-2 justify-content-between">
            <div >
                <Button
                    variant="warning"
                    onClick={() => history.push("/newRecipe_step1")}  >
                    Previous Step
                </Button>
            </div>
            <div >
                <Button
                    variant="warning"
                    onClick={checkIngredients}  >
                    Next Step
                </Button>
            </div>
        </Row>
    </Container>
}

export default Phase2;
