import React, { useState, createContext, useContext, useEffect } from 'react';
import image from "./assets/hero3.jpg"
// Tailwind CSS is assumed to be available, no import needed.
// This is the main file for the application, handling routing and state.

// Mock data for a front-end-only application
const initialProducts = [
  { id: '1', name: 'Vintage Jacket', description: 'Classic unisex denim jacket.', price: 15000, category: 'jackets', image: 'https://placehold.co/300x300/e5e7eb/1f2937?text=Vintage+Jacket' },
  { id: '2', name: 'Leather Boots', description: 'Stylish leather boots.', price: 25000, category: 'footwear', image: 'https://placehold.co/300x300/e5e7eb/1f2937?text=Leather+Boots' },
  { id: '3', name: 'Slim-Fit Jeans', description: 'Comfortable and trendy jeans.', price: 12000, category: 'jeans', image: 'https://placehold.co/300x300/e5e7eb/1f2937?text=Slim-Fit+Jeans' },
  { id: '4', name: 'Graphic T-Shirt', description: 'Vintage-style graphic tee.', price: 7500, category: 't-shirts', image: 'https://placehold.co/300x300/e5e7eb/1f2937?text=Graphic+Tee' },
];

const initialOrders = [
  { id: 'ord_1', userId: 'user@example.com', items: [{ name: 'Vintage Jacket', qty: 1, price: 15000 }], totalPrice: 15000, status: 'Processing', deliveryDate: '2025-09-25' },
  { id: 'ord_2', userId: 'user@example.com', items: [{ name: 'Leather Boots', qty: 1, price: 25000 }], totalPrice: 25000, status: 'Shipped', deliveryDate: '2025-09-23' },
];

// Context for managing global application state, now within the single file.
const AuthContext = createContext();
const CartContext = createContext();
const ProductContext = createContext();
const OrderContext = createContext();

// --- Components (all in one file) ---

const Navbar = ({ navigateTo }) => {
  const { cartItems, totalPrice, totalItems } = useContext(CartContext);
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currency, setCurrency] = useState('NGN');

  const currencySymbol = currency === "NGN" ? "₦" : "$";
  const displayedPrice = currency === "NGN" ? totalPrice : Math.round(totalPrice / 1500);
  const formattedPrice = displayedPrice.toLocaleString();
  const isAdmin = user?.email === 'admin@visionstyle.com';

  const handleLinkClick = (page) => {
    navigateTo(page);
    setMenuOpen(false); // Close menu after clicking link
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false); // Close menu after logging out
  };

  return (
    <nav className="bg-gray-900 text-white p-4 md:px-8 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <button
          onClick={() => handleLinkClick('home')}
          className="text-2xl font-bold transition-transform transform hover:scale-105"
        >
          Vision Style’s
        </button>

        {/* Hamburger toggle (mobile only) */}
        <div className="flex items-center md:hidden space-x-4">
          <button onClick={() => handleLinkClick('cart')} className="relative text-white hover:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.19.988.707.988H19m-4 0a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          </button>
          <button
            className="text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Links (desktop and mobile) */}
        <div
          className={`
            absolute md:static top-16 right-4
            bg-gray-900 md:bg-transparent rounded-lg md:rounded-none
            p-6 md:p-0
            flex-col md:flex-row items-end md:items-center
            gap-4 md:gap-8 shadow-xl md:shadow-none
            ${menuOpen ? "flex" : "hidden md:flex"}
          `}
        >
          <button onClick={() => handleLinkClick('home')} className="hover:text-gray-400">Home</button>
          <button onClick={() => handleLinkClick('shop')} className="hover:text-gray-400">Shop</button>

          {isAdmin && (
            <button onClick={() => handleLinkClick('admin')} className="hover:text-gray-400">Admin</button>
          )}

          {isLoggedIn && (
            <button onClick={() => handleLinkClick('my-orders')} className="hover:text-gray-400">My Orders</button>
          )}

          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => handleLinkClick('cart')} className="relative hover:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.19.988.707.988H19m-4 0a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            </button>
            <span className="text-sm font-semibold text-gray-400">
              {currencySymbol}{formattedPrice}
            </span>
          </div>

          {!isLoggedIn ? (
            <>
              <button
                onClick={() => handleLinkClick('login')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => handleLinkClick('signup')}
                className="hover:text-gray-400"
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="flex flex-col md:flex-row items-end md:items-center gap-4">
              <span className="text-sm font-semibold text-gray-400">{user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          )}

          {/* Currency Switcher */}
          <select
            value={currency}
            onChange={(e) => { setCurrency(e.target.value); setMenuOpen(false); }}
            className="ml-0 md:ml-4 bg-white text-gray-900 text-sm font-semibold p-2 rounded-md focus:outline-none"
          >
            <option value="NGN">₦ NGN</option>
            <option value="USD">$ USD</option>
          </select>
        </div>
      </div>
    </nav>
  );
};


