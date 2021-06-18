import { Card, Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmileWink, faEdit } from "@fortawesome/free-solid-svg-icons";
import ModalDelete from '../ProfilePages/ModalDelete'

const MyRecipes = ({ connected, hasPageAaccess, Recipes, onSelected }) => {
    let history = useHistory();
    // const myFav = [] // chheckig default msg...
    const myFav = Recipes.slice(0, 2)

    useEffect(() => {
        hasPageAaccess(connected, history)
        // eslint-disable-next-line
    }, [connected]);




    const chooseRepice = (food) => {
        console.log("coose random food");
        onSelected(food)
        history.push("/recipe_details")
    }

    return <Container>
        <h1 className="display-2 mb-5 text-center"> I Made It:</h1>
        <Row className="justify-content-md-center">
            {myFav.map((item, i) => <Card
                key={i}
                text={'white'}
                style={{ width: '18rem' }}
                className="m-3 styleCard"
            >
                <div
                    onClick={e => chooseRepice(item)}
                    style={{ cursor: "pointer" }}
                >
                    <Card.Header>{item.name}</Card.Header>
                    <Card.Img variant="top" src={item.pic} height="160px" weidth="240px" />

                    <p className="text-center my-2">
                        {item.SuitableFor.map((type, i) => <span key={i}>|{type} </span>)}
                    </p>

                </div>
                <Card.Footer className="text-black">


                    <Row className="justify-content-center">
                        <hr></hr>
                        <Col className="text-center" >
                            <FontAwesomeIcon onClick={e => chooseRepice(item)} icon={faEdit} style={{ cursor: "pointer" }}
                            />
                        </Col>
                        <Col className="text-center" >
                            {/* <FontAwesomeIcon onClick={() => alert("Hello")} icon={faTrashAlt} style={{ cursor: "pointer" }} */}
                            {/* /> */}
                            <ModalDelete />
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>)}
        </Row>
        <Row className="justify-content-center">
            <Col></Col>
            {!myFav.length && <Col id="msgDefault" className="text-center h1font my-5">
                Feel free to add a new recipe to the site !
                <br></br>
                <FontAwesomeIcon icon={faSmileWink} style={{}} />
            </Col>}
            <Col></Col>
        </Row>

    </Container>
}

export default MyRecipes;