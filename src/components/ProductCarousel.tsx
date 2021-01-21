import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { Loader } from './Loader';
import { Message } from './Message';
import { getListTopProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { IProduct } from './Product';
import { useEffect } from 'react';
interface ReduxState {
  productTopRating: { loading: boolean; error: boolean; products: IProduct[] };
}
const ProductCarousel = () => {
  const dispatch = useDispatch();
  const { productTopRating } = useSelector((state: ReduxState) => state);
  const { loading, error, products } = productTopRating;
  useEffect(() => {
    dispatch(getListTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} ({product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export { ProductCarousel };
