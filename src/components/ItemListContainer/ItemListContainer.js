import { useEffect, useState } from 'react';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import products from '../../utils/products.mock';
import ItemList from '../ItemList/ItemList';




/*const logPromise= new Promise((resolve, reject)=>{
    setTimeout(()=>
    {
        resolve(productos)
    },3000);
});*/




const ItemListContainer = ({saludo}) => {
    const [listProducts, setListProducts] = useState([]);

    const getProducts = new Promise((resolve,reject) =>{
        
        setTimeout(()=>{
            resolve(products);
        },2000);

        
    })

    useEffect(()=>{
        getProducts.then((data)=>{
            console.log("promesa resuelta, data: ", data)
            setListProducts(data);
        })
    },[]);//en montaje

  
    return (
    
     <div className="list=products">
        {console.log("useState; ",listProducts)}
        <ItemList dataProducts ={listProducts}></ItemList>
     </div>
    
    );
}
export default ItemListContainer;