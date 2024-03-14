
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "../../redux/slices/productsApiSlice";
import Alerts from "../shared/Alerts";
import Loader from '../shared/Loader';


function ProductList() {
    const { data: products, error, } = useGetProductsQuery();
    return (
        <>
            {!products ? <Loader /> : error ? (
                <Alerts variant='danger'>{error?.data?.message || error.error} </Alerts>
            ) : (
                <>
                    <h1>Latest Products</h1>
                    <Row>
                        {(products || []).map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <ProductCard product={product} />
                            </Col>
                        ))}
                    </Row>
                </>)}
        </>
    );
}

export default ProductList;
