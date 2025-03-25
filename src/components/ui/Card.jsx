// src/components/ui/Card.jsx
export function Card({ children, className }) {
    return (
      <div className={`border rounded-lg shadow-lg overflow-hidden ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardContent({ children }) {
    return <div className="p-4">{children}</div>;
  }
  