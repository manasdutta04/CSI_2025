import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const location = useLocation();
  const { orderId, total } = location.state || {};

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="order-success-container">
      <div className="container">
        <div className="success-content">
          <div className="success-icon">
            <CheckCircle size={64} />
          </div>
          
          <h1>Order Placed Successfully!</h1>
          <p className="success-message">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>

          {orderId && (
            <div className="order-details">
              <div className="order-info">
                <Package size={24} />
                <div>
                  <h3>Order #{orderId}</h3>
                  {total && <p>Total: {formatPrice(total)}</p>}
                </div>
              </div>
              
              <div className="next-steps">
                <h3>What's next?</h3>
                <ul>
                  <li>You'll receive an email confirmation shortly</li>
                  <li>We'll send you tracking information once your order ships</li>
                  <li>Estimated delivery: 3-5 business days</li>
                </ul>
              </div>
            </div>
          )}

          <div className="action-buttons">
            <Link to="/products" className="continue-btn">
              <span>Continue Shopping</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
