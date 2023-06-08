import {React, useContext} from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { CartContext } from "../../context/CartContext";
import { UserContext } from '../../context/UserContext'

const Userlogin = ({ title }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    age: "",
    password: "",
  });

  const {getUser, updUser,setCart} = useContext(CartContext)

  const [action, setAction] = useState("login");
  const [cookies, setCookie] = useCookies(['user']);


  const userAction = () => {
    if (action == "login") {
      console.log("login");
      login();
    } else {
      console.log("register");
      register();
    }
  };

  const login = async () => {
    console.log("antes del post!!!!")
    const { email, password } = formData;
    //await fetch("https://ehqbackend-production.up.railway.app/api/session/login", {
      await fetch("https://ehqbackend-production.up.railway.app/api/session/login", {
  method: "POST",
  body: JSON.stringify({
    email: formData.email,
    password: formData.password,
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) => response.json())
  .then((json) => {
     console.log("response del login", json.user)
     localStorage.setItem('authToken', json.token)
     updUser(json.user)
     const userCart = setUserCart(json.user.cart)
     
     
  })
    console.log("user en context", getUser())
    //console.log('result', result)
    navigate("/productos");
};

const setUserCart = async(cartid)=>{
  console.log("cartid", cartid)
  await fetch(`https://ehqbackend-production.up.railway.app/api/carts/populate/${cartid}`, {
  method: "GET",
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) => response.json())
  .then((json) => {
     console.log("cart en login", json)
     setCart(json)
     
     
     return(json)
     
     
  })
  

}

const gtiHubLogin = async ()=>{
  console.log("Github")
  console.log("antes del post!!!!")

  const response = await fetch("https://ehqbackend-production.up.railway.app/api/session/github", {
    method: "GET",
    headers: {
      "Content-type":"application/json",
      "Authorization":localStorage.getItem('authToken')
    },
  })
  .then((response) => response.json())
  .then((json) => {
     console.log("response del login", json)
     
  })
  
    //console.log('result', result)
    navigate("/productos");
};



  const register = async () => {
    console.log(JSON.stringify({ formData }));
    const result = await fetch("https://ehqbackend-production.up.railway.app/api/session/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    console.log("result de register", register)
    changeAction()
    navigate("/electricHQReact");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("formData", formData);
  };

  const changeAction = () => {
    action == "login" ? setAction("register") : action == "register"? setAction("login"): setAction("register");
  };

  const changePassword = async()=>{
    if(formData.email =="")
      alert("please enter your email")
    
      console.log("antes")
    const result = await fetch("https://ehqbackend-production.up.railway.app/api/session/recover", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    console.log("despues")
    console.log(result)
    if(result.status =="200"){
      alert(`and email with your password recovery link has been sent to ${formData.email}`)
    }
    else
      alert("error on email recovery process")

  }

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              Style="border-radius: 1rem;"
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  {action == "login" ? (
                    <>
                      <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                      <p className="text-white-50 mb-5">
                        Please enter your login and password!
                      </p>
                    </>
                  ) : (
                    <>
                      <>
                        <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                        <p className="text-white-50 mb-5">Please Register!</p>
                      </>
                      <div className="form-outline form-white mb-4">
                        <input
                          type="text"
                          id="first_name"
                          name="first_name"
                          className="form-control form-control-lg"
                          value={formData.first_name}
                          onChange={handleChange}
                        />
                        <label className="form-label" for="typeEmailX">
                          First Name
                        </label>
                      </div>
                      <div className="form-outline form-white mb-4">
                        <input
                          type="text"
                          id="last_name"
                          name="last_name"
                          className="form-control form-control-lg"
                          value={formData.last_name}
                          onChange={handleChange}
                        />
                        <label className="form-label" for="typeEmailX">
                          Last Name
                        </label>
                      </div>
                      <div className="form-outline form-white mb-4">
                        <input
                          type="text"
                          id="age"
                          name="age"
                          className="form-control form-control-lg"
                          value={formData.age}
                          onChange={handleChange}
                        />
                        <label className="form-label" for="typeEmailX">
                          Age
                        </label>
                      </div>
                    </>
                  )}

                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control form-control-lg"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <label className="form-label" for="typeEmailX">
                      Email
                    </label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control form-control-lg"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <label className="form-label" for="typePasswordX">
                      Password
                    </label>
                  </div>
                  

                  <p className="small mb-5 pb-lg-2">
                    <a className="text-white-50" href="#!" onClick={changePassword}>
                      Forgot password?
                    </a>
                    
                  </p>

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={userAction}
                  >
                    {action}
                  </button>
                  
                </div>
                <div className="d-flex justify-content-center text-center mt-4 pt-1 mb-4">
                       <a href="#!" className="text-white">
                         <i className="fab fa-facebook-f fa-lg" onClick={gtiHubLogin}>GITHUB LOGIN</i>
                       </a>
                  
                     </div>

                <div>
                  <p className="mb-0">
                  {action == "login" ? (
                    "Don't have an account?  "):("Already a member?  ")}
                    <button
                      className="btn btn-outline-light btn-sm px-5"
                      type="submit"
                      onClick={changeAction}
                    >
                      {action =="login"? ("Sign Up"):"Login"}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Userlogin;
