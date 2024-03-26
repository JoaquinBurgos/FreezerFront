import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { login } from '../../api/authApi'; // Importa la función de login desde tu servicio de usuario
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate 

const LoginPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate(); // Obtiene la función de navegación

  const onFinish = async (values) => {
    try {
      await login(dispatch, values.username, values.password);
      // Manejar el éxito del inicio de sesión (redirigir a la página de inicio o al panel de control, etc.)
    } catch (error) {
      console.error('Error during login:', error);
      // Manejar el error del inicio de sesión (por ejemplo, mostrar un mensaje de error al usuario)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    // Si no está autenticado, redirige a la página de login
    if (isAuthenticated) {
        navigate('/crear_ordenes'); // Cambia '/' por la ruta exacta de tu página de login si es diferente
    }
}, [isAuthenticated, navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
