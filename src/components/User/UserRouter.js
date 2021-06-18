import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Nav, Navbar } from 'react-bootstrap';
import NoteBook from './ProfilePages/MyFavorites';
import MyRecipes from './ProfilePages/MyRecipes';
import { useEffect } from "react";
import { useHistory } from "react-router";
import { hasPageAaccess } from "../../DAL/api";
import AboutMe from '../User/ProfilePages/AboutMe'


const UserRouter = ({ connected, hasPageAaccess }) => {
  let history = useHistory();

  useEffect(() => {
    hasPageAaccess(connected, history)
  }, [connected])

  return <Router >
    {/* <Navbar bg="dark" variant="dark" className="justify-content-center" activeKey="/home">
      <Nav className="">

        <Nav.Link
          style={{ display: connected ? 'block' : 'none' }}
          className="px-2">
          <Link className="px-2 mx-4" to="/My_profile">About Me</Link>
          <Link className="px-2 mx-4" to="/My_NoteBook">My NoteBook</Link>
          <Link className="px-2 mx-4" to="/My_Recipes">My Recipes</Link>
        </Nav.Link>

      </Nav>
    </Navbar> */}


    <Switch>
      <Route exact path="/My_profile">
        <AboutMe connected={connected} hasPageAaccess={hasPageAaccess} />
      </Route>
      <Route exact path="/My_NoteBook">
        <NoteBook connected={connected} hasPageAaccess={hasPageAaccess} />
      </Route>
      <Route exact path="/My_Recipes">
        <MyRecipes connected={connected} hasPageAaccess={hasPageAaccess} />
      </Route>
    </Switch>
  </Router >
}


export default UserRouter;