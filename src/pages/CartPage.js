import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import { addDoc, collection } from 'firebase/firestore';
import fireDB from '../fireConfig';
import { toast } from 'react-toastify';

function Cartpage() {
  const { cartItems } = useSelector(state => state.cartReducer);
  // console.log(cartItems);
  const [totalAmount, setTotalAmount] = useState(0)
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    let sum = 0;
    cartItems.forEach((cartItem) => {
      sum = sum + cartItem.price
    })
    setTotalAmount(sum)
  }, [cartItems])

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems]);

  const deleteFromCart = (item) => {
    dispatch({ type: "DELETE_FROM_CART", payload: item})
  }

  const placeOrder = async () => {
    const addressInfo = {
      name,
      address,
      phoneNumber,
      pincode
    }
    // console.log(addressInfo);

    const orderInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem("currentUser")).user.email,
      userid: JSON.parse(localStorage.getItem("currentUser")).user.uid
    }

    try {
      setLoading(true);
      const result = await addDoc(collection(fireDB, 'orders'), orderInfo); // here orderInfo the 2nd parameter what data we want to send 
      console.log(result);
      toast.success('Order Placed Successfully')
      setLoading(false);
      handleClose();
    } catch (err) {
      console.log(err)
      toast.error('Failed to Order')
      // setLoading(false);
    }
  }

  return (
    <Layout loading={loading}>
        <table className='table mt-2'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
              {cartItems.map((item, index)=> {
                // console.log(item)
                return <tr key={index}>
                  <td>
                    <img src={item.imageURL} alt="img" height="80" width="80" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td><FaTrash onClick={() => deleteFromCart(item)}/></td>
                </tr>
              })}
          </tbody>
        </table>

        <div className='d-flex justify-content-end'>
              <h1 className='total-amount'>
                Total Amount = {totalAmount} Rs/-</h1>
        </div>

        <div className='d-flex justify-content-end mt-3'>
          <button onClick={handleShow}>PLACE ORDER</button>
        </div>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="register-form">
              <h2>Add Your Address</h2>
              <hr />
              <input type="text" className="form-control"
                placeholder="name"
                value={name}
                onChange={e => setName(e.target.value)}  
              />
              {/* <input type="text" className="form-control"
                placeholder="Address"
                value={address}
                onChange={e => setAddress(e.target.value)}  
              /> */}
              <textarea rows={3}
                className="form-control"
                placeholder="address"
                defaultValue={address}
                onChange={e => setAddress(e.target.value)}
              ></textarea>

              <input type="number" className="form-control"
                placeholder="phone number"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}  
              />
              <input type="number" className="form-control"
                placeholder="pincode"
                value={pincode}
                onChange={e => setPincode(e.target.value)}  
              />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>
            Close
          </button>
          <button onClick={placeOrder}>
            ORDER
          </button>
        </Modal.Footer>
      </Modal>
    </Layout>
  )
}

export default Cartpage