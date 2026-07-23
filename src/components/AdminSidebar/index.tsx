import { Menu, Layout } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import {
  UserOutlined,
  TeamOutlined,
  TrophyOutlined,
  PlayCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';

const { Sider } = Layout;

const StyledSider = styled(Sider)`
  background: #081423;
  min-height: 100vh;
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }
  .ant-menu {
    background: transparent;
    border-right: none;
  }
  .ant-menu-item, .ant-menu-submenu-title {
    color: #fff;
    &:hover {
      color: #C8993D !important;
    }
  }
  .ant-menu-item-selected {
    background-color: #2A8C4A !important;
    color: #fff !important;
  }
`;

const LogoContainer = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #C8993D;
  font-family: 'Kanit', sans-serif;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #1A2D3A;
`;

const AdminSidebar = () => {
  const history = useHistory();
  const location = useLocation();

  const handleMenuClick = ({ key }: { key: string }) => {
    history.push(key);
  };

  return (
    <StyledSider width={250}>
      <LogoContainer>Bicho do Atleta</LogoContainer>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        defaultOpenKeys={['cadastros']}
        onClick={handleMenuClick}
      >
        <Menu.SubMenu key="cadastros" icon={<SettingOutlined />} title="Cadastros">
          <Menu.Item key="/admin/usuarios-admin" icon={<UserOutlined />}>
            Usuário Administrador
          </Menu.Item>
          <Menu.Item key="/admin/usuarios-fan" icon={<TeamOutlined />}>
            Usuário Fan
          </Menu.Item>
          <Menu.Item key="/admin/campeonatos" icon={<TrophyOutlined />}>
            Campeonatos
          </Menu.Item>
          <Menu.Item key="/admin/times" icon={<TeamOutlined />}>
            Times / Atletas
          </Menu.Item>
          <Menu.Item key="/admin/partidas" icon={<PlayCircleOutlined />}>
            Jogos / Partidas
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </StyledSider>
  );
};

export default AdminSidebar;
