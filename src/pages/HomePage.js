import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { collection, getDocs } from "firebase/firestore"; // , addDoc
import fireDB from '../fireConfig';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function HomePage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { cartItems } = useSelector(state => state.cartReducer);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState('');
  const [filterType, setFilterType] = useState('');   // for ALL category

  useEffect(() => {
    getData()
  }, []);

  async function getData() {
    setLoading(true)
    try{
      const users = await getDocs(collection(fireDB, "products"));
      const productArray = [];
      users.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, "=>", doc.data());
        const obj = {
          id: doc.id,
          ...doc.data()
        }
        productArray.push(obj);
        setLoading(false);
      })
      // console.log(productArray);
      setProducts(productArray);
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  }
  
  return (
    <Layout loading={loading}>
        <div className="container">
          <div className="d-flex w-50 align-items-center my-3 justify-content-center">
            <input type="text" className='form-control mx-2'
              placeholder='search items'
              value={searchKey}
              onChange={e => setSearchKey(e.target.value)} />
            <select className='form-control mt-3'
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
            >
              <option value="">All</option>
              <option value="electronics">Electronics</option>
              <option value="fashions">Fashions</option>
              <option value="mobiles">Mobiles</option>
              <option value="furniture">Furniture</option>
            </select>
          </div>
          <div className="row">
            {products
              .filter(obj => obj.name.toLowerCase().includes(searchKey))
              .filter(obj => obj.category.toLowerCase().includes(filterType))
              .map((product, index) => {
              return <div className="col-md-4" key={index}>
                <div className="m-2 p-1 product position-relative">
                    <div className='product-content'>
                    <p>{product.name}</p>
                    <div className='text-center'>
                      <img src={product.imageURL} alt="" className='product-img' />
                    </div>
                    </div>

                    <div className='product-action'>
                      <h2>{product.price} Rs/-</h2>
                      <div className="d-flex">
                        <button className='mx-2'
                          onClick={() => addToCart(product)}>Add To Cart</button>
                        <button onClick={() => {
                          navigate(`/productinfo/${product.id}`)
                        }}>View</button>
                      </div>
                    </div>
                </div>
              </div>
            })}
          </div>
        </div>
        
    </Layout>
  )
}

export default HomePage;