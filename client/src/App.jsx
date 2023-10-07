import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Addcategory from "./components/Addcategory";
import Addproduct from "./components/Addproduct";
import Category from "./components/Category";
import Productlist from "./components/Productlist";

function App() {
  return (
    <BrowserRouter>
    <header className="bg-slate-200">
      <Routes>
        <Route path="/" element={<Productlist/>}></Route>
        <Route path="/addproduct" element={<Addproduct/>}></Route>
        <Route path="/addcategory" element={<Addcategory/>}></Route>
        <Route path="/category" element={<Category/>}></Route>
      </Routes>
      </header>
    </BrowserRouter>
  );
}

export default App;

