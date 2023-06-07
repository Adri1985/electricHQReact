import { createContext, useState } from "react";
import products from "../utils/products.mock";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState({ _id: "", products: [] });
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState({});
  const [orderDetails, setOrderDetails] = useState({});

  const clearOne = async (product) => {
    // let cart = {_id: cartProducts._id, products:[]}
    // console.log("proucto que llega", product)
    // console.log("cart antes de clearone", cart)
    // cart.products = cartProducts.products.filter((element)=> element.product._id != product._id)
    // console.log("cart antes despues de filter result: ", cart)
    // console.log("producto a borrar", product)
    await deleteProductFromCart(product.product);
    console.log("despues del delete en backend");
    await setUserCart(cartProducts._id);
    console.log("despues del set user cart");
  };

  const deleteProductFromCart = async (product) => {
    console.log("antes del post!!!!");
    await fetch(
      `https://ehqbackend-production.up.railway.app/api/carts/${user.cart}/products/${product._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log("response del post post product to cart", json);
      });
  };
  //https://ehqbackend-production.up.railway.app/api/carts/647193395e937bcaae62a0d8/product/641de52bbc060167a460e6c9
  

  const addProductToCart = async (product) => {
    console.log("cart Products en addProductToCart", cartProducts);
    console.log("productoooo", product);
    console.log(
      `agregando el producto ${product._id} al carrito ${user.cart} perteneciente a ${user.first_name}`
    );
    if (
      cartProducts.products.find((element) => element.product._id == product._id) ==
      undefined
    ) {
      // //para no agregar duplicados
      // const cart = cartProducts
      // cart.products.push(product)
      // console.log("Cart modificado", cart)
      // setCartProducts(cart);
      //setTotalPrice(totalPrice + product.precio * product.onCart);
      await postProductToCart(product);
      console.log("Antes de set user cart", cartProducts._id);
      await setUserCart(cartProducts._id);
    } else {
      updateQuantity(product);
      alert("product being added already in cart, quantity replaced");
    }
  };

  const postProductToCart = async (product) => {
    console.log("antes del post!!!!");
    await fetch(
      `https://ehqbackend-production.up.railway.app/api/carts/${user.cart}/product/${product._id}`,
      {
        method: "POST",
        body: JSON.stringify({
          quantity: product.onCart,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log("response del post post product to cart", json);
      });
  };

  const deleteProductsFromCart = async () => {
    console.log("antes del post!!!!");
    await fetch(
      `https://ehqbackend-production.up.railway.app/api/carts/${user.cart}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log("response del post post product to cart", json);
      });
  };

  const setCart = (cart) => {
    console.log("en set cart ", cart);

    setCartProducts(cart);
  };

  const updUser = (user) => {
    setUser(user);
  };

  const getUser = () => {
    return user;
  };

  const getOrderDetails = () =>{
    return orderDetails
  }

  //necesitaba en el caso de actualizar la cantidad, que se ejecute nuevamente setCartProducts
  //para que me vuelva a renderizar el CartWidget. Modificando el array original no lo tomaba
  //por ende tuve que crear una copia del array y llamar al setCartProducts con la copia.
  const updateQuantity = (product) => {
    //setTotalPrice(0);

    console.log("asi viene el producto", product);

    const cartTemp = { _id: cartProducts._id, products: [] };

    console.log("Cartproducts map", cartProducts);

    cartProducts.products.map((el) => {
      if (el.product._id == product._id) {
        el.quantity = product.onCart;
      }
      
      console.log("cart tem adentro", cartTemp)
      cartTemp.products.push({product:el.product, quantity:el.quantity});
      setTotalPrice(totalPrice + el.product.precio * el.quantity);
    });
    console.log("cartTemp afuera", cartTemp)

    setCartProducts(cartTemp);
  };

  const getOnCartByProduct = (product) => {
    let cant = 1;
    console.log("getOnCartByProduct dentro");
    cartProducts.products.map((el) => {
      if (el._id == product._id) {
        cant = el.onCart;
      }
    });
    return cant;
  };

  //https://ehqbackend-production.up.railway.app/api/carts/647193395e937bcaae62a0d8/products/647516484639d026a27f6118

  const setUserCart = async (cartid) => {
    console.log("cartid en setUserCart context", cartid);
    await fetch(`https://ehqbackend-production.up.railway.app/api/carts/populate/${cartid}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("cart set user cart", json);
        setCart(json);
        return json;
      });
  };
  const clear = () => {
    deleteProductsFromCart()
    setUserCart(cartProducts._id)
  };
  const data = {
    setTotalProducts,
    totalProducts,
    cartProducts,
    addProductToCart,
    clear,
    clearOne,
    getOnCartByProduct,
    totalPrice,
    setTotalPrice,
    updUser,
    getUser,
    setCart,
    setCartProducts,
    orderDetails,
    setOrderDetails,
    getOrderDetails
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};
export default CartProvider;

export { CartContext };
