// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignup";
import PageNotFound from "./Pages/PageNotFound";
import men_banner from "./Components/Assets/banner_mens.png";
import women_banner from "./Components/Assets/banner_women.png";
import kids_banner from "./Components/Assets/banner_kids.png";
import ShopContextProvider from "./Context/ShopContext";

function App() {
    return ( <
        ShopContextProvider >
        <
        BrowserRouter >
        <
        Navbar / >
        <
        Routes >
        <
        Route path = "/"
        element = { < Shop / > }
        /> <
        Route path = "/mens"
        element = { < ShopCategory banner = { men_banner }
            category = "men" / > }
        /> <
        Route path = "/womens"
        element = { < ShopCategory banner = { women_banner }
            category = "women" / > }
        /> <
        Route path = "/kids"
        element = { < ShopCategory banner = { kids_banner }
            category = "kids" / > }
        /> <
        Route path = "/product/:productId"
        element = { < Product / > }
        /> <
        Route path = "/cart"
        element = { < Cart / > }
        /> <
        Route path = "/login"
        element = { < LoginSignup / > }
        /> <
        Route path = "*"
        element = { < PageNotFound / > }
        /> <
        /Routes> <
        Footer / >
        <
        /BrowserRouter> <
        /ShopContextProvider>
    );
}

export default App;