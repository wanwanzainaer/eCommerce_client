import React, { ReactNode } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

interface props {
  children: ReactNode;
}

const FormContainer = ({ children }: props) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};
export { FormContainer };
