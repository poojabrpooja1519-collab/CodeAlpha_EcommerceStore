import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', background: '#222', color: '#fff' }}>
      <Link to="/" style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>
        MyStore
      </Link>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        <Link to="/cart" style={{ color: '#fff', textDecoration: 'none' }}>Cart ({totalItems})</Link>
        <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
        <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;