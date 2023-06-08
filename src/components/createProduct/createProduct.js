import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateProduct = ({title}) =>{
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        marca: "",
        modelo: "",
        tipo: "",
        rango: "",
        precio: "",
        topFeature1:"",
        topFeature2:"",
        topFeature3:"",
        liked:"",
        stock:"",
        onCart:""
      });

      const [imageName, setImageName] = useState('')

      const [auth, setAuth] = useState({error:""})

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log("formData", formData);
      };

      const submitProduct = async () => {

        const newForm = new FormData()
        console.log("antes del post!!!!")
        newForm.append('marca', formData.marca);
        newForm.append('modelo',formData.modelo)
        newForm.append('tipo',formData.tipo)
        newForm.append('rango',formData.rango)
        newForm.append('topFeature1',formData.topFeature1)
        newForm.append('topFeature2',formData.topFeature2)
        newForm.append('topFeature3',formData.topFeature3)
        newForm.append('stock',formData.stock)
        newForm.append('imageName', imageName)
        console.log("form data con product", newForm)
        const result = axios.post(`https://ehqbackend-production.up.railway.app/api/products`, 
        newForm,
        {headers: {
            "Content-Type": "multipart/form-data"//,
            //"Authorization":localStorage.getItem('authToken')
      }}
    )
      .then((response) => {
        console.log("response data update product",response.data)
       
        if(response.data){
           alert('product added')
           console.log(response.data)
          addProductToStore(response.data._id)
        } 
        navigate("/productos");
      })
    }

    const addProductToStore = async (pid) => {

    
      
      const result = axios.post(`https://ehqbackend-production.up.railway.app/api/stores/64222c92b498abd05d5c8aac/products/${pid}`, 
      {headers: {
          "Content-Type": "multipart/form-data",
    }}
  )
    .then((response) => {
      console.log("response data update product",response.data)
      response.data && alert('product added to Store')
      navigate("/productos");
    })
  }

    return(
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
                  <div className="form-outline form-white mb-4">
                    <input
                      type="marca"
                      id="marca"
                      name="marca"
                      className="form-control form-control-lg"
                      value={formData.marca}
                      onChange={handleChange}
                    />
                    <label className="form-label" for="typemarcaX">
                      marca
                    </label>
                  </div>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="modelo"
                      id="modelo"
                      name="modelo"
                      className="form-control form-control-lg"
                      value={formData.modelo}
                      onChange={handleChange}
                    />
                    <label className="form-label" for="typemodeloX">
                      modelo
                    </label>
                  </div>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="tipo"
                      id="tipo"
                      name="tipo"
                      className="form-control form-control-lg"
                      value={formData.tipo}
                      onChange={handleChange}
                    />
                    <label className="form-label" for="typetipoX">
                      tipo
                    </label>
                  </div>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="rango"
                      id="rango"
                      name="rango"
                      className="form-control form-control-lg"
                      value={formData.rango}
                      onChange={handleChange}
                    />
                    <label className="form-label" for="typerangoX">
                      rango
                    </label>
                  </div>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="precio"
                      id="precio"
                      name="precio"
                      className="form-control form-control-lg"
                      value={formData.precio}
                      onChange={handleChange}
                    />
                    <label className="form-label" for="typeprecioX">
                      precio
                    </label>
                  </div>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="topFeature1"
                      id="topFeature1"
                      name="topFeature1"
                      className="form-control form-control-lg"
                      value={formData.topFeature1}
                      onChange={handleChange}
                    />
                    <label className="form-label" for="typetopFeature1X">
                      topFeature1
                    </label>
                  </div>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="topFeature2"
                      id="topFeature2"
                      name="topFeature2"
                      className="form-control form-control-lg"
                      value={formData.topFeature2}
                      onChange={handleChange}
                    />
                    <label className="form-label" for="typetopFeature2X">
                      topFeature2
                    </label>
                  </div>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="topFeature3"
                      id="topFeature3"
                      name="topFeature3"
                      className="form-control form-control-lg"
                      value={formData.topFeature3}
                      onChange={handleChange}
                    />
                    <label className="form-label" for="typetopFeature3X">
                      topFeature3
                    </label>
                  </div>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="stock"
                      id="stock"
                      name="stock"
                      className="form-control form-control-lg"
                      value={formData.stock}
                      onChange={handleChange}
                    />
                    <label className="form-label" for="typestockX">
                      stock
                    </label>
                  </div>
                  <div className="form-outline form-white mb-4">
                      <input
                        type="file"
                        id="imageName"
                        name="imageName"
                        //value="IMG"
                        className="form-control form-control-lg"
                        onChange={(e)=> setImageName(e.target.files[0])} 
                      />
                      <label className="form-label" for="typeEmailX">
                        Upload Image
                      </label>
                    </div>
                </div>
               
                  <p className="mb-0">
        
                    <button
                      className="btn btn-outline-light btn-sm px-5"
                      type="submit"
                      onClick={submitProduct}
                    >
                     CREATE PRODUCT
                    </button>
                  </p>
                  <p className="large lg-5 pb-lg-2">
                    <a >
                      {auth.error}
                    </a>
                  </p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
    
    </section>
    )
}

export default CreateProduct