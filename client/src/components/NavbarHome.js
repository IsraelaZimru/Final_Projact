import logo3 from '../imgs/logo3.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { ListGroup, Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';



const NavbarHome = ({ connected, user, logOut, showLogin, displayLogin }) => {


    return <Navbar collapseOnSelect expand="lg" sticky="top" className="py-0 styleMainNav" >
        <Navbar.Brand
            onClick={() => window.scrollTo(0, 0)}>
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

                <Nav.Link>
                    <HashLink smooth to="/#recipes">
                        All Recipes
                    </HashLink>
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
                    {/* <Link className="px-2 mx-3" onClick={switchUser}>Logout</Link> */}
                    <Link className="px-2 mx-3" onClick={logOut}>Logout</Link>
                </ListGroup.Item>
            </ListGroup>
            <div
                style={{ display: connected ? 'block' : 'none' }}
                className="mb-1">
                <span > Hello, <u> {user.name}</u></span>
            </div>
        </Navbar.Collapse>
    </Navbar >
}

export default NavbarHome;