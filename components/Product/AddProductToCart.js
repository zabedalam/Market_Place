import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import cookie from "js-cookie";


function AddProductToCart({ productId, user }) {
  
  // console.log(user)

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [msg, setMsg] = useState({display: 'none', class: '', msg: '' });  

  const Router = useRouter(); 

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loading ? setDisabled(false) : setDisabled(true);
  }, [loading]);

  function displayError(errorMsg){
    setMsg({display: 'block', class: "msg msg-fail", msg: `Fail! ${errorMsg}.`});
  } 

    async function handleAddProductToCart(e){

      e.preventDefault();
      setLoading(true);

      try{

        const url = `${baseUrl}/api/cart`;
        const payload = { quantity, productId };
        const token = cookie.get('token');
        const headers = {headers: { Authorization: token } }
        await axios.put(url, payload, headers);//.put because we are modifying a sub document and not a entire document
        //we are modifying the products subdocument inside the cart document
       
        setMsg({display: 'block', class: "msg msg-success", msg: "Success! Added to cart."});       

      } catch(error){
        console.error(error);
        displayError(error);
      } finally {
        setLoading(false);
      } 


    }

    const message = msg.display === 'block' ? <div className={msg.class}>{msg.msg}</div> : null;
    const isLoading = loading === true ? <i className="fas fa-spinner fa-spin"></i> : null; 

    const btnType = (user !== undefined)
    ? 
    (<button 
    className="btn btn-primary" 
    onClick={handleAddProductToCart}
    disabled={!disabled || loading}//disable btn and show spinner when submitting    
    >{isLoading}&nbsp;&nbsp;&nbsp;ADD TO CART</button>) 
    : 
    (<button onClick={() => {Router.push('/login')}} className="btn btn-warning">LOGIN TO PURCHASE </button>)

    return (
      <div className="add-to-cart">

          <div className="div-msg">
            {message}
          </div>  

          <input type="number" min="1" name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}//e.target.value is a string Number() converts it to a number
          /> 
          {btnType}
      </div>
  );
}

export default AddProductToCart;
