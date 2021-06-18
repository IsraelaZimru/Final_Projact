import { Card, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";


export default function Recipes({ recipeslst, onSelected }) {
    const history = useHistory()

    const chooseRepice = (food) => {
        console.log("coose random food");
        onSelected(food)
        history.push("/recipe_details")
    }

    return <Container >
        <Row className="justify-content-md-center">
            {recipeslst.map((item, i) => <Card
                id="myFav"
                key={i}
                text={'white'}
                style={{ width: '18rem', cursor: "pointer" }}
                className="m-3 styleCard"
                onClick={e => chooseRepice(item)}
            >
                <Card.Header>Header</Card.Header>
                <Card.Img variant="top" src={item.pic} height="160px" weidth="286px" />

                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk
                        of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>)}
        </Row>
    </Container>
}