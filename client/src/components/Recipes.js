import { Card, Container, Row, Col, Tooltip, ListGroup, Navbar, Nav, NavDropdown, Jumbotron, Button, Dropdown, FormControl, Spinner, OverlayTrigger } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faEdit, faHeart, faEye, faTimesCircle, faBookmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, forwardRef } from "react";
import { getRecipe, addToMyFavorites, getMyFavoritesId, RemoveFromMyFavorites, getCatsAndDiets, getingredientsNames } from "../DAL/api";
import MyPagination from "./MyPagination";


export default function Recipes({ isConnected, UserId }) {
    const history = useHistory()
    const [selectedIng, setSelectedIng] = useState([]);
    const [likes, setLikes] = useState([]);
    const [apiRecipes, setApiRecipes] = useState([]);
    const [checkboxs, setCheckboxs] = useState({ diets: [], categories: [], ings: [] });
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(6); //for pagination uses
    const [active, setActive] = useState(1)


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
                // setLoading(true)
                const recipes = await getRecipe()
                console.log("recipes", recipes);
                // originalRecipe = recipes;
                setApiRecipes(prev => recipes)
                setLoading(false)
            } catch (err) {
                alert("Error, please refresh the site", err)
            }

            try {
                const data = await getCatsAndDiets();
                const getIngs = await getingredientsNames();
                console.log("catsDiets:", data);
                console.log("getIngs:", getIngs);
                const checkboxsInfo = { diets: data[0], categories: data[1], ings: getIngs }
                checkboxsInfo.diets.forEach(item => item.class = "alldiets")
                checkboxsInfo.categories.forEach(item => item.class = "allCategories")
                checkboxsInfo.ings.forEach(item => item.class = "allIngredients")
                // console.log("checkboxsInfo", checkboxsInfo);
                setCheckboxs(prev => checkboxsInfo)
            } catch (err) {
                alert("cant import ings, cats and diets")
            }
        }
        fetchRecipes()
        return () => setSelectedIng([]);
    }, [likes])


    //Get current recipes
    const indexOfLastRecipes = currentPage * recipesPerPage;
    const indexOfFirstRecipes = indexOfLastRecipes - recipesPerPage;
    const currentRecipes = apiRecipes.slice(indexOfFirstRecipes, indexOfLastRecipes)

    const paginate = (num) => {
        window.scrollTo(0, 0);
        setCurrentPage(num)
        setActive(num)
    }


    //filter recipes 
    const closeHandler = async (ing) => {
        const newArr = await selectedIng.filter(type => type.name !== ing.name)
        setSelectedIng(prev => newArr);
        console.log("selectedIng", newArr);

        setLoading(true)
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
        setLoading(false)

    };

    const sortViews = () => {
        const sorted = apiRecipes.sort((b, a) => a.views - b.views)
        setApiRecipes(prev => [...sorted])
        paginate(1)
    }

    const sortQuick = () => {
        const sorted = apiRecipes.sort((a, b) => a.CookingTime - b.CookingTime)
        const temp = apiRecipes.map(a => a.CookingTime)
        console.log(temp);
        setApiRecipes(prev => [...sorted])
        paginate(1)
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
        paginate(1)

    }

    const chooseRepice = (food) => {
        history.push(`/recipe_details/${food.id}`)
    }


    const updateMyFavorites = async (recipeId) => {
        try {
            // setLoading(true)
            if (likes.includes(recipeId)) {
                const newRecipesId = await RemoveFromMyFavorites(UserId, recipeId);
                // setLoading(false)
                console.log("new ids-remove:", newRecipesId);
                setLikes(prev => newRecipesId)
            } else {
                const newRecipesId = await addToMyFavorites(UserId, recipeId);
                // setLoading(false)
                console.log("new ids-add:", newRecipesId);
                setLikes(prev => newRecipesId)
            }
        } catch (err) {
            console.log(err)
        }
    }


    const CustomMenu = forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
            const [value, setValue] = useState('');
            return (<div>
                <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled" style={{ overflow: "auto", maxHeight: "310px" }}>
                    {children.filter(
                        (child) =>
                            !value || child.props.children.toLowerCase().startsWith(value),
                    )}
                </ul>
            </div >
            );
        },
    );


    return <Container fluid className="py-2" style={{ height: "100%" }}>
        <div id="recipes"></div>
        <h1 className="display-1 h1style text-center">The Recipes</h1>
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

                    {/* <Col>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <NavDropdown title="Ingredients" id="collasible-nav-dropdown">
                                {checkboxs.ings.map((type, i) => <NavDropdown.Item
                                    value={type}
                                    onClick={() => updateValue(type, "allIngredients")}
                                    key={i}
                                >{type.name}</NavDropdown.Item>)}
                            </NavDropdown>
                        </Navbar.Collapse>
                    </Col> */}


                    <Col>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <NavDropdown title="Ingredients" id="collasible-nav-dropdown">
                                <Dropdown.Menu as={CustomMenu}>
                                    {checkboxs.ings.map((type, i) => <NavDropdown.Item
                                        value={type}
                                        onClick={() => updateValue(type, "allIngredients")}
                                        key={i}
                                    >{type.name}</NavDropdown.Item>)}
                                </Dropdown.Menu>
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
                </Row>
            </Nav>
        </Navbar>


        <ListGroup horizontal className="mt-2">
            {!!selectedIng.length && selectedIng.map((ing, i) => (<ListGroup.Item key={i}>
                <FontAwesomeIcon icon={faTimesCircle}
                    style={{ cursor: "pointer" }}
                    onClick={() => closeHandler(ing)}
                    className={"mr-2 ml-2"} />
                {ing.name}
            </ListGroup.Item>))}
        </ListGroup>

        {loading && <Row className="justify-content-center mx-auto" id="spinnerStlye">
            <Spinner animation="border" variant="warning" />
        </Row>}

        <Row className="justify-content-center mb-3">
            {/* {!!apiRecipes.length && apiRecipes.map((item, i) => <Card */}
            {!!currentRecipes.length && currentRecipes.map((item, i) => <Card
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
                            <div>{isConnected && <OverlayTrigger
                                overlay={
                                    <Tooltip id="tooltip-left">
                                        click to add to your favorites.
                                    </Tooltip>
                                }
                            >
                                {/* <Button variant="secondary">Tooltip on {placement}</Button> */}
                                <FontAwesomeIcon icon={faBookmark}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => updateMyFavorites(item.id)}
                                    className={likes.includes(item.id) ? "text-warning mr-2 ml-2" : "text-white mr-2 ml-2"} />
                            </OverlayTrigger>

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

                    <hr></hr>
                    <p className="text-center">
                        {item.allCategories && item.allCategories.map((type, i) => {
                            if (i === 0) {
                                return <span className="text-capitalize" key={i}> {type} </span>
                            }
                            return <span className="text-capitalize" key={i}>| {type} </span>
                        })}
                    </p>
                </div>
            </Card>)}

            {!apiRecipes.length && !loading && <Jumbotron fluid className="mt-3">
                <Container>
                    <p>
                        No matching recipes were found.
                    </p>
                </Container>

            </Jumbotron>}
        </Row>
        <MyPagination recipesPerPage={recipesPerPage} totalRecipes={apiRecipes.length} paginate={paginate} active={active} />
    </Container >
}
