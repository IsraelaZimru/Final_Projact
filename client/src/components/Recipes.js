import { Card, Container, Row, Col, Pagination, ButtonGroup, Button, ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faEdit, faHeart, faEye, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


export default function Recipes({ recipeslst, isConnected, onSort, selectedIng, setSelectedIng }) {
    const history = useHistory()
    const [like, setLike] = useState(false); //להכניס לכל יוזר מערך מתכונים אהובים ומתכון ששם או נכנס יוחלף צבעו

    const closeHandler = (ing) => {
        const temp = selectedIng.filter(name => name !== ing)
        setSelectedIng(prev => temp)
    };
    const sort = (sortby) => {
        //
    }

    const chooseRepice = (food) => {
        history.push(`/recipe_details/${food.id}`)
    }

    let active = 1;
    let items = [];
    for (let number = 1; number <= 3; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }

    const paginationBasic = (
        <div >
            <Pagination>{items}</Pagination>
        </div>
    );

    return <Container fluid className="py-2">
        <div>
            <p className="sortRacipes">Sort by :
                <span onClick={() => { onSort("likes"); console.log("clicked") }}>Most popular</span>|
                <span onClick={() => sort("date")}>The newest</span></p>
        </div>
        <ListGroup horizontal>
            {!!selectedIng.length && selectedIng.map((ing, i) => (<ListGroup.Item key={i}>
                <FontAwesomeIcon icon={faTimesCircle}
                    style={{ cursor: "pointer" }}
                    onClick={() => closeHandler(ing)}
                    className={like ? "text-danger mr-2 ml-2" : "mr-2 ml-2"} />
                {ing}
            </ListGroup.Item>))}
        </ListGroup>
        <Row className="justify-content-center">
            {recipeslst.map((item, i) => <Card
                id="myFav"
                key={i}
                sm={6}
                md={4}
                text={'white'}
                style={{ width: '22rem', }}
                className="m-3 styleCard"
            >
                <Card.Header >
                    <Row>
                        <Col className="px-1" md={{ span: 4 }} sx={{ span: 4 }}>
                            {isConnected && <div>
                                <FontAwesomeIcon icon={faThumbsUp}
                                    style={{ cursor: "pointer" }}
                                    className={like ? "text-danger mr-2 ml-2" : "mr-2 ml-2"} />
                                <FontAwesomeIcon icon={faEdit}
                                    style={{ cursor: "pointer" }}
                                    onClick={e => chooseRepice(item)}
                                    className="mr-2 ml-2" />
                            </div>
                            }
                        </Col>
                        <Col className="px-0" sx={{ span: 4, offset: 4 }} md={{ span: 4, offset: 4 }} >
                            <FontAwesomeIcon icon={faEye}
                                className="ml-2 mr-0" />
                            <span className="pl-2">
                                {item.views}
                            </span>
                            <FontAwesomeIcon icon={faHeart}
                                // style={{ cursor: "pointer" }}
                                className="ml-2 mr-0" />
                            <span className="pl-2">
                                {item.likes}
                            </span>
                        </Col>
                    </Row>
                </Card.Header>
                <div
                    onClick={e => chooseRepice(item)}
                    style={{ cursor: "pointer" }}
                >
                    <Card.Img variant="top" src={item.pic} height="160px" weidth="286px" />
                    {/* <Card.Body> */}
                    <Card.Title className="text-center">{item.name}</Card.Title>
                    <Card.Text className="text-center">
                        {item.description}
                    </Card.Text>
                    {/* </Card.Body> */}
                    <Card.Footer className="text-black">
                        <p className="text-center my-2">
                            {item.allCategories && item.allCategories.map((type, i) => <span key={i}>| {type} </span>)}
                        </p>
                    </Card.Footer>
                </div>
            </Card>)}
        </Row>
        <Row className="justify-content-md-center">
            {paginationBasic}
        </Row>
    </Container >
}