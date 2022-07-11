import React, { lazy, useEffect, useState } from 'react';
import { navigate, Router } from '@reach/router';
import { connect, useDispatch } from 'react-redux';
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
import { signOutUser } from 'common/actions/signIn';

const RootRouter = ({ user }) => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)
  const [companyProfile, setCompanyProfile] = useState(null);
  
  const [employeesRoutes, setEmployeesRoutes] = useState([{
    name: 'Dashboard',
    icon: ['fas', 'home'],
    path: '/dashboard/',
    Component: lazy(() => import('screens/employee/dashboard.screen')),
  }])

  console.log(companyProfile, "companyProfile");
  useEffect(() => {
    
    const fetchMenu = async () => {

      const { data: companyProfileData, error } = await loadAPI(`/company-profile/${user.companyId}/`)
      setCompanyProfile(companyProfileData);

      if(error) {
        await dispatch(signOutUser())
        await navigate('/')
      }
  
      setEmployeesRoutes(employeeRoutes.filter(route => route.name === 'Dashboard' || route.name === 'Reports' || route.name === 'DEPS' || (companyProfile && companyProfile[userPoolOperatorChoices[route.name]])  ))

      setLoading(false)

    }

    if(user.companyId) fetchMenu()
    else setLoading(false)

  }, [user])  

  if(loading){
    return <Loading />
  } else if (user) {
    switch (user.type) {
      case 'public':
        return (
          <Router>
           
            
            {publicRoutes.map((Route, index) => {
              if (!Route.key || (companyProfile && companyProfile[Route.key])) {
                return <Route.Component path={Route.path} key={index.toString()} />;
              }
            })}
            <NotFound404Screen default />
          </Router>
        );

      case 'employee':
        return (
          <PrivateRoutes
            companyProfile={companyProfile}
            routes={[ ...employeesRoutes, ...(user.isAdmin?superUserRoutes:[])]}
            extraRoutes={[...(user.isAdmin?extraRoutesSuperUser:[]), ...extraRoutesEmployee]}
            outerRoutes={[...(user.isAdmin?outerRoutesSuperUser:[]), ...outerRoutesEmployee]}
            user={user}
          />
        );

      default:
        return (
          <Router>

            {publicRoutes.map((Route, index) => {
              if (!Route.key || (companyProfile && companyProfile[Route.key])) {

                return <Route.Component path={Route.path} key={index.toString()} />;
              }
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
