import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';

const Orders = () => {

  const [data, setData] = useState([]);

  const fetchOrders = async () => {
      const response = await axios.get("http://localhost:8080/api/orders/all");
      setData(response.data);
  };
  

    const updateStatus = async (event,orderId) =>{
      const response =await axios.patch(`http://localhost:8080/api/orders/status/${orderId}?status=${event.target.value}`);
     
      if(response.status===200){
        await fetchOrders();
      }
    }

    useEffect(()=>{
      fetchOrders();
    },[])

  return (
    <div className="container">
      <div className="py-5 row justify-content-center">
        <div className="col-11 card">
          <table className="table table-responsive">
            <tbody>
              {data.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img
                        src={assets.parcel}
                        alt="parcel image"
                        height={50}
                        width={50}
                      />
                    </td>
                    <td>
                      <div>
                      {order.orderedItems.map((item, index) => {
                        if (index === order.orderedItems.length - 1) {
                          return item.name + " X " + item.quantity;
                        } else {
                          return item.name + " X " + item.quantity + ", ";
                        }
                      })}
                      </div>
                      <div>
                        {order.userAddress}
                      </div>
                    </td>
                    <td>&#x20B9;{order.amount}</td>
                    <td>Items:{order.orderedItems.length}</td>
                    <td>
                      <select className="form-control" onChange={(event)=>updateStatus(event,order.id)} value={order.orderStatus}>
                       <option value={"Food Preparing"}>Food Preparing</option> 
                       <option value={"Out for delivery"}>Out for delivery</option> 
                       <option value={"Delivered"}>Delivered</option> 
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
