export default function ServicesPage() {
    return (
      <main className="bg-white text-black p-8 space-y-12 max-w-6xl mx-auto">
  
        {/* Header */}
        <header className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-[#8B0000]">Our Services</h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            RNRS offers comprehensive digital solutions for agents, employees, and payroll senders.
          </p>
        </header>
  
        {/* Main Services */}
        <section className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition">
            <h3 className="text-xl font-semibold text-[#8B0000] mb-2">Agent Account Management</h3>
            <p className="text-gray-800">
              Secure login, two-factor authentication, and real-time performance tracking tools.
            </p>
          </div>
  
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition">
            <h3 className="text-xl font-semibold text-[#8B0000] mb-2">Employee Registration</h3>
            <p className="text-gray-800">
              Smooth onboarding with digital document uploads, contracts, and e-signatures.
            </p>
          </div>
  
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg hover:-translate-y-1 transition">
            <h3 className="text-xl font-semibold text-[#8B0000] mb-2">Weekly Payroll Services</h3>
            <p className="text-gray-800">
              Automated salary code generation, quick payments, and downloadable receipts.
            </p>
          </div>
        </section>
  
        {/* Highlight / Extra Features */}
        <section className="bg-[#FFD700]/90 p-6 md:p-8 rounded-xl shadow space-y-3">
          <h3 className="text-xl md:text-2xl font-semibold text-[#8B0000]">Extra Features</h3>
          <ul className="list-disc ml-5 space-y-2 text-[#8B0000]">
            <li>Email & SMS alerts</li>
            <li>Mobile app setup guidance</li>
            <li>Customer & agent support</li>
            <li>Audit logs & security controls</li>
          </ul>
        </section>
      </main>
    );
  }
  