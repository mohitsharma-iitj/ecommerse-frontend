import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/cart/Action";

const Cart = () => {
    const navigate = useNavigate();

    const {cart} = useSelector(store=>store);
    console.log("the cart is",cart)
    const dispatch = useDispatch();
    const handleCheckout = () => {
        navigate("/checkout?step=2")
    }
    
    useEffect(()=>{
        dispatch(getCart())  
    }, [cart.deleteCartItem,cart.updateCartItem])

    // if(cart.loading){
    //     return (
    //         <div> Loading </div>
    //     )
    // }
    if(cart.cart == null){
        return(
            <div> Loading </div>
        )
    }

   

   
    return (
        <div>
            <div className="lg:grid grid-cols-3 lg:px-16 relative">
                <div className="col-span-2">
                    {cart?.cart.cartItem.map((item) => <CartItem item={item} />)}
                </div>
                <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 p-5 ">
                    <div className="border p-5 shadow-lg rounded-md">
                        <p className="uppercase font-bold opacity-60 pb-4">Price details</p>
                        <hr />
                        <div className="space-y-3 font-semibold mb-10 ">
                            <div className="flex justify-between pt-3 text-black ">
                                <span>
                                    Price
                                </span>
                                <span>
                                    ${cart?.cart.totalPrice}
                                </span>
                            </div>
                            <div className="flex justify-between pt-3  text-black">
                                <span>
                                    Discount
                                </span>
                                <span className="text-green-600">
                                    -${cart?.cart.totalPrice-cart.cart?.totalDiscountedPrice}                             </span>
                            </div>
                            <div className="flex justify-between pt-3  text-black">
                                <span>
                                    Delivery charge
                                </span>
                                <span className="text-green-600">
                                    Free
                                </span>
                            </div>
                            <hr />
                            <div className="flex justify-between pt-3  text-black font-bold">
                                <span>
                                    Total Amount
                                </span>
                                <span>
                                    ${cart.cart?.totalDiscountedPrice} 
                                </span>
                            </div>
                        </div>
                        <Button onClick={handleCheckout} className="w-full mt-5" variant='contained' sx={{ px: "2.5em", py: ".7rem", bgcolor: "#9155fd" }}>
                            Checkout</Button>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Cart