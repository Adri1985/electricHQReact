import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import CheckOutItem from "../CheckOutItem/CheckOutItem";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import db from "../../utils/firebaseConfig";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import Payment from '../../pages/Payment'

const Cart = () => {
  const navigate = useNavigate();
  const { clear, getOrderDetails,cartProducts,setCartProducts, totalPrice, setTotalPrice, getUser, orderDetails, setOrderDetails } =
    useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const [showPayment, setShowPayment] = useState(false)
  const [success, setSuccess] = useState();
  const [order, setOrder] = useState({})
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    calcTotal();
    setOrden({
      user: getUser()._id,
      store: '64222c92b498abd05d5c8aac',
      products: cartProducts.products.map((product) => {
        return {
          _id: product.product._id,
          precio: product.product.precio,
          quantity: product.quantity,
        };
      }),
      
    });

    console.log("ORDEN", JSON.stringify(orden))

    // setContador(1)
  }, [cartProducts]);

  const [outOfStock, setOutOfStock] = useState([]);

  const [orden, setOrden] = useState({
    user: getUser()._id,
    store: '641fcb0711da07bac4708d41',
    products: cartProducts.products.map((product) => {
      return {
        _id: product.product._id,
        precio: product.product.precio,
        quantity: product.quantity,
      };
    }),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("formData", formData)
  };
  const submitData = (e) => {
    e.preventDefault();
   
        pushData();
  
  };
   
  

  const submitOrder = async () => {
    console.log("ORDEN ANTES DE ENVIAR", JSON.stringify(orden))
    console.log("antes del post!!!!")
    await fetch("https://ehqbackend-production.up.railway.app/api/orders", {
  method: "POST",
  body: JSON.stringify({
    orden
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) => response.json())
  .then((json) => {
    //navigate("/Stripe");
     console.log("response del backend", json.orderID)
     console.log("user en context", getUser())
     setCartProducts({_id:getUser().cart, products:json.cart.returnCartProducts}) 
     alert("Orden Generada, ID de su orden, la misma esta pendiente de pago"+json.orderID)
     console.log("order details", json.orderDetails)
     setOrder(json.orderDetails)
     console.log("context order details ", getOrderDetails())
     //console.log('result', result)
     //navigate("/Payment");
 
     //const userCart = setUserCart(json.user.cart)
     
     
  })
   
};
  

  const pushData = async () => {
    await submitOrder()
    console.log("ORDEN GENERADA");
    //al confirmar la orden se actualiza el stock de los productos del carrito

    //sendmail();
    //fin limpio carrito
    //muestro la orden por un momento y vuelvo a la pantalla de compra
   
      setShowModal(false);
      setShowPayment(true)
  };
  
  const getProduct = async (id) => {
    const docRef = doc(db, "productos", id);
    const docSnapshot = await getDoc(docRef);
    let product = docSnapshot.data();
    product.id = docSnapshot.id;
    return product;
  };

  // const updateStock = () => {
  //   orden.items.forEach((element) => {
  //     const docRef = doc(db, "productos", element._id);
  //     const data = {
  //       stock:
  //         cartProducts.products.find((dato) => dato._id == element._id).stock -
  //         element.cant,
  //     };
  //     console.log("elemement on cart", element.cant);
  //     console.log("docRef", docRef);
  //     updateDoc(docRef, data).then((docRef) => {
  //       console.log("actualice stock");
  //     });
  //   });
  // };

  const handleClose = () => {
    setShowModal();
    setOutOfStock([]);
  };
  const calcTotal = () => {
    let subTotal = 0;

    cartProducts.products.map((product) => {
      subTotal = subTotal + product.product.precio * product.quantity;
    });

    setTotalPrice(subTotal);
  };

  return (
    <div className="Container">
      {!showPayment &&
      (<>
      <h1>YOUR SUMMARY</h1>
      {cartProducts.products.map((product) => {
        return <CheckOutItem key={product.id} data={product} />;
      })}
      <div>
        <h2>{`Total: ${totalPrice}`}</h2>
      </div>
      <div className="comprar">
        <button className="btn-warning" onClick={() => setShowModal(true)}>
          GO TO PAYMENT
        </button>
      </div>
      </>)}
      {showModal && (
        <Modal title="CONTACT INFORMATION" close={() => handleClose()}>
          {success ? (
            <>
              <h2>
                Your order has been completed. Thanks for shopping with us!
              </h2>
              <h3>Order confirmation number : {success}</h3>
            </>
          ) : outOfStock.length > 0 ? (
            <>
              <h2>The following products has run out of stock:</h2>
              {outOfStock.map((product) => {
                return (
                  <h1>
                    {product.title} requested: {product.cant}, available:{" "}
                    {product.actualStock}{" "}
                  </h1>
                );
              })}
              <h3>Please review your order</h3>
              <Link to="/productos/all">
                <li>
                  <button>BACK TO PRODUCTS</button>
                </li>
              </Link>
            </>
          ) : (
            <form onSubmit={submitData}>
              {console.log("user en modal", getUser())}
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                onChange={handleChange}
                value={`${getUser().first_name} ${getUser().last_name}`}
              ></input>
              <input
                type="number"
                name="phone"
                placeholder="Your phone number"
                onChange={handleChange}
                value={`123123`}
              ></input>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                onChange={handleChange}
                value={`${getUser().email}`}
              ></input>
              
              <button type="submit">Enviar</button>
            </form>
          )}
        </Modal>
      )}
       {console.log("orden antes de payment ", order)}
      {showPayment && (<Payment orderTotal={order.totalPrice}></Payment>)}

    </div>
  );
};

export default Cart;
