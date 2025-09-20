'use client';
import { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ApproveContractPage() {
  const router = useRouter();
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [orgId, setOrgId] = useState('');
  const [token, setToken] = useState('');
  const sigCanvas = useRef(null);

  // ✅ Fetch orgId + token inside useEffect
  useEffect(() => {
    const storedId = localStorage.getItem('pendingOrgId');
    const storedToken = localStorage.getItem('token');

    if (!storedId || !storedToken) {
      alert('Missing organization or token.');
      setLoading(false);
      return;
    }

    setOrgId(storedId);
    setToken(storedToken);

    const fetchOrganization = async () => {
      try {
//         const orgId = localStorage.getItem('pendingOrgId');
// console.log('Org ID from localStorage:', orgId);

        const res = await axios.get(
          `https://urumuri-backend.onrender.com/organization/getOrganizationbyId/${storedId}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        console.log(res.data)
        setOrganization(res.data.data);
      } catch (err) {
        console.error('Error loading contract info:', err);
      } finally {
        setLoading(false);
      }
      localStorage.removeItem('pendingOrgId');
    };

    fetchOrganization();
  }, []);

  const handleApprove = async () => {
    const trimmedSignature = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');

    if (!trimmedSignature) {
      alert('Please provide a signature.');
      return;
    }

    setSubmitting(true);
    try {
      await axios.patch(
        `https://urumuri-backend.onrender.com/organization/approveContract/${orgId}`,
        {
          agentSignature: trimmedSignature,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Contract approved successfully!');
      router.push('/');
    } catch (err) {
      console.error(err);
      alert('Failed to approve contract.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading contract details...</p>;
  if (!organization) return <p className="text-center text-red-500 mt-10">Organization not found.</p>;

  const contract = organization.contract;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">
        Review Contract: {organization.fullName}
      </h2>
      <p><strong>Location:</strong> {organization.location}</p>
      <p><strong>Number of Employees:</strong> {contract.numberOfEmployees}</p>
      <p><strong>Total Salary:</strong> ${contract.totalSalary.toLocaleString()}</p>
      <p><strong>Payment Method:</strong> {contract.paymentMethod}</p>
      <p><strong>Signed At:</strong> {new Date(contract.signedAt).toLocaleDateString()}</p>

      <hr className="my-4" />
      <h3 className="text-lg font-semibold mb-2">Agent Digital Signature</h3>
      <SignatureCanvas
        ref={sigCanvas}
        canvasProps={{ width: 400, height: 150, className: 'border border-gray-300 rounded' }}
      />
      <button
        onClick={() => sigCanvas.current.clear()}
        className="text-sm text-red-500 mt-1 underline"
      >
        Clear Signature
      </button>

      <div className="mt-6">
        <button
          onClick={handleApprove}
          disabled={submitting}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Approve Contract'}
        </button>
      </div>
    </div>
  );
}
