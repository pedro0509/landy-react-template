import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const Dashboard = () => {
  return (
    <div>
      <Title level={2}>Dashboard</Title>
      <Paragraph>Bem-vindo ao painel administrativo. Navegue pelo menu lateral para gerenciar as entidades.</Paragraph>
    </div>
  );
};

export default Dashboard;
