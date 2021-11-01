import { createSelector } from 'reselect';

const reviewsSelector = (state) => state.reviews;
const usersSelector = (state) => state.users;
export const orderSelector = (state) => state.order;
export const productsSelector = (state) => state.products;
export const restaurantsSelector = (state) => state.restaurants;

export const orderProductsSelector = createSelector(
  orderSelector,
  productsSelector,
  (order, products) =>
    Object.keys(order)
      .filter((productId) => order[productId] > 0)
      .map((productId) => products[productId])
      .map((product) => ({
        product,
        amount: order[product.id],
        subtotal: order[product.id] * product.price,
      }))
);

export const totalSelector = createSelector(
  [orderProductsSelector],
  (orderProducts) =>
    orderProducts.reduce((acc, { subtotal }) => acc + subtotal, 0)
);

export const reviewsWithUsersSelector = createSelector(
  reviewsSelector,
  usersSelector,
  (reviews, users) => Object.keys(reviews).reduce((acc, current) => {
      return {
        ...acc,
        [current]: {
          user: users[reviews[current].userId],
          text: reviews[current].text,
          rating: reviews[current].rating
        }
      };
    }, {})
);
