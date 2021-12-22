import React, { lazy, useEffect, useState } from 'react';
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
import { useAPI } from 'common/hooks/api';
import { userPoolOperatorChoices } from 'common/formFields/employeeProfile.formFields';
import { loadAPI } from 'common/helpers/api';
import { Loading } from './Loading';

const RootRouter = ({ user }) => {

  const [loading, setLoading] = useState(true)
  
  const [employeesRoutes, setEmployeesRoutes] = useState([{
    name: 'Dashboard',
    icon: ['fas', 'home'],
    path: '/dashboard/',
    Component: lazy(() => import('screens/employee/dashboard.screen')),
  }])

  useEffect(() => {
    
    const fetchMenu = async () => {

      const {data: companyProfile} = await loadAPI(`/company-profile/${user.companyId}/`)
  
      setEmployeesRoutes(employeeRoutes.filter(route => route.name === 'Dashboard' || route.name === 'Reports' || companyProfile[userPoolOperatorChoices[route.name]]))

      setLoading(false)

    }

    if(user.companyId) fetchMenu()

  }, [user])  

  if(loading){
    return <Loading />
  } else if (user) {
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
