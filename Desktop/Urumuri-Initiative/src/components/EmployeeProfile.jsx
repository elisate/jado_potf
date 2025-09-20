"use client";

export default function EmployeeProfilePage() {
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-8">
      <div className="flex flex-col items-center gap-4">
        <img
          src="/ceo.jpg"
          alt="Employee Avatar"
          className="h-28 w-28 rounded-full object-cover border-4 border-blue-200 shadow-md"
        />
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Christine Umurerwa</h1>
          <p className="text-lg text-blue-600 font-medium">Software Engineer</p>
        </div>
      </div>

     
      <section className="bg-white rounded-2xl shadow p-6 border border-blue-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
          <button className="border border-blue-300 px-4 py-2 rounded-lg hover:bg-blue-50 transition font-medium text-blue-700">Edit Profile</button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              id="email"
              type="email"
              defaultValue="chrisumurerwa1@gmail.com"
              readOnly
              className="w-full border border-gray-200 p-2 rounded-lg bg-gray-50 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
            <input
              id="phone"
              type="tel"
              defaultValue="0785098785"
              readOnly
              className="w-full border border-gray-200 p-2 rounded-lg bg-gray-50 focus:outline-none"
            />
          </div>
        </div>
      </section>

    
      <section className="bg-white rounded-2xl shadow p-6 border border-blue-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Employment Details</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
            <p className="text-base font-medium text-gray-900">Software Development</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Assigned Salary</label>
            <p className="text-base font-medium text-gray-900">$75,000 / year</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Hire Date</label>
            <p className="text-base font-medium text-gray-900">January 15, 2025</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Employee ID</label>
            <p className="text-base font-medium text-gray-900">EMP-001</p>
          </div>
        </div>
      </section>

      
      <section className="bg-white rounded-2xl shadow p-6 border border-blue-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills & Certifications</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Soft Skills</label>
            <p className="text-base font-medium text-gray-900">Communication, Teamwork, Problem Solving</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Certifications</label>
            <p className="text-base font-medium text-gray-900">Certified Java Developer, AWS Certified Solutions Architect</p>
          </div>
        </div>
      </section>
    </div>
  );
}
