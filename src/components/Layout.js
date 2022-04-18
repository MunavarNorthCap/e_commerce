import React from 'react';
import Header from './Header';
import Loader from './Loader';

function Layout(props) {
  return (
    <div>
        {props.loading && (<Loader />)}
        <Header />
        <div className='content'>
            {props.children}
            {/* here this props.children will render the pages login, register, home etc... */}
        </div>
    </div>
  )
}

export default Layout;