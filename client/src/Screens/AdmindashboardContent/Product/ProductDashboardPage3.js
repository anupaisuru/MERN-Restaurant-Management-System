import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddPizza from './AddPizza';

function ProductDashboardPage3() {
  const [existingPizza, setExistingPizza] = useState(null)

  const id = window.location.href.split('/').pop();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products/' + id)
      .then((response) => {
        setExistingPizza(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[])

  if(existingPizza === null){
    <h1>Please wait</h1>
  }
  else{
    return (
      <div style={{marginTop:'10px'}}>
        <AddPizza existngData={existingPizza} operation='update'/>
      </div>
    );
  }
}

export default ProductDashboardPage3;