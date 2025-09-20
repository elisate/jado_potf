"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Notify } from "notiflix";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react"; // using lucide icons

export default function PayrollsenderActivityTimeline() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://urumuri-backend.onrender.com/agent/getAgentActivities", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActivities(res.data.activities || []);
    } catch (err) {
      Notify.failure("Failed to fetch activities");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-xl px-6 py-8 w-full max-w-3xl mx-auto border border-gray-200 mt-20">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Clock className="w-6 h-6 text-gray-600" />
        Agent Activity Timeline
      </h2>

      {loading ? ( 
        <p className="text-gray-500"> Loading activities...</p>
      ) : activities.length === 0 ? (
        <p className="text-gray-500"> No activities found</p>
      ) : (
        <div className="max-h-[400px] overflow-y-auto pr-2">
          <ol className="relative border-l-2 border-white pl-4">
            {activities
              .slice()
              .reverse()
              .map((activity, index) => (
                <li key={index} className="mb-6 ml-4">
    

                  <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                    <p className="text-base text-gray-800 font-semibold">
                      {activity.action}{" "}
                      {activity.organization?.fullName && (
                        <span className="text-gray-700">"{activity.organization.fullName}"</span>
                      )}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {new Date(activity.date).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
          </ol>
        </div>
      )}
    </div>
  );
}
