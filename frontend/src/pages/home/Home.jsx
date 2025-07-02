import { useEffect, useRef, useState } from "react";
import profileIcon from "../../assets/profile.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import { IoMdClose } from "react-icons/io";
import { ChevronRight } from "lucide-react";

export default function Home() {
  const [dashboardStats] = useState([
    {
      title: "TOTAL USER",
      count: "10,000",
    },
    {
      title: "TOTAL PRODUCT",
      count: "230",
    },
    {
      title: "KYC REQUEST",
      count: "13",
    },
    {
      title: "WITHDRAWAL REQUEST",
      count: "100",
    },
  ]);

  const [transactions] = useState([
    {
      userId: "2023133",
      name: "Rahul Sharma",
      contact: "98743 34321",
      couponId: "FERSASDOPP",
      couponName: "Interior paint",
      date: "17 jun 25, 12:00 PM",
      coins: 5000,
    },
    {
      userId: "2023133",
      name: "Rahul Sharma",
      contact: "98743 34321",
      couponId: "FERSASDOPP",
      couponName: "Interior paint",
      date: "17 jun 25, 12:00 PM",
      coins: 5000,
    },
    {
      userId: "2023133",
      name: "Rahul Sharma",
      contact: "98743 34321",
      couponId: "FERSASDOPP",
      couponName: "Interior paint",
      date: "17 jun 25, 12:00 PM",
      coins: 5000,
    },
    {
      userId: "2023133",
      name: "Rahul Sharma",
      contact: "98743 34321",
      couponId: "FERSASDOPP",
      couponName: "Interior paint",
      date: "17 jun 25, 12:00 PM",
      coins: 5000,
    },
    {
      userId: "2023133",
      name: "Rahul Sharma",
      contact: "98743 34321",
      couponId: "FERSASDOPP",
      couponName: "Interior paint",
      date: "17 jun 25, 12:00 PM",
      coins: 5000,
    },
    // add more as needed
  ]);
  const [showExploreAllPopup, setShowExploreAllPopup] = useState(false);
  const [showIdPopup, setShowIdPopup] = useState(false);
  const [productId, setProductId] = useState("");

  const exploreRef = useRef(null);
  const checkIdRef = useRef(null);

  // ✅ close popup on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showExploreAllPopup &&
        exploreRef.current &&
        !exploreRef.current.contains(event.target)
      ) {
        setShowExploreAllPopup(false);
      }
      if (
        showIdPopup &&
        checkIdRef.current &&
        !checkIdRef.current.contains(event.target)
      ) {
        setShowIdPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showExploreAllPopup, showIdPopup]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C3E8FF] to-white px-10 pt-7 pb-12 space-y-8">
      {/* Header Bar */}
      <Header />

      {/* Welcome & Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-black">
          Welcome back, Admin!
        </h1>
        <div className="flex gap-8">
          <button
            onClick={() => setShowIdPopup(true)}
            className="border-2 border-[#333333] text-[#333333] font-semibold px-6 py-2 rounded-xl hover:bg-[#333333] hover:text-white transition text-sm"
          >
            Check ID
          </button>
          <button
            onClick={() => setShowExploreAllPopup(true)}
            className="bg-[#333333] text-white px-6 py-2 rounded-xl font-semibold hover:bg-black transition text-sm"
          >
            Explore All{" "}
            <FaArrowRightLong className="inline ml-2" strokeWidth={50} />
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {dashboardStats.map((item, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-[#FFFDED] to-[#DFE2F6] rounded-2xl shadow p-5 flex flex-col space-y-3"
          >
            <div className="flex items-center">
              <img src={profileIcon} alt="profileIcon" className="w-10 h-10" />
            </div>
            <h2 className="text-black text-sm font-medium uppercase tracking-wide">
              {item.title}
            </h2>
            <p className="text-4xl font-bold text-black">{item.count}</p>
            <div className="flex justify-end">
              <button className="text-sm text-black font-medium hover:underline">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Transaction History */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-gray-300">
          <h2 className="font-semibold text-black">Transaction History</h2>
          <Link
            to="/transaction-history"
            className="text-blue-500 font-semibold hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="overflow-auto rounded-xl">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead>
              <tr className="font-bold text-sm text-black border-b border-[#565454]">
                <th className="py-3">User ID</th>
                <th className="py-3">User Name</th>
                <th className="py-3">Contact Detail</th>
                <th className="py-3">Coupon ID</th>
                <th className="py-3">Coupon Name</th>
                <th className="py-3">Date & Time</th>
                <th className="py-3 text-right pr-0 pl-0 w-10">Coins</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((item, idx) => (
                <tr
                  key={idx}
                  className="font-semibold text-sm text-black border-b border-[#565454]"
                >
                  <td className="py-3">{item.userId}</td>
                  <td className="py-3">{item.name}</td>
                  <td className="py-3">{item.contact}</td>
                  <td className="py-3">{item.couponId}</td>
                  <td className="py-3">{item.couponName}</td>
                  <td className="py-3 whitespace-nowrap">{item.date}</td>
                  <td className="py-3 text-right pr-0 pl-0 w-10">
                    {item.coins}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* explore all popop */}
      {showExploreAllPopup && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
          <div
            ref={exploreRef}
            className="bg-white rounded-3xl p-6 w-[320px] relative space-y-5 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-black">Explore All</h2>
              <button
                onClick={() => setShowExploreAllPopup(false)}
                className="text-black p-1 bg-gray-100 hover:bg-gray-200 rounded-full"
              >
                <IoMdClose size={20} />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { text: "Category", link: "/category" },
                { text: "Promotion", link: "/promotion" },
                { text: "Offers", link: "/offers" },
              ].map((label, idx) => (
                <Link
                  to={label.link}
                  key={idx}
                  className="w-full flex items-center justify-between border border-[#333333] rounded-2xl px-4 py-3 text-[#333333] text-sm font-medium hover:bg-gray-100 transition"
                >
                  {label.text}
                  <ChevronRight size={20} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Check ID Popup */}
      {showIdPopup && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
          <div
            ref={checkIdRef}
            className="bg-white rounded-2xl p-6 w-[340px] relative space-y-5 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-black">Check the QR/ID</h2>
              <button
                onClick={() => setShowIdPopup(false)}
                className="text-black p-1 hover:bg-gray-200 rounded-full"
              >
                <IoMdClose size={20} />
              </button>
            </div>

            {/* Input field */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-black">
                Product Id
              </label>
              <input
                type="text"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Enter your ID"
                className="w-full border-none outline-none bg-[#F1F4FF] rounded-lg px-4 py-2 text-sm text-black"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setProductId("")}
                className="flex-1 border border-black rounded-lg py-2 text-sm font-semibold hover:bg-gray-100"
              >
                Clean
              </button>
              <button
                onClick={() => alert(`Checking ID: ${productId}`)}
                className="flex-1 bg-black text-white rounded-lg py-2 text-sm font-semibold hover:bg-gray-900"
              >
                Check
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
