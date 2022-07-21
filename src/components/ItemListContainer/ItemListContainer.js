import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const ItemListContainer = ({saludo}) => {
  return (
     <div className="text-capitalize">
        <p>
            {saludo}
        </p>
     </div>
    
    );
}
export default ItemListContainer;