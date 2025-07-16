"use client"

import { useEffect, useRef, useState } from "react"
import Header from "../../components/header/Header"
import { IoIosArrowRoundBack } from "react-icons/io"
import { CiFilter } from "react-icons/ci"
import { Link } from "react-router-dom"
import { api } from "../../helpers/api/api"

export default function History() {
  // 🚀 NEW: Real transaction state
  const [transactions, setTransactions] = useState([])
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true)
  const [totalTransactions, setTotalTransactions] = useState(0)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  // Filter state
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const filterRef = useRef(null)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [isFiltered, setIsFiltered] = useState(false)

  // Export state
  const [isExporting, setIsExporting] = useState(false)

  // 🚀 NEW: Fetch real transaction history
  const fetchTransactionHistory = async (page = 1, limit = 20, append = false) => {
    try {
      if (!append) {
        setIsLoadingTransactions(true)
      } else {
        setIsLoadingMore(true)
      }

      const response = await api.get(`/api/admin/transaction-history?page=${page}&limit=${limit}`)

      if (response.data.success) {
        const newTransactions = response.data.data

        if (append) {
          setTransactions((prev) => [...prev, ...newTransactions])
        } else {
          setTransactions(newTransactions)
        }

        setTotalTransactions(response.data.pagination?.totalTransactions || newTransactions.length)
        setHasMore(response.data.pagination?.hasMore || false)
        setCurrentPage(page)

        console.log("✅ Transaction history loaded:", {
          page,
          count: newTransactions.length,
          total: response.data.pagination?.totalTransactions,
        })
      } else {
        console.error("❌ Failed to fetch transactions:", response.data.message)
        if (!append) {
          setTransactions([])
        }
      }
    } catch (error) {
      console.error("❌ Error fetching transaction history:", error)
      if (!append) {
        setTransactions([])
      }
    } finally {
      setIsLoadingTransactions(false)
      setIsLoadingMore(false)
    }
  }

  // 🚀 NEW: Load more transactions
  const loadMoreTransactions = () => {
    if (!isLoadingMore && hasMore) {
      fetchTransactionHistory(currentPage + 1, 20, true)
    }
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  // 🚀 NEW: Filter transactions by date
  const applyDateFilter = () => {
    if (!startDate && !endDate) {
      setFilteredTransactions([])
      setIsFiltered(false)
      return
    }

    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.scannedAt)
      let isInRange = true

      if (startDate) {
        const start = new Date(startDate)
        isInRange = isInRange && transactionDate >= start
      }

      if (endDate) {
        const end = new Date(endDate)
        end.setHours(23, 59, 59, 999) // Include the entire end date
        isInRange = isInRange && transactionDate <= end
      }

      return isInRange
    })

    setFilteredTransactions(filtered)
    setIsFiltered(true)
    console.log(`✅ Filtered ${filtered.length} transactions from ${transactions.length} total`)
  }

  // 🚀 NEW: Export to CSV
  const exportToCSV = async () => {
    try {
      setIsExporting(true)

      // Get all transactions for export (not just current page)
      const response = await api.get("/api/admin/transaction-history?limit=10000")

      if (response.data.success) {
        const allTransactions = response.data.data
        const dataToExport = isFiltered ? filteredTransactions : allTransactions

        // Create CSV content
        const headers = ["User ID", "User Name", "Contact", "Product ID", "Product Name", "Date & Time", "Coins Earned"]
        const csvContent = [
          headers.join(","),
          ...dataToExport.map((transaction) =>
            [
              transaction.userId,
              `"${transaction.userName}"`,
              transaction.contact,
              transaction.productId,
              `"${transaction.productName}"`,
              `"${formatDate(transaction.scannedAt)}"`,
              transaction.coinsEarned,
            ].join(","),
          ),
        ].join("\n")

        // Download CSV
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const link = document.createElement("a")
        const url = URL.createObjectURL(blob)
        link.setAttribute("href", url)
        link.setAttribute("download", `transaction_history_${new Date().toISOString().split("T")[0]}.csv`)
        link.style.visibility = "hidden"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        console.log(`✅ Exported ${dataToExport.length} transactions to CSV`)
      }
    } catch (error) {
      console.error("❌ Error exporting CSV:", error)
      alert("Failed to export CSV. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  const handleClean = () => {
    setStartDate("")
    setEndDate("")
    setFilteredTransactions([])
    setIsFiltered(false)
    setIsFilterOpen(false)
  }

  const handleApply = () => {
    applyDateFilter()
    setIsFilterOpen(false)
  }

  // Get current transactions to display
  const currentTransactions = isFiltered ? filteredTransactions : transactions

  useEffect(() => {
    fetchTransactionHistory()

    const handleClickOutside = (event) => {
      if (isFilterOpen && filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isFilterOpen])

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
            {/* 🚀 NEW: Show transaction count */}
            <span className="ml-2 text-sm text-gray-600 font-normal">
              ({isFiltered ? filteredTransactions.length : totalTransactions} transactions)
            </span>
          </h2>

          <div className="flex items-center gap-8">
            <button
              onClick={toggleFilter}
              className={`flex items-center gap-1 border-2 rounded-lg px-4 py-2 font-semibold transition-colors ${
                isFiltered
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-[#333333] text-[#333333] hover:bg-[#333333] hover:text-white"
              }`}
            >
              <CiFilter size={20} />
              Filter {isFiltered && "(Active)"}
            </button>

            <button
              onClick={exportToCSV}
              disabled={isExporting || currentTransactions.length === 0}
              className="bg-[#333333] hover:bg-black text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExporting ? "Exporting..." : "Download CSV"}
            </button>
          </div>
        </div>

        {/* 🚀 NEW: Loading state */}
        {isLoadingTransactions ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
              <span className="text-gray-600">Loading transaction history...</span>
            </div>
          </div>
        ) : (
          <>
            {/* 🚀 NEW: Filter status */}
            {isFiltered && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center justify-between">
                <span className="text-blue-800 text-sm">
                  Showing {filteredTransactions.length} filtered transactions
                  {startDate && ` from ${new Date(startDate).toLocaleDateString()}`}
                  {endDate && ` to ${new Date(endDate).toLocaleDateString()}`}
                </span>
                <button onClick={handleClean} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Clear Filter
                </button>
              </div>
            )}

            <div className="overflow-auto rounded-xl">
              <table className="w-full min-w-[800px] text-left border-collapse">
                <thead>
                  <tr className="font-bold text-sm text-black border-b border-[#565454]">
                    <th className="py-3">User ID</th>
                    <th className="py-3">User Name</th>
                    <th className="py-3">Contact Detail</th>
                    <th className="py-3">Product ID</th>
                    <th className="py-3">Product Name</th>
                    <th className="py-3">Date & Time</th>
                    <th className="py-3 text-right pr-0 pl-0 w-10">Coins</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTransactions.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-12 text-center text-gray-500">
                        {isFiltered ? "No transactions found for the selected date range" : "No transactions found"}
                      </td>
                    </tr>
                  ) : (
                    currentTransactions.map((item, idx) => (
                      <tr
                        key={`${item.scanId || item.userId}_${idx}`}
                        className="font-semibold text-sm text-black border-b border-[#565454] hover:bg-gray-50"
                      >
                        <td className="py-3">{item.userId}</td>
                        <td className="py-3">{item.userName}</td>
                        <td className="py-3">{item.contact}</td>
                        <td className="py-3">{item.productId}</td>
                        <td className="py-3">{item.productName}</td>
                        <td className="py-3 whitespace-nowrap">{formatDate(item.scannedAt)}</td>
                        <td className="py-3 text-right pr-0 pl-0 w-10">{item.coinsEarned}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* 🚀 NEW: Load More Button */}
            {!isFiltered && hasMore && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={loadMoreTransactions}
                  disabled={isLoadingMore}
                  className="bg-[#333333] hover:bg-black text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoadingMore ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Loading...</span>
                    </div>
                  ) : (
                    "Load More"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* 🚀 ENHANCED: Filter popup with date pickers */}
      {isFilterOpen && (
        <>
          <div
            className="fixed inset-0 bg-transparent backdrop-blur-md z-40"
            style={{
              WebkitBackdropFilter: "blur(5px)",
              backdropFilter: "blur(5px)",
            }}
          ></div>

          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative" ref={filterRef}>
              <h3 className="text-lg font-semibold mb-4">Filter Transactions</h3>
              <button
                onClick={toggleFilter}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-2 border rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 outline-none"
                  />
                </div>

                {/* 🚀 NEW: Filter preview */}
                {(startDate || endDate) && (
                  <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                    <strong>Preview:</strong>
                    {startDate && ` From ${new Date(startDate).toLocaleDateString()}`}
                    {endDate && ` To ${new Date(endDate).toLocaleDateString()}`}
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleClean}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleApply}
                    className="px-4 py-2 bg-[#333333] text-white rounded-lg hover:bg-black transition-colors"
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
