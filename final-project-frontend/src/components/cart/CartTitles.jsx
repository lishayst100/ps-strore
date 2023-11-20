import React from "react";
import "./Cart.scss";

const CartTitles = () => {
  const titles = ["Product", "Price", "Quantity",'Total'];
  return (
    <>
      <div className="row p-3">
        {titles.map((t) => (
          <span className="col title-cart" key={t}>{t}</span>
        ))}
      </div>
      <hr />
    </>
  );
};

export default CartTitles;
