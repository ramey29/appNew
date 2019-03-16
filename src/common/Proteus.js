import Axios from 'axios';

export default () => {
  const axiosInstance = Axios.create({
      headers: {
          'token': ''
      }
  });

  return axiosInstance;
};