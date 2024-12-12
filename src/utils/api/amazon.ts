
import { BACKEND_DOMAIN, token } from '../../../urls';
import axios from 'axios';

interface AmazonProductDetailsResponse {
    data: any[]; // Adjust the type if you know the structure of the `data`
    error: string | null; // Error is either a string or null
}


// export const getAllAmazonProductDetails = async (task_id: number, isChecked: boolean): Promise<AmazonProductDetailsResponse> => {
//         const { data } = await axios.get(
//           `${BACKEND_DOMAIN}/get-amazon-insights/?task_id=${task_id}&refresh=${isChecked}`,
//           {
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//                 Authorization: token,
//             },
//         }
//         );
    
//         console.log(data.error);
//         return { data: data.data, error: data.error };
// };


export const getAllAmazonProductDetails = async (
    task_id: number,
    isChecked: boolean
  ): Promise<AmazonProductDetailsResponse> => {
    try {
      const { data } = await axios.get(
        `${BACKEND_DOMAIN}/get-amazon-insights/?task_id=${task_id}&refresh=${isChecked}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: token,
          },
        }
      );
      return { data: data.data, error: null };
    } catch (error: any) {
      const serverError = error.response?.data?.error || "Unknown error occurred";
      return { data: [], error: serverError };
    }
  };
  