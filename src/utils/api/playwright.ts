
import { BACKEND_DOMAIN } from '../../../urls';
import axios from 'axios';


export const getAllPlaywrightTableCounts = async () => {
    const { data } = await axios.get(
      `${BACKEND_DOMAIN}/tables/row-count/`
    );

    return { data: data.data };
  };