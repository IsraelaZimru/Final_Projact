import 'bootstrap/dist/css/bootstrap.min.css'
import './CSS/style.css'
import './components/User/CSS/userPages.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
import Recipes from './components/Recipes';
import Home from './components/Home';
import { hasPageAaccess } from './DAL/utilFun';
import Login from './components/Forms/usersForms/Login';
import SignUp from './components/Forms/usersForms/SignUp';
import MyFavorites from './components/User/ProfilePages/MyFavorites';
import MyRecipes from './components/User/ProfilePages/MyRecipes';
import UserProfile from './components/User/ProfilePages/UserProfile';
import { useState, useEffect } from 'react';
import NewRecipe from './components/Forms/AddRecipe/newRecipe';
import { checkLoginAccess, selectedItem, getDetaildsFromDb } from './DAL/api'
import RecipeInfo from '../src/components/RecipeInfo'
import UserSecondNavber from "./components/User/UserSecondNavber";
import ErrorMsg from './components/User/ProfilePages/ErrorMsg';
import Phase2 from './components/Forms/AddRecipe/Phase2';
import Phase3 from './components/Forms/AddRecipe/Phase3';
import Phase4 from './components/Forms/AddRecipe/Phase4';
import UpdateRecipe from './components/Forms/updateRecipe/UpdateRecipe';
import Step2 from './components/Forms/updateRecipe/Step2';
import Step3 from './components/Forms/updateRecipe/Step3';
import Step4 from './components/Forms/updateRecipe/Step4';
import NavbarHome from './components/NavbarHome';

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [connected, setConnected] = useState(false)
  const [checkUser, setCheckUser] = useState({
    email: "",
    password: ""
  })
  const [user, setUser] = useState({
    name: "",
    id: NaN
  })



  const userLoginHandler = (info) => {
    setCheckUser(info)
  }
  useEffect(() => {
    const checkConnected = JSON.parse(localStorage.getItem("user"))
    if (checkConnected) {
      setConnected(true);
      setUser(prev => checkConnected)
    }
  }, [])

  useEffect(() => {
    fetchingUser();
    return logOut
  }, [checkUser])


  const fetchingUser = async () => {
    try {
      const isData = await checkLoginAccess({ email: checkUser.email, password: checkUser.password })
      // const importUser = await checkingMatch(isData);
      // await updatingLoginStatus(importUser)
      const res = await checkingMatch(isData);
      return res;
    } catch (err) {
      console.log(err)
    }
  }

  const checkingMatch = isData => {
    if (!isData) {
      console.log('no match');
      return false;
    }
    setConnected(true);
    setUser(prev => isData);
    localStorage.setItem("user", JSON.stringify(isData))
    setShowLogin(false)
    return true;
  }


  const logOut = () => {
    window.scrollTo(0, 0);
    localStorage.clear();
    setConnected(false)
  }



  const displayLogin = () => {
    const temp = showLogin === false ? true : false;
    setShowLogin(temp)
  }

  return <Container fluid className="px-0" >
    <span id="top"></span>
    <Router>
      <NavbarHome connected={connected} user={user} logOut={logOut} showLogin={showLogin} displayLogin={displayLogin} />

      <Login showLogin={showLogin} onClose={displayLogin} setUser={setUser} setConnected={setConnected} />

      <Switch>
        <Route exact path="/" >
          <Home connected={connected} userName={user.name} />
        </Route>
        <Route exact path="/AllRecipes">
          <Recipes isConnected={connected} UserId={user.id} />
        </Route>
        <Route exact path="/Sign_Up">
          <SignUp connected={connected} hasPageAaccess={hasPageAaccess} />
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
          <MyFavorites connected={connected} hasPageAaccess={hasPageAaccess} />
        </Route>
        <Route exact path="/User_Profile/:id">
          <UserSecondNavber connected={connected} />
          <UserProfile connected={connected} hasPageAaccess={hasPageAaccess} getDetaildsFromDb={getDetaildsFromDb} userLoginHandler={userLoginHandler} />
        </Route>
        <Route exact path="/My_Recipes/:id">
          <UserSecondNavber connected={connected} />
          <MyRecipes connected={connected} hasPageAaccess={hasPageAaccess} />
        </Route>
        <Route exact path="/Phase4/:id">
          <Phase4 />
        </Route>
        <Route exact path="/Step4/:id">
          <Step4 />
        </Route>
        <Route component={ErrorMsg} />
      </Switch>



    </Router >

    <div style={{ height: "35px" }} >
      <div className="footer text-white text-center mb-0">
        <p> © Israela Zimru <a href="#top" className="text-white pl-2"> | top </a> </p>
      </div>
    </div>
  </Container>
}
export default App;
