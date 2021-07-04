import 'bootstrap/dist/css/bootstrap.min.css'
import './CSS/style.css'
import './components/User/CSS/userPages.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import { Nav, Navbar, ListGroup, Container, NavDropdown } from 'react-bootstrap';
import Recipes from './components/Recipes';
import SearchForm from './components/SearchForm';
import { hasPageAaccess, getRecipe, allUsers } from './DAL/api';
import Login from './components/Login';
import SignUp from './components/SignUp';
import MyFavorites from './components/User/ProfilePages/MyFavorites';
import MyRecipes from './components/User/ProfilePages/MyRecipes';
import AboutMe from './components/User/ProfilePages/AboutMe';
import { useState, useEffect } from 'react';
import NewRecipe from './components/User/newRecipe';
import { checkLoginAccess, selectedItem } from './DAL/api'
import logo3 from '../src/imgs/logo3.png'
import RecipeInfo from '../src/components/RecipeInfo'
import UserSecondNavber from "./components/User/UserSecondNavber";
import Aaa from './components/User/ProfilePages/aaa';

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [connected, setConnected] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState({})
  const [apiRecipes, setapiRecipes] = useState([]);
  const [checkUser, setCheckUser] = useState({
    email: "",
    password: ""
  })
  const [user, setUser] = useState({
    name: ""
  })

  useEffect(() => {
    const checkConnected = JSON.parse(localStorage.getItem("user"))
    if (checkConnected) {
      setConnected(true);
      setUser(prev => checkConnected)
    }

    getRecipe().then(data => setapiRecipes(prev => data))
      .catch(err => alert("error", err))
  }, [])

  useEffect(() => {
    fetchingUser();
    return logOut
  }, [checkUser])

  const fetchingUser = async () => {
    try {
      const isData = await checkLoginAccess({ email: checkUser.email, password: checkUser.password })
      const importUser = await checkingMatch(isData);
      await updatingLoginStatus(importUser)
    } catch (err) {
      console.log(err)
    }
  }

  const checkingMatch = isData => {
    if (isData) {
      return isData;
    }
    return false;
  }


  const updatingLoginStatus = importUser => {
    console.log("importUser", importUser);
    if (importUser) {
      console.log(`have a match user -${importUser.name}`, importUser);
      setConnected(true);
      setUser(prev => importUser);
      localStorage.setItem("user", JSON.stringify(importUser))
      displayLogin()
    } else {
      console.log('no match');
    }
  }


  const logOut = () => {
    localStorage.removeItem("user");
    setConnected(false)
  }

  const userLoginHandler = (info) => {
    setCheckUser(info)
  }


  const displayLogin = () => {
    const temp = showLogin === false ? true : false;
    setShowLogin(temp)
  }
  const switchUser = () => {
    const temp = connected === false ? true : false;
    setConnected(temp)
  }

  return <Container fluid className="px-0" >
    <span id="top"></span>
    <Router>
      <Navbar collapseOnSelect expand="lg" sticky="top" className="py-0 styleMainNav" >
        <Navbar.Brand>
          <Link to="/">
            <img src={logo3} style={{ height: '50px', width: '100px' }} alt="logo"></img>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">

          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/"> Home Page </Link>
            </Nav.Link>

            <Nav.Link style={{ display: connected ? 'none' : 'block' }}>
              <Link to="/Sign_Up">Sign Up</Link>
            </Nav.Link>
            <Nav.Link style={{ display: connected ? 'none' : 'block' }}>
              <Link style={{ ariaExpanded: { showLogin } }} onClick={displayLogin}>
                Log in
              </Link>
            </Nav.Link>

            <Nav.Link style={{ display: connected ? 'block' : 'none' }}>
              <Link to="/newRecipe">Add New Recipe</Link>
            </Nav.Link>
            <Nav.Link style={{ display: connected ? 'block' : 'none' }}>
              <Link onClick={logOut}>Logout</Link>
            </Nav.Link>
          </Nav>

        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <FontAwesomeIcon
            icon={faUserCircle}
            style={{ display: connected ? 'block' : 'none' }}
            id="styleIcon" />
          <ListGroup className="dropDownUser">
            <ListGroup.Item>
              <Link className="px-2 mx-4" to="/About_Me">About Me</Link>
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
            <span > Hello, <u> {user.name}</u></span>
          </div>
        </Navbar.Collapse>
      </Navbar >

      <div >
        <Login showLogin={showLogin} onClose={displayLogin} connected={connected} userLoginHandler={userLoginHandler} />
      </div>

      <Switch>
        <Route exact path="/" >
          <SearchForm connected={connected} userName={user.name} />
          <Recipes recipeslst={apiRecipes} isConnected={connected} />
        </Route>
        <Route exact path="/Aaa">
          <Aaa />
        </Route>
        <Route exact path="/Sign_Up">
          <SignUp connected={connected} hasPageAaccess={hasPageAaccess} />
        </Route>
        <Route exact path="/newRecipe">
          {/* <UserSecondNavber connected={connected} /> */}
          <NewRecipe connected={connected} hasPageAaccess={hasPageAaccess} />
        </Route>
        {/* <Route exact path="/My_profile">
          <UserRouter connected={connected} hasPageAaccess={hasPageAaccess} />
        </Route> */}
        <Route exact path="/recipe_details/:id">
          <RecipeInfo connected={connected} hasPageAaccess={hasPageAaccess} onselect={selectedItem} />
        </Route>
        <Route exact path="/MyFavorites">
          <UserSecondNavber connected={connected} />
          <MyFavorites connected={connected} hasPageAaccess={hasPageAaccess} Recipes={apiRecipes} onSelected={setSelectedRecipe} />
        </Route>
        <Route exact path="/About_Me">
          <UserSecondNavber connected={connected} />
          <AboutMe connected={connected} hasPageAaccess={hasPageAaccess} onConnect={switchUser} />
        </Route>
        <Route exact path="/My_Recipes">
          <UserSecondNavber connected={connected} />
          <MyRecipes connected={connected} hasPageAaccess={hasPageAaccess} Recipes={apiRecipes} onSelected={setSelectedRecipe} />
        </Route>
      </Switch>
      <div style={{ height: "65px" }}>
        <div className="footer text-white text-center mb-0">
          <p>
            © Israela Zimru
            <a href="#top" className="text-white pl-2">
              | top
            </a>
          </p>
        </div>
      </div>
    </Router >
  </Container>
}
export default App;
