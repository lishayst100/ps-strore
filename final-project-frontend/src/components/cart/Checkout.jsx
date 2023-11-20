import { useContext , useEffect, useState} from 'react'
import { FaCartPlus } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../services/loginContext'


const Checkout = () => {
    const cart = useSelector(state => state.cart)
    const [buttonText, setButtonText] = useState('')
    const { isLoggedIn, isAdmin } = useContext(AuthContext);
    const nav = useNavigate()

    useEffect(()=>{
      if (isLoggedIn || isAdmin) {
        setButtonText("Checkout");
      } else {
        setButtonText("Login and Checkout");
      }
    },[])

    
    
    const isLogin = () => {
      if(isLoggedIn || isAdmin){
        nav('/payment')
      }else{
        nav('/login')
      }
    }

  return (
    <div>
      <div className="checkout card d-flex gap-3 flex-column shadow-lg p-5 ">
        <div className="subtotal">
          <span className="price">Subtotal </span>
          <span className="amount price">${cart.CartTotalAmount}</span>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            isLogin();
          }}
        >
         {buttonText}
        </button>
        <div>
          <Link to={"/"}>
            <FaCartPlus />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Checkout