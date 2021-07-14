import { Link } from "react-router-dom";
import { Nav, Navbar } from 'react-bootstrap';


const UserSecondNavber = ({ connected }) => {
    return <Navbar className="justify-content-center userNav" activeKey="/home">
        <Nav>
            <Nav.Link
                // style={{ display: connected ? 'block' : 'none' }}
                className="px-2 ">
                <Link className="px-2 mx-4" to="/User_Profile">User Profile</Link>
                <Link className="px-2 mx-4" to="/MyFavorites">My Favorites</Link>
                <Link className="px-2 mx-4" to="/My_Recipes">My Recipes</Link>
            </Nav.Link>
        </Nav>
    </Navbar>
}

export default UserSecondNavber;