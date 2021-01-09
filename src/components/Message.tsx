import { Component } from 'react';
import { Alert } from 'react-bootstrap';

interface props {
  variant: string;
  children: string;
}

const Message = ({ variant, children }: props) => {
  return <Alert variant={variant}>{children}</Alert>;
};
Message.defaultProps = {
  variant: 'info',
};
export { Message };
