import { useEffect, useRef, useState } from "react";
import profileIcon from "../../assets/profile.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import { IoMdClose } from "react-icons/io";
import { ChevronRight } from "lucide-react";
import { api } from "../../helpers/api/api";

export default function Home() {
  const exploreRef = useRef(null);
  const checkIdRef = useRef(null);

  const [showExploreAllPopup, setShowExploreAllPopup] = useState(false);
  const [showIdPopup, setShowIdPopup] = useState(false);

  const [dashboardStats, setDashboardStats] = useState([
    {
      title: "TOTAL USER",
      count: "Loading...",
      link: "/users",
    },
    {
      title: "TOTAL PRODUCT",
      count: "Loading...",
      link: "/products",
    },
    {
      title: "KYC REQUEST",
      count: "Loading...",
      link: "/kyc-requests",
    },
    {
      title: "WITHDRAWAL REQUEST",
      count: "Loading...",
      link: "/withdrawal-requests",
    },
  ]);

  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  // 🚀 NEW: Real transaction history state
  const [transactions, setTransactions] = useState([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);

  // 🚀 NEW: Check ID functionality
  const [productId, setProductId] = useState("");
  const [isCheckingId, setIsCheckingId] = useState(false);
  const [checkIdResult, setCheckIdResult] = useState(null);

  const fetchDashboardStats = async () => {
    try {
      setIsLoadingStats(true);

      // Fetch users count and KYC stats in parallel
      const [
        usersResponse,
        kycStatsResponse,
        productsResponse,
        dashboardResponse,
      ] = await Promise.all([
        api.get("/api/admin/all-users"),
        api.get("/api/admin/kyc-stats"),
        api.get("/api/admin/products"),
        api.get("/api/admin/dashboard-stats"),
      ]);

      let totalUsers = 0;
      let pendingKYC = 0;
      let totalProducts = 0;
      let withdrawalRequests = 0;

      // Get total users count
      if (usersResponse.data.success) {
        totalUsers = usersResponse.data.data.length;
      }

      // Get pending KYC requests count
      if (kycStatsResponse.data.success) {
        pendingKYC = kycStatsResponse.data.data.pending || 0;
      }

      if (productsResponse.data.success) {
        totalProducts = productsResponse.data.data.length;
      }

      if (dashboardResponse.data.success) {
        withdrawalRequests =
          dashboardResponse.data.data.withdrawalRequests || 0;
      }

      // Update dashboard stats with real data
      setDashboardStats([
        {
          title: "TOTAL USER",
          count: totalUsers.toLocaleString(),
          link: "/users",
        },
        {
          title: "TOTAL PRODUCT",
          count: totalProducts.toLocaleString(),
          link: "/products",
        },
        {
          title: "KYC REQUEST",
          count: pendingKYC.toString(),
          link: "/kyc-requests",
        },
        {
          title: "WITHDRAWAL REQUEST",
          count: withdrawalRequests.toString(),
          link: "/withdrawal-requests",
        },
      ]);

      console.log("✅ Dashboard stats loaded:", {
        totalUsers,
        pendingKYC,
        totalProducts,
        withdrawalRequests,
      });
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("❌ Error fetching dashboard stats:", error);

      // Set error state for stats
      setDashboardStats([
        {
          title: "TOTAL USER",
          count: "Error",
          link: "/users",
        },
        {
          title: "TOTAL PRODUCT",
          count: "Error",
          link: "/products",
        },
        {
          title: "KYC REQUEST",
          count: "Error",
          link: "/kyc-requests",
        },
        {
          title: "WITHDRAWAL REQUEST",
          count: "Error",
          link: "/withdrawal-requests",
        },
      ]);
    } finally {
      setIsLoadingStats(false);
    }
  };

  // 🚀 NEW: Fetch real transaction history
  const fetchTransactionHistory = async () => {
    try {
      setIsLoadingTransactions(true);

      const response = await api.get("/api/admin/transaction-history?limit=5");

      if (response.data.success) {
        setTransactions(response.data.data);
        console.log("✅ Transaction history loaded:", response.data.data);
      } else {
        console.error(
          "❌ Failed to fetch transactions:",
          response.data.message
        );
        setTransactions([]);
      }
    } catch (error) {
      console.error("❌ Error fetching transaction history:", error);
      setTransactions([]);
    } finally {
      setIsLoadingTransactions(false);
    }
  };

  // Check ID functionality
  const handleCheckId = async () => {
    if (!productId.trim()) {
      alert("Please enter a Product ID");
      return;
    }

    try {
      setIsCheckingId(true);
      setCheckIdResult(null);

      // 🚀 NEW: Use dedicated product ID check endpoint
      const response = await api.post("/api/admin/check-product-id", {
        productId: productId.trim(),
      });

      if (response.data.success) {
        const productData = response.data.data;
        setCheckIdResult({
          success: true,
          message: response.data.message,
          data: productData,
        });
      } else {
        setCheckIdResult({
          success: false,
          message: response.data.message,
          data: null,
        });
      }
    } catch (error) {
      console.error("❌ Error checking ID:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Error checking Product ID. Please try again.";
      setCheckIdResult({
        success: false,
        message: errorMessage,
        data: null,
      });
    } finally {
      setIsCheckingId(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // 🚀 NEW: Get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return { color: "text-green-700", bg: "bg-green-100", text: "Active" };
      case "scanned":
        return { color: "text-blue-700", bg: "bg-blue-100", text: "Scanned" };
      case "disabled":
        return { color: "text-red-700", bg: "bg-red-100", text: "Disabled" };
      default:
        return { color: "text-gray-700", bg: "bg-gray-100", text: "Unknown" };
    }
  };

  // ✅ close popup on outside click
  useEffect(() => {
    fetchDashboardStats();
    fetchTransactionHistory();
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
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl font-semibold text-black">
            Welcome back, Admin!
          </h1>
          <button
            onClick={() => {
              fetchDashboardStats();
              fetchTransactionHistory(); // 🚀 NEW: Refresh transactions too
            }}
            disabled={isLoadingStats}
            className="text-sm px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:text-blue-600 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Refresh dashboard stats"
          >
            {isLoadingStats ? "🔄 Refreshing..." : "↻ Refresh"}
          </button>
          {lastUpdated && (
            <span className="text-xs text-gray-500">
              Last updated: {lastUpdated}
            </span>
          )}
        </div>
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
              <img
                src={profileIcon || "/placeholder.svg"}
                alt="profileIcon"
                className="w-10 h-10"
              />
            </div>
            <h2 className="text-black text-sm font-medium uppercase tracking-wide">
              {item.title}
            </h2>
            <p
              className={`text-4xl font-bold text-black ${
                isLoadingStats &&
                (item.count === "Loading..." || item.count === "Error")
                  ? "animate-pulse"
                  : ""
              }`}
            >
              {item.count}
            </p>
            <div className="flex justify-end">
              <Link
                to={item.link}
                className={`text-sm text-black font-medium hover:underline ${
                  isLoadingStats &&
                  (item.count === "Loading..." || item.count === "Error")
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Transaction History */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-gray-300">
          <h2 className="font-semibold text-black">
            Transaction History
            {isLoadingTransactions && (
              <span className="text-sm text-gray-500 ml-2">Loading...</span>
            )}
          </h2>
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
              {isLoadingTransactions ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                      <span>Loading transactions...</span>
                    </div>
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">
                    No transactions found
                  </td>
                </tr>
              ) : (
                transactions.map((item, idx) => (
                  <tr
                    key={idx}
                    className="font-semibold text-sm text-black border-b border-[#565454]"
                  >
                    {console.log("item: ", item)}
                    <td className="py-3">{item.userId}</td>
                    <td className="py-3">{item.userName}</td>
                    <td className="py-3">{item.contact}</td>
                    <td className="py-3">{item.productId}</td>
                    <td className="py-3">{item.productName}</td>
                    <td className="py-3 whitespace-nowrap">
                      {formatDate(item.scannedAt)}
                    </td>
                    <td className="py-3 text-right pr-0 pl-0 w-10">
                      {item.coinsEarned}
                    </td>
                  </tr>
                ))
              )}
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
                { text: "Products", link: "/products" },
                { text: "Categories", link: "/category" },
                { text: "Promotions", link: "/promotion" },
              ].map((label, idx) => (
                <Link
                  to={label.link}
                  key={idx}
                  className="w-full flex items-center justify-between border border-[#333333] rounded-2xl px-4 py-3 text-[#333333] text-sm font-medium hover:bg-gray-100 transition"
                  onClick={() => setShowExploreAllPopup(false)}
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
            className="bg-white rounded-2xl p-6 w-[450px] relative space-y-5 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-black">Check Product ID</h2>
              <button
                onClick={() => {
                  setShowIdPopup(false);
                  setCheckIdResult(null);
                  setProductId("");
                }}
                className="text-black p-1 hover:bg-gray-200 rounded-full"
              >
                <IoMdClose size={20} />
              </button>
            </div>

            {/* Input field */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-black">
                Product ID
              </label>
              <input
                type="text"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="Enter Product ID (e.g., PROD_ABC123XYZ)"
                className="w-full border-none outline-none bg-[#F1F4FF] rounded-lg px-4 py-3 text-sm text-black"
                disabled={isCheckingId}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !isCheckingId && productId.trim()) {
                    handleCheckId();
                  }
                }}
              />
            </div>

            {/* 🚀 ENHANCED: Result Display with detailed information */}
            {checkIdResult && (
              <div
                className={`p-4 rounded-lg border-2 ${
                  checkIdResult.success
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <p
                  className={`text-sm font-medium mb-2 ${
                    checkIdResult.success ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {checkIdResult.message}
                </p>

                {checkIdResult.success && checkIdResult.data && (
                  <div className="space-y-2 text-xs text-green-700">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="font-medium">Product:</span>
                        <p className="text-green-800">
                          {checkIdResult.data.productName}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Category:</span>
                        <p className="text-green-800">
                          {checkIdResult.data.category}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Coin Reward:</span>
                        <p className="text-green-800">
                          {checkIdResult.data.coinReward} coins
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Status:</span>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            getStatusBadge(checkIdResult.data.qrStatus).bg
                          } ${
                            getStatusBadge(checkIdResult.data.qrStatus).color
                          }`}
                        >
                          {getStatusBadge(checkIdResult.data.qrStatus).text}
                        </span>
                      </div>
                    </div>

                    {checkIdResult.data.scannedBy && (
                      <div className="mt-3 pt-2 border-t border-green-200">
                        <span className="font-medium">Scanned by:</span>
                        <p className="text-green-800">
                          {checkIdResult.data.scannedBy.name} (
                          {checkIdResult.data.scannedBy.userId})
                        </p>
                        <p className="text-green-600">
                          on {formatDate(checkIdResult.data.scannedAt)}
                        </p>
                      </div>
                    )}

                    <div className="mt-2 text-xs text-green-600">
                      Created: {formatDate(checkIdResult.data.createdAt)}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => {
                  setProductId("");
                  setCheckIdResult(null);
                }}
                className="flex-1 border border-black rounded-lg py-2 text-sm font-semibold hover:bg-gray-100 transition-colors"
                disabled={isCheckingId}
              >
                Clear
              </button>
              <button
                onClick={handleCheckId}
                className="flex-1 bg-black text-white rounded-lg py-2 text-sm font-semibold hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={isCheckingId || !productId.trim()}
              >
                {isCheckingId ? "Checking..." : "Check ID"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
