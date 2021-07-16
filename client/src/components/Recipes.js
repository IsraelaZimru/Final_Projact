import { Card, Container, Row, Col, Pagination, ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faEdit, faHeart, faEye, faTimesCircle, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getRecipe, addToMyFavorites, getMyFavoritesId, RemoveFromMyFavorites } from "../DAL/api";


export default function Recipes({ isConnected, UserId, onSort, selectedIng, setSelectedIng }) {
    const history = useHistory()
    const [likes, setLikes] = useState([]); //להכניס לכל יוזר מערך מתכונים אהובים ומתכון ששם או נכנס יוחלף צבעו
    const [apiRecipes, setApiRecipes] = useState([]);


    useEffect(() => {

    }, [likes])



    useEffect(() => {
        (async () => {
            if (isConnected) {
                const favorites = await getMyFavoritesId(UserId);
                console.log("favorites", favorites);
                setLikes(prev => favorites)
            }
        })()
    }, [isConnected])


    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const recipes = await getRecipe()
                setApiRecipes(prev => recipes)
            } catch (err) {
                alert("Error, please refresh the site", err)
            }
        }
        fetchRecipes()
    }, [])

    const closeHandler = (ing) => {
        const temp = selectedIng.filter(name => name !== ing)
        setSelectedIng(prev => temp)
    };
    const sort = (sortby) => {
        //
    }

    const chooseRepice = (food) => {
        history.push(`/recipe_details/${food.id}`)
    }



    const updateMyFavorites = async (recipeId) => {
        try {
            if (likes.includes(recipeId)) {
                const newRecipesId = await RemoveFromMyFavorites(UserId, recipeId);
                console.log("new ids-remove:", newRecipesId);
                setLikes(prev => newRecipesId)
            } else {
                const newRecipesId = await addToMyFavorites(UserId, recipeId);
                console.log("new ids-add:", newRecipesId);
                setLikes(prev => newRecipesId)
            }
        } catch (err) {
            console.log(err)
        }
    }

    //---------------------------
    let active = 1;
    let items = [];
    for (let number = 1; number <= 3; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }

    const paginationBasic = (
        <div >
            <Pagination>{items}</Pagination>
        </div>
    );

    return <Container fluid className="py-2">
        <div>
            <p className="sortRacipes">Sort by :
                <span onClick={() => { onSort("likes"); console.log("clicked") }}>the Quickest</span>|
                <span onClick={() => sort("date")}>Most Popular</span></p>
        </div>
        <ListGroup horizontal>
            {!!selectedIng.length && selectedIng.map((ing, i) => (<ListGroup.Item key={i}>
                <FontAwesomeIcon icon={faTimesCircle}
                    style={{ cursor: "pointer" }}
                    onClick={() => closeHandler(ing)}
                    className={likes ? "text-danger mr-2 ml-2" : "mr-2 ml-2"} />
                {ing}
            </ListGroup.Item>))}
        </ListGroup>
        <Row className="justify-content-center">
            {apiRecipes.map((item, i) => <Card
                id="myFav"
                key={i}
                sm={6}
                md={4}
                text={'white'}
                style={{ width: '22rem', }}
                className="m-3 styleCard"
            >
                <Card.Header >
                    <Row>
                        <Col className="px-1" md={{ span: 4 }} sx={{ span: 4 }}>
                            <div>{isConnected && <FontAwesomeIcon icon={faBookmark}
                                style={{ cursor: "pointer" }}
                                onClick={() => updateMyFavorites(item.id)}
                                className={likes.includes(item.id) ? "text-primary mr-2 ml-2" : "mr-2 ml-2"} />
                            }
                                {/* <FontAwesomeIcon icon={faEdit}
                                    style={{ cursor: "pointer" }}
                                    onClick={e => chooseRepice(item)}
                                    className="mr-2 ml-2" /> */}
                                <FontAwesomeIcon icon={faEye}
                                    className="ml-2 mr-0" />
                                <span className="pl-2">
                                    {item.views}
                                </span>
                            </div>
                        </Col>
                        <Col className="px-0" sx={{ span: 4, offset: 4 }} md={{ span: 4, offset: 4 }} >
                            {/* <FontAwesomeIcon icon={faEye}
                                className="ml-2 mr-0" />
                            <span className="pl-2">
                                {item.views}
                            </span> */}
                            {/* <FontAwesomeIcon icon={faHeart}
                                className="ml-2 mr-0" />
                            <span className="pl-2">
                                {item.likes}
                            </span> */}
                        </Col>
                    </Row>
                </Card.Header>
                <div
                    onClick={e => chooseRepice(item)}
                    style={{ cursor: "pointer" }}
                >
                    <Card.Img variant="top" src={item.pic} height="160px" weidth="286px" />
                    <Card.Title className="text-center">{item.name}</Card.Title>
                    <Card.Text className="text-center">
                        {item.description}
                    </Card.Text>
                    <Card.Footer className="text-black">
                        <p className="text-center my-2">
                            {item.allCategories && item.allCategories.map((type, i) => <span key={i}>| {type} </span>)}
                        </p>
                    </Card.Footer>
                </div>
            </Card>)}
        </Row>
        <Row className="justify-content-md-center">
            {paginationBasic}
        </Row>
    </Container >
}