const HomePage = ({ navigateTo, addToCart }) => {
  const { productsData } = useContext(ProductContext);

  const renderProductsByCategory = (category, productList) => {
    const categoryProducts = productList.filter((p) => p.category === category);
    if (categoryProducts.length === 0) return null;

    return (
      <section key={category} className="my-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categoryProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg cursor-pointer"
              onClick={() => navigateTo("product", { product: p })}
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-auto object-cover"
                />
              )}
              <div className="p-4">
                <p className="text-sm text-gray-500">{p.name}</p>
                <p className="font-semibold text-sm mt-1">{p.description}</p>
                <p className="text-lg font-bold mt-2">
                  ₦{p.price.toLocaleString()}
                </p>
                <button
                  className="mt-4 w-full bg-gray-900 text-white text-sm font-semibold py-2 px-4 rounded-full hover:bg-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const categories = [...new Set(productsData.map((p) => p.category))];

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="w-full bg-gray-800 text-white px-4 sm:px-8 md:px-12 py-8 md:py-16 flex flex-row items-center justify-between relative overflow-hidden">
        {/* Text content */}
        <div className="w-1/2 flex flex-col items-start text-left z-10 p-2 sm:p-4">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2">
            Welcome to Vision Style’s
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-4">
            AUTUMN 2025 LATEST
          </p>
          <p className="mb-6 text-gray-300">
            Discover trendy fashion at affordable prices.
          </p>
          <button
            onClick={() => navigateTo("shop")}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-full text-sm"
          >
            Shop Now &raquo;
          </button>
        </div>

        {/* Image */}
        <div className="w-1/2 flex justify-center z-10 p-2 sm:p-4">
          <img
            src={image}
            alt="A stylish person in front of a building, representing the brand image."
            className="rounded-lg w-full h-auto max-w-sm sm:max-w-md md:max-w-full"
          />
        </div>

        {/* Background overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </section>

      {/* Product Categories */}
      {categories.map((category) =>
        renderProductsByCategory(category, productsData)
      )}

      <section className="container mx-auto my-8 flex justify-center">
        <button
          onClick={() => navigateTo("shop")}
          className="bg-gray-900 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-700"
        >
          Go to Shop Page
        </button>
      </section>
    </main>
  );
};


const ShopPage = ({ navigateTo, addToCart }) => {
  const { productsData } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = ['all', ...new Set(productsData.map(p => p.category))];
  
  const filteredProducts = productsData
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Shop All Products</h2>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <input 
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
        <div className="flex flex-wrap justify-center md:justify-end gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`py-2 px-4 rounded-full text-sm font-semibold transition-colors duration-300 ${
                selectedCategory === category
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg cursor-pointer" onClick={() => navigateTo('product', { product })}>
            <img src={product.image} alt={product.name} className="w-full h-auto object-cover"/>
            <div className="p-4">
              <p className="text-sm text-gray-500">{product.name}</p>
              <p className="font-semibold text-sm mt-1">{product.description}</p>
              <p className="text-lg font-bold mt-2">₦{product.price.toLocaleString()}</p>
              <button 
                className="mt-4 w-full bg-gray-900 text-white text-sm font-semibold py-2 px-4 rounded-full hover:bg-gray-700"
                onClick={(e) => { e.stopPropagation(); addToCart(product); }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-600 mt-8">No products found matching your search.</p>
      )}
    </div>
  );
};

