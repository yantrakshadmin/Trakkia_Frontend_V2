// import React from 'react';
// import {Button, Menu, Text} from 'antd';
// import {signOutUser} from 'common/actions/signIn';
// import {useDispatch, connect} from 'react-redux';
// import {navigate} from '@reach/router';

// const auditAccess = () => {
//   const dispatch = useDispatch();
//   const onSignOut = () => {
//     dispatch(signOutUser());
//     navigate('../');
//   };
//   return (
//     <div>
//       <Menu
//         style={{
//           display: 'flex',
//           justifyContent: 'right',
//           alignItems: 'center',
//           backgroundColor: 'gray',
//           height: '53px',
//         }}
//         //   mode="horizontal"
//         defaultSelectedKeys={['mail']}>
//         {/* <Menu.Item key="2"
//                     // onClick={() => onSignOut()}
//                 >
//             <Text type="danger">Log Out</Text>
//           </Menu.Item> */}
//         <Button onClick={() => onSignOut()} style={{marginRight: '20px'}} type="primary">
//           Logout
//         </Button>
//       </Menu>
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '90vh',
//         }}>
//         <h2>This User Does not have the access please ask the Admin..</h2>
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = (state) => {
//   return { user: state.user.userMeta };
// };

// export default connect(mapStateToProps)(auditAccess);

import React from 'react';
import {Button, Layout, Menu, Typography,} from 'antd';
import {Link} from '@reach/router';
import {useDispatch} from 'react-redux';
import {signOutUser} from 'common/actions/signIn';

import {connect} from 'react-redux';
import {navigate} from '@reach/router';

import {changePage} from 'common/actions/changePage';

const {SubMenu} = Menu;
const {Header, Content, Sider, Footer} = Layout;
const {Text} = Typography;

const ScreenWrapper = ({ navigate }) => {
  const dispatch = useDispatch();
  const onSignOut = () => {
    dispatch(signOutUser());
    navigate('/');
  };

  return (
    <Layout className="">
      <Header
        className="header row align-center justify-between"
        style={{
          display: 'flex',
          justifyContent: 'right',
          alignItems: 'center',
          backgroundColor: 'gray',
          height: '53px',
        }}
        //   style={{ backgroundColor: '#fff', paddingLeft: 20, paddingRight: 20 }}
      >
       
          {/* <Menu.Item key="2" onClick={() => onSignOut()}>
            <Text type="danger">Log Out</Text>
          </Menu.Item> */}
          <Button type='primary' onClick={() => onSignOut()}> Log Out</Button>

      </Header>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh',
        }}>
        <h2>This User Does not have the Access please ask the Admin..</h2>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {user: state.user.userMeta};
};

export default connect(mapStateToProps, {changePage})(ScreenWrapper);
