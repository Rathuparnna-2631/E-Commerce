import {useParams} from "react-router-dom";
import products from "../products";
import { Link } from "react-router-dom";
import {Row , Col,Image, ListGroup,Card ,Button, ListGroupItem} from "react-bootstrap";
import Rating from "../Components/Rating";

const ProductScreen = () => {
    const { id : productId}= useParams();
    const product =  products.find((p)=>p._id === productId);
    console.log(product);
  return (
    <>
    <Link className="btn btn-light my-3" to="/">Go Back</Link>
    <Row>
      <Col md={5}>
        <Image src={product.image} alt={product.name} fluid/>
      </Col>
      <Col md={4}>
        <ListGroup  variant="flush" >
          <ListGroupItem >
            <h3>{product.name}</h3>
          </ListGroupItem>
          <ListGroupItem>
            <Rating value={product.rating}  text={`${product.numReviews} reviews`}/>
          </ListGroupItem>
          <ListGroupItem >Price: ${product.price}</ListGroupItem>
        </ListGroup>
      </Col>
      <Col md={3}></Col>
    </Row>
    </>
  )
}

export default ProductScreen