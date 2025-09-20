"use client";

export default function Select({ options, defaultValue, ...props }) {
  return (
    <select
      className="w-full p-2 border border-gray-300 rounded bg-white"
      defaultValue={defaultValue}
      {...props}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}