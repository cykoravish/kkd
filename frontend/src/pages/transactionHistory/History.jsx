import { useEffect, useRef, useState } from "react";
import Header from "../../components/header/Header";
import { IoIosArrowRoundBack } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function History() {
  const [transactions] = useState([
    {
      userId: "2023133",
      name: "Ravish Bisht",
      contact: "98743 34321",
      couponId: "FEERDASDOPP",
      couponName: "Interior paint",
      date: "17 jun 25, 12:00 PM",
      coins: 5000,
    },
    {
      userId: "2023133",
      name: "Santosh Kumar",
      contact: "98743 34321",
      couponId: "FESDASDOPP",
      couponName: "Interior paint",
      date: "17 jun 25, 12:00 PM",
      coins: 5000,
    },
    {
      userId: "2023133",
      name: "Ayush Gupta",
      contact: "98743 34321",
      couponId: "HRRSASDOPP",
      couponName: "Interior paint",
      date: "17 jun 25, 12:00 PM",
      coins: 5000,
    },
    {
      userId: "2023133",
      name: "Atul Semwal",
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
      name: "Ravish Bisht",
      contact: "98743 34321",
      couponId: "FEERDASDOPP",
      couponName: "Interior paint",
      date: "17 jun 25, 12:00 PM",
      coins: 5000,
    },
    {
      userId: "2023133",
      name: "Santosh Kumar",
      contact: "98743 34321",
      couponId: "FESDASDOPP",
      couponName: "Interior paint",
      date: "17 jun 25, 12:00 PM",
      coins: 5000,
    },
    {
      userId: "2023133",
      name: "Ayush Gupta",
      contact: "98743 34321",
      couponId: "HRRSASDOPP",
      couponName: "Interior paint",
      date: "17 jun 25, 12:00 PM",
      coins: 5000,
    },
    {
      userId: "2023133",
      name: "Atul Semwal",
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
  ]);

  // Added state to manage filter popup visibility
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);

  // Added state to manage start and end dates for filtering
  const [startDate, setStartDate] = useState("1 January/25");
  const [endDate, setEndDate] = useState("17 June/25");

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleClean = () => {
    setStartDate("1 January/25");
    setEndDate("17 June/25");
    setIsFilterOpen(false); // Close popup after cleaning
  };

  const handleApply = () => {
    // Add filtering logic here based on startDate and endDate
    console.log("Filtering with Start Date:", startDate, "End Date:", endDate);
    setIsFilterOpen(false); // Close popup after applying
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isFilterOpen &&
        filterRef.current &&
        !filterRef.current.contains(event.target)
      ) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFilterOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C3E8FF] to-white px-10 pt-7 pb-12 space-y-8 relative">
      <Header />
      <div className={`space-y-3 ${isFilterOpen ? "blur-sm" : ""}`}>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-black text-lg flex items-center">
            <Link to="/">
              <IoIosArrowRoundBack size={35} className="mr-1 text-black" />
            </Link>
            Transaction History
          </h2>

          <div className="flex items-center gap-8">
            <button
              onClick={toggleFilter}
              className="flex items-center gap-1 border-2 border-[#333333] rounded-lg px-4 py-2 text-[#333333] hover:bg-[#333333] hover:text-white font-semibold"
            >
              <CiFilter size={20} />
              Filter
            </button>
            <button className="bg-[#333333] hover:bg-black text-white px-4 py-2 rounded-lg">
              Download CSV
            </button>
          </div>
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

      {/* Added filter popup */}
      {isFilterOpen && (
        <>
          {/* Blurred backdrop covering the entire screen except Header */}
          <div
            className="fixed inset-0 bg-transparent backdrop-blur-md z-40"
            style={{
              WebkitBackdropFilter: "blur(5px)",
              backdropFilter: "blur(5px)",
            }}
          ></div>
          {/* Popup on top of the blurred backdrop */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
              ref={filterRef}
            >
              <h3 className="text-lg font-semibold mb-4">Filter</h3>
              <button
                onClick={toggleFilter}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Date
                  </label>
                  <input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-gray-100"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={handleClean}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                  >
                    Clean
                  </button>
                  <button
                    onClick={handleApply}
                    className="px-4 py-2 bg-[#333333] text-white rounded-lg hover:bg-black"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
