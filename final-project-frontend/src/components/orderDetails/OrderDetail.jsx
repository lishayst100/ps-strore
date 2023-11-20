import React, { useEffect, useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom'

import Swal from 'sweetalert2';
import { ColorRing } from 'react-loader-spinner';
import { baseUrl } from '../../features/utils';

const OrderDetail = () => {
  const { _id } = useParams();
  const [details, setDetails] = useState({});
  const nav = useNavigate()

  const getDetails = () => {
    fetch(`${baseUrl}api/games/userOrderDetails/${_id}`)
      .then((res) => res.json())
      .then((result) => setDetails(result))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getDetails();
  }, []);

  if (details.orderDetails === undefined) {
    return;
  }

  const initialValue = 0;

    const totalValue = details.orderDetails.reduce(
      (accumulator, currentObject) => {
        return accumulator + currentObject.cartQuantity;
      },
      initialValue
    );


    const shipOrder = () => {

      Swal.fire({
        title: "Did you Deliver the Order?",
        showCancelButton: true,
        cancelButtonColor: "#dc3545",
        confirmButtonText: "Yes, I did",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`${baseUrl}api/games/updateStatus/${_id}`, {
            headers: { Authorization: localStorage.getItem("token") },
            method: "PUT",
          })
            .then((res) => res.json())
            .catch((e) => console.log(e));
          Swal.fire("Ordered Completed", "", "success");
          nav("/");
        }
      });


      
    };


  return (
    <div className="row container mx-auto">
      <h2 className="text-capitalize mb-5">
        {details.creditCardName} Order Details
      </h2>
      <div className="user-details  col-lg">
        <p className="text-start font-larger">Order Number : {details._id}</p>
        <p className="text-start font-larger">Order Date : {details.date}</p>
        <p className="text-start font-larger">
          Order Name : {details.creditCardName}
        </p>
        <p className="text-start font-larger">Number of items : {totalValue}</p>
        <p className="text-start font-larger">
          Address to Deliver: {details.address}
        </p>
        <p className="text-start font-larger">
          Status: {details.status}
        </p>

        <div className="total-ship  d-flex flex-column justify-content-center align-items-center">
          <h4>Total Price : {details.CartTotalAmount}$</h4>
          <button className="btn btn-success" onClick={shipOrder}>
            Ship the Order
          </button>
        </div>
      </div>

      <div className="d-flex justify-content-center flex-wrap col-lg ">
        {details.orderDetails.map((game) => (
          <div key={game._id} className="m-2">
            <img src={game.frontImage} alt="game" className="img-size" />
            <div>{game.title}</div>
            <div>Price : {game.price}$</div>
            <div>Quantity : {game.cartQuantity}</div>
          </div>
        ))}
      </div>
      {!details && <ColorRing />}
    </div>
  );
}

export default OrderDetail