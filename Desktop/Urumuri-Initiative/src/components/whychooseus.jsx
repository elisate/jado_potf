import React from 'react';
import { ShieldCheck, Clock, DollarSign } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      title: 'Advance Payments',
      description:
        'We pay employees their weekly wages before they complete their work — bringing financial flexibility and confidence.',
      icon: <DollarSign className="w-6 h-6 text-white" />,
      color: 'bg-red-800',
    },
    {
      title: 'Flexible Employer Terms',
      description:
        'Employers can manage their cash flow with ease — pay just 1 month’s salary over a 2-month window.',
      icon: <Clock className="w-6 h-6 text-white" />,
      color: 'bg-red-800',
    },
    {
      title: 'Financial Security',
      description:
        'Our model ensures financial peace of mind for both employees and employers — with verified processes and transparent transactions.',
      icon: <ShieldCheck className="w-6 h-6 text-white" />,
      color: 'bg-red-800',
    },
  ];

  return (
    <section className="py-12 bg-gray-50" id="why-us">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Why People Trust & Choose Us</h2>
          <p className="mt-2 text-gray-600">
            Our system is designed to empower both employers and employees through flexibility, security, and early access to wages.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 ml-10">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 w-auto shadow hover:shadow-md transition"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${reason.color}`}>
                {reason.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{reason.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
