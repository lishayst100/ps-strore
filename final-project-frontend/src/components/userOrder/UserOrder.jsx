import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { baseUrl } from '../../features/utils';

const UserOrder = () => {
    const [user, setUser] = useState([])
    const nav = useNavigate()
    const username = JSON.parse(localStorage.getItem("user")).username;
    const getOrder = () => {
        fetch(`${baseUrl}api/games/userOrder/${username}`)
        .then(res => res.json())
        .then(result => setUser(result))
        .catch(e => console.log(e))
    }
    useEffect(()=>{getOrder()}, []);

    const completeOrder = (id) => {
      Swal.fire({
        title: "Do you receive your order?",
        showCancelButton: true,
        cancelButtonColor: "#dc3545",
        confirmButtonText: "Yes, Complete the Order",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`${baseUrl}api/games/completeStatus/${id}`, {
            method: "PUT",
          })
            .then((res) => res.json())
            .catch((e) => console.log(e));
          Swal.fire("Ordered Completed", "", "success");
          nav('/')
        }
      });
    }
    
    

    
  return (
    <div>
      {user.length === 0 && <ColorRing />}
      {user.length > 0 && (
        <>
          <div className="row container mx-lg-auto">
            <h2>Your Orders</h2>
            {user.map((order) => (
              <div key={order._id} className="shadow-lg p-3 rounded-3  m-3">
                <p className="text-start font-larger">
                  Order Number : {order._id}
                </p>
                <p className="text-start font-larger">
                  Order Date : {order.date}
                </p>
                <p className="text-start font-larger">
                  Order Name : {order.creditCardName}
                </p>
                <p className="text-start font-larger">
                  Number of items : {order.orderDetails.length}
                </p>
                <p className="text-start font-larger">
                  Address to Deliver: {order.address}
                </p>
                <p className="text-start font-larger">Status: {order.status}</p>
                <div
                  className="d-flex justify-content-center flex-wrap
                
                "
                >
                  {order.orderDetails.map((game) => (
                    <div key={game._id} className="m-2">
                      <img
                        src={game.frontImage}
                        alt="game"
                        className="img-size"
                      />
                      <div>{game.title}</div>
                      <div>Price : {game.price}$</div>
                      <div>Quantity : {game.cartQuantity}</div>
                    </div>
                  ))}
                </div>
                <h4>Total Price : {order.CartTotalAmount}$</h4>
                <button className="btn btn-success" onClick={()=>{completeOrder(order._id)}}>Complete Order</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default UserOrder