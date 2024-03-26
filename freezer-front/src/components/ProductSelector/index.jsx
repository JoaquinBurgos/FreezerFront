import React from "react";
import SingleProductSelector from "./SingleProductSelector"; // Asegúrate de importar correctamente el componente

const ProductSelectionGroup = ({
  products,
  onProductQuantityChange,
  selectedProducts,
}) => {
  return (
    <>
      {products.map((product) => (
        <SingleProductSelector
          selectedProducts={selectedProducts}
          key={product.id}
          name={product.name}
          image={product.image}
          quantity={selectedProducts[product.id] || 0}
          onChange={(quantity) => onProductQuantityChange(product.id, quantity)}
        />
      ))}
    </>
  );
};

export default ProductSelectionGroup;
