import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? "text-secondary font-bold" : "";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-primary shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex space-x-4">
              <div className="flex items-center space-x-4">
                <Link to="/" className={`text-white hover:text-secondary ${isActive("/")}`}>
                  Home
                </Link>
                <Link to="/books" className={`text-white hover:text-secondary ${isActive("/books")}`}>
                  Books
                </Link>
                <Link to="/contacts" className={`text-white hover:text-secondary ${isActive("/contacts")}`}>
                  Contacts
                </Link>
                <Link to="/recipes" className={`text-white hover:text-secondary ${isActive("/recipes")}`}>
                  Recipes
                </Link>
                <Link to="/shoppingcart" className={`text-white hover:text-secondary ${isActive("/shoppingcart")}`}>
                  Cart
                </Link>
                <Link to="/signup" className={`text-white hover:text-secondary ${isActive("/signup")}`}>
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
