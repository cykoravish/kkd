import React from "react";
import Header from "../../components/header/Header";
import { Link } from "react-router-dom";

export default function Withdrawals() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C3E8FF] to-white px-10 pt-7 pb-12 space-y-8">
      {/* Header Bar */}
      <Header />
      <div>
        <div className="p-4">
          <Link
            to="/"
            className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Go Back
          </Link>
        </div>
        <h2>No withdrawl Request for now</h2>
      </div>
    </div>
  );
}
