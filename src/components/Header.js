import React from "react";
import { Link } from 'react-router-dom';  // , useNavigate
import { FaBars, FaCartPlus, FaUser } from 'react-icons/fa';
import { useSelector } from "react-redux";
// import { getAuth, signOut } from "firebase/auth";

function Header() {

  const { cartItems } = useSelector(state => state.cartReducer);

  const { user } = JSON.parse(localStorage.getItem('currentUser'));

  // const auth = getAuth();
  // const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('currentUser');
    window.location.reload();

    // try {
    //   auth.signOut();
    //   navigate('/login')
    // } catch (err) {
    //   console.log(err)
    // }
  }

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            E-Commerce
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"><FaBars size={25} color='white' /></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  <FaUser className="mx-1" />{user.email.substring(0, user.email.length-10)}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={logout}>
                  logout
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <FaCartPlus /> {cartItems.length}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
