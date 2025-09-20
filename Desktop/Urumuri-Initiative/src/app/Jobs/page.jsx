"use client";

import React, { useState } from "react";
import { Briefcase, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ProfileFormModal from "./profileInfo/page";

const jobsData = [
  {
    id: 1,
    title: "House Cleaner",
    description:
      "We are looking for a dedicated house cleaner with experience.",
    location: "Kigali",
    category: "Cleaning",
    contactEmail: "cleaning@example.com",
  },
  {
    id: 2,
    title: "Car Washer",
    description: "Urgently hiring car washers in Remera area.",
    location: "Remera",
    category: "Washing",
    contactEmail: "washing@example.com",
  },
  {
    id: 3,
    title: "Mover Assistant",
    description: "Support moving teams by carrying and organizing items.",
    location: "Nyamirambo",
    category: "Moving Assistance",
    contactEmail: "moving@example.com",
  },
  {
    id: 4,
    title: "Laundry Helper",
    description: "Looking for someone to assist in laundry work.",
    location: "Kicukiro",
    category: "Laundry",
    contactEmail: "laundry@example.com",
  },
];

export default function AvailableJobs() {
  const [search, setSearch] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobsData);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearch(e.target.value);
    const results = jobsData.filter(
      (job) =>
        job.title.toLowerCase().includes(keyword) ||
        job.location.toLowerCase().includes(keyword) ||
        job.category.toLowerCase().includes(keyword)
    );
    setFilteredJobs(results);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 mt-20">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Available Job Opportunities
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Do we have your profile information?{" "}
        <span
          onClick={() => setModalOpen(true)}
          className="text-red-800 hover:underline cursor-pointer"
        >
          Join us here
        </span>{" "}
        and let us help you get connected to employers.
      </p>

      <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
        <Input
          type="text"
          placeholder="Search by location or job Position"
          value={search}
          onChange={handleSearch}
          className="w-full md:w-3/4"
        />
        <Button
          className="w-full bg-red-800 hover:bg-red-700 text-white py-1 px-2 rounded md:w-auto"
          onClick={() => setModalOpen(true)}
        >
          Join As JobSeeker
        </Button>

        {/* Modal */}
        <ProfileFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card
              key={job.id}
              className="hover:shadow-xl transition-shadow cursor-pointer"
            >
              <CardContent className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Briefcase className="text-red-800" /> {job.title}
                </h2>
                <p className="text-gray-600 mb-3">{job.description}</p>
                <div className="flex items-center text-sm text-gray-500 gap-1 mb-4">
                  <MapPin className="w-4 h-4" /> {job.location}
                </div>
                <div className="flex justify-between items-center">
                  <a
                    href={`mailto:${job.contactEmail}`}
                    className="text-sm text-[#101828] font-semibold hover:text-red-800 hover:underline flex items-center gap-1"
                  >
                    <Mail className="w-4 h-4 " /> Contact Boss
                  </a>
                  <Button
                    variant="outline"
                    className="text-sm px-3 py-1 bg-red-800 text-white"
                  >
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No jobs found.
          </p>
        )}
      </div>
    </div>
  );
}
