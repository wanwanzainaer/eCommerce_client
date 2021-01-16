import { useState, FormEvent } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FormContainer } from '../components/FormContainer';
import { CheckoutSteps } from '../components/CheckoutSteps';

import { History } from 'history';
import { IShippingAddress } from '../reducers/cartReducer';
import { savePaymentMethod } from '../actions/cartActions';
interface ReduxState {
  cart: {
    shippingAddress: IShippingAddress;
  };
}

interface IPaymentScreen {
  history: History;
}
const PaymentScreen = ({ history }: IPaymentScreen) => {
  const cart = useSelector((state: ReduxState) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Selet Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) =>
                setPaymentMethod((e.target as HTMLInputElement).value)
              }
            ></Form.Check>
            {/* <Form.Check
              type="radio"
              label="Stripe or Credit Card"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              checked
              onChange={(e) =>
                setPaymentMethod((e.target as HTMLInputElement).value)
              }
            ></Form.Check> */}
          </Col>
        </Form.Group>

        <Button type="Submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export { PaymentScreen };
