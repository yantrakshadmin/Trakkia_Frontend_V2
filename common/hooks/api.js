import {useEffect, useState} from 'react';

import {loadAPI} from '../helpers/api';
import {useSelector} from 'react-redux';

const defaultAPIResponse = {
  loading: true,
  data: undefined,
  error: null,
  status: 0,
};

export const useAPI = (
  url,
  opts = {},
  usePaginated = true,
  useCompanyIdAndViewType,
  pageSize = 10,
) => {
  const {user, page} = useSelector((s) => s);
  const {userMeta} = user;
  const {viewType, companyId} = userMeta;
  const {currentPage} = page;

  const {defaultData, ...options} = opts;
  const [response, setResponse] = useState(defaultAPIResponse);
  const [refresh, setRefresh] = useState(0);
  const reload = () => setRefresh(refresh + 1);

  const ox = JSON.stringify(options);

  useEffect(() => {
    setResponse(defaultAPIResponse);
    const load = async () => {
      setResponse({data: undefined, status: 200, error: undefined, loading: true});
      if (defaultData)
        setResponse({data: defaultData, status: 200, error: undefined, loading: false});
      // noinspection JSCheckFunctionSignatures
      setResponse(
        await loadAPI(
          usePaginated || useCompanyIdAndViewType
            ? `${url}?${useCompanyIdAndViewType ? `company=${companyId}&view=${viewType}` : ''}${
                usePaginated ? `&page=${currentPage}&pageSize=${pageSize}` : ``
              }`
            : url,
          options,
        ),
      );
    };

    load().then();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ox, refresh]);

  return {...response, reload};
};
