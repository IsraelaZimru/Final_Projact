import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Container, Row, Col, Button, Form, Card, InputGroup, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fakeUnits, ings } from '../../DAL/api'




function Phase2() {


    const [validated, setValidated] = useState(false);


    // data = {
    //     unit: {
    //         id: 0,
    //         name: ""
    //     },
    //     ingredient: {
    //         id: 0,
    //         name: ""
    //     },
    //     quantity: 0
    // }
    //In the End!!! I need to send only id's and quantity!!!!


    const [combineData, setCombineData] = useState([]);
    const [ingredients, setIngredients] = useState(ings)
    const [units, setUnits] = useState(fakeUnits)
    const [details, setDetails] = useState({
        unit: { isRequired: true, pattern: /[\s\S]{0,}/, msg: [], value: "", isInVaild: false },
        ingredient: { isRequired: true, pattern: /[\s\S]{0,}/, msg: [], value: "", isInVaild: false },
        quantity: { isRequired: true, pattern: /\d/, msg: [], value: "", isInVaild: false },
    })


    function removeName(selected) {
        //
        // const newLst = ingredients.filter(ingredient => ingredient !== selected);
        // setIngredients(newLst)
    }

    // function onAddingredients(obj) {
    //     setIngredients(prev => [...prev, obj]);
    // }

    // function onAddInstruction(obj) {
    //     setInstructions(prev => [...prev, newInput]);
    // }

    const handleSubmit = (event) => {
        //
        //     console.log("enetr sumbit");
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
        //             console.log("err", error);
        //             return;
        //         }
        //     }

        //     console.log("input whitout errors!!!");
        //     setValidated(true);
        //     event.preventDefault();


        // const newCombineData = {
        // id: JSON.parse(localStorage.getItem("user")).id,
        //     recipeName: details.recipeName.value,
        //     description: details.description.value,
        //     Servings: details.servings.value,
        //     CookingTime: details.cookingTime.value,
        //     prepTimeMins: details.prepTimeMins.value,
        //     level: details.level.value,
        //     categories: details.categories.value
        //     // image: details.image.value,
        // }
        // alert(JSON.stringify(allRelevantData))
    }

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

    const findName = (lst, value) => lst.map(item => item.name).filter((item, i) => {
        return item.toLowerCase().startsWith(value.toLowerCase())
    });


    const updateValue = (name, value) => {
        const fun = name === "ingredient" ? setIngredients : setUnits;
        fun(prev => [])
    }

    const updateDropDown = async ({ name, value }) => {
        try {
            const fun = name === "ingredient" ? setIngredients : setUnits;
            const list = name === "ingredient" ? ingredients : units;
            // const newNamesLst = await getRecipeNames()
            // const newNamesLst = await apiFun()
            // console.log("newNamesLst", newNamesLst);
            const filerOne = await findName(list, value)
            // console.log("filerOne", filerOne);
            const filterd = value ? filerOne : [];
            // console.log(filterd);
            fun(prev => filterd)
        } catch (err) {
            alert(err)
        }
    }

    return <Container>
        <h1>ingredients</h1>
        <div>
            <h3 className="text-center">List of Names:</h3>
            <ol className="list-group text-center">
                {!!combineData.length && combineData.map((data, i) => <li
                    key={i}
                    className="list-group-item"
                    onClick={() => removeName(data)}>{data.quantity} {data.unit.name} {data.ingredient.name}</li>)}
            </ol>
        </div>

        <Form noValidate validated={validated} onSubmit={handleSubmit} className="w-75 text-center">
            <Form.Row>
                <Form.Group as={Col} className="text-center">
                    <Form.Label>ingredient:</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            name="ingredient"
                            value={details.ingredient.value}
                            // onChange={e => updateDropDown(e.target)}
                            // onblur={e => updateDropDown(e.target)}
                            placeholder="add ingredient..." 
                            />
                        <ListGroup>
                            {ingredients.map((name, i) => <ListGroup.Item
                                key={i}
                                onClick={() => updateValue("ingredient", name)}
                            >
                                {name.name}</ListGroup.Item>)}
                        </ListGroup>
                    </InputGroup>
                </Form.Group>


                {/* <Form.Group as={Col} className="text-center">
                    <Form.Label>Measuring unit:</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            name="unit"
                            onBlur={e => validation(e.target)}
                            onChange={(e) => validation(e.target)}
                            value={details.unit.value}
                            isInvalid={details.unit.isInVaild}
                            required
                        />
                        <Form.Control.Feedback type="invalid" className="feedback">
                            {details.unit.msg}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group as={Col} className="text-center">
                    <Form.Label>Quantity:</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="number"
                            name="quantity"
                            onBlur={e => validation(e.target)}
                            onChange={(e) => validation(e.target)}
                            value={details.quantity.value}
                            isInvalid={details.quantity.isInVaild}
                            required />
                        <Form.Control.Feedback type="invalid" className="feedback">
                            {details.quantity.msg}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>*/}
            </Form.Row>
        </Form>
    </Container>
}

