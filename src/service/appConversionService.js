import Proteus from '../common/Proteus';
import { getRestaurantAPI } from '../common/Urls';

const getRestaurant = (_limit, _page, _sort, _order) => {
  return Proteus().get(getRestaurantAPI().GET_RESTAURANT+`?_limit=${_limit}&_page=${_page}&_sort=${_sort}&_order=${_order}`);
};

export default {
  getRestaurant
};
