import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import { connect } from 'react-redux';
import {
  publicRoutes,
  employeeRoutes,
  superUserRoutes,
  extraRoutesEmployee,
  extraRoutesSuperUser,
  outerRoutesEmployee,
  outerRoutesSuperUser
} from 'web/src/constants/routes';

import { PrivateRoutes } from 'components/PrivateRoutes';
import { NotFound404Screen } from 'screens/404.screen';

const RootRouter = ({ user }) => {

  console.log(user,'user')

  const employeesRoutes = (user.viewType === 'Pool Operator') ? employeeRoutes : employeeRoutes.filter((item) => item.name !== 'Sales')

  if (user) {
    switch (user.type) {
      case 'public':
        return (
          <Router>
            {publicRoutes.map((Route, index) => {
              return <Route.Component path={Route.path} key={index.toString()} />;
            })}
            <NotFound404Screen default />
          </Router>
        );

      case 'employee':
        return (
          <PrivateRoutes
            routes={[ ...(user.isAdmin?superUserRoutes:[]), ...employeesRoutes]}
            extraRoutes={[...(user.isAdmin?extraRoutesSuperUser:[]), ...extraRoutesEmployee]}
            outerRoutes={[...(user.isAdmin?outerRoutesSuperUser:[]), ...outerRoutesEmployee]}
            user={user}
          />
        );

      default:
        return (
          <Router>
            {publicRoutes.map((Route, index) => {
              return <Route.Component path={Route.path} key={index.toString()} />;
            })}
            <NotFound404Screen default />
          </Router>
        );
    }
  }
};

const mapStateToProps = (state) => {
  return { user: state.user.userMeta };
};

export default connect(mapStateToProps)(RootRouter);
