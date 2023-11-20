import React from 'react'
import { useDispatch } from 'react-redux';
import { clearCart } from '../../features/cartSlice';
import Swal from 'sweetalert2';

const ClearCart = () => {
    const dispatch = useDispatch()
    const handleClearCart = () => {
      dispatch(clearCart());
    };

  return (
    <div>
      <div className="my-auto">
        <button
          className="clear-cart btn btn-danger"
          onClick={() => {
            Swal.fire({
              title: "Do you want to clear your Cart?",
              showCancelButton: true,
              confirmButtonText: "Clear",
              confirmButtonColor: "#dc3545",
              denyButtonText: `Don't save`,
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire("The Cart is Clear", "", "success");
                handleClearCart();
              }
            });
          }}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default ClearCart