import { userAuthenticated } from '../actions/signIn';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/storage';

import { getStorage } from './shared';

import { getUserMeta as getUserMetaAPI } from '../api/auth';

export const getUserMeta = async (dispatch) => {
  const storage = getStorage();
  if (!(await storage.get(ACCESS_TOKEN, null))) return false;

  try {
    const { data: meta } = await getUserMetaAPI();
    if (meta) {
      const { company_type:companyType, name, email, username, id, is_admin:isAdmin, company_id:companyId, user_id: userId } = meta;
      dispatch(userAuthenticated({ name, email, username, id, companyType, isAdmin, viewType: companyType[0]||null ,type : 'employee', active:true, companyId, userId }));
      return false;
    }

    await storage.delete(ACCESS_TOKEN);
    await storage.delete(REFRESH_TOKEN);
  } catch (e) {
    // ignore error
  }

  return true;
};
