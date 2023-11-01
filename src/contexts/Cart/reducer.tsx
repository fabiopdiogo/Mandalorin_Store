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
      case 'UPDATE_CART_QTY':
        return {
          ...cartState,
          cart: cartState.cartItems.map((item: any) => {
            if (item.id === action.payload.id) {
              return { ...item, quantity: action.payload.quantity };
            }
            return item;
          }),
        };
    case 'CLEAR_CART':
    return {
      ...cartState,
      cartItems: [],
    };
  default:
      return cartState;
  }
};