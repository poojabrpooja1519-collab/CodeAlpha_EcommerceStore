import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <p style={{ padding: '30px' }}>Loading...</p>;

  return (
    <div style={{ padding: '30px', display: 'flex', gap: '30px' }}>
      <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <h2>₹{product.price}</h2>
        <p>Category: {product.category}</p>
        <p>In Stock: {product.stock}</p>
        <button onClick={() => addToCart(product)} style={{ padding: '10px 20px', background: '#222', color: '#fff', border: 'none', borderRadius: '5px' }}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;