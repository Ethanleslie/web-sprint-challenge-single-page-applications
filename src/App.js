import React from "react";
import { Routes, Route, Link } from 'react-router-dom'
import SimpleForm from './Components/Form'






const App = () => {




  return (
    <>
      <Link to="/"> Home </Link>
      <Link to ="/pizza"  id='order-pizza'>Build Pizza</Link>
        <h1>Bloomtech Eats</h1>
        <p>Build Your Own Pizza</p>
     <Routes>
        <Route path="/" element />
        <Route path="/pizza" element={<SimpleForm/>} />
     </Routes>
    </> 
)};
export default App;
