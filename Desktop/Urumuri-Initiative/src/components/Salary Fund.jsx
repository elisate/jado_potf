"use client";
import { useRouter } from "next/navigation";
import { LifeBuoy, User } from "@deemlol/next-icons";
import { Briefcase } from "lucide-react";
export default function SalaryFundComponent() {
    const router = useRouter();
    const handleAddOrganization = () => {
        router.push("/createOrganisation");
    };
  return (
    
    <section className="px-6 py-20">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">Our Services</h2>
      <div className="w-16 h-1 bg-[#9f0712] mb-10"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex items-start space-x-4">
          <div className="w-18 h-10 mt-2 p-2 bg-[#9f0712] transform rotate-30 flex items-center justify-center">
            <div className="text-white transform -rotate-45 text-xl"><LifeBuoy /></div>
          </div>
          <div>
            <h3 className="font-bold text-lg">Organization</h3>
            <p className="text-sm text-gray-600">
                An organization partners with RNRS by signing a contract that allows it to receive salary loans used to pay its employees.
                 The organization then repays the loan in the following month, either in full or in installments,
                  depending on the agreement.</p>
           <button onClick={handleAddOrganization} className="bg-[#9f0712] text-white py-2 px-4 rounded mt-5">
            Add your  Organization
          </button>
          </div>
        
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-18 h-10 mt-2 p-2 bg-[#9f0712] transform rotate-30 flex items-center justify-center">
            <div className="text-white transform -rotate-35 text-xl"><User /></div>
          </div>
          <div>
            <h3 className="font-bold text-lg">Employee</h3>
            <p className="text-sm text-gray-600">
                Employees working in organizations partnered with RNRS can access part of their salary before the end of the month. 
                This is only possible if there is an individual agreement between the employee and RNRS through their employer.</p>
                  <button className="bg-[#9f0712] text-white py-2 px-4 rounded mt-5">
            Fill your Information
          </button>
          </div>
        
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-18 h-10 mt-2 p-2 bg-[#9f0712] transform rotate-30 flex items-center justify-center">
            <div className="text-white transform -rotate-45 text-xl"><Briefcase /></div>
          </div>
          <div>
            <h3 className="font-bold text-lg">Job Provider</h3>
            <p className="text-sm text-gray-600">
A job provider registers on the RNRS platform by submitting their personal and professional information. 
Once approved, they can hire workers, access job seeker profiles, 
and process salary payments directly through the system</p>
                  <button className="bg-[#9f0712] text-white py-2 px-4 rounded mt-5">
            Fill your Information   
            </button>
          </div>
           
        </div>
      </div>
    </div>
    
  </section>
  );
}
