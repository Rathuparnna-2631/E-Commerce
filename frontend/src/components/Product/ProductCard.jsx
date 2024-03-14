import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../shared/Rating";

function ProductCard({ product }) {
    return (
        <Link to={`/product/${product._id}`}>
            <Card className="my-3 p-3 rounded">

                <Card.Img src={product.image} variant="top" />
                <Card.Body>
                    <Card.Title as="div" className="product-title">
                        <strong>{product.name}</strong>
                    </Card.Title>
                    <Card.Text as="div">
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </Card.Text>
                    <Card.Text as="h3">
                        ${product.price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default ProductCard