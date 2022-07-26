import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';

import './App.css';
import { Outlet } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;

export function App() {
  const menuElem = [
    {
      id: 'search',
      title: 'Поиск',
      icon: <SearchOutlined />,
    }
  ]

  const items: MenuProps['items'] = menuElem.map((elem) => ({
    key: elem.id,
    icon: elem.icon,
    label: elem.title,
  }));

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
          height: '100vh',
        }}
      >
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'scroll'
          }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24 }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
};