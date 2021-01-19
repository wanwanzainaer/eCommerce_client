import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '../components/Message';
import { Loader } from '../components/Loader';
import { History } from 'history';
import { IProduct } from '../components/Product';

import { deleteProduct, getListProducts } from '../actions/productActions';

interface ReduxState {
  productList: { products: IProduct[]; loading: boolean; error: string };

  userLogin: {
    loading: boolean;
    userInfo: { isAdmin: boolean };
    error: string;
  };
  productDelete: {
    loading: boolean;
    success: boolean;
    error: string;
  };
}

interface props {
  history: History;
}

const ProductListScreen = ({ history }: props) => {
  const dispatch = useDispatch();
  const { productList, userLogin, productDelete } = useSelector(
    (state: ReduxState) => state
  );
  const { loading, error, products } = productList;
  const {
    loading: deleteLoading,
    error: errorDelete,
    success: deleteSuccess,
  } = productDelete;
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getListProducts());
    } else {
      history.push('/login');
    }
  }, [dispatch, userInfo, history, deleteSuccess]);

  const deleteHandler = (productId: string) => {
    if (window.confirm('Are you sure?')) {
      //Delete products
      dispatch(deleteProduct(productId));
    }
  };

  const createProductHandler = (product: string) => {
    //CREATE PRODUCT
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={() => createProductHandler('ASDf')}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {deleteLoading && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price} </td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export { ProductListScreen };
