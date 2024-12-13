export const getPriceQueryParams = (searchParams, key, value) =>{
    const hasValueInParam = searchParams.has(key);

    if(value && hasValueInParam) {
        searchParams.set(key, value)
    } else if (value) {
        searchParams.append(key, value)

    } else if( hasValueInParam){
        searchParams.delete(key)

    }
    return searchParams;
}

export const calculateOrderCost = (cartItems) => {
    const itemsPrice = cartItems?.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  
    const shippingPrice = itemsPrice > 200 ? 0 : 25; // if price over 200 free shipping else 25 for shipping
    const taxPrice = Number((0.07 * itemsPrice).toFixed(2)); //15% tax
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);
  
    return {
      itemsPrice: Number(itemsPrice).toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
    };
  };