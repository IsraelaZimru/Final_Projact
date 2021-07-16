import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Nav, Navbar } from 'react-bootstrap';
import NoteBook from './ProfilePages/MyFavorites';
import MyRecipes from './ProfilePages/MyRecipes';
import { useEffect } from "react";
import { useHistory } from "react-router";
import { hasPageAaccess } from "../../DAL/api";
import UserProfile from '../User/ProfilePages/UserProfile'
import UserSecondNavber from "./UserSecondNavber";

const UserRouter = ({ connected, hasPageAaccess }) => {
  let history = useHistory();

  useEffect(() => {
    hasPageAaccess(connected, history)
  }, [connected])

  return <Router >

    <Switch>
      <Route exact path="/UserProfile">
        <UserProfile connected={connected} hasPageAaccess={hasPageAaccess} />
      </Route>
      <UserSecondNavber connected={connected} />
      <Route exact path="/My_NoteBook">
        <NoteBook connected={connected} hasPageAaccess={hasPageAaccess} />
      </Route>
      <Route exact path="/My_Recipes">
        <UserSecondNavber connected={connected} />
        <MyRecipes connected={connected} hasPageAaccess={hasPageAaccess} />
      </Route>
    </Switch>
  </Router >
}


export default UserRouter;