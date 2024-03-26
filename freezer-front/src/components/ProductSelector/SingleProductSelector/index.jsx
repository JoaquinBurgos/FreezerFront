import React, { useState } from 'react';
import { Button, Input, Row, Col } from 'antd';

const ProductSelector = ({ name, image, onChange, quantity }) => {

  const handleChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10) || 0;
    onChange(newQuantity); // Actualiza directamente usando onChange
  };

  return (
    <Row gutter={16} align="middle">
      <Col>
        <img src={image} alt={name} style={{ width: 50, height: 50 }} />
      </Col>
      <Col>
        <Input min="0" type="number" value={quantity} onChange={handleChange} style={{ width: 60 }} />
      </Col>
    </Row>
  );
};

export default ProductSelector;
