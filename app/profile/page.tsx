"use client";
import React, { useContext } from "react";
import { Mail, Lock, Star } from "lucide-react";
import { authContext } from "../authContext/authContext";
import ProtectedLayout from "../_components/ProtectedLayout/page";

const Page = () => {
  const { userData } = useContext<any>(authContext);

  return (
    <ProtectedLayout>
      <div className="flex justify-center p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl">
          
          {/* Left Side - User Card */}
          <div className="w-full md:w-1/2 bg-white shadow-md rounded-2xl p-6 flex flex-col items-center border">
            <img
              src={userData?.photo || "/default-avatar.png"}
              alt={userData?.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shadow"
            />
            <h2 className="mt-4 font-semibold text-lg text-center">
              {userData?.name || "User Name"}
            </h2>
            <p className="text-sm text-gray-500 text-center mt-1">
              Hubertusstraße 149, 41239 <br /> Mönchengladbach
            </p>
            <div className="flex items-center gap-1 mt-2 text-yellow-500">
              <Star size={18} fill="currentColor" />
              <span className="font-medium text-gray-700">5.0 (1)</span>
            </div>
          </div>

          {/* Right Side - User Information */}
          <div className="w-full md:w-1/2 bg-white shadow-md rounded-2xl p-6 border">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
              <h3 className="text-lg font-semibold">User Information</h3>
              <button className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium cursor-pointer">
                Edit
              </button>
            </div>

            <div className="space-y-4 text-sm sm:text-base">
              <InfoItem label="Name" value={userData?.name} />
              <InfoItem label="E-Mail" value={userData?.email} icon={<Mail size={16} className="text-gray-500" />} />
              <InfoItem label="Gender" value={userData?.gender} />
              <InfoItem label="ID" value={userData?._id} />
              <InfoItem label="Date Of Birth" value={userData?.dateOfBirth} />
              <InfoItem label="Created At" value={new Date(userData?.createdAt).toLocaleDateString()} />
              
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-green-600 shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Password</p>
                  <p className="font-medium text-green-600">Password has been set</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </ProtectedLayout>
  );
};

const InfoItem = ({ label, value, icon }: { label: string; value?: string; icon?: React.ReactNode }) => (
  <div className="flex items-start gap-2">
    {icon && <span>{icon}</span>}
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium break-words">{value || "—"}</p>
    </div>
  </div>
);

export default Page;
