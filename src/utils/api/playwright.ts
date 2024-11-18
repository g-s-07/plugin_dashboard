
import { BACKEND_DOMAIN, token } from '../../../urls';
import axios from 'axios';


export const getAllPlaywrightTableCounts = async () => {
    const { data } = await axios.get(
      `${BACKEND_DOMAIN}/tables/row-count/`,
      {
        headers: {
            Authorization: token,
        },
      }
    );

    return { data: data.data };
  };