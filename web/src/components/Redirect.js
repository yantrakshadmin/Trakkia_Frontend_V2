import {useEffect} from 'react';

const Redirect = ({navigate, user}) => {
  useEffect(() => {
    if (user?.audit_access === true) {
      navigate(`/${user.type}/audit-access/`);
    }
    else {
      navigate(`/${user.type}/dashboard/`);
    }



  }, [user.type, navigate]);
  return null;
};

export default Redirect;
