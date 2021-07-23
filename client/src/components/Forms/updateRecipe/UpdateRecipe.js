import { Link, useHistory, useParams, Prompt } from "react-router-dom";
import { Button, Form, InputGroup, Alert, Container, Col, Row } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { getCatsAndDiets, getUpdateDetails, isRecipeNameAvailable } from '../../../DAL/api'


const UpdateRecipe = ({ connected, hasPageAaccess }) => {
    const { id } = useParams()
    let history = useHistory();

    useEffect(() => {
        hasPageAaccess(connected, history)
        //eslint-disable-next-line
    }, [connected])


    useEffect(() => {
        window.scrollTo(0, 0);
        (async () => {
            const data = await getCatsAndDiets();
            // console.log(data, "data");

            // async function getDatafromDb() {
            const recipeData = await getUpdateDetails(id);
            for (let i = 0; i < recipeData.length; i++) {
                localStorage.setItem(`step${i + 1}`, JSON.stringify(recipeData[i]))
            }

            // getDatafromDb()

            if (localStorage.getItem("step1")) {
                const inputsPage1Local = JSON.parse(localStorage.getItem("step1"));
                console.log("inputsPage1Local", inputsPage1Local);
                for (const key in inputsPage1Local) {
                    if (key in details) {
                        details[key].value = inputsPage1Local[key];
                    }
                    if (key === "diets") {
                        data[0].forEach(el => {
                            if (inputsPage1Local[key].includes(+el.id)) {
                                el.selected = true;
                            } else {
                                el.selected = false;
                            }
                        })
                    }
                    if (key === "categories") {
                        data[1].forEach(el => {
                            if (inputsPage1Local[key].includes(+el.id)) {
                                el.selected = true;
                            } else {
                                el.selected = false;
                            }
                        })
                    }

                }
                setDetails({
                    ...details,
                });
                const checkboxsInfo = { diets: data[0], categories: data[1] }
                setCheckboxs(prev => checkboxsInfo)
            }
        })()

    }, [])

    const updateStep1 = (data) => {
        localStorage.setItem("step1", JSON.stringify(data));
    };
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    const [checkboxs, setCheckboxs] = useState({ diets: [], categories: [] });
    const [details, setDetails] = useState({
        categories: { isRequired: true, pattern: /[\s\S]{1,}/, msg: [], value: [], isInVaild: false },
        diets: { isRequired: true, pattern: /[\s\S]{1,}/, msg: [], value: [], isInVaild: false },
        recipeName: { isRequired: true, pattern: /\w{3,}/, msg: [], value: "", isInVaild: false },
        description: { isRequired: true, pattern: /[\s\S]{5,110}/, msg: [], value: "", isInVaild: false },
        Servings: { isRequired: true, pattern: /\d/, msg: [], value: "", isInVaild: false },
        CookingTime: { isRequired: true, pattern: /\d/, msg: [], value: "", isInVaild: false },
        prepTimeMins: { isRequired: true, pattern: /\d/, msg: [], value: "", isInVaild: false },
        level: { isRequired: true, pattern: /[\s\S]{2,}/, msg: [], value: "", isInVaild: false },
    })

    const handleSubmit = async (event) => {
        // event.preventDefault();
        event.preventDefault();
        console.log("enetr sumbit");
        const checkErrors = [];
        for (const key in details) {
            if (Object.hasOwnProperty.call(details, key)) {
                // console.log("before validation-", key, details[key].value);
                checkErrors.push(validation({ name: key, value: details[key].value }))
            }
        }

        for (const error of checkErrors) { //if there is error msg ->submit don't happens!
            if (error) {
                setValidated(false)
                event.stopPropagation();
                console.log("err", error);
                return;
            }
        }

        console.log("input whitout errors!!!");
        setValidated(true);


        const allRelevantData = {
            userId: JSON.parse(localStorage.getItem("user")).id,
            recipeName: details.recipeName.value,
            description: details.description.value,
            Servings: details.Servings.value,
            CookingTime: details.CookingTime.value,
            prepTimeMins: details.prepTimeMins.value,
            level: details.level.value,
            categories: details.categories.value,
            diets: details.diets.value,
        }

        updateStep1(allRelevantData)
        history.push(`/updateRecipe_step2/${id}`)
    }

    function validation({ name, value }) {
        const errorMsg = [];
        let isMsgShowing = false;
        if (name === "categories" && value.length < 1) {
            isMsgShowing = true
            errorMsg.push(`${name} is required.`)
        } else if (name === "diets" && value.length < 1) {
            isMsgShowing = true
            errorMsg.push(`${name} is required.`)
        } else if (value === "") {
            isMsgShowing = true
            errorMsg.push(`${name} is required.`)
        } else if (details[name].isRequired && (details[name].pattern).test(value)) {
            isMsgShowing = false
        } else {
            errorMsg.push(`${name} is not valid.`)
            isMsgShowing = true
        }
        setDetails(prevDetails => ({ ...prevDetails, [name]: { ...prevDetails[name], value, isInVaild: isMsgShowing, msg: errorMsg } }))
        return errorMsg[0] //importent for sumbit form!!!
    }


    const updateBox = (e, listName) => {
        let data = {
            checked: e.target.checked,
            currId: +e.target.id,
            currName: e.target.name,
            allChecked: []
        }
        // console.log("data", data);
        let { [listName]: newBox } = checkboxs;
        for (let box of newBox) {
            if (box.id === data.currId && box.name === data.currName) {
                box.selected = data.checked;
            }
            if (box.selected) {
                data.allChecked.push(box.id)
            }
        }
        let isMsgShowing;
        let errmsg = "";
        if (!!data.allChecked.length) {
            errmsg = "";
            isMsgShowing = false;
        } else {
            errmsg = "Please select at least one option"
            isMsgShowing = true;
        }
        setCheckboxs(prev => ({ ...prev, [listName]: newBox }));
        setDetails(prevDetails => ({ ...prevDetails, [listName]: { ...prevDetails[listName], value: data.allChecked, isInVaild: isMsgShowing, msg: errmsg } }))
    }



    const formIsHalfFiled = Object.values(details)
        .filter(item => item.value && (item.value !== "" || item.value.length > 0))
        .length > 0 && Object.values(details)
            .filter(item => item.value && (item.value !== "" || item.value.length > 0))
            .length < 8;

    console.log("formIsHalfFiled", formIsHalfFiled);




    return <Container fluid>
        <h1 className="display-2 text-center"> Update your Recipe</h1>
        <Row className="phase-top">
            <Col className="active">1</Col>
            <Col onClick={() => history.push(`/updateRecipe_step2/${id}`)} >
                2
            </Col>
            <Col onClick={() => history.push(`/updateRecipe_step3/${id}`)} >
                3
            </Col>

        </Row>
        <Alert show={show} variant="secondary" onClose={() => setShow(false)}>
            User recipe name already exist. Please try with another name.
        </Alert>

        {/* <Prompt when={formIsHalfFiled} message="You have unsaved changes. Sure you want to leave?" /> */}


        <Row className="justify-content-center">
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="w-75 text-center">

                <Form.Group >
                    <Form.Label>Recipe Name:</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            name="recipeName"
                            onBlur={e => validation(e.target)}
                            onChange={(e) => validation(e.target)}
                            value={details.recipeName.value}
                            placeholder="Enter recipe name..."
                            isInvalid={details.recipeName.isInVaild}
                            required />
                        <Form.Control.Feedback type="invalid" className="feedback">
                            {details.recipeName.msg}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} md={12} lg={3} className="text-center">
                        <Form.Label >Servings:</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="number"
                                name="Servings"
                                onBlur={e => validation(e.target)}
                                onChange={(e) => validation(e.target)}
                                value={details.Servings.value}
                                isInvalid={details.Servings.isInVaild}
                                required
                            />
                            <Form.Control.Feedback type="invalid" className="feedback">
                                {details.Servings.msg}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} md={12} lg={3} className="text-center">
                        <Form.Label>Difficulty:</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                as="select"
                                name="level"
                                onBlur={e => validation(e.target)}
                                onChange={(e) => validation(e.target)}
                                value={details.level.value}
                                isInvalid={details.level.isInVaild}
                                required>
                                <option value={""}>Select level...</option>
                                <option value={"easy"}>Easy</option>
                                <option value={"medium"}>Intermediate</option>
                                <option value={"hard"}>Hard</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid" className="feedback">
                                {details.level.msg}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} md={12} lg={3} className="text-center">
                        <Form.Label>Cooking Time in Minutes:</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="number"
                                name="CookingTime"
                                onBlur={e => validation(e.target)}
                                onChange={(e) => validation(e.target)}
                                value={details.CookingTime.value}
                                isInvalid={details.CookingTime.isInVaild}
                                required
                            />
                            <Form.Control.Feedback type="invalid" className="feedback">
                                {details.CookingTime.msg}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>


                    <Form.Group as={Col} md={12} lg={3} className="text-center">
                        <Form.Label>Prep Time in Minutes:</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="number"
                                name="prepTimeMins"
                                onBlur={e => validation(e.target)}
                                onChange={(e) => validation(e.target)}
                                value={details.prepTimeMins.value}
                                isInvalid={details.prepTimeMins.isInVaild}
                                required
                            />
                            <Form.Control.Feedback type="invalid" className="feedback">
                                {details.prepTimeMins.msg}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Form.Row>

                <Form.Group >
                    <Form.Label>Description:</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            type="textarea"
                            name="description"
                            onBlur={e => validation(e.target)}
                            onChange={(e) => validation(e.target)}
                            value={details.description.value}
                            placeholder="Enter description..."
                            isInvalid={details.description.isInVaild}
                            required
                        />
                        <Form.Control.Feedback type="invalid" className="feedback">
                            {details.description.msg}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>



                <hr></hr>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Categories:</Form.Label>
                        <div as="inline-checkbox" className="mb-3">
                            {checkboxs.categories.map(type => <Form.Check
                                inline
                                hasValidation
                                label={type.name}
                                name={type.name}
                                id={type.id}
                                type='checkbox'
                                isInvalid={details.categories.isInVaild}
                                checked={type.selected}
                                onChange={e => updateBox(e, "categories")}
                                onBlur={e => updateBox(e, "categories")} />
                            )}
                        </div>
                        {details.categories.msg && <small className="categoriesDietsErrMsg">{details.categories.msg} </small>}
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Diets:</Form.Label>
                        <div as="inline-checkbox" className="mb-3">
                            {checkboxs.diets.map(type => <Form.Check
                                inline
                                label={type.name}
                                name={type.name}
                                id={type.id}
                                type='checkbox'
                                isInvalid={details.diets.isInVaild}
                                checked={type.selected}
                                onBlur={e => updateBox(e, "diets")}
                                onChange={e => updateBox(e, "diets")} />
                            )}
                        </div>
                        {details.diets.msg && <small className="categoriesDietsErrMsg">{details.diets.msg} </small>}
                    </Form.Group>
                </Form.Row>

                <hr></hr>
                <Row className="text-center my-3 justify-content-center">
                    <Button variant="outline-dark" type="submit">Continue to the Next Step</Button>
                </Row>
            </Form>
        </Row>
    </Container >
}

export default UpdateRecipe;