
import { BACKEND_DOMAIN, token } from '../../../urls';
import axios from 'axios';


export const getAllAmazonProductDetails = async (task_id: number) => {
    const { data } = await axios.get(
      `${BACKEND_DOMAIN}/get-amazon-insights/?task_id=${task_id}`,
      {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: token,
        },
    }
    );

    return { data: data.data };
};
