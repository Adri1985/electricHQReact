import ItemProduct from "../ItemProduct/ItemProduct";
import "./ItemList.css"

const ItemList = ({dataProducts}) =>{
    console.log("productos en ItemList ", dataProducts)
    return(
        <div className= "productContainer">
            {dataProducts.map((product)=>{
                console.log("despues del map: ", product)
            return product.stock>0 ? <ItemProduct key ={product.id} data={product}/> : console.log("producto no agregado por falta de stock");
            })}
        </div>


    );
}

export default ItemList;