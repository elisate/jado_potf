export function Card({ children, ...props }) {
    return (
      <div className="bg-white shadow rounded p-4" {...props}>
        {children}
      </div>
    );
  }
  
  export function CardHeader({ children, ...props }) {
    return (
      <div className="mb-4" {...props}>
        {children}
      </div>
    );
  }
  
  export function CardTitle({ children, ...props }) {
    return (
      <h3 className="text-xl font-semibold text-gray-900 mb-2" {...props}>
        {children}
      </h3>
    );
  }
  
  export function CardDescription({ children, ...props }) {
    return (
      <p className="text-gray-600 text-sm mb-2" {...props}>
        {children}
      </p>
    );
  }
  
  export function CardContent({ children, ...props }) {
    return (
      <div className="p-4" {...props}>
        {children}
      </div>
    );
  }
  