import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import {toast} from "react-toastify";
import { RAZORPAY_KEY } from "../../util/constants";
import {useNavigate} from "react-router-dom";

const PlaceOrder = () => {

  const navigate = useNavigate();
  const {foodList,quantities,setQuantities,token} = useContext(StoreContext);


    const [data, setData] = useState({
      firstName:"",
      lastName:"",
      email:"",
      phoneNumber:"",
      address:"",
      state:"",
      city:"",
      zip:""
    });

    const onChangeHamdler = ((event)=>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}));
    })

    const onSubmitHandler = async (event) =>{
      event.preventDefault();
      
      const orderData = {

        userAddress:`${data.firstName} ${data.lastName} ${data.address} ${data.city} ${data.state} ${data.zip}`,
        phoneNumber:data.phoneNumber,
        email:data.email,
        orderedItems:cartItems.map(item=>({
          foodId:item.foodId,
          quantity:quantities[item.id],
          price:item.price*quantities[item.id],
          category:item.category,
          imageUrl:item.imageUrl,
          description:item.description,
          name:item.name
        })),
        amount:total,
        orderStatus:"Preparing"
      };

      try {
        const response = await axios.post("http://localhost:8080/api/orders/create",orderData,{headers:{"Authorization":`Bearer ${token}`}});
        if(response.status ===201 && response.data.razorpayOrderId){
          initiateRazorpayPayment(response.data);
        }
        else{
          toast.error("Unable to place order.")
        }
      } catch (error) {
        toast.error("Unable to place order.")
      }

    }

    const initiateRazorpayPayment = (order)=>{
      const options ={
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "Food Land",
        description: "Food order payment",
        order_id: order.razorpayOrderId,
        handler: async function(razorpayResponse){
          await verifyPayment(razorpayResponse);
        },
        prefill:{
          name:`${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.phoneNumber,
        },
        theme:{color:"#3399cc"},
        modal:{
          ondismiss: async function(){
            toast.error("Payment cancelled");
            await deleteOrder(order.id);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    };

    const verifyPayment = async (razorpayResponse)=>{

      const paymentData ={
        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
        razorpay_order_id: razorpayResponse.razorpay_order_id,
        razorpay_signature: razorpayResponse.razorpay_signature
      };

      try {
      const response = await axios.post("http://localhost:8080/api/orders/verify",paymentData,{headers:{"Authorization":`Bearer ${token}`}});
      if(response.status ===200){
        toast.success("Payment successful");
        await clearCart();
        navigate("/myorders");
      }else{
        toast.error("Payment failed");
        navigate("/");
      }
    } catch (error) {
      toast.error("Payment failed");
      }
    }

    const deleteOrder = async (orderId)=>{

      try {
        await axios.delete("http://localhost:8080/api/orders/"+orderId,{headers:{"Authorization":`Bearer ${token}`}});
      } catch (error) {
        toast.error("Something went wrong");
      }
    };

    const clearCart = async ()=>{

      try {
        await axios.delete("http://localhost:8080/api/cart",{headers:{"Authorization":`Bearer ${token}`}});
        setQuantities({})
      } catch (error) {
        toast.error("Error clearing cart");
      }
    };



    const cartItems = foodList.filter((food)=> quantities[food.id]>0);

    const subtotal = cartItems.reduce((acc,food)=>acc+food.price*quantities[food.id],0);

    const shipping = subtotal ===0?0:10;
    const tax = subtotal*0.1;
    const total = subtotal+shipping+tax;

  return (
    <div className="container mt-4">
      
        <main>
          <div className="row g-5">
            <div className="col-md-5 col-lg-4 order-md-last">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Your cart</span>
                <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
              </h4>
              <ul className="list-group mb-3">
                {
                  cartItems.map(item=>(
                    <li className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0">{item.name}</h6>
                    <small className="text-body-secondary">Qty: {quantities[item.id]}</small>
                  </div>
                  <span className="text-body-secondary">&#8377;{item.price*quantities[item.id]}</span>
                </li>
                  ))
                }
                <li className="list-group-item d-flex justify-content-between">
                  <div>
                    <span className="fw-bold">Shipping</span>
                  </div>
                  <span className="text-body-secondary">
                  &#8377;{subtotal===0?0:shipping}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <div>
                    <span className="fw-bold">Tax (10%)</span>
                  </div>
                  <span className="text-body-secondary">
                  &#8377;{tax}
                  </span>
                </li>
                
                <li className="list-group-item d-flex justify-content-between">
                  <span className="fw-bold">Total (INR)</span>
                  <strong>&#8377;{total}</strong>
                </li>
              </ul>

            </div>
            <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Billing address</h4>
              <form className="needs-validation" onSubmit={onSubmitHandler}>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">First name</label>
                    <input type="text" className="form-control" id="firstName"
                    name="firstName"
                    onChange={onChangeHamdler}
                    value={data.firstName}
                    required/>
                    
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="lastName" className="form-label">Last name</label>
                    <input type="text" className="form-control" id="lastName"
                    name="lastName"
                    onChange={onChangeHamdler}
                    value={data.lastName}
                    required/>
                    
                  </div>

                  <div className="col-12">
                    <label htmlFor="email" className="form-label">Email</label>
                    <div className="input-group has-validation">
                      <span className="input-group-text">@</span>
                      <input type="email" className="form-control" id="email"
                      name="email"
                      onChange={onChangeHamdler}
                      value={data.email}
                       required/>
                    
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input type="number" className="form-control" id="phoneNumber"
                    name="phoneNumber"
                    onChange={onChangeHamdler}
                    value={data.phoneNumber}
                    required/>
                  </div>

                  <div className="col-12">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address"
                    name="address"
                    onChange={onChangeHamdler}
                    value={data.address}
                    required/>
                  </div>

                  <div className="col-md-5">
                    <label htmlFor="state" className="form-label">State</label>
                    <select className="form-select" id="state"
                    name="state"
                    onChange={onChangeHamdler}
                    value={data.state}
                     required>
                      <option value="">Choose...</option>
                      <option>Maharashtra</option>
                    </select>
                    
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="city" className="form-label">City</label>
                    <select className="form-select" id="city"
                    name="city"
                    onChange={onChangeHamdler}
                    value={data.city}
                     required>
                      <option value="">Choose...</option>
                      <option>Pune</option>
                    </select>
                    
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="zip" className="form-label">Zip</label>
                    <input type="number" className="form-control" id="zip" placeholder=""
                    name="zip"
                    onChange={onChangeHamdler}
                    value={data.zip}
                    required/>
                    
                  </div>
                </div>
                <hr className="my-4"/>

                <button className="w-100 btn btn-primary btn-lg" type="submit" disabled={cartItems.length===0}>Continue to checkout</button>
              </form>
            </div>
          </div>
        </main>
      </div>
  );
};

export default PlaceOrder;
