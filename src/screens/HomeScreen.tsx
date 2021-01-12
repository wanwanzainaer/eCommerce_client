import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getListProducts } from '../actions/productActions';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { IProduct, Product } from '../components/Product';

interface reduxState {
  productList: {
    loading: boolean;
    products: IProduct[];
    error: string;
  };
}

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state: reduxState) => state.productList);
  const { products, loading, error } = productList;
  useEffect(() => {
    dispatch(getListProducts());
  }, [dispatch]);
  return (
    <>
      <h1>Latest Prodeucts</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          {products.map((product: IProduct) => {
            return (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export { HomeScreen };
