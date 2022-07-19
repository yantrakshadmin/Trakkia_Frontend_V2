import React, { useState, Suspense } from 'react';
import { Layout, Menu, Divider, Dropdown, Avatar, Typography, Card, List } from 'antd';
import { Link } from '@reach/router';
import { useDispatch } from 'react-redux';
import { signOutUser } from 'common/actions/signIn';
import { changeView } from 'common/actions/changeView';
import { connect } from 'react-redux';

import { changePage } from 'common/actions/changePage';
import logo from 'common/assets/Yantraksh Logo.png';

import { Loading } from 'components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserImg from "../icons/userImg.jpg"

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
const { Text } = Typography;
const { Meta } = Card;




const ScreenWrapper = ({ routes, navigate, children, user, changePage, companyProfile,  }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [collapsedWidth, setCollapsedWidth] = useState(80);

  const { isAdmin } = user;
  console.log(user.type," wrapperrGGg");



  const dispatch = useDispatch();
  const onSignOut = () => {
    dispatch(signOutUser());
    navigate('../');
  };


  const changeUserView = async (type) => {

    await dispatch(changeView(type))

    window.location.reload('/')

  }
  // user.name.split('')
  const splitstr = user.name.split('')

  const menu = (
    <Menu>
      <SubMenu key="0" title="ViewType">
        {user.companyType.map((type) =>
          <Menu.Item onClick={() => changeUserView(type)} key={type}>
            <Text style={{ color: (user.viewType == type ? '#1890ff' : '') }}>{type}</Text>
          </Menu.Item>
        )}
      </SubMenu>
      {isAdmin &&
        <Menu.Item key="1">
          <Link to={`/${user.type}/edit-profile/`}>Edit Profile</Link>
        </Menu.Item>}
      <Menu.Divider />
      <Menu.Item key="2" onClick={() => onSignOut()}>
        <Text type="danger">Log Out</Text>
      </Menu.Item>
    </Menu>
  );

  const data = [
    {
      title: 'Ant D',
    },
  ];

  return (
    <Layout className="">
      <Header
        className="header row align-center justify-between"
        style={{ backgroundColor: '#fff', paddingLeft: 20, paddingRight: 20 }}>
        <div className="bg-white m-0  row align-center ">
          <img
            style={{
              height: '40px',
              width: '180px',
              position: 'absolute',
            }}
            alt="Yantraksh"
            src={logo}
          />
        </div>

        <Dropdown overlay={menu} trigger={['click']}>
          <div className="row align-center">

            <List
              style={{ minWidth: '100px', }}
              itemLayout="horizontal"
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={user.username}
                    description={user.viewType}
                  />
                </List.Item>
              )}
            />

            <Avatar style={{ textTransform: "uppercase", backgroundColor: "#5986c2" }} size="large" src=""> <span>{splitstr[0][0]}</span> <span> {splitstr[7][0]}</span>
            </Avatar>

          </div>
        </Dropdown>
      </Header>
      <Divider style={{ margin: 0, padding: 0 }} />
      <Layout>
        <Sider
          // trigger={null}
          // style={{zoom: '90%'}}
          collapsible
          width={200}
          collapsedWidth={collapsedWidth}
          onCollapse={() => {
            setCollapsedWidth(80);
            setIsCollapsed(!isCollapsed);
          }}
          className="site-layout-background">
          <Menu
            theme="dark"
            mode="inline"
            inlineCollapsed
            // defaultSelectedKeys={[routes[0].name]}
            defaultSelectedKeys={'Dashboard'}
            // defaultOpenKeys={[routes[0].name]}
            style={{ height: '100%', borderRight: 0 }}>
            {routes.map((i) => {
              if (!i.key || (companyProfile && companyProfile[i.key])) {
                if (i.subMenu) {
                  return (
                    <SubMenu
                      key={i.name}
                      icon={
                        <FontAwesomeIcon icon={i.icon} style={{ marginRight: isCollapsed ? 50 : 5 }} />
                      }
                      title={i.name}>
                      {i.subMenu.map((subItem) => {
                        if (!subItem.key || (companyProfile && companyProfile[subItem.key])) {

                          return (
                            <Menu.Item key={subItem.name}>
                              <Link
                                to={`/${user.type}${subItem.path}`}
                                key={subItem.name}
                                onClick={() => changePage(1)}>
                                {subItem.name}
                              </Link>
                            </Menu.Item>
                          )
                        }
                      
                      })}
                    </SubMenu>
                  );
                }

                return (
                  <Menu.Item
                    key={i.name}
                    icon={
                      <FontAwesomeIcon icon={i.icon} style={{ marginRight: isCollapsed ? 50 : 5 }} />
                    }>
                    <Link to={`/${user.type}${i.path}`} key={i.name} onClick={() => changePage(1)}>
                      {i.name}
                    </Link>
                  </Menu.Item>
                );
              }
            })}
          </Menu>
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Suspense fallback={<Loading />}>
            <Content
              className="site-layout-background content-style"
              style={{ minHeight: `calc( 100vh - 184px )` }}>
              {children}
            </Content>
          </Suspense>
          <Footer className="row justify-end ">
            <span>
              <a target="_blank" rel="noopener noreferrer" href="https://yantraksh.com">
                Yantraksh Logistics Pvt. Ltd.
              </a>{' '}
              &copy; All rights reserved
            </span>
          </Footer>
        </Layout>
      </Layout>
      <Divider style={{ margin: 0, padding: 0 }} />
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user.userMeta };
};

export default connect(mapStateToProps, { changePage })(ScreenWrapper);
