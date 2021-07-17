import 'bootstrap/dist/css/bootstrap.min.css'
import './CSS/style.css'
import './components/User/CSS/userPages.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import { Nav, Navbar, ListGroup, Container, NavDropdown } from 'react-bootstrap';
import Recipes from './components/Recipes';
import SearchForm from './components/SearchForm';
import { hasPageAaccess, getRecipe, allUsers, getRecipeNames, getingredientsNames, updateUserInfo } from './DAL/api';
import { checkingSignUp } from './DAL/utilFun'
import Login from './components/Login';
import SignUp from './components/SignUp';
import MyFavorites from './components/User/ProfilePages/MyFavorites';
import MyRecipes from './components/User/ProfilePages/MyRecipes';
import UserProfile from './components/User/ProfilePages/UserProfile';
import { useState, useEffect } from 'react';
import NewRecipe from './components/Forms/AddRecipe/newRecipe';
import { checkLoginAccess, addNewUser, selectedItem, getDetaildsFromDb } from './DAL/api'
import logo3 from '../src/imgs/logo3.png'
import RecipeInfo from '../src/components/RecipeInfo'
import UserSecondNavber from "./components/User/UserSecondNavber";
import Aaa from './components/User/ProfilePages/aaa';
import Phase2 from './components/Forms/AddRecipe/Phase2';
import Phase3 from './components/Forms/AddRecipe/Phase3';
import Phase4 from './components/Forms/AddRecipe/Phase4';
import UpdateRecipe from './components/Forms/updateRecipe/UpdateRecipe';
import Step2 from './components/Forms/updateRecipe/Step2';
import Step3 from './components/Forms/updateRecipe/Step3';
import Step4 from './components/Forms/updateRecipe/Step4';

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [connected, setConnected] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState({})
  const [apiRecipes, setApiRecipes] = useState([]);
  const [checkUser, setCheckUser] = useState({
    email: "",
    password: ""
  })
  const [user, setUser] = useState({
    name: "",
    id: NaN
  })

  const [selectedIng, setSelectedIng] = useState([]);


  useEffect(() => {
    const checkConnected = JSON.parse(localStorage.getItem("user"))
    if (checkConnected) {
      setConnected(true);
      setUser(prev => checkConnected)
    }

    // getRecipe().then(data => setApiRecipes(prev => data))
    //   .catch(err => alert("error", err))
  }, [])

  useEffect(() => {
    fetchingUser();
    return logOut
  }, [checkUser])

  // useEffect(() => {
  //   isNewUser()
  // }, [newUser])


  // const isNewUser = async () => {
  //   try {
  //     const answerFromDb = await addNewUser(user);
  //     const importUser = await checkingMatch(answerFromDb);
  //     await updatingLoginStatus(importUser)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

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
      // console.log(`have a match user -${importUser.name}`, importUser);
      setConnected(true);
      setUser(prev => importUser);
      localStorage.setItem("user", JSON.stringify(importUser))
      // displayLogin()
      setShowLogin(false)
    } else {
      console.log('no match');
    }
  }


  const onSort = (type) => { //notWorking
    const sortedArr = apiRecipes.sort((a, b) => a[type] > b[type]);
    setApiRecipes(prev => sortedArr)
  }

  const logOut = () => {
    localStorage.removeItem("user");
    setConnected(false)
  }

  const userLoginHandler = (info) => {
    setCheckUser(prev => info)
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
                Login
              </Link>
            </Nav.Link>

            <Nav.Link style={{ display: connected ? 'block' : 'none' }}>
              <Link to="/newRecipe_step1">Add A New Recipe</Link>
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
              <Link className="px-2 mx-4" to={"/User_Profile/" + user.id}>User Profile</Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="px-2 mx-4" to={"/MyFavorites/" + user.id}>My Favorites</Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="px-2 mx-4" to={"/My_Recipes/" + user.id}>My Recipes</Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="px-2 mx-4" to="/newRecipe_step1">Add A New Recipe</Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="px-2 mx-3" onClick={switchUser}>Logout</Link>
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
          <SearchForm connected={connected} userName={user.name} setSelectedIng={setSelectedIng} />
          <Recipes isConnected={connected} UserId={user.id} onSort={onSort} selectedIng={selectedIng} setSelectedIng={setSelectedIng} />
        </Route>
        <Route exact path="/Sign_Up">
          <SignUp connected={connected} hasPageAaccess={hasPageAaccess} checkingSignUp={checkingSignUp} />
        </Route>
        <Route exact path="/newRecipe_step1">
          <NewRecipe connected={connected} hasPageAaccess={hasPageAaccess} />
        </Route>
        <Route exact path="/newRecipe_step2">
          <Phase2 />
        </Route>
        <Route exact path="/newRecipe_step3">
          <Phase3 />
        </Route>
        <Route exact path="/updateRecipe_step1/:id">
          <UpdateRecipe connected={connected} hasPageAaccess={hasPageAaccess} />
        </Route>
        <Route exact path="/updateRecipe_step2/:id">
          <Step2 />
        </Route>
        <Route exact path="/updateRecipe_step3/:id">
          <Step3 />
        </Route>
        <Route exact path="/recipe_details/:id">
          <RecipeInfo connected={connected} hasPageAaccess={hasPageAaccess} onselect={selectedItem} />
        </Route>
        <Route exact path="/MyFavorites/:id">
          <UserSecondNavber connected={connected} />
          <MyFavorites connected={connected} hasPageAaccess={hasPageAaccess} Recipes={apiRecipes} onSelected={setSelectedRecipe} />
        </Route>
        <Route exact path="/User_Profile/:id">
          <UserSecondNavber connected={connected} />
          <UserProfile connected={connected} hasPageAaccess={hasPageAaccess} updateUserInfo={updateUserInfo} getDetaildsFromDb={getDetaildsFromDb} userLoginHandler={userLoginHandler} />
        </Route>
        <Route exact path="/My_Recipes/:id">
          <UserSecondNavber connected={connected} />
          <MyRecipes connected={connected} hasPageAaccess={hasPageAaccess} Recipes={apiRecipes} onSelected={setSelectedRecipe} />
        </Route>

        <Route exact path="/Phase4/:id">
          <Phase4 />
        </Route>
        <Route exact path="/Step4/:id">
          <Step4 />
        </Route>

        <Route component={Aaa} />
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
