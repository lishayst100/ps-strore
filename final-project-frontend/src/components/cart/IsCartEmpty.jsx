import React from 'react'
import { Link} from 'react-router-dom'
import { BsCart4, BsFillBagCheckFill } from 'react-icons/bs'
import './Cart.scss'

const IsCartEmpty = () => {
  return (
    <div>
         <div className='d-flex flex-column gap-4 justify-content-center align-items-center'>
          <p className='price'>Your Cart is Empty</p>
          <BsCart4 className='cart'/>
          <div>
            <Link to={'/'} className="price text-decoration-none">
             
              Start Shopping
              <BsFillBagCheckFill className='m-2' />
            </Link>
          </div>
          <div className='spacer'></div>
        </div>
    </div>
  )
}

export default IsCartEmpty