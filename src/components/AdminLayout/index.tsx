import { Layout } from 'antd';
import styled from 'styled-components';
import AdminSidebar from '../AdminSidebar';

const { Content, Header } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const TopHeader = styled(Header)`
  background: #1A2D3A;
  padding: 0 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
`;

const ContentContainer = styled(Content)`
  margin: 24px;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  min-height: 280px;
`;

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StyledLayout>
      <AdminSidebar />
      <Layout>
        <TopHeader>
          {/* Pode ser adicionado perfil/logout no futuro */}
          <span>Administrador</span>
        </TopHeader>
        <ContentContainer>
          {children}
        </ContentContainer>
      </Layout>
    </StyledLayout>
  );
};

export default AdminLayout;
