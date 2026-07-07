import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please login to checkout');
      navigate('/login');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/orders', {
        user: userId,
        items: cart.map((item) => ({ product: item._id, quantity: item.quantity, price: item.price })),
        totalAmount: total
      });
      alert('Order placed successfully!');
      clearCart();
      navigate('/');
    } catch (err) {
      alert('Checkout failed: ' + err.message);
    }
  };

  if (cart.length === 0) return <p style={{ padding: '30px' }}>Your cart is empty.</p>;

  return (
    <div style={{ padding: '30px' }}>
      <h1>Your Cart</h1>
      {cart.map((item) => (
        <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', padding: '10px 0' }}>
          <span>{item.name}</span>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
            style={{ width: '50px' }}
          />
          <span>₹{item.price * item.quantity}</span>
          <button onClick={() => removeFromCart(item._id)}>Remove</button>
        </div>
      ))}
      <h2>Total: ₹{total}</h2>
      <button onClick={handleCheckout} style={{ padding: '10px 20px', background: '#222', color: '#fff', border: 'none', borderRadius: '5px' }}>
        Checkout
      </button>
    </div>
  );
}

export default Cart;