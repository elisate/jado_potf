import React, { useState } from "react";

const categories = [
  {
    name: "Farming",
    image: "/assets/farming.jpg",
    options: ["Farming on land", "Farming in the swamp"],
    description:
      "For farming on land, the worker agrees with the employer on a daily wage between (1,250 - 1,750) FRW. For swamp farming, it's between (1,500 - 2,000) FRW.",
  },
  {
    name: "Building",
    image: "/assets/building.jpg",
    options: ["House Construction", "Wall Repair"],
    description:
      "Builders are paid between (2,000 - 3,500) FRW per day depending on skill and task complexity.",
  },
  {
    name: "Cleaning",
    image: "/assets/cleaning.jpg",
    options: ["House Cleaning", "Compound Cleaning"],
    description:
      "Cleaners charge between (800 - 1,200) FRW per day depending on area size and waste level.",
  },
];

const JobCategoryCard = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedOption, setSelectedOption] = useState(categories[0].options[0]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedOption(category.options[0]);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 rounded-xl shadow-md">
      {/* Left: Category List */}
      <div className="w-full md:w-1/4">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Job Categories</h3>
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(cat)}
            className={`w-full text-left px-4 py-3 border rounded-lg mb-3 transition duration-200 ${
              selectedCategory.name === cat.name
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 hover:bg-blue-100"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Middle: Image */}
      <div className="w-full md:w-1/2">
        <img
          src={selectedCategory.image}
          alt={selectedCategory.name}
          className="rounded-lg w-full h-64 object-cover shadow"
        />
      </div>

      {/* Right: Details */}
      <div className="w-full md:w-1/4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            Quick Daily Jobs
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            {selectedCategory.description}
          </p>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 text-sm"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {selectedCategory.options.map((opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <button className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Get Started — Save Time & Money
        </button>
      </div>
    </div>
  );
};

export default JobCategoryCard;
