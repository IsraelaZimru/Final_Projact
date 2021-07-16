import { Card, Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmileWink, faEdit } from "@fortawesome/free-solid-svg-icons";
import ModalDelete from '../ProfilePages/ModalDelete'
import { getMyRecipes } from "../../../DAL/api";
import { useParams } from "react-router-dom";

const MyRecipes = ({ connected, hasPageAaccess, onSelected }) => {
    let history = useHistory();
    const { id } = useParams()
    // const myFav = [] // chheckig default msg...

    // const myFav = Recipes || [];

    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        hasPageAaccess(connected, history);
        // eslint-disable-next-line
    }, [connected]);

    useEffect(() => {
        (async () => {
            const myRecipes = await getMyRecipes(id)
            console.log(myRecipes);
            if (myRecipes.error) {
                alert("A connection problem ... Please refresh the site.")
            } else {
                setRecipes(prev => myRecipes)
            }
        })()
    }, [])



    const chooseRepice = (food) => {
        history.push(`/updateRecipe_step1/${food.id}`)
    }

    return <Container>
        <h1 className="display-2 mb-5 text-center"> I Made It:</h1>
        <Row className="justify-content-md-center">
            {recipes.map((item, i) => <Card
                key={i}
                text={'white'}
                style={{ width: '18rem' }}
                className="m-3 styleCard"
            >
                <div
                    onClick={() => history.push(`/recipe_details/${item.id}`)}
                    style={{ cursor: "pointer" }}
                >
                    <Card.Header>{item.name}</Card.Header>
                    <Card.Img variant="top" src={item.pic} height="160px" weidth="240px" />

                    <p className="text-center my-2">
                        {item.allCategories && item.allCategories.map((type, i) => <span key={i}>|{type} </span>)}
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
                            <ModalDelete />
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>)}
        </Row>
        <Row className="justify-content-center">
            <Col></Col>
            {!recipes.length && <Col id="msgDefault" className="text-center h1font my-5">
                Feel free to add a new recipe to the site !
                <br></br>
                <FontAwesomeIcon icon={faSmileWink} style={{}} />
            </Col>}
            <Col></Col>
        </Row>

    </Container>
}

export default MyRecipes;