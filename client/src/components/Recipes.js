import { Card, Container, Row, Col, Pagination, ListGroup, Navbar, Nav, NavDropdown, Jumbotron, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faEdit, faHeart, faEye, faTimesCircle, faBookmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getRecipe, addToMyFavorites, getMyFavoritesId, RemoveFromMyFavorites, getCatsAndDiets, getingredientsNames } from "../DAL/api";


export default function Recipes({ isConnected, UserId }) {
    const history = useHistory()
    const [selectedIng, setSelectedIng] = useState([]);
    const [likes, setLikes] = useState([]); //להכניס לכל יוזר מערך מתכונים אהובים ומתכון ששם או נכנס יוחלף צבעו
    const [apiRecipes, setApiRecipes] = useState([]);
    const [checkboxs, setCheckboxs] = useState({ diets: [], categories: [], ings: [] });

    // let originalRecipe;


    useEffect(() => {
        (async () => {
            if (isConnected) {
                const favorites = await getMyFavoritesId(UserId);
                console.log("favorites", favorites);
                setLikes(prev => favorites)
            }
        })()
    }, [isConnected, UserId])


    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const recipes = await getRecipe()
                console.log("recipes", recipes);
                // originalRecipe = recipes;
                setApiRecipes(prev => recipes)
            } catch (err) {
                alert("Error, please refresh the site", err)
            }

            try {
                const data = await getCatsAndDiets();
                const getIngs = await getingredientsNames();

                const checkboxsInfo = { diets: data[0], categories: data[1], ings: getIngs }
                checkboxsInfo.diets.forEach(item => item.class = "alldiets")
                checkboxsInfo.categories.forEach(item => item.class = "allCategories")
                checkboxsInfo.ings.forEach(item => item.class = "ings")
                // console.log(checkboxsInfo);
                setCheckboxs(prev => checkboxsInfo)
            } catch (err) {
                alert("cant import ings, cats and diets")
            }
        }
        fetchRecipes()
        return () => setSelectedIng([]);
    }, [likes])

    const closeHandler = async (ing) => {
        const newArr = await selectedIng.filter(type => type.name !== ing.name)
        setSelectedIng(prev => newArr);
        console.log("selectedIng", newArr);

        let temp = await getRecipe()
        console.log("temp1", temp);

        if (newArr.length < 1) {
            // console.log("selectedIng is empty", newArr);
        } else {
            // console.log("selectedIng not empty", newArr);
            for (let i = 0; i < newArr.length; i++) {
                const type = newArr[i];
                console.log(type);
                temp = temp.filter(recipe => recipe[type.class].includes(type.name))
            }
        }

        console.log("temp2", temp);
        setApiRecipes(prev => temp)
    };

    const sortViews = () => {
        const sorted = apiRecipes.sort((b, a) => a.views - b.views)
        setApiRecipes(prev => [...sorted])
    }

    const sortQuick = () => {
        const sorted = apiRecipes.sort((a, b) => a.CookingTime - b.CookingTime)
        const temp = apiRecipes.map(a => a.CookingTime)
        console.log(temp);
        setApiRecipes(prev => [...sorted])
    }


    const updateValue = (type) => {
        if (selectedIng.includes(type)) {
            return;
        }
        setSelectedIng(prev => [...prev, type]);
        const temp = apiRecipes.filter(recipe => {
            // console.log(type.class, "type.class");
            return recipe[type.class].includes(type.name)
        })
        setApiRecipes(prev => [...temp])
        console.log("temp-add", temp);
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
        <div id="recipes"></div>
        <Navbar collapseOnSelect expand="lg" id="styleNav" className="text-center font-weight-bold">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Nav className="m-auto">
                <Row className="justify-content-center">
                    <Col>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <NavDropdown title="Categories" id="collasible-nav-dropdown">
                                {checkboxs.categories.map((type, i) => <NavDropdown.Item
                                    value={type}
                                    onClick={() => updateValue(type, "categories")}
                                    key={i}
                                >{type.name}</NavDropdown.Item>)}
                            </NavDropdown>
                        </Navbar.Collapse>
                    </Col>

                    <Col>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <NavDropdown title="Diets" id="collasible-nav-dropdown">
                                {checkboxs.diets.map((type, i) => <NavDropdown.Item
                                    value={type}
                                    onClick={() => updateValue(type, "diets")}
                                    key={i}
                                >{type.name}</NavDropdown.Item>)}
                            </NavDropdown>
                        </Navbar.Collapse>
                    </Col>

                    <Col>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <NavDropdown title="Sort By" id="collasible-nav-dropdown">
                                <NavDropdown.Item
                                    onClick={sortQuick}>
                                    the Quickest
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    onClick={sortViews}>
                                    Views
                                </NavDropdown.Item>

                            </NavDropdown>
                        </Navbar.Collapse>
                    </Col>


                    {/* <Col>
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <NavDropdown title="Ingredients" id="collasible-nav-dropdown">
                                {checkboxs.ings.slice(0, 6).map((type, i) => <NavDropdown.Item
                                    value={type}
                                    onClick={() => updateValue(type)}
                                    key={i}
                                    >{type.name}</NavDropdown.Item>)}
                                    </NavDropdown>
                                    </Navbar.Collapse>
                    </Col> */}
                </Row>
            </Nav>
        </Navbar>
        <ListGroup horizontal>
            {!!selectedIng.length && selectedIng.map((ing, i) => (<ListGroup.Item key={i}>
                <FontAwesomeIcon icon={faTimesCircle}
                    style={{ cursor: "pointer" }}
                    onClick={() => closeHandler(ing)}
                    className={"mr-2 ml-2"} />
                {ing.name}
            </ListGroup.Item>))}
        </ListGroup>
        {/* 
        <div>
        <p className="sortRacipes">Sort By :
        <span onClick={sortQuick}>the Quickest</span>|
        <span onClick={sortViews}>Views</span></p>
    </div> */}

        <Row className="justify-content-center">
            {!!apiRecipes.length && apiRecipes.map((item, i) => <Card
                id="myFav"
                key={i}
                sm={6}
                md={4}
                text={'dark'}
                style={{ width: '22rem', }}
                className="m-3 styleCard"
            >
                <Card.Header >
                    <Row>
                        <Col className="px-1" md={{ span: 4 }} sx={{ span: 4 }}>
                            <div>{isConnected && <FontAwesomeIcon icon={faBookmark}
                                style={{ cursor: "pointer" }}
                                onClick={() => updateMyFavorites(item.id)}
                                className={likes.includes(item.id) ? "text-warning mr-2 ml-2" : "text-white mr-2 ml-2"} />
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
                    <Card.Img className="Foodsimg" variant="top" src={item.pic} height="180px" weidth="286px" />
                    <Card.Title className="text-center py-1">{item.name}</Card.Title>
                    <Card.Text className="text-center m-1" style={{ minHeight: "8vh" }}>
                        {item.description}
                    </Card.Text>
                    {/* <Card.Footer className="text-black">
                        <p className="text-center">
                            {item.allCategories && item.allCategories.map((type, i) => <span key={i}>| {type} </span>)}
                        </p>
                    </Card.Footer> */}
                    {/* <Card.Footer className="text-black"> */}
                    <hr></hr>
                    <p className="text-center">
                        {/* {item.allCategories && item.allCategories.map((type, i) => <span key={i}>| {type} </span>)} */}
                        {item.allCategories && item.allCategories.map((type, i) => {
                            if (i === 0) {
                                return <span className="text-capitalize" key={i}> {type} </span>
                            }
                            return <span className="text-capitalize" key={i}>| {type} </span>
                        })}
                    </p>
                    {/* </Card.Footer> */}
                </div>
            </Card>)}

            {!apiRecipes.length && <Jumbotron fluid className="mt-3">
                <Container>
                    {/* <h1>Hello, world!</h1> */}
                    <p>
                        No matching recipes were found.
                    </p>
                </Container>

            </Jumbotron>}
        </Row>
        {/* <Row className="justify-content-md-center">
            {paginationBasic}
        </Row> */}
    </Container >
}