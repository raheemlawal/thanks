import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import App from './pages/App';


const Main = () => {
  return (
    <>
      <Routes > {/* The Switch decides which component to show based on the current URL.*/}
        <>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/app' element = {<App/>}></Route>
        </>
      </Routes>
    </>
  );
}
export default Main;
