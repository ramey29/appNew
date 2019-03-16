import Env from './Env';

const CURRENT_ENV = Env.CURR_ENV;

const BASE_URL = {
  LOCAL: 'http://localhost:3000',
  STAGE: '',
  PREPROD: '',
  PROD: ''
};

const RESTAURANTSERVICE = `${BASE_URL[CURRENT_ENV]}`;



export const getRestaurantAPI = () => ({
  GET_RESTAURANT: `${RESTAURANTSERVICE}/restaurants`
});


