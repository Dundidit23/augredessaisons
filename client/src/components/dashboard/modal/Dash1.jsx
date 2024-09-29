import React, { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import './dash.scss';
import DarkMode from '../../DarkMode/DarkMode';
import ProductsOnline from '../../produits/products';

const Dashboard = () => {
  const [theme, setTheme] = useState('light');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["Infusion", "Huiles", "Gemmo", "Teintures"]);
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [newProduct, setNewProduct] = useState({ name: '', category: '', status: 'Active', sales: 0, stock: 0, price: 0 });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    document.body.classList.toggle('dark-theme', theme === 'light');
  };

  useEffect(() => {
    // Load initial products data (simulated)
    setProducts([
      { id: 1, name: 'Ocean', category: 'Furniture', status: 'Active', sales: 11, stock: 36, price: 560, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' },
      // Add more products here...
    ]);

    const jsFilterButton = document.querySelector(".jsFilter");
    const filterMenu = document.querySelector(".filter-menu");

    if (jsFilterButton && filterMenu) {
      const toggleFilterMenu = () => {
        filterMenu.classList.toggle("active");
      };

      jsFilterButton.addEventListener("click", toggleFilterMenu);

      // Cleanup event listener on component unmount
      return () => {
        jsFilterButton.removeEventListener("click", toggleFilterMenu);
      };
    }
  }, []);

  const addProduct = () => {
    setProducts([...products, { ...newProduct, id: Date.now(), img: 'https://via.placeholder.com/150' }]);
    setNewProduct({ name: '', category: '', status: 'Active', sales: 0, stock: 0, price: 0 });
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(product => (product.id === id ? updatedProduct : product)));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const filteredProducts = filterCategory === "All Categories"
    ? products
    : products.filter(product => product.category === filterCategory);

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <span>Au Gré des Saisons</span>
        </div>
        <div className='side-list'>
          <a className='sidebar-list-item' href="#"> 
            <span className="material-symbols-outlined"> space_dashboard</span>
            <span>Dashboard</span>
          </a>
          <a className='sidebar-list-item' href="#"> 
            <span className="material-symbols-outlined">Workspaces</span>
            <span>Produits</span>
          </a>
          <a className='sidebar-list-item' href="#">
            <span className="material-symbols-outlined">groups_2</span>
            <span>Clients</span>
          </a>
          <a className='sidebar-list-item' href="#">
            <span className="material-symbols-outlined">receipt_long</span>
            <span>Commandes</span>
          </a>
          <a className='sidebar-list-item' href="#">
            <span className="material-symbols-outlined">insights</span>
            <span>Analytics</span>
          </a>
          <a className='sidebar-list-item active' href="#">
            <span className="material-symbols-outlined">mail_outline</span>
            <span>Messages</span>
            <span className="message-count">26</span>
          </a>
          <a className='sidebar-list-item' href="#">
            <span className="material-symbols-outlined">report_gmailerrorred</span>
            <span>Rapport</span>
          </a>
          <a className='sidebar-list-item' href="#">
            <span className="material-symbols-outlined">settings</span>
            <span>Paramètres</span>
          </a>
          <a className='sidebar-list-item' href="#">
            <span className="material-symbols-outlined">add</span>
            <span>Add Product</span>
          </a>
          <a className='sidebar-list-item' href="#">
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </a>
        </div>
      </div>
      <div className="app-content">
        <div className="app-content-header">
          <div>
            <h1 className="app-content-headerText">Produits</h1>
            <div className="app-content-actions">
              <input className="search-bar" placeholder="Search..." type="text" />
            </div>
          </div>
          <button className="app-content-headerButton" onClick={addProduct}>Add Product</button>
          <div className="app-content-actions-wrapper">
            <div className="filter-button-wrapper">
              <button className="action-button filter jsFilter">
                <span>Filter</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-filter">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
              </button>
              <div className="filter-menu">
                <label htmlFor=''>Category</label>
                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                  <option>All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <label htmlFor=''>Status</label>
                <select>
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Disabled</option>
                </select>
                <div className="filter-menu-buttons">
                  <button className="filter-button reset">Reset</button>
                  <button className="filter-button apply">Apply</button>
                </div>
              </div>
            </div>
            <button className="action-button list active" title="List View">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-list">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
            <button className="action-button grid" title="Grid View">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="app-content-actions">
          <form className="add-product-form">
            <label htmlFor=''>Name:</label>
            <input type="text" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
            <label htmlFor=''>Category:</label>
            <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <label htmlFor=''>Status:</label>
            <select value={newProduct.status} onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}>
              <option value="Active">Active</option>
              <option value="Disabled">Disabled</option>
            </select>
            <label htmlFor=''>Sales:</label>
            <input type="number" value={newProduct.sales} onChange={(e) => setNewProduct({ ...newProduct, sales: parseInt(e.target.value) })} />
            <label htmlFor=''>Stock:</label>
            <input type="number" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })} />
            <label htmlFor=''>Price:</label>
            <input type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })} />
          </form>
        </div>
        <div className="products-area-wrapper tableView">
          <div className="products-header">
            <div className="product-cell image">Image</div>
            <div className="product-cell category">Category</div>
            <div className="product-cell status">Status</div>
            <div className="product-cell sales">Sales</div>
            <div className="product-cell stock">Stock</div>
            <div className="product-cell price">Price</div>
            <div className="product-cell actions">Actions</div>
          </div>
          {filteredProducts.map((product) => (
            <div key={product.id} className="products-row">
              <div className="product-cell image">
                <img src={product.img} alt={product.name} />
              </div>
              <div className="product-cell category">{product.category}</div>
              <div className="product-cell status">{product.status}</div>
              <div className="product-cell sales">{product.sales}</div>
              <div className="product-cell stock">{product.stock}</div>
              <div className="product-cell price">{product.price}</div>
              <div className="product-cell actions">
                <button onClick={() => updateProduct(product.id, { ...product, status: 'Active' })}>Edit</button>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
