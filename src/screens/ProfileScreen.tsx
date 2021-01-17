import { useState, useEffect, FormEvent } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '../components/Message';
import { Loader } from '../components/Loader';
import { History } from 'history';
import { userActionType } from '../actions/userActionType';
import { listUserOrder } from '../actions/orderAction';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { LinkContainer } from 'react-router-bootstrap';
import { ICartItem, IShippingAddress } from '../reducers/cartReducer';

interface props {
  location: { search: string };
  history: History;
}

interface IUserOrder {
  _id: string;
  shippingAddress: IShippingAddress;
  orderItems: ICartItem[];
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  totalPrice: number;
  shippingPrice: number;
  isPaid: boolean;
  paidAt: string;
  deliveredAt: string;
  isDelivered: boolean;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
}

interface reduxState {
  userDetails: {
    loading: boolean;
    user: { _id: string; name: string; email: string };
    error: string;
  };
  userLogin: {
    loading: boolean;
    userInfo: string;
    error: string;
  };
  userUpdateProfile: {
    success: boolean;
  };
  orderUserList: {
    loading: boolean;
    orders: IUserOrder[];
    error: string;
  };
}
const ProfileScreen = ({ location, history }: props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassowrd] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const {
    userDetails,
    userLogin,
    userUpdateProfile,
    orderUserList,
  } = useSelector((state: reduxState) => {
    return state;
  });
  const { loading, error, user } = userDetails;
  const { userInfo } = userLogin;
  const { success } = userUpdateProfile;
  const { loading: ordersLoading, error: ordersError, orders } = orderUserList;
  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: userActionType.USER_UPDATE_PROFILE_REQUEST });
        dispatch(getUserDetails('profile'));
        dispatch(listUserOrder());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>Sign Up</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassowrd(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {ordersLoading ? (
          <Loader />
        ) : ordersError ? (
          <Message variant="danger">{ordersError}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>{' '}
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};
export { ProfileScreen };
