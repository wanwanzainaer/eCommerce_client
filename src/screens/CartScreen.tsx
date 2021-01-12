import { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Card,
  Button,
} from 'react-bootstrap';
import { Message } from '../components/Message';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { ICartItem } from '../reducers/cartReducer';
import { History } from 'history';
interface props {
  history: History;
  match: { params: { id: string } };
  location: { search: string };
}

interface reduxState {
  cart: {
    cartItems: ICartItem[];
  };
}

const CartScreen = ({ match, history, location }: props) => {
  const productId = match.params.id;
  const qty = location.search ? +location.search.split('=')[1] : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state: reduxState) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
    console.log('remove' + id);
  };
  const checkoutHandler = () => {
    console.log('Check out');
    history.push('/login?redirect=shipping');
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty<Link to="/">GO BACK</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>{item.price}</Col>

                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        dispatch(addToCart(item.product, +e.target.value));
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To CheckOut
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export { CartScreen };
