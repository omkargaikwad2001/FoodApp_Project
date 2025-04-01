import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useEffect } from "react";
import {fetchFoodList} from "../Service/foodService";
import { addToCart, getCartData, removeQtyFromCart } from "../Service/cartService";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {

    const [foodList, setFoodList] = useState([]);
    const [quantities, setQuantities] = useState({});

    const [token,setToken] = useState("");


    const increaseQty = async(foodId) =>{
        setQuantities((prev) => ({...prev, [foodId]: (prev[foodId] || 0)+1}));
        await addToCart(foodId, token);
    }

    const descreaseQty = async (foodId) =>{
        setQuantities((prev) => ({...prev, [foodId]: prev[foodId] > 0 ? prev[foodId] - 1 : 0,}));
        await removeQtyFromCart(foodId, token);
    }

    const removeFromCart = (foodId) =>{
        setQuantities((prev) =>{
            const updatedQty = {...prev};
            delete updatedQty[foodId];
            return updatedQty;
        });
    };

    const loadCartData = async (token) =>{
       
        const items = await getCartData(token);
        setQuantities(items);
    }


    const contextValue = {
        foodList,
        increaseQty,
        descreaseQty,
        quantities,
        removeFromCart,
        token,
        setToken,
        setQuantities,
        loadCartData,
    };

    useEffect(()=>{
        async function loadData(){
            const data = await fetchFoodList();
            setFoodList(data);
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[]);

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}