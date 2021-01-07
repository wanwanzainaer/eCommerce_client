import axios from 'axios';
import { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { IProduct, Product } from '../components/Product';
const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    fetchProduct();
  }, []);
  return (
    <>
      <h1>Latest Prodeucts</h1>
      <Row>
        {products.map((product: IProduct) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Product product={product} key={product._id} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export { HomeScreen };
