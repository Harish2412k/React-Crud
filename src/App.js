import React from "react";
import { BrowserRouter as  Router, Route ,Routes, Navigate} from "react-router-dom";
import ProtectedRoute from "./middleware/ProtectedRoute"; 

import { ToastContainer } from "react-toastify";

import Cart from "./component/Cart";
import Details from "./component/Details";
import Home from "./component/Home.";
import Login from "./component/Login";
import Menu from "./component/Menu";
import Pnf from "./component/Pnf";
import Register from "./component/Register";
import Create from "./component/Create";
import Update from "./component/Update";

function App() {
  let token = localStorage.getItem('loginStatus') ? localStorage.getItem('loginStatus') : false

  return (
    <Router>
      <Menu/>
        <ToastContainer autoClose={2000} position={'top-right'}/>
      <Routes>
        <Route path={`/login`} element={ token === "true" ? <Navigate to={'/'} /> : <Login/>} />
        <Route path={`/register`} element={ token === "true" ? <Navigate to={'/'} /> : <Register/>} />

        <Route element={<ProtectedRoute />} >
            <Route path={`/`} element={<Home/>} />
            <Route path={`/create`} element={<Create/>} />
            <Route path={`/update/:id`} element={<Update/>} />
            <Route path={`/details/:id`} element={<Details/>} />
            <Route path={`/cart`} element={<Cart/>} />
        </Route>

        <Route path={`/*`} element={<Pnf/>} />
      </Routes>
    </Router>
  );
}

export default App;
