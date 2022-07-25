import { useEffect, useState } from 'react';

import './ItemCount.css';


const ItemCount = ({inicial, stock}) =>{


   console.log("llega ", inicial);
    const [contador, setContador] = useState(inicial)


    const addNumber = () => {
        contador<stock? setContador(contador + 1):alert("alcanzo el stock");
    }
    const removeNumber = () => {
        contador>0? setContador(contador - 1):console.log("llego a cero");
    }

    useEffect( () => {
        console.log("Actualizacion")
        // setContador(1)
    }, [contador]);

    return(
        <div className='quantity'>
            <button onClick={removeNumber}>-</button>
            <p>{contador}</p>
            <button onClick={addNumber}>+</button>
        </div>


    );
}

export default ItemCount;