import React from "react";
import Header from "../../components/header/Header";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack, IoIosClose, IoIosSearch } from "react-icons/io";

export default function Withdrawals() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C3E8FF] to-white px-10 pt-7 pb-12 space-y-8">
      {/* Header Bar */}
      <Header />
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="font-semibold text-black text-lg flex items-center">
            <Link to="/">
              <IoIosArrowRoundBack
                size={35}
                className="mr-1 text-black hover:text-gray-700 transition-colors"
              />
            </Link>
             Withdrawal Request
          </h2>
        </div>
      </div>
      
    </div>
  );
}
