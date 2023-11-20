import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import "../../components/cart/Cart.scss";
import {removeFromCart,addToCart,dicreaseFromCart,getTotal} from "../../features/cartSlice";
import { useEffect } from "react";
import IsCartEmpty from "../../components/cart/IsCartEmpty";
import CartTitles from "../../components/cart/CartTitles";
import Checkout from "../../components/cart/Checkout";
import ClearCart from "../../components/cart/ClearCart";
import Swal from "sweetalert2";
import './Cart.scss'

const Cart = () => {
    window.scroll(0, 0);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };
  const handleDecreaseFromCart = (product) => {
    dispatch(dicreaseFromCart(product));
  };

  return (
    <div className="container p-3">
      <h2 className="p-4">Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <IsCartEmpty />
      ) : (
        <div className="shadow p-3">
          <CartTitles />
          <div className="cart-items">
            {cart.cartItems?.map((item) => (
              <div className="cart-item p-3" key={item._id}>
                <div className="cart-product row">
                  <div className="d-flex flex-column flex-lg-row  col ">
                    <img src={item.frontImage} alt="..." className="img-fluid" />

                    <div className="d-flex align-items-center flex-column justify-content-center">
                      <span className="item-title">{item.title}</span>
                      <span
                        className="remove-btn"
                        onClick={() => {
                          Swal.fire({
                            title: `Do you want to remove ${item.title} your Cart?`,
                            showCancelButton: true,
                            confirmButtonText: "Yes",
                            confirmButtonColor: "#dc3545",
                            denyButtonText: `No`,
                          }).then((result) => {
                            if (result.isConfirmed) {
                              Swal.fire(
                                `${item.title} has removed from your Cart`,
                                "",
                                "success"
                              );
                              handleRemoveItem(item);
                            }
                          });
                        }}
                      >
                        Remove
                      </span>
                    </div>
                  </div>
                  <div className="cart-item-price col my-auto price font-smaller">
                    ${item.price}
                  </div>
                  <div className="cart-item-quantity d-flex justify-content-center align-items-center col flex-row">
                    <button
                      className="btn font-smaller"
                      onClick={() => {
                        handleDecreaseFromCart(item);
                      }}
                    >
                      <AiOutlineMinus/>
                    </button>
                    <div className="price font-smaller">
                      {item.cartQuantity}
                    </div>
                    <button
                      className="btn font-smaller "
                      onClick={() => {
                        handleAddToCart(item);
                      }}
                    >
                      <AiOutlinePlus className="font-smaller" />
                    </button>
                  </div>
                  <div className="cart-item-total-price col my-auto price font-smaller">
                    ${item.price * item.cartQuantity}
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>

          <div className="cart-summary flex-column flex-lg-row gap-3 d-flex justify-content-between alin-items-center my-3 ">
            <ClearCart />
            <Checkout />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
