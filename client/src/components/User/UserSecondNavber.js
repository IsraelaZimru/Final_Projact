import { Link, useParams } from "react-router-dom";
import { Nav, Navbar } from 'react-bootstrap';


const UserSecondNavber = ({ connected }) => {
    const { id } = useParams();
    return <Navbar className="justify-content-center userNav" activeKey="/home">
        <Nav>
            <Nav.Link
                // style={{ display: connected ? 'block' : 'none' }}
                className="px-2 ">
                <Link className="px-2 mx-4" to={"/User_Profile/" + id}>User Profile</Link>
                <Link className="px-2 mx-4" to={"/MyFavorites/" + id}>My Favorites</Link>
                <Link className="px-2 mx-4" to={"/My_Recipes/" + id}>My Recipes</Link>
            </Nav.Link>
        </Nav>
    </Navbar>
}

export default UserSecondNavber;