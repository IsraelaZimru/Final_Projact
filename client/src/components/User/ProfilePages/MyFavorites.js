import { Card, Container, Row, Col, Modal, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { getMyFavorites, RemoveAndReturnFavoritesRecipes } from "../../../DAL/api";
import { useParams } from "react-router-dom";

// faHeart

const MyFavorites = ({ connected, hasPageAaccess }) => {
    let history = useHistory();
    const { id } = useParams();
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        hasPageAaccess(connected, history);
        window.scrollTo(0, 0)

        // eslint-disable-next-line
    }, [connected]);


    useEffect(() => {
        (async () => {
            const myRecipes = await getMyFavorites(id)
            setLoading(false)
            console.log(myRecipes);
            if (myRecipes.error) {
                alert("A connection problem ... Please refresh the site.")
            } else {
                setRecipes(prev => myRecipes)
            }
        })()
    }, [])


    const remove = async (recipeId) => {
        setLoading(true)
        const newRecipes = await RemoveAndReturnFavoritesRecipes(id, recipeId);
        setLoading(false)
        setRecipes(prev => newRecipes)
    }

    const chooseRepice = (food) => {
        // console.log("choose random food");
        // onSelected(food)
        history.push(`/recipe_details/${food.id}`)
    }

    return <Container>
        <h1 className="display-2 mb-5 text-center h1styleUser2"> Favorite Recipes:</h1>

        <Modal show={loading} className="text-center">
            <Modal.Header >
            </Modal.Header>
            <Modal.Title classname="text-center display-h1">Loading Recipes...</Modal.Title>
            <Modal.Body className="text-center">
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    variant="warning"
                    role="status"
                    aria-hidden="true"
                />
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>

        <Row className="justify-content-center">
            {recipes.map((item, i) => <Card
                key={i}
                sm={6}
                md={4}
                text={'dark'}
                style={{ width: '18rem' }}
                className="m-3 styleCard"
            >
                <div
                    onClick={e => chooseRepice(item)}
                    style={{ cursor: "pointer" }}
                >
                    <Card.Img className="Foodsimg" variant="top" src={item.pic} height="160px" weidth="240px" />
                    <Card.Header className="text-center">{item.name}</Card.Header>

                    {/* {item.allCategories && item.allCategories.map((type, i) => <span key={i}>| {type} </span>)} */}
                    {/* <p className="text-center my-2">
                        {item.allCategories && item.allCategories.map((type, i) => {
                            if (i === 0) {
                                return <span className="text-capitalize" key={i}> {type} </span>
                            }
                            return <span className="text-capitalize" key={i}>| {type} </span>
                        })}
                    </p> */}

                </div>
                <Card.Footer className="text-black">


                    <Row className="justify-content-center">
                        <hr></hr>
                        <Col className="text-center" >
                            <FontAwesomeIcon onClick={e => remove(item.id)} icon={faTrashAlt} style={{ cursor: "pointer" }}
                            />
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>)}
        </Row>
        <Row className="justify-content-center my-2">
            {!recipes.length && <Col md={{ span: 6 }} id="msgDefaultFAV" className="my-4 text-center h1font">
                <p className="pt-5">
                    This recipes collection is empty :(
                    <br></br>
                    Start filling it up !
                    <br></br>
                    <FontAwesomeIcon icon={faThumbtack} />
                </p>
            </Col>}
        </Row>

    </Container>
}

export default MyFavorites;