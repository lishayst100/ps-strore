
import { useDispatch, useSelector } from 'react-redux'
import { countries } from './countries'
import './Payment.scss'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { initialValues, validationSchema } from '../../validations/payment';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../features/cartSlice';
import Swal from "sweetalert2";
import { baseUrl } from '../../features/utils';

const Payment = () => {
    const cart = useSelector((state) => state.cart);
    const month = [1,2,3,4,5,6,7,8,9,10,11,12]
    const years = [23,24,25,26,27,28,29,30,31,32,33,34]
    const nav =useNavigate()
    const dispatch = useDispatch()
    const date = new Date();
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    

    const handlePayment = (formValues) => {
      const body = {
        creditCardName: formValues.creditCardName,
        username: JSON.parse(localStorage.getItem("user")).username,
        email: JSON.parse(localStorage.getItem("user")).email,
        orderDetails: cart.cartItems,
        CartTotalAmount: cart.CartTotalAmount,
        address: formValues.address,
        date:formattedDate
      };

       fetch(`${baseUrl}api/games/order`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(body),
       })
         .then((res) => res.json)
         .then(()=>{
          Swal.fire('Thank you for your purchase!!!','','success')
          dispatch(clearCart())
          nav('/')
         })
         .catch((e) => console.log(e));
    
        
    };


  


  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handlePayment}
      >
        <Form
          className="bg-light p-4 font-bolder rounded-2 d-flex flex-column gap-3 container w-75 shadow my-3"
          noValidate
        >
          <div className="card-number d-flex flex-column align-items-start needs-validation">
            <label htmlFor="validationCustom01">Card Number</label>
            <Field
              name="creditCardNumber"
              type="text"
              className="form-control"
              id="creditCardNumber"
            />
            <ErrorMessage
              name="creditCardNumber"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="card-name d-flex flex-column align-items-start">
            <label htmlFor="">Owner's Name</label>
            <Field
              name="creditCardName"
              type="text"
              className="form-control"
              id="creditCardName"
            />
            <ErrorMessage
              name="creditCardName"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="cvc countries d-flex justify-content-center gap-4  ">
            <div className="expration d-flex flex-column align-items-start">
              <label htmlFor="">Expiration</label>
              <div className="month d-flex flex-grow-1">
                <select
                  name="month"
                  id=""
                  className="form-select asad"
                  required
                >
                  {month.map((m) => (
                    <option>{m}</option>
                  ))}
                </select>
                <select name="year" id="" className="form-select" required>
                  {years.map((y) => (
                    <option>{y}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="cvc d-flex flex-column align-items-start">
              <label htmlFor="cvc">CVC</label>
              <Field name="CVC" type="text" className="form-control" id="CVC" />
              <ErrorMessage
                name="CVC"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="cvc d-flex flex-column align-items-start">
              <label htmlFor="">Country</label>
              <select name="country" className="form-select" required>
                {countries.map((c) => (
                  <option>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="card-name d-flex flex-column align-items-start">
            <label htmlFor="">Address</label>
            <Field
              name="address"
              type="text"
              className="form-control"
              id="address"
            />
            <ErrorMessage
              name="address"
              component="div"
              className="text-danger"
            />
          </div>

          <div>Total Price: {cart.CartTotalAmount}$</div>
          <button className="btn btn-primary mx-auto" type="submit">
            Pay Now
          </button>
        </Form>
      </Formik>

      <div>
        <h3>Your Order :</h3>
        <div className="container mx-auto row">
          {cart.cartItems.map((game) => (
            <div key={game._id} className="shadow-lg p-3 col-lg-3 col-md-2">
              <p>{game.title}</p>

              <p>Quantity : {game.cartQuantity}</p>
              <p>Total Price : {game.price * game.cartQuantity}$</p>
              <img src={game.frontImage} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Payment