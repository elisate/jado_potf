export default function Card({ title, children }) {
    return (
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        {children}
      </div>
    )
  }
  