import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '../components/Message';
import { Loader } from '../components/Loader';
import { History } from 'history';
import { IProduct } from '../components/Product';
import { Paginate } from '../components/Paginate';
import {
  deleteProduct,
  getListProducts,
  createProduct,
} from '../actions/productActions';
import { productActionType } from '../actions/productActionTypes';

interface ReduxState {
  productList: {
    products: IProduct[];
    loading: boolean;
    error: string;
    pages: number;
    page: number;
  };

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
  productCreate: {
    loading: boolean;
    success: boolean;
    error: string;
    product: IProduct;
  };
}

interface props {
  history: History;
  match: { params: { pageNumber: string } };
}

const ProductListScreen = ({ history, match }: props) => {
  const pageNumber = +match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const { productList, userLogin, productDelete, productCreate } = useSelector(
    (state: ReduxState) => state
  );
  const { loading, error, products, pages, page } = productList;
  const {
    loading: deleteLoading,
    error: errorDelete,
    success: deleteSuccess,
  } = productDelete;
  const {
    loading: createLoading,
    error: errorCreate,
    success: createSuccess,
    product: createdProduct,
  } = productCreate;
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: productActionType.PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push('/login');
    }
    if (deleteSuccess) {
      dispatch(getListProducts('', pageNumber));
    }
    if (createSuccess) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(getListProducts('', pageNumber));
    }
  }, [
    dispatch,
    userInfo,
    history,
    deleteSuccess,
    createSuccess,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (productId: string) => {
    if (window.confirm('Are you sure?')) {
      //Delete products
      dispatch(deleteProduct(productId));
    }
  };

  const createProductHandler = (product: string) => {
    //CREATE PRODUCT
    dispatch(createProduct());
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
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}{' '}
      {createLoading && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
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
          <Paginate page={page} pages={pages} isAdmin={true} keyword="" />
        </>
      )}
    </>
  );
};

export { ProductListScreen };