const ProductPage = ({ navigateTo, addToCart, product }) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <button onClick={() => navigateTo('shop')} className="text-blue-600 hover:underline mt-4 block">
          Back to Shop
        </button>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-lg shadow-lg">
        <div className="md:w-1/2">
          <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-lg"/>
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <h2 className="text-xl text-gray-600 mb-4">{product.description}</h2>
          <p className="text-2xl font-bold text-gray-900 mb-6">₦{product.price.toLocaleString()}</p>
          <div className="flex items-center space-x-4 mb-6">
            <span className="font-semibold">Size:</span>
            <div className="flex space-x-2">
              {['S', 'M', 'L', 'XL'].map(size => (
                <button key={size} className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-200">
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4 mb-6">
            <span className="font-semibold">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button 
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="w-8 h-8 flex items-center justify-center text-xl hover:bg-gray-200 rounded-l-lg"
              >-</button>
              <span className="w-8 h-8 flex items-center justify-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                className="w-8 h-8 flex items-center justify-center text-xl hover:bg-gray-200 rounded-r-lg"
              >+</button>
            </div>
          </div>
          <button
            className="w-full bg-gray-900 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-700"
            onClick={() => addToCart(product, quantity)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const CartPage = ({ navigateTo }) => {
  const { cartItems, removeFromCart, totalPrice, totalItems, updateCartItemQty } = useContext(CartContext);
  const { isLoggedIn } = useContext(AuthContext);

  const handleCheckout = () => {
    if (isLoggedIn) {
      navigateTo('checkout');
    } else {
      navigateTo('login', { message: 'You must be logged in to check out.' });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover"/>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                    <p className="text-gray-800 font-bold">₦{item.price.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button 
                      onClick={() => updateCartItemQty(item.id, item.qty - 1)}
                      className="w-8 h-8 flex items-center justify-center text-xl hover:bg-gray-200 rounded-l-lg"
                    >-</button>
                    <span className="w-8 h-8 flex items-center justify-center">{item.qty}</span>
                    <button 
                      onClick={() => updateCartItemQty(item.id, item.qty + 1)}
                      className="w-8 h-8 flex items-center justify-center text-xl hover:bg-gray-200 rounded-r-lg"
                    >+</button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 bg-gray-200 rounded-lg shadow-inner">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="flex justify-between font-semibold">
              <p>Subtotal ({totalItems} items):</p>
              <p>₦{totalPrice.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleCheckout}
              className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full transition-colors"
            >
              Proceed to Checkout &raquo;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const CheckoutPage = ({ navigateTo, setNotification }) => {
  const { user } = useContext(AuthContext);
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);

  const handlePlaceOrder = () => {
    if (!user) {
      setNotification('You must be logged in to place an order.');
      return;
    }

    try {
      const newOrder = {
        userId: user.uid,
        items: cartItems.map(item => ({ name: item.name, qty: item.qty, price: item.price })),
        totalPrice: totalPrice,
        status: 'Processing',
        deliveryDate: '2025-09-25',
        id: `ord_${Math.floor(Math.random() * 10000)}`
      };

      addOrder(newOrder);
      setNotification('Order placed successfully! Check "My Orders" for status updates.');
      clearCart();
      navigateTo('my-orders');
    } catch (error) {
      console.error("Error placing order: ", error);
      setNotification('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
        <ul className="divide-y divide-gray-200">
          {cartItems.map((item, index) => (
            <li key={index} className="py-2 flex justify-between">
              <span>{item.name} x {item.qty}</span>
              <span>₦{item.price.toLocaleString()}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 pt-4 border-t border-gray-300 flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>₦{totalPrice.toLocaleString()}</span>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Shipping Information</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md"/>
            </div>
            <div>
              <label className="block text-gray-700">Address</label>
              <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md"/>
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input type="email" className="w-full mt-1 p-2 border border-gray-300 rounded-md"/>
            </div>
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="w-full bg-gray-900 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full transition-colors"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// ===================== LOGIN PAGE =====================
export const LoginPage = ({ navigateTo, setNotification }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // get stored users
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // check if user exists
    const foundUser = storedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      login(foundUser);
      setNotification("Logged in successfully!");
      navigateTo(foundUser.role === "admin" ? "admin" : "home");
    } else {
      setNotification("Invalid email or password.");
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <p className="text-center text-sm text-gray-600 mb-4">
          Try logging in with any account you signed up, or use{" "}
          <b>admin@visionstyle.com</b> with any password to login as admin.
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500"
              >
                <i className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-700"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigateTo("signup")}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

// ===================== SIGNUP PAGE =====================
export const SignupPage = ({ navigateTo, setNotification }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setNotification("Passwords do not match!");
      return;
    }

    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // check if email already exists
    const userExists = storedUsers.find((u) => u.email === email);
    if (userExists) {
      setNotification("User already exists. Please login.");
      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      email: email,
      password: password, // store password for login check
      role: email === "admin@visionstyle.com" ? "admin" : "user",
    };

    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    login(newUser);
    setNotification("Account created and logged in!");
    navigateTo("home");
  };

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500"
              >
                <i className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500"
              >
                <i className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-700"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigateTo("login")}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

const UserOrdersPage = ({ navigateTo }) => {
  const { user } = useContext(AuthContext);
  const { ordersData } = useContext(OrderContext);
  
  if (!user) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Please Log In</h2>
        <p className="text-gray-700 mb-6">You must be logged in to view your orders.</p>
        <button onClick={() => navigateTo('login')} className="bg-gray-900 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-700">
          Go to Login
        </button>
      </div>
    );
  }

  const userOrders = ordersData.filter(order => order.userId === user.uid);
  
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Orders</h2>
      {userOrders.length === 0 ? (
        <p className="text-center text-gray-600">You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {userOrders.map(order => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Order #{order.id}</h3>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
              <p className="text-gray-600 mb-2">Total: ₦{order.totalPrice.toLocaleString()}</p>
              <p className="text-gray-600 mb-2">Items:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                {order.items.map((item, index) => (
                  <li key={index} className="text-gray-700">{item.name} (x{item.qty})</li>
                ))}
              </ul>
              <div className="mt-4 text-sm text-gray-500">
                <p>Estimated Delivery: {order.deliveryDate}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



const AdminDashboard = ({ navigateTo, setNotification }) => {
  const { user } = useContext(AuthContext);
  const { productsData, setProductsData } = useContext(ProductContext);
  const { ordersData, setOrdersData } = useContext(OrderContext);
  const isAdmin = user?.email === "admin@visionstyle.com";

  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const categories = [...new Set(productsData.map((p) => p.category))];

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    category: categories[0] || "",
    image: "https://placehold.co/300x300/e5e7eb/1f2937?text=Product",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    });
  };

  // ✅ Add Product (POST to backend)
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const saved = await res.json();
      setProductsData((prev) => [...prev, saved]);
      setNotification("✅ Product added successfully!");
    } catch (err) {
      console.error(err);
      setNotification("❌ Failed to add product.");
    }
  };

  // ✅ Delete Product (DELETE from backend)
  const handleDeleteProduct = async (productId) => {
    try {
      await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
      });
      setProductsData((prev) => prev.filter((p) => p._id !== productId));
      setNotification("🗑️ Product deleted successfully!");
    } catch (err) {
      console.error(err);
      setNotification("❌ Failed to delete product.");
    }
  };

  const handleEditProduct = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setNewProduct(product);
  };

  // ✅ Update Product (PUT to backend)
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:5000/api/products/${currentProduct._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        }
      );
      const updated = await res.json();
      setProductsData((prev) =>
        prev.map((p) => (p._id === currentProduct._id ? updated : p))
      );
      setIsEditing(false);
      setCurrentProduct(null);
      setNotification("✏️ Product updated successfully!");
    } catch (err) {
      console.error(err);
      setNotification("❌ Failed to update product.");
    }
  };

  // ✅ Update Order Status (PATCH to backend)
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const updated = await res.json();
      setOrdersData((prev) =>
        prev.map((o) => (o._id === orderId ? updated : o))
      );
      setNotification("📦 Order status updated!");
    } catch (err) {
      console.error(err);
      setNotification("❌ Failed to update order status.");
    }
  };

  // 🚫 Block non-admins
  if (!isAdmin) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-red-600">Access Denied</h2>
        <p className="text-gray-700 mb-6">
          You must be logged in as an administrator to view this page.
        </p>
        <button
          onClick={() => navigateTo("login")}
          className="bg-gray-900 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // ✅ Dashboard stats
  const totalProducts = productsData.length;
  const totalOrders = ordersData.length;
  const pendingOrders = ordersData.filter((o) => o.status === "Processing")
    .length;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Panel</h2>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-bold text-gray-500">Total Products</h3>
          <p className="text-4xl font-bold text-gray-900 mt-2">{totalProducts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-bold text-gray-500">Total Orders</h3>
          <p className="text-4xl font-bold text-gray-900 mt-2">{totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-bold text-gray-500">Pending Orders</h3>
          <p className="text-4xl font-bold text-gray-900 mt-2">
            {pendingOrders}
          </p>
        </div>
      </div>

      {/* Add/Edit Product Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Product" : "Add New Product"}
        </h3>
        <form
          onSubmit={isEditing ? handleUpdateProduct : handleAddProduct}
          className="space-y-4"
        >
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Category</label>
            <select
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
              <option value="new category">New Category</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Image URL</label>
            <input
              type="text"
              name="image"
              placeholder="Enter Image URL"
              value={newProduct.image}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
            {newProduct.image && (
              <img
                src={newProduct.image}
                alt="Preview"
                className="mt-4 w-32 h-32 object-cover rounded-lg mx-auto"
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white font-bold py-2 px-4 rounded-full hover:bg-gray-700"
          >
            {isEditing ? "Update Product" : "Add Product"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setCurrentProduct(null);
                setNewProduct({
                  name: "",
                  description: "",
                  price: 0,
                  category: categories[0] || "",
                  image:
                    "https://placehold.co/300x300/e5e7eb/1f2937?text=Product",
                });
              }}
              className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded-full hover:bg-gray-700 mt-2"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Manage Products Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-bold mb-4">Existing Products</h3>
        <ul className="divide-y divide-gray-200">
          {productsData.map((product) => (
            <li
              key={product._id}
              className="py-2 flex justify-between items-center"
            >
              <span>
                {product.name} - {product.description}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Order Tracking Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-bold mb-4">Order Tracking</h3>
        <ul className="divide-y divide-gray-200">
          {ordersData.map((order) => (
            <li key={order._id} className="py-4">
              <div className="font-semibold">Order ID: {order._id}</div>
              <div className="text-sm text-gray-600">User ID: {order.userId}</div>
              <div className="text-sm">
                Items: {order.items.map((item) => item.name).join(", ")}
              </div>
              <div className="flex items-center mt-2">
                <span className="font-bold">Status:</span>
                <select
                  className="ml-2 p-1 border rounded"
                  value={order.status}
                  onChange={(e) =>
                    handleUpdateOrderStatus(order._id, e.target.value)
                  }
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <main className="flex-1 p-6">
      {children}
    </main>
    <footer className="bg-gray-900 text-white p-8 mt-12">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        {/* Newsletter */}
        <div>
          <h4 className="font-bold mb-3">NEWSLETTER</h4>
          <div className="flex">
            <input type="email" placeholder="Enter email" className="bg-gray-800 text-white p-2 w-full rounded-l-md focus:outline-none"/>
            <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded-r-md">
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export default function App() {
  const [isAuthReady, setIsAuthReady] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState([]);
  const [productsData, setProductsData] = useState(initialProducts);
  const [ordersData, setOrdersData] = useState(initialOrders);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState('');
  const [pageProps, setPageProps] = useState({});

  const navigateTo = (page, props = {}) => {
    setCurrentPage(page);
    setPageProps(props);
  };

  const login = (userData) => {
    setUser({ ...userData, uid: userData.id });
    setNotification('Logged in successfully!');
  };

  const logout = () => {
    setUser(null);
    setNotification('Logged out successfully!');
  };

  const addOrder = (newOrder) => {
    setOrdersData(prev => [...prev, newOrder]);
  };

  const addToCart = (product, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + qty } : item);
      }
      return [...prev, { ...product, qty }];
    });
    setNotification(`${product.name} added to cart!`);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    setNotification('Item removed from cart!');
  };

  const updateCartItemQty = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, qty: newQty } : item));
  };

  const clearCart = () => {
    setCartItems([]);
  };
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const isLoggedIn = !!user;

  const renderPage = () => {
    if (!isAuthReady) {
      return <div className="text-center mt-20 text-gray-600">Loading...</div>;
    }
    
    switch(currentPage) {
      case 'shop':
        return <ShopPage navigateTo={navigateTo} addToCart={addToCart} />;
      case 'product':
        return <ProductPage navigateTo={navigateTo} addToCart={addToCart} product={pageProps.product} />;
      case 'cart':
        return <CartPage navigateTo={navigateTo} />;
      case 'checkout':
        return <CheckoutPage navigateTo={navigateTo} setNotification={setNotification} />;
      case 'my-orders':
        return <UserOrdersPage navigateTo={navigateTo} />;
      case 'admin':
        return <AdminDashboard navigateTo={navigateTo} setNotification={setNotification} />;
      case 'login':
        return <LoginPage navigateTo={navigateTo} setNotification={setNotification} />;
      case 'signup':
        return <SignupPage navigateTo={navigateTo} setNotification={setNotification} />;
      case 'home':
      default:
        return <HomePage navigateTo={navigateTo} addToCart={addToCart} />;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItemQty, clearCart, totalItems, totalPrice }}>
        <ProductContext.Provider value={{ productsData, setProductsData }}>
          <OrderContext.Provider value={{ ordersData, addOrder, setOrdersData }}>
            <div className="bg-gray-100 font-sans text-gray-900 leading-normal tracking-normal">
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
              <script src="https://cdn.tailwindcss.com"></script>
              {notification && (
                <div className="fixed top-4 right-4 bg-gray-900 text-white py-2 px-4 rounded-lg shadow-md transition-opacity duration-300 z-50">
                  {notification}
                </div>
              )}
              <Navbar navigateTo={navigateTo} />
              <Layout>
                {renderPage()}
              </Layout>

              {/* Floating WhatsApp Button */}
              <a href="https://wa.me/2348148702988?text=Hello%2C%20I%20have%20a%20question%20about%20my%20order." target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors">
                <i className="fab fa-whatsapp text-2xl"></i>
              </a>

            </div>
          </OrderContext.Provider>
        </ProductContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
