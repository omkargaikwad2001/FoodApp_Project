package com.omkarfoodapp.foodiesapi.service;

import com.omkarfoodapp.foodiesapi.io.CartRequest;
import com.omkarfoodapp.foodiesapi.io.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest request);

    CartResponse getCart();

    void clearCart();

    CartResponse removeFromCart(CartRequest cartRequest);
}
