import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getListProducts } from '../actions/productActions';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { IProduct, Product } from '../components/Product';
import { Paginate } from '../components/Paginate';
import { ProductCarousel } from '../components/ProductCarousel';
import { Meta } from '../components/Meta';
interface reduxState {
  productList: {
    loading: boolean;
    products: IProduct[];
    pages: number;
    page: number;
    error: string;
  };
}
interface props {
  match: { params: { keyword?: string; pageNumber: number } };
}

const HomeScreen = ({ match }: props) => {
  const keyword = match.params.keyword || '';
  const pageNumber = +match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const productList = useSelector((state: reduxState) => state.productList);
  const { products, loading, error, page, pages } = productList;
  useEffect(() => {
    dispatch(getListProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Prodeucts</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product: IProduct) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export { HomeScreen };
