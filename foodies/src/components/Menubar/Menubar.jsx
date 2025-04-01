import React, { useContext, useState } from 'react';
import {assets} from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from '../../context/StoreContext';


const Menubar = () => {

  const [active, setActive] = useState("home");

  const {quantities,token,setToken,setQuantities} = useContext(StoreContext);

  const uniqueItems = Object.values(quantities).filter(qty=>qty>0).length;

  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.removeItem("token");
    setToken("");
    setQuantities({});
    navigate("/");
  }

  return (
    
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <img src={assets.logo} alt='logo' className='mx-4' height={50} width={50}></img>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={active==="home"?"nav-link fw-bold":"nav-link"} to="/" onClick={()=>setActive("home")}>Home</Link>
        </li>

        <li className="nav-item">
          <Link className={active==="explore"?"nav-link fw-bold":"nav-link"} to="/explore" onClick={()=>setActive("explore")}>Explore</Link>
        </li>

        <li className="nav-item">
          <Link className={active==="contact"?"nav-link fw-bold":"nav-link"} to="/contact" onClick={()=>setActive("contact")}>Contact us</Link>
        </li>

      </ul>
      <div className='d-flex align-items-center gap-4'>
        <Link to={"/cart"}>
        <div className='position-relative'>
            <img src={assets.cart} alt='cart' height={40} width={40} className='position-relative'></img>
            <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning' >{uniqueItems}</span>
        </div>
        </Link>
            
            {
              !token?
              <>
              <button className='btn btn-outline-primary' onClick={()=>navigate("/login")}>Login</button>
              <button className='btn btn-outline-success' onClick={()=>navigate("/register")}>Register</button>
              </>:
              <div className='dropdown text-end'>
                      <a href='#' className='d-block link-body-emphasis text-decoration-none dropdown-toggle'
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                       >
                      <img src={assets.profile} alt='profile image' height={40} width={40} className='rounded-circle'></img>
                      </a>
                    <ul className='dropdown-menu text-small'>
                      <li className='dropdown-item cursor-pointer' onClick={()=> navigate("/myorders")}>Orders</li>
                      <li className='dropdown-item cursor-pointer' onClick={logout}>Logout</li>
                    </ul>
              </div>
            }

      </div>
    </div>
  </div>
</nav>

  )
}

export default Menubar;