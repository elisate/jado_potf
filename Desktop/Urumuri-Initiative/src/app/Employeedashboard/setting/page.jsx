"use client";

export default function SettingsPage() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            placeholder="Your full name"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Change Password
          </label>
          <input
            type="password"
            placeholder="New password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
