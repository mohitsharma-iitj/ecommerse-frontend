import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getCart, removeCartItem, updateCartItem } from '../../../State/cart/Action';
import { useNavigate } from 'react-router-dom';

const CartItem = ({item}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleUpdateCartItem=(num)=>{
        const data = {data:{quantity:item.quantity+num},cartItemId:item?._id}
        dispatch(updateCartItem(data))
    }
    const handleRemoveCartItem=()=>{
        dispatch(removeCartItem({cartItemId:item?._id}))
    }

    if(item == null){
        return (
            <div>loading...</div>
        )
    }


    return (
        <div className="mt-5 p-5 shadow-lg border rounded-md">
            <div className="flex items-center">
                <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
                    <img className="w-full h-full object-cover object-top" src={item?.product.imageUrl} alt="" />
                </div>

                <div className="ml-5 space-y-1 ">
                    <p className="font-semibold">{item?.product.title}</p>
                    <p className="opacity-70">Size: {item?.size},{item?.product.color}</p>
                    <p className="opacity-70 mt-2">Seller: {item?.product.brand}</p>

                    <div className='flex space-x-5 items-center pt-6'>
                        <p className='font-semibold'>
                            ${item?.product.discountedPrice}
                        </p>
                        <p className='opacity-50 line-through'>
                            ${item?.product.price}
                        </p>
                        <p className='text-green-600 font-semibold'>{item?.product.discountPersent}% off</p>
                    </div>

                </div>

            </div>
            <div className="lg:flex item-center lg:space-x-10 pt-4">
                <div className="flex items-center space-x-2">
                    <IconButton onClick = {()=>handleUpdateCartItem(-1)} disabled={item?.quantity<=1}>
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                    <span className='py-1 px-7 border rounded-sm'> {item.quantity}</span>
                    <IconButton sx={{ color: "RGB(145 85 253)" }} onClick={() => handleUpdateCartItem(1)} >
                        <AddCircleOutlineIcon />
                    </IconButton>


                    <div>
                        <Button sx={{ color: "RGB(145 85 253)" }} onClick={handleRemoveCartItem}>remove</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem