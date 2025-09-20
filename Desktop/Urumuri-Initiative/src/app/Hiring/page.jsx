"use client";

import { useState } from "react";
import {
  FaFileAlt,
  FaTimesCircle,
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

const dummyWorkers = [
  {
    id: 1,
    name: "Alice Niyonsaba",
    job: "Doing laundry",
    location: "Kigali",
    phone: "250781234567",
    hasCV: true,
    cvLink: "/cv/alice-niyonsaba.pdf",
  },
  {
    id: 2,
    name: "Eric Uwizeye",
    job: "House painting",
    location: "Huye",
    phone: "250783456789",
    hasCV: false,
    cvLink: null,
  },
  {
    id: 3,
    name: "Sandra Umutoni",
    job: "Carpet cleaning",
    location: "Musanze",
    phone: "250789123456",
    hasCV: true,
    cvLink: "/cv/sandra.pdf",
  },
  {
    id: 4,
    name: "David Nshimiyimana",
    job: "Helping people move (load carrying)",
    location: "Rwamagana",
    phone: "250785123789",
    hasCV: false,
    cvLink: null,
  },
  {
    id: 5,
    name: "Claire Uwimana",
    job: "Car washing",
    location: "Rubavu",
    phone: "250782345123",
    hasCV: true,
    cvLink: "/cv/claire.pdf",
  },
  {
    id: 6,
    name: "Jean Bosco",
    job: "Carrying goods at the market",
    location: "Huye",
    phone: "250789987654",
    hasCV: false,
    cvLink: null,
  },
  {
    id: 7,
    name: "Peace Mugwaneza",
    job: "Selling vegetables",
    location: "Kigali",
    phone: "250788888888",
    hasCV: true,
    cvLink: "/cv/peace.pdf",
  },
  {
    id: 8,
    name: "Mugisha Emmanuel",
    job: "Walking around advertising products",
    location: "Gicumbi",
    phone: "250781112233",
    hasCV: false,
    cvLink: null,
  },
  {
    id: 9,
    name: "Aline Uwamwezi",
    job: "Helping migrants move homes",
    location: "Muhanga",
    phone: "250782223344",
    hasCV: true,
    cvLink: "/cv/aline.pdf",
  },
  {
    id: 10,
    name: "Patrick Mugenzi",
    job: "Parking assistant",
    location: "Nyagatare",
    phone: "250783334455",
    hasCV: false,
    cvLink: null,
  },
  {
    id: 11,
    name: "Josiane Mukamana",
    job: "Dishwashing in restaurants",
    location: "Kayonza",
    phone: "250784445566",
    hasCV: true,
    cvLink: "/cv/josiane.pdf",
  },
  {
    id: 12,
    name: "Thierry Habimana",
    job: "Unpacking house furniture",
    location: "Ngororero",
    phone: "250785556677",
    hasCV: false,
    cvLink: null,
  },
  {
    id: 13,
    name: "Diane Uwase",
    job: "Selling food on the street",
    location: "Burera",
    phone: "250786667788",
    hasCV: false,
    cvLink: null,
  },
  {
    id: 14,
    name: "Claude Nkurunziza",
    job: "Delivery by motorcycle",
    location: "Nyanza",
    phone: "250787778899",
    hasCV: true,
    cvLink: "/cv/claude.pdf",
  },
  {
    id: 15,
    name: "Fabrice Iradukunda",
    job: "Construction assistant",
    location: "Rulindo",
    phone: "250788889900",
    hasCV: false,
    cvLink: null,
  },
  {
    id: 16,
    name: "Ange Tuyisenge",
    job: "Grass cutting / Yard cleaning",
    location: "Bugesera",
    phone: "250789990011",
    hasCV: true,
    cvLink: "/cv/ange.pdf",
  },
  {
    id: 17,
    name: "Moise Hirwa",
    job: "Warehouse security assistant",
    location: "Gatsibo",
    phone: "250780001122",
    hasCV: false,
    cvLink: null,
  },
  {
    id: 18,
    name: "Marie Grace Ingabire",
    job: "Watering flowers and plants",
    location: "Karongi",
    phone: "250781122233",
    hasCV: true,
    cvLink: "/cv/grace.pdf",
  },
  {
    id: 19,
    name: "Celestin Bizimana",
    job: "Water delivery",
    location: "Nyamagabe",
    phone: "250782233344",
    hasCV: false,
    cvLink: null,
  },
  {
    id: 20,
    name: "Solange Nyiraneza",
    job: "Farm helper",
    location: "Gisagara",
    phone: "250783344455",
    hasCV: true,
    cvLink: "/cv/solange.pdf",
  },
];

export default function HiringPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const router = useRouter();

  const filtered = dummyWorkers.filter((w) =>
    w.job.toLowerCase().includes(search.toLowerCase())
  );

  const visibleWorkers = showAll ? filtered : filtered.slice(0, 6);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const finishHire = () => {
    const selectedWorkers = dummyWorkers.filter((w) => selected.includes(w.id));
    const message = encodeURIComponent(
      `Hello, you have been hired through our platform. Congratulations!`
    );

    selectedWorkers.forEach((worker) => {
      const link = `https://wa.me/${worker.phone}?text=${message}`;
      window.open(link, "_blank");
    });
  };

  const handleEmployer = () => {
    router.push("/Employeeinfo");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-12 mt-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Hire a Worker
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto mb-6">
        <div className="flex flex-1 items-center border border-gray-300 rounded-lg px-4 shadow-sm bg-white">
          <FaSearch className="text-red-800 mr-2" />
          <input
            type="text"
            placeholder="Search job position..."
            className="w-full py-2 focus:outline-none"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowAll(false);
            }}
          />
        </div>
        <button
          onClick={handleEmployer}
          className="bg-red-800 hover:bg-red-700 text-white py-2 px-6 rounded-lg shadow-md"
        >
          Join RNRS as Employer
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleWorkers.map((worker) => (
          <div
            key={worker.id}
            className={`bg-white rounded-xl shadow-md p-5 relative hover:shadow-lg transition duration-300 ${
              selected.includes(worker.id) ? "border-2 border-red-800" : ""
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">{worker.name}</h2>

            <p className="flex items-center text-gray-600 mb-1">
              <FaBriefcase className="text-red-800 mr-2" />
              {worker.job}
            </p>

            <p className="flex items-center text-gray-600 mb-1">
              <FaMapMarkerAlt className="text-red-800 mr-2" />
              {worker.location}
            </p>

            <p className="flex items-center text-gray-600 mb-3">
              <FaFileAlt className="text-red-800 mr-2" />
              {worker.hasCV ? (
                <a
                  href={worker.cvLink}
                  target="_blank"
                  className="text-red-800 underline hover:text-red-600"
                >
                  View CV
                </a>
              ) : (
                <span className="flex items-center text-red-800">
                  No CV <FaTimesCircle className="ml-2 text-red-800" />
                </span>
              )}
            </p>

            <button
              onClick={() => toggleSelect(worker.id)}
              className={`mt-2 w-full py-2 px-4 rounded-lg text-white ${
                selected.includes(worker.id)
                  ? "bg-yellow-500 hover:bg-yellow-400"
                  : "bg-red-800 hover:bg-red-700"
              }`}
            >
              {selected.includes(worker.id) ? "Unselect" : "Hire"}
            </button>
          </div>
        ))}
      </div>

      {filtered.length > 6 && !showAll && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="text-red-800 underline hover:text-red-600 text-lg"
          >
            See All Workers ({filtered.length})
          </button>
        </div>
      )}

      {selected.length > 0 && (
        <div className="mt-10 text-center">
          <button
            onClick={finishHire}
            className="bg-red-800 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-red-700 transition"
          >
            Finish Hire & Notify on WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}
