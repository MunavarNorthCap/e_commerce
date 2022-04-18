import React from "react";

function Loader() {
  return (
    <div className="d-flex justify-content-center loader">
      <div className="spinner-border" role="status">
        {/* <span class="visually-hidden">Loading...</span> */}
      </div>
    </div>
  );
}

export default Loader;
