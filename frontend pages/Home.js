import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <h1>Products</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
        {products.map((product) => (
          <div key={product._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px' }}>
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: '#000' }}>
              <img src={product.image || 'https://via.placeholder.com/200'} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
            </Link>
            <button onClick={() => addToCart(product)} style={{ width: '100%', padding: '8px', background: '#222', color: '#fff', border: 'none', borderRadius: '5px' }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;