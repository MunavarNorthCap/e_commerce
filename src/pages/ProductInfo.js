import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { getDoc, doc } from 'firebase/firestore';
import fireDB from '../fireConfig';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function ProductInfo() {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    setLoading(true)
    try {
      const productTemp = await getDoc(doc(fireDB, 'products', params.productid))
      // console.log(productTemp.data());
      setProduct(productTemp.data());
      setLoading(false)
    } catch (error) {
      console.log(error);
      // setLoading(false)
    }
  }
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  }

  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {product && (
              <div>
                <p>
                  <b>{product.name}</b>
                </p>
                <img
                  src={product.imageURL}
                  alt="img"
                  className="product-info-img"
                />
                <hr />
                <p>{product.description}</p>
                <div className="d-flex justify-content-end my-3">
                  <button onClick={() => addToCart(product)}>ADD TO CART</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductInfo;