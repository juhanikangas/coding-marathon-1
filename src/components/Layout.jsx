import { Outlet, Link } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/books">BookCollectionManager</Link>
          </li>
          <li>
            <Link to="/contacts">ContactListManager</Link>
          </li>
          <li>
            <Link to="/recipes">RecipeManager</Link>
          </li>
          <li>
            <Link to="/shoppingcart">ShoppingCart</Link>
          </li>
          <li>
            <Link to="/signup">SignupPage</Link>
          </li>
        </ul>
      </nav>

      <main className="page-content">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
