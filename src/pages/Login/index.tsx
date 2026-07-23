import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Card, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";
import api from "../../services/api";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #081423; /* Cores do Bicho do Atleta */
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  background: #1A2D3A;
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);

  .ant-card-head {
    border-bottom: 1px solid #2A8C4A;
    color: #C8993D;
    font-family: 'Kanit', sans-serif;
    font-size: 24px;
    text-align: center;
  }

  .ant-form-item-label > label {
    color: white;
  }

  .ant-input-affix-wrapper {
    background: #081423;
    border: 1px solid #2A8C4A;
    input {
      background: transparent;
      color: white;
    }
    .anticon {
      color: #C8993D;
    }
  }

  .ant-btn-primary {
    background: #2A8C4A;
    border: none;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    &:hover {
      background: #C8993D;
    }
  }
`;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const history = useHistory();

  const extractTokenPayload = (data: any) => {
    return {
      accessToken: data?.accessToken || data?.token || data?.access_token,
      refreshToken: data?.refreshToken || data?.refresh_token,
    };
  };

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      setErrorMessage(null);

      const credentials = {
        email: String(values.email || "").trim(),
        password: values.password,
      };

      let response;
      try {
        response = await api.post("/auth/login", credentials);
      } catch (requestError: any) {
        if (requestError?.response?.status === 401 && credentials.email) {
          response = await api.post("/auth/login", {
            username: credentials.email,
            password: credentials.password,
          });
        } else {
          throw requestError;
        }
      }

      const { accessToken, refreshToken } = extractTokenPayload(response.data);

      if (!accessToken) {
        throw new Error("Token de acesso nao retornado pelo servidor.");
      }
      
      localStorage.setItem("@bicho:accessToken", accessToken);
      if (refreshToken) {
        localStorage.setItem("@bicho:refreshToken", refreshToken);
      }
      
      history.push("/admin/dashboard");
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "E-mail ou senha incorretos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <StyledCard title="Acesso Administrativo">
        <Form
          name="login_form"
          layout="vertical"
          onFinish={onFinish}
        >
          {errorMessage && (
            <Form.Item>
              <Alert type="error" message="Erro de Autenticacao" description={errorMessage} showIcon />
            </Form.Item>
          )}
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              { required: true, message: "Por favor, insira seu e-mail!" },
              { type: "email", message: "Insira um e-mail válido!" }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="admin@bichodoatleta.com" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Senha"
            rules={[{ required: true, message: "Por favor, insira sua senha!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Senha" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </StyledCard>
    </LoginContainer>
  );
};

export default Login;
