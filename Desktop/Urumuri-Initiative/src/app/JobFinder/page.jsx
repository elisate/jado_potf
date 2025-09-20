"use client"
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu } from "lucide-react";

const jobFields = {
  Farming: {
    categories: ["Farming on land", "Farming in the swamp"],
    image: "/Farming.jpg",
    info:
      "For farming on land, the worker agrees with the employer on a daily wage equal to or between (1,250 - 1,750) frw. For farming in the swamp, the worker agrees with the employer on a daily wage equal to or between (1,500 - 2,000) frw. NB: 100 frw is the cost of the service provided by the worker, but 150 frw is the cost of the service provided by the employer.",
  },
  Building: {
    categories: ["Masonry", "Carpentry", "Plastering"],
    image: "/Building.jpg",
    info:
      "Building workers in Rwanda often negotiate daily wages with employers based on the type and complexity of work. Payments range from 2,000 to 5,000 Rwandan Francs per day, depending on skill level, task nature, and materials involved. Skilled workers earn more than general laborers, and both parties agree on the rate before work begins.",
  },
  Cleaning: {
    categories: ["Office", "Home", "Outdoor"],
    image: "/Cleaning.jpg",
    info:
      "Cleaning jobs in Rwanda include tasks like sweeping, mopping, dusting, and dishwashing, depending on whether it’s a home or office. Pay varies based on space size, duties, and time required. Workers typically earn between 1,000 and 2,500 Rwandan Francs per day. Most of these jobs are informal, with payment terms agreed upon beforehand."
  },
  Burdening: {
    categories: ["Carrying Bricks", "Water fetching"],
    image: "/Burderning.jpg",
    info:
      "Burdening jobs in Rwanda involve carrying heavy loads like construction materials or water over distances. These physically demanding roles are often informal and short-term, typically paying between 1,000 and 2,000 Rwandan Francs per day, with rates negotiated based on workload."
  },
  Cooking: {
    categories: ["Event", "Home Catering"],
    image: "/cooking.jpg",
    info:
      "Catering jobs involve preparing and serving food for events, businesses, or households. These roles require skills in cooking, food presentation, and customer service. They are often temporary or event-based, with daily pay varying depending on the event scale and menu complexity, usually negotiated between 15,000 and 30,000 RWF"
  },
  Driving: {
  categories: ["Passenger Transport", "Goods Delivery"],
  image: "/driving.jpg",
  info:
    "Driving jobs in Rwanda include transporting passengers or goods for events, businesses, or individuals. Drivers may use cars, motorcycles, or trucks depending on the job. Daily pay typically ranges from 5,000 to 15,000 Rwandan Francs, depending on the vehicle type, distance, and hours worked. Rates are usually agreed upon before the job begins.",
},

};

export default function JobFinder() {
  const [selectedField, setSelectedField] = useState("Farming");
  const [selectedCategory, setSelectedCategory] = useState(jobFields[selectedField].categories[0]);

  const handleFieldClick = (field) => {
    setSelectedField(field);
    setSelectedCategory(jobFields[field].categories[0]);
  };

  return (
    <div className="mt-20">
    <h2 className="flex justify-center items-center text-2xl font-semibold">Daily Job Matching & Hiring Made Easy</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:px-20 py-10">
      <div className="space-y-2">
        {Object.keys(jobFields).map((field) => (
          <button
            key={field}
            onClick={() => handleFieldClick(field)}
            className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg border text-left ${
              selectedField === field ? "bg-red-800 text-white" : "bg-white"
            }`}
          >
            <Menu className="w-4 h-4" />
            {field}
          </button>
        ))}
      </div>
             <img
          src={jobFields[selectedField].image}
          alt={selectedField}
          className="rounded-xl w-full h-85 object-cover"
        />
      <div className="md:col-span-2 space-y-4">
    
        <h2 className="text-2xl font-semibold">Find job or worker per day in an easy way</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          {jobFields[selectedField].info}
        </p>

        <select
          className="w-[250px] border px-4 py-3 rounded-lg mt-4"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {jobFields[selectedField].categories.map((cat) => (
            <option key={cat} value={cat} className="">
              {cat}
            </option>
          ))}
        </select>
          <div className="flex flex-row gap-10">
        <Button className="w-full mt-4 bg-red-800 text-white p-2 rounded-s-sm">
          Hire
        </Button>
          <Button className="w-full mt-4 bg-red-800 text-white p-2 rounded-s-sm">
          Ready for Job
        </Button>
        </div>
      </div>
    </div>
    </div>
  );
}
