'use client';
import SignatureCanvas from 'react-signature-canvas';
import { useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function SignContractForm() {
  const sigCanvas = useRef(null);
  const searchParams = useSearchParams();
  const orgId = searchParams.get('orgId');
  
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('6 months');
  const [paymentMethod, setPaymentMethod] = useState('full');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [organization, setOrganization] = useState(null);

  // Fetch organization details if orgId is provided
  useEffect(() => {
    if (orgId) {
      fetchOrganizationDetails();
    }
  }, [orgId]);

  const fetchOrganizationDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `https://urumuri-backend.onrender.com/organization/${orgId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrganization(response.data.data);
    } catch (error) {
      console.error('Failed to fetch organization details:', error);
    }
  };

  const handleSubmit = async () => {
    if (!orgId) {
      alert('Organization ID is missing. Please try again.');
      return;
    }

    if (!agreed) {
      alert('You must agree to the terms and conditions.');
      return;
    }

    if (!sigCanvas.current || sigCanvas.current.isEmpty()) {
      alert('Please provide your signature before submitting.');
      return;
    }

    const trimmedSignature = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Unauthorized: Please log in.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.patch(
        `https://urumuri-backend.onrender.com/organization/signContract/${orgId}`,
        {
          signature: trimmedSignature,
          duration,
          paymentMethod,
          agreed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Contract signed:', response.data);
      alert('Contract signed successfully!');
      // Optionally redirect to dashboard or another page
    } catch (error) {
      console.error(error);
      alert('Failed to sign contract. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!orgId) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-30">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Error</h2>
          <p className="text-gray-600">Organization ID is missing. Please try accessing this page from the organization approval dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-30 dropdown-container">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Sign Organization Contract</h2>

      {/* Organization Info */}
      {organization && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">Organization Details:</h3>
          <p className="text-sm text-blue-700"><strong>Name:</strong> {organization.fullName}</p>
          <p className="text-sm text-blue-700"><strong>Email:</strong> {organization.email}</p>
          <p className="text-sm text-blue-700"><strong>Location:</strong> {organization.location}</p>
        </div>
      )}

      {/* Description */}
      <div className="mb-4">
        <label className="block font-semibold mb-1 text-gray-700">Contract Overview:</label>
        <div className="bg-gray-50 text-sm text-gray-700 border rounded p-3 leading-relaxed">
          This contract formalizes the partnership between RNRS and your organization to promote
          transparency, efficient employee salary management, and long-term collaboration. By signing
          this agreement, your organization commits to the agreed financial obligations and terms
          set forth herein.
        </div>
      </div>

      {/* Contract Duration */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Contract Duration:</label>
        <select
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          <option value="6 months">6 Months</option>
          <option value="12 months">12 Months</option>
          <option value="unlimited">Unlimited</option>
        </select>
      </div>

      {/* Payment Method */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Payment Method:</label>
        <select
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="full">Full Payment</option>
          <option value="partial">Partial Payment</option>
        </select>
      </div>

      {/* Terms */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Terms and Conditions:</label>
        <div className="text-gray-600 text-sm border rounded p-3 bg-gray-50 max-h-32 overflow-y-auto">
          <p className="mb-2">By signing this contract, you agree to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Fulfill all financial obligations as outlined in this agreement</li>
            <li>Maintain transparency in employee salary management</li>
            <li>Comply with RNRS data usage and privacy policies</li>
            <li>Provide necessary documentation and information as required</li>
            <li>Maintain the partnership standards set forth by RNRS</li>
          </ul>
        </div>
      </div>

      {/* Agreement Checkbox */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="agree"
          className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <label htmlFor="agree" className="text-sm text-gray-700">
          I agree to the terms and conditions outlined above
        </label>
      </div>

      {/* Signature */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Digital Signature:</label>
        <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
          <SignatureCanvas
            ref={sigCanvas}
            canvasProps={{ 
              width: 400, 
              height: 200, 
              className: 'w-full h-48 bg-white' 
            }}
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <button
            onClick={() => sigCanvas.current.clear()}
            className="text-sm text-red-600 hover:text-red-800 underline"
          >
            Clear Signature
          </button>
          <span className="text-xs text-gray-500">
            Please sign in the box above
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading || !agreed}
        className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed w-full font-semibold transition-colors"
      >
        {loading ? 'Signing Contract...' : 'Submit & Sign Contract'}
      </button>
    </div>
  );
}
