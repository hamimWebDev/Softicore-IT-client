import React from 'react';

const PiriLoader: React.FC = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  }}>
    <div style={{
      width: 80,
      height: 80,
      border: '8px solid #f3f3f3',
      borderTop: '8px solid #3498db',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }} />
    <style jsx>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default PiriLoader; 