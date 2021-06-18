import 'bootstrap/dist/css/bootstrap.min.css'
import './CSS/style.css'
import './components/User/CSS/userPages.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Nav, Navbar, ListGroup, Container } from 'react-bootstrap';
import Recipes from './components/Recipes';
import SearchForm from './components/SearchForm';
import { hasPageAaccess, recipes } from './DAL/api';
import Login from './components/Login';
import SignIn from './components/Sign_in';
import MyFavorites from './components/User/ProfilePages/MyFavorites';
import MyRecipes from './components/User/ProfilePages/MyRecipes';
import AboutMe from './components/User/ProfilePages/AboutMe'
import { useState } from 'react';
import NewRecipe from './components/User/newRecipe';
import UserRouter from './components/User/UserRouter';
import logo3 from '../src/imgs/logo3.png'
import RecipeInfo from '../src/components/RecipeInfo'

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [connected, setConnected] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState({})


  const displayLogin = () => {
    const temp = showLogin === false ? true : false;
    setShowLogin(temp)
  }
  const switchUser = () => {
    const temp = connected === false ? true : false;
    setConnected(temp)
  }

  return <Container fluid className="px-0" id="login">
    <Router>
      <Navbar sticky="top" className="py-0 styleMainNav" >
        <Navbar.Brand className="">
          <img src={logo3} style={{ height: '50px', width: '100px' }} alt="logo"></img>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link>
            <Link className="px-2" to="/"> Home Page </Link>
          </Nav.Link>

          <Nav.Link
            className="px-2"
            style={{ display: connected ? 'none' : 'block' }}>
            <Link className="px-2 mx-3" to="/Sign_in">Sign in</Link>
            {/* <a href="#login" className="text-white pl-2"> */}
            <Link className="px-2 mx-3" style={{ ariaExpanded: { showLogin } }} onClick={displayLogin}>
              Log in
            </Link>
            {/* </a> */}
          </Nav.Link>

          <Nav.Link
            style={{ display: connected ? 'block' : 'none' }}
            className="px-2">
            <Link className="px-2 mx-3" to="/newRecipe">Add New Recipe</Link>
            {/* <Link className="px-2 mx-3" to="/My_profile">My profile</Link> */}
            <Link className="px-2 mx-3" onClick={switchUser}>Logout</Link>
          </Nav.Link>

        </Nav>

        <Navbar.Collapse className="justify-content-end">
          <FontAwesomeIcon
            icon={faUserCircle}
            style={{ display: connected ? 'block' : 'none' }}
            id="styleIcon" />
          <ListGroup className="dropDownUser">
            <ListGroup.Item>
              <Link className="px-2 mx-4" to="/My_profile">About Me</Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="px-2 mx-4" to="/MyFavorites">My Favorites</Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="px-2 mx-4" to="/My_Recipes">My Recipes</Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="px-2 mx-4" to="/newRecipe">Add New Recipe</Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="px-2 mx-3" onClick={switchUser}>Log-out</Link>
            </ListGroup.Item>
          </ListGroup>
          <div
            style={{ display: connected ? 'block' : 'none' }}
            className="mb-1">
            <span > Hello, <u> Mark Otto</u></span>
          </div>
        </Navbar.Collapse>
      </Navbar >

      <div >
        <Login showLogin={showLogin} onClose={displayLogin} onConnect={switchUser} />
      </div>

      <Switch>
        <Route exact path="/">
          <SearchForm connected={connected} />
          <Recipes recipeslst={recipes} onSelected={setSelectedRecipe} />
        </Route>
        <Route exact path="/Login">
          <Login />
        </Route>
        <Route exact path="/Sign_in">
          <SignIn connected={connected} hasPageAaccess={hasPageAaccess} />
        </Route>
        <Route exact path="/newRecipe">
          <NewRecipe connected={connected} hasPageAaccess={hasPageAaccess} />
        </Route>
        <Route exact path="/My_profile">
          <UserRouter connected={connected} hasPageAaccess={hasPageAaccess} />
        </Route>
        <Route exact path="/recipe_details">
          <RecipeInfo connected={connected} hasPageAaccess={hasPageAaccess} selectRecipe={selectedRecipe} onselect={setSelectedRecipe} />
        </Route>
        <Route exact path="/My_profile">
          <AboutMe connected={connected} hasPageAaccess={hasPageAaccess} onConnect={switchUser} />
        </Route>
        <Route exact path="/MyFavorites">
          <MyFavorites connected={connected} hasPageAaccess={hasPageAaccess} Recipes={recipes} onSelected={setSelectedRecipe} />
        </Route>
        <Route exact path="/My_Recipes">
          <MyRecipes connected={connected} hasPageAaccess={hasPageAaccess} Recipes={recipes} onSelected={setSelectedRecipe} />
        </Route>
      </Switch>

      <div className="footer text-white text-center mb-0">
        <p>
          © Israela Zimru
          <a href="#login" className="text-white pl-2">
            | top
          </a>
        </p>
      </div>
    </Router >
  </Container>
}
export default App;
