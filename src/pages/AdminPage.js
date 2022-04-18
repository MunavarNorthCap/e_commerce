import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { collection, getDocs, doc, setDoc, addDoc, deleteDoc } from "firebase/firestore";  // , serverTimestamp, Timestamp
import fireDB from '../fireConfig';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Modal, Tabs, Tab } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function AdminPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    const [product, setProduct] = useState({
        name: "",
        price: 0,
        imageURL: "",
        category: "",
        createdOn: dateTime,
    })
    // console.log(product.createdOn)
    const [show, setShow] = useState(false);
    const [add, setAdd] = useState(false);
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
      const x = JSON.parse(localStorage.getItem('currentUser'))
      
      if(x.user.email !== 'admin@gmail.com') {
        navigate('/')
      }
    }, )

    useEffect(() => {
        getData()
      }, []);
    
    async function getData() {
        setLoading(true)
        try{
          const users = await getDocs(collection(fireDB, "products"));
          const productArray = [];
          users.forEach((doc) => {
            const obj = {
              id: doc.id,
              ...doc.data()
            }
            productArray.push(obj);            
            setLoading(false);
          })          
          setProducts(productArray);
        } catch (error) {
          console.log(error);
          setLoading(false)
        }
    }

    const editHandler = (item) => {
        setProduct(item)
        setShow(true)
    }

    const updateProduct = async () => {
        try {
            setLoading(true)
            await setDoc(doc(fireDB, "products", product.id), product)
            toast.success('Product updated Successfully')
            // window.location.reload()
            getData();
            handleClose();
        } catch(err) {
            console.log(err)
            toast.error('Product update Failed')
            setLoading(false)
        }
    }

    const addProduct = async () => {
        try {
            setLoading(true)
            await addDoc(collection(fireDB, "products"), product)
            toast.success('Product added Successfully')
            getData();
            handleClose();
        } catch(err) {
            console.log(err)
            toast.error('Product add Failed')
            setLoading(false)
        }
    }

    const addHandler = () => {
        setAdd(true);
        handleShow();
    }

    const deleteProduct = async (item) => {
        try {
            setLoading(true)
            await deleteDoc(doc(fireDB, 'products', item.id))
            toast.success("Product deleted successfully")
            getData()
        } catch (error) {
            // console.log(error);
            toast.error('Failed to delete')
            setLoading(false)
        }
    }
    useEffect(() => {
      getOrderData();
    }, []);
  
    async function getOrderData() {
      try {
        setLoading(true);
        const result = await getDocs(collection(fireDB, "orders"));
        const orderArray = [];
        result.forEach((doc) => {
          orderArray.push(doc.data());
          setLoading(false);
        });
        setOrders(orderArray);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    
  return (
    <Layout loading={loading}>
        <Tabs
        defaultActiveKey="products"
        id="uncontrolled-tab-example"
        className="mb-3">
        <Tab eventKey="products" title="Products">            
        <div className='d-flex justify-content-between mx-2'>
            <h3>Products List</h3>
            <button onClick={addHandler}>ADD PRODUCTS</button>
        </div>
        <table className='table mt-2'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>              
              <th>Category</th>
              <th>Price</th>
              <th>Timestamp</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
              {products.map((item, index)=> {
                return <tr key={index}>
                  <td>
                    <img src={item.imageURL} alt="img" height="80" width="80" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.createdOn}</td> 
                  <td></td>
                  <td> <FaTrash color='red' size={20}
                        onClick={() => deleteProduct(item)} />
                      <FaEdit color='blue' size={20}
                        onClick={() => editHandler(item)} />
                    </td>
                </tr>
              })}
          </tbody>
        </table>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{add ? 'Add a Product' : 'Edit Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="register-form">
              <input type="text" className="form-control"
                placeholder="name"
                value={product.name}
                onChange={e => setProduct({...product, name: e.target.value})}  
              />
              <input type="text"
                className="form-control"
                placeholder="imageURL"
                value={product.imageURL}
                onChange={e => setProduct({...product, imageURL: e.target.value})}
              />

              <input type="number" className="form-control"
                placeholder="price"
                value={product.price}
                onChange={e => setProduct({...product, price: e.target.value})}  
              />
              <input type="text" className="form-control"
                placeholder="category"
                value={product.category}
                onChange={e => setProduct({...product, category: e.target.value})} 
              />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button> Close </button>
          {add ? (<button onClick={addProduct}> SAVE </button>) 
            : (<button onClick={updateProduct}> SAVE </button>)}
        </Modal.Footer>
      </Modal>
        </Tab>
        <Tab eventKey="orders" title="Orders">
        <div className="p-2">
        { orders.map((order, k) => (
            <table className="table mt-3 order" key={k}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <img src={item.imageURL} alt="img" height="80" width="80" />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ))}
      </div>
        </Tab>
      </Tabs>        
    </Layout>
  )
}

export default AdminPage;