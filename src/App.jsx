import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import BookCollectionManager from "./components/BookCollectionManager/BookCollectionManager";
import ContactListManager from "./components/ContactListManager/ContactListManager";
import RecipeManager from "./components/RecipeManager/RecipeManager"
import ShoppingCart from "./components/ShoppingCart/ShoppingCart"
import SignupPage from "./components/SignupPage/SignupPage"

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="books" element={<BookCollectionManager />} />
          <Route path="contacts" element={<ContactListManager />} />
          <Route path="recipes" element={<RecipeManager />} />
          <Route path="shoppingcart" element={<ShoppingCart />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
