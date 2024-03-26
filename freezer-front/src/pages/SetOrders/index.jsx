import React, { useState, useEffect } from "react";
import { Form, List, Button, Select, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { useSelector } from "react-redux";
import { getClients } from "../../api/clients";
import { getProducts } from "../../api/products";
import styles from "./styles.module.scss";
import ProductSelectionGroup from "../../components/ProductSelector";

const { Option } = Select;

const SetOrders = () => {
  const [orders, setOrders] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [clients, setClients] = useState([]);
  const [selectedRUT, setSelectedRUT] = useState("");
  const [selectedCliente, setSelectedCliente] = useState(undefined);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(
    products.reduce(
      (acc, product) => ({
        ...acc,
        [product.id]: 0, // Inicializa cada producto con cantidad 0
      }),
      {}
    )
  );

  const generateInitialSelectedProductsState = (products) => {
    return products.reduce(
      (acc, product) => ({
        ...acc,
        [product.id]: 0, // Inicializa cada producto con cantidad 0
      }),
      {}
    );
  };

  const handleProductQuantityChange = (productId, quantity) => {
    setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      [productId]: quantity,
    }));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    fetchClients("");
    fetchProducts();
  }, [isAuthenticated, navigate]);
  const fetchClients = async (searchText) => {
    try {
      const clients = await getClients(accessToken, searchText);
      // Usa _.get para intentar acceder a 'clients.results', y si no existe, usa 'clients' como predeterminado
      const clientList = _.get(clients, "results", clients);
      setClients(clientList); // Asume que la API devuelve una lista de clientes
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const products = await getProducts(accessToken);
      setProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const onRUTChange = (rut) => {
    setSelectedRUT(rut);
    fetchClients(rut);
    setSelectedCliente(undefined);
    form.setFieldsValue({ deliveryAddress: undefined });
    // Filtrar clientes por el RUT seleccionado
  };

  const onFinish = (values) => {
    const selectedClient = _.find(clients, { id: values.deliveryAddress });
    setOrders([...orders, {client: selectedClient, products: selectedProducts}]);
    form.resetFields();
    setSelectedRUT("");
    setSelectedCliente(undefined);
    setSelectedProducts(generateInitialSelectedProductsState(products));
  };
  return (
    <div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="clientRut"
              rules={[
                {
                  required: true,
                  message: "Por favor, selecciona el RUT del cliente!",
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="Busca y selecciona un RUT"
                value={selectedRUT}
                onChange={onRUTChange}
                onSearch={fetchClients}
                filterOption={false}
                notFoundContent={null}
              >
                {[...new Set(clients.map((client) => client.rut))].map(
                  (rut) => (
                    <Option key={rut} value={rut}>
                      {rut}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="deliveryAddress"
              rules={[
                {
                  required: true,
                  message: "Por favor, selecciona un cliente!",
                },
              ]}
            >
              <Select
                placeholder="Selecciona un cliente"
                onChange={(value) => setSelectedCliente(value)}
                notFoundContent={null}
              >
                {clients
                  .filter((client) => client.rut === selectedRUT)
                  .map((client) => (
                    <Option key={client.id} value={client.id}>
                      {client.direccion_entrega}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <div className={styles.productSelectionContainer}>
          <ProductSelectionGroup
            products={products}
            selectedProducts={selectedProducts}
            onProductQuantityChange={handleProductQuantityChange}
          />
        </div>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Añadir Pedido
          </Button>
        </Form.Item>
      </Form>
      <List
        size="large"
        header={<div>Pedidos Registrados</div>}
        bordered
        dataSource={orders}
        renderItem={(item, index) => (
          <List.Item key={index}>
            RUT: {item.rut}, Dirección: {item.direccion_entrega}
          </List.Item>
        )}
      />
    </div>
  );
};

export default SetOrders;
