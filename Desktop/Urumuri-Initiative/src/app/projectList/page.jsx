'use client';
import { useState } from 'react';
import { Hourglass, Loader2, CheckCircle } from 'lucide-react';

const dummyProjects = [
  {
    id: 1,
    title: 'Clean Water Initiative',
    description: 'Providing access to clean water in rural communities.',
    objective: 'Ensure safe and affordable drinking water for 5,000 households.',
    category: 'Health',
    startDate: '2025-07-01',
    endDate: '2025-12-31',
    estimatedBudget: 50000,
    teamLeader: 'Alice Niyonsaba',
    teamMembers: ['John Doe', 'Mary Kayitesi', 'Jean Bosco'],
    status: 'Completed',
  },
  {
    id: 2,
    title: 'Youth Empowerment',
    description: 'Skills training and mentorship for unemployed youth.',
    objective: 'Train 300 youth in digital skills and entrepreneurship.',
    category: 'Education',
    startDate: '2025-06-15',
    endDate: '2025-11-30',
    estimatedBudget: 30000,
    teamLeader: 'Emmanuel Habimana',
    teamMembers: ['Claudine Uwase', 'Eric Mugisha'],
    status: 'In Progress',
  },
  {
    id: 3,
    title: 'Child Nutrition Support',
    description: 'Distribute nutritious meals in schools.',
    objective: 'Reach 10,000 children across the country.',
    category: 'Nutrition',
    startDate: '2025-05-01',
    endDate: '2025-10-01',
    estimatedBudget: 40000,
    teamLeader: 'Sarah Uwimana',
    teamMembers: ['Alice Umutesi', 'David Mugenzi'],
    status: 'Pending',
  },
];

export default function ProjectList({ projects }) {
  const data = Array.isArray(projects) && projects.length > 0 ? projects : dummyProjects;
  const [sortKey, setSortKey] = useState('title');

  const sortedProjects = [...data].sort((a, b) => {
    if (sortKey === 'title') return a.title.localeCompare(b.title);
    if (sortKey === 'startDate') return new Date(a.startDate) - new Date(b.startDate);
    if (sortKey === 'category') return a.category.localeCompare(b.category);
    if (sortKey === 'status') return a.status.localeCompare(b.status);
    return 0;
  });

  // ✅ Map status to icon + color
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Hourglass className="w-5 h-5 text-yellow-500" />;
      case 'In Progress':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="mb-6 flex items-center space-x-3">
        <label htmlFor="sort" className="font-medium text-gray-700">
          Sort by:
        </label>
        <select
          id="sort"
          className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="startDate">Start Date</option>
          <option value="category">Category</option>
          <option value="status">Status</option>
        </select>
      </div>

      <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {sortedProjects.map((project) => (
          <li
            key={project.id}
            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
          >
            <div className="flex justify-between  mb-2">
              <h2 className="text-2xl font-bold text-indigo-700">{project.title}</h2>
              <div className="flex items-center gap-1">
                {getStatusIcon(project.status)}
                <span className="text-sm text-gray-600 italic">{project.status}</span>
              </div>
            </div>

            <p className="text-gray-500 mb-2 italic">{project.category}</p>

            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Objective:</span> {project.objective}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Description:</span> {project.description}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Start Date:</span>{' '}
              {new Date(project.startDate).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">End Date:</span>{' '}
              {new Date(project.endDate).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Estimated Budget:</span> ${project.estimatedBudget.toLocaleString()}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Team Leader:</span> {project.teamLeader}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Team Members:</span>{' '}
              {project.teamMembers.join(', ')}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
