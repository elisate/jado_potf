// src/components/ui/button.jsx
export function Button({ children, ...props }) {
    return (
      <button
        className="px-4 py-2 bg-red-700 text-white rounded hover:bg-orange-600 transition"
        {...props}
      >
        {children}
      </button>
    );
  }
  