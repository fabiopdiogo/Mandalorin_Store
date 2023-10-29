export const cartReducer = (cartState: any, action: any)=> {
  switch (action.type) {
    case 'POPULATE_EQUIPMENTS':
      return { ...cartState, equipments: action.payload };
    case 'ADD_TO_CART':
      return {
        ...cartState,
        cartItems: [...cartState.cartItems, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...cartState,
        cartItems: cartState.cartItems.filter(item => item.id !== action.payload),
      };
    case 'CLEAR_CART':
    return {
      ...cartState,
      cart: [],
    };
  default:
      return cartState;
  }
};