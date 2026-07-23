import { Table, Button, Space, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import styled from 'styled-components';

const { Title } = Typography;

const Container = styled.div`
  padding: 24px;
`;

// Dados mock
const data = [
  { key: '1', name: 'Admin 1', email: 'admin1@example.com', role: 'ADMIN' },
  { key: '2', name: 'Admin 2', email: 'admin2@example.com', role: 'ADMIN' },
];

type DataType = typeof data[0];

const columns: ColumnsType<DataType> = [
  { title: 'Nome', dataIndex: 'name', key: 'name' },
  { title: 'E-mail', dataIndex: 'email', key: 'email' },
  { title: 'Função', dataIndex: 'role', key: 'role' },
  {
    title: 'Ações',
    key: 'actions',
    render: (_, record) => (
      <Space>
        <Button type="primary" size="small">Editar</Button>
        <Button type="default" size="small">Redefinir senha</Button>
      </Space>
    ),
  },
];

const AdminUsersAdmin = () => (
  <Container>
    <Title level={2}>Usuários Administradores</Title>
    <Button type="primary" style={{ marginBottom: 16 }}>Inserir</Button>
    <Table columns={columns} dataSource={data} />
  </Container>
);

export default AdminUsersAdmin;
