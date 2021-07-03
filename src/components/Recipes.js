import { Card, Container, Row, Col, Pagination } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faEdit, faHeart, faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


export default function Recipes({ recipeslst, onSelected, isConnected }) {


    const history = useHistory()
    const [like, setLike] = useState(true);


    const chooseRepice = (food) => {
        // console.log("coose random food");
        onSelected(food)
        history.push("/recipe_details")
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
        <Row className="justify-content-md-center">
            {recipeslst.map((item, i) => <Card
                id="myFav"
                key={i}
                text={'white'}
                style={{ width: '22rem', }}
                className="m-3 styleCard"
            >
                <Card.Header >
                    <Row>
                        <Col className="px-1" md={{ span: 4, offset: 0 }}>
                            {isConnected && <div>
                                <FontAwesomeIcon icon={faThumbsUp}
                                    style={{ cursor: "pointer" }}
                                    className="mr-2 ml-2" />
                                <FontAwesomeIcon icon={faEdit}
                                    style={{ cursor: "pointer" }}
                                    onClick={e => chooseRepice(item)}
                                    className="mr-2 ml-2" />
                            </div>
                            }
                        </Col>
                        <Col className="px-0" md={{ span: 5, offset: 3 }}>
                            <FontAwesomeIcon icon={faEye}
                                className="ml-2 mr-0" />
                            <span className="pl-2">
                                {item.views}
                            </span>
                            <FontAwesomeIcon icon={faHeart}
                                style={{ cursor: "pointer" }}
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
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk
                            of the card's content.
                        </Card.Text>
                    </Card.Body>
                </div>
            </Card>)}
        </Row>
        <Row className="justify-content-md-center">
            {paginationBasic}
        </Row>
    </Container>
}