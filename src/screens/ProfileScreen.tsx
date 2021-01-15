import { useState, useEffect, FormEvent } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '../components/Message';
import { Loader } from '../components/Loader';
import { History } from 'history';
import { userActionType } from '../actions/userActionType';

import { getUserDetails, updateUserProfile } from '../actions/userActions';

interface props {
  location: { search: string };
  history: History;
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
}
const ProfileScreen = ({ location, history }: props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassowrd] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const { userDetails, userLogin, userUpdateProfile } = useSelector(
    ({ userDetails, userLogin, userUpdateProfile }: reduxState) => {
      return { userDetails, userLogin, userUpdateProfile };
    }
  );
  const { loading, error, user } = userDetails;
  const { userInfo } = userLogin;
  const { success } = userUpdateProfile;
  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: userActionType.USER_UPDATE_PROFILE_REQUEST });
        dispatch(getUserDetails('profile'));
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
      </Col>
    </Row>
  );
};
export { ProfileScreen };
