import { Card, Container, Row, Col } from "react-bootstrap";
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


    useEffect(() => {
        hasPageAaccess(connected, history)
        // eslint-disable-next-line
    }, [connected]);


    useEffect(() => {
        (async () => {
            const myRecipes = await getMyFavorites(id)
            console.log(myRecipes);
            if (myRecipes.error) {
                alert("A connection problem ... Please refresh the site.")
            } else {
                setRecipes(prev => myRecipes)
            }
        })()
    }, [])


    const remove = async (recipeId) => {
        const newRecipes = await RemoveAndReturnFavoritesRecipes(id, recipeId);
        setRecipes(prev => newRecipes)
    }

    const chooseRepice = (food) => {
        // console.log("choose random food");
        // onSelected(food)
        history.push(`/recipe_details/${food.id}`)
    }

    return <Container>
        <h1 className="display-2 mb-5 text-center"> Favorite Recipes:</h1>
        <Row className="justify-content-md-center">
            {recipes.map((item, i) => <Card
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
                        {item.allCategories && item.allCategories.map((type, i) => <span key={i}>| {type} </span>)}
                    </p>

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
            <Col></Col>
            {!recipes.length && <Col id="msgDefaultFAV" className="my-4 text-center h1font">
                <p className="pt-5">
                    This recipes collection is empty :(
                    <br></br>
                    Start filling it up !
                    <br></br>
                    <FontAwesomeIcon icon={faThumbtack} />
                </p>
            </Col>}
            <Col></Col>
        </Row>

    </Container>
}

export default MyFavorites;