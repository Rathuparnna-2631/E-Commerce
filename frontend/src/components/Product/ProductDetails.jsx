
import { useState } from "react";
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Alerts from "../shared/Alerts";
import Rating from "../shared/Rating";
import { addToCart } from "../../redux/slices/cartSlice";
import { useGetProductDetailsQuery } from "../../redux/slices/productsApiSlice";
import Loader from '../shared/Loader';

const ProductDetails = () => {
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);


    const { data: product, error } = useGetProductDetailsQuery(productId);
    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }))
        navigate('/cart');
    }
    return (
        <>
            <Link className="btn btn-light my-3" to="/">Go Back</Link>
            {!product ? <Loader /> : error ? (
                <Alerts variant='danger'>{error?.data?.message || error.error} </Alerts>
            ) : (
                <Row>
                    <Col md={5}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={4}>
                        <ListGroup variant="flush" >
                            <ListGroupItem >
                                <h3>{product.name}</h3>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            </ListGroupItem>
                            <ListGroupItem >Price: ${product.price}</ListGroupItem>
                            <ListGroupItem >Description: ${product.description}</ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Price:
                                        </Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Status:
                                        </Col>
                                        <Col>
                                            <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control
                                                    as='select'
                                                    value={qty}
                                                    onChange={(e) => setQty(Number(e.target.value))}>
                                                    {[...Array(product.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <Button className="btn-black" type="button" disabled={product.countInStock === 0}
                                        onClick={addToCartHandler}>
                                        Add to Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>)}

        </>
    )
}

export default ProductDetails