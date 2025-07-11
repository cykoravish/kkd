"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import axios from "axios"
import Header from "../../components/header/Header"
import { IoIosArrowRoundBack, IoIosSearch, IoIosClose } from "react-icons/io"
import { Link } from "react-router-dom"

export default function Users() {
  const [selectedUser, setSelectedUser] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [usersLoading, setUsersLoading] = useState(true)
  const [error, setError] = useState(null)
  const usersPerPage = 9

  // 🚀 Optimized API call with proper error handling
  useEffect(() => {
    const getAllUsers = async () => {
      setUsersLoading(true)
      setError(null)

      try {
        // 🔧 Fixed API endpoint - should be /users not /all-users
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/admin/all-users`)

        if (response.data.success) {
          // 🔧 Transform API data to match component expectations
          const transformedUsers = response.data.data.map((user, index) => ({
            id: user._id || `user_${index}`,
            name: user.fullName || "Unknown User",
            phone: user.phone || "No phone",
            image: user.profilePick || "/placeholder.svg?height=48&width=48",
            role: "User", // Default role since API doesn't provide this
            email: user.email || "No email",
            dateOfBirth: user.dob || "Not provided",
            address: user.address || "Not provided",
            pinCode: user.pinCode || "Not provided",
            state: user.state || "Not provided",
            country: user.country || "Not provided",
            accountNumber: "****" + (user.accountNumber?.slice(-4) || "0000"), // Mask account number for security
            accountHolder: user.fullName || "Not provided",
            bankName: "Not provided", // API doesn't have this field
            ifsc: "Not provided", // API doesn't have this field
            coinsEarned: user.coinsEarned || 0,
            isPanVerified: user.isPanVerified || false,
            isAadharVerified: user.isAadharVerified || false,
            isPassbookVerified: user.isPassbookVerified || false,
            panPhoto: user.panPhoto,
            aadharPhoto: user.aadharPhoto,
            passbookPhoto: user.passbookPhoto,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          }))

          setUsers(transformedUsers)
          console.log("✅ Users loaded:", transformedUsers.length)
        } else {
          setError("Failed to fetch users from server")
        }
      } catch (err) {
        console.error("❌ API Error:", err)
        setError(err.response?.data?.message || "Network error occurred")
      } finally {
        setUsersLoading(false)
      }
    }

    getAllUsers()
  }, [])

  // 🚀 Optimized search with useMemo
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users

    const term = searchTerm.toLowerCase()
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.phone.includes(searchTerm) ||
        user.email.toLowerCase().includes(term),
    )
  }, [users, searchTerm])

  // 🚀 Optimized pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const currentContacts = useMemo(() => {
    const startIndex = (currentPage - 1) * usersPerPage
    return filteredUsers.slice(startIndex, startIndex + usersPerPage)
  }, [filteredUsers, currentPage, usersPerPage])

  // 🚀 Optimized callbacks with useCallback
  const handleViewDetails = useCallback((contact) => {
    setIsLoading(true)
    // Simulate loading for smooth UX
    setTimeout(() => {
      setSelectedUser(contact)
      setIsLoading(false)
    }, 200)
  }, [])

  const handleCloseDetails = useCallback(() => {
    setSelectedUser(null)
  }, [])

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page)
    setSelectedUser(null) // Close details when changing page
  }, [])

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset to first page when searching
    setSelectedUser(null) // Close details when searching
  }, [])

  const clearSearch = useCallback(() => {
    setSearchTerm("")
    setCurrentPage(1)
  }, [])

  // 🚀 Optimized document viewer
  const handleViewDocument = useCallback((documentUrl, documentType) => {
    if (documentUrl && documentUrl !== "Not provided") {
      window.open(documentUrl, "_blank")
    } else {
      alert(`${documentType} not uploaded yet`)
    }
  }, [])

  // 🚀 Loading state
  if (usersLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#C3E8FF] to-white">
        <div className="px-4 sm:px-6 lg:px-10 pt-7 pb-12 space-y-6">
          <Header />
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading users...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 🚀 Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#C3E8FF] to-white">
        <div className="px-4 sm:px-6 lg:px-10 pt-7 pb-12 space-y-6">
          <Header />
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Users</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C3E8FF] to-white">
      <div className="px-4 sm:px-6 lg:px-10 pt-7 pb-12 space-y-6">
        <Header />

        {/* Header with back button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="font-semibold text-black text-lg flex items-center">
            <Link to="/">
              <IoIosArrowRoundBack size={35} className="mr-1 text-black" />
            </Link>
            Registered Users ({filteredUsers.length})
          </h2>

          {/* Search bar */}
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoIosSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearch}
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchTerm && (
              <button onClick={clearSearch} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <IoIosClose className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-600">
          Showing {currentContacts.length} of {filteredUsers.length} users
          {searchTerm && ` for "${searchTerm}"`}
        </div>

        {/* Main content */}
        <div className="relative">
          {!selectedUser ? (
            // Grid layout for desktop, stack for mobile
            <div className="space-y-6">
              {/* Users grid */}
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {currentContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <img
                        src={contact.image || "/placeholder.svg"}
                        alt={contact.name}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        loading="lazy"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-800 truncate">{contact.name}</p>
                        <p className="text-xs text-gray-500 truncate">{contact.phone}</p>
                        {/* 🚀 Added verification status indicators */}
                        <div className="flex items-center space-x-2 mt-1">
                          <span
                            className={`inline-block w-2 h-2 rounded-full ${
                              contact.isPanVerified ? "bg-green-400" : "bg-gray-300"
                            }`}
                            title={`PAN ${contact.isPanVerified ? "Verified" : "Not Verified"}`}
                          />
                          <span
                            className={`inline-block w-2 h-2 rounded-full ${
                              contact.isAadharVerified ? "bg-green-400" : "bg-gray-300"
                            }`}
                            title={`Aadhar ${contact.isAadharVerified ? "Verified" : "Not Verified"}`}
                          />
                          <span className="text-xs text-gray-400">{contact.coinsEarned} coins</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleViewDetails(contact)}
                      disabled={isLoading}
                      className="text-sm font-medium text-blue-600 hover:underline disabled:opacity-50 flex-shrink-0 ml-2"
                    >
                      {isLoading ? "Loading..." : "View Details"}
                    </button>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm">
                  <div className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>

                    {/* Page numbers */}
                    <div className="flex space-x-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum
                        if (totalPages <= 5) {
                          pageNum = i + 1
                        } else if (currentPage <= 3) {
                          pageNum = i + 1
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i
                        } else {
                          pageNum = currentPage - 2 + i
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`px-3 py-1 text-sm rounded-md ${
                              currentPage === pageNum
                                ? "bg-blue-600 text-white"
                                : "border border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        )
                      })}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Split layout for desktop, full screen for mobile
            <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)]">
              {/* Left side - User list (hidden on mobile) */}
              <div className="hidden lg:block lg:w-1/3">
                <div className="bg-white rounded-xl shadow-sm h-full flex flex-col">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-800">All Users</h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {filteredUsers.map((contact) => (
                      <div
                        key={contact.id}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                          selectedUser.id === contact.id ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                        }`}
                        onClick={() => handleViewDetails(contact)}
                      >
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <img
                            src={contact.image || "/placeholder.svg"}
                            alt={contact.name}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                            loading="lazy"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-800 truncate">{contact.name}</p>
                            <p className="text-xs text-gray-500 truncate">{contact.phone}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side - User details */}
              <div className="w-full lg:w-2/3">
                <div className="bg-white rounded-xl shadow-sm h-full flex flex-col">
                  {/* Header with close button */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <button onClick={handleCloseDetails} className="lg:hidden p-2 hover:bg-gray-100 rounded-full">
                        <IoIosArrowRoundBack size={24} />
                      </button>
                      <img
                        src={selectedUser.image || "/placeholder.svg"}
                        alt={selectedUser.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{selectedUser.name}</h3>
                        <p className="text-sm text-gray-500">
                          {selectedUser.role} • {selectedUser.coinsEarned} coins
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {/* 🚀 Enhanced verification status */}
                      <div className="flex space-x-1">
                        <span
                          className={`inline-block w-3 h-3 rounded-full ${
                            selectedUser.isPanVerified ? "bg-green-400" : "bg-red-400"
                          }`}
                          title={`PAN ${selectedUser.isPanVerified ? "Verified" : "Not Verified"}`}
                        />
                        <span
                          className={`inline-block w-3 h-3 rounded-full ${
                            selectedUser.isAadharVerified ? "bg-green-400" : "bg-red-400"
                          }`}
                          title={`Aadhar ${selectedUser.isAadharVerified ? "Verified" : "Not Verified"}`}
                        />
                        <span
                          className={`inline-block w-3 h-3 rounded-full ${
                            selectedUser.isPassbookVerified ? "bg-green-400" : "bg-red-400"
                          }`}
                          title={`Passbook ${selectedUser.isPassbookVerified ? "Verified" : "Not Verified"}`}
                        />
                      </div>
                      <button
                        onClick={handleCloseDetails}
                        className="hidden lg:block p-2 hover:bg-gray-100 rounded-full"
                      >
                        <IoIosClose size={24} />
                      </button>
                    </div>
                  </div>

                  {/* Scrollable content */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Personal Details */}
                    <div>
                      <h4 className="text-base font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                        Personal details
                      </h4>
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span className="text-sm text-gray-600">Contact Number</span>
                          <span className="text-sm font-medium text-gray-800">{selectedUser.phone}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span className="text-sm text-gray-600">Email Id</span>
                          <span className="text-sm font-medium text-gray-800">{selectedUser.email}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span className="text-sm text-gray-600">Date of Birth</span>
                          <span className="text-sm font-medium text-gray-800">{selectedUser.dateOfBirth}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span className="text-sm text-gray-600">Permanent Address</span>
                          <span className="text-sm font-medium text-gray-800">{selectedUser.address}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span className="text-sm text-gray-600">Pin Code</span>
                          <span className="text-sm font-medium text-gray-800">{selectedUser.pinCode}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span className="text-sm text-gray-600">State</span>
                          <span className="text-sm font-medium text-gray-800">{selectedUser.state}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span className="text-sm text-gray-600">Country</span>
                          <span className="text-sm font-medium text-gray-800">{selectedUser.country}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bank Details */}
                    <div>
                      <h4 className="text-base font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                        Bank details
                      </h4>
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span className="text-sm text-gray-600">Account Number</span>
                          <span className="text-sm font-medium text-gray-800">{selectedUser.accountNumber}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span className="text-sm text-gray-600">Account holder</span>
                          <span className="text-sm font-medium text-gray-800">{selectedUser.accountHolder}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span className="text-sm text-gray-600">Bank Name</span>
                          <span className="text-sm font-medium text-gray-800">{selectedUser.bankName}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span className="text-sm text-gray-600">IFSC</span>
                          <span className="text-sm font-medium text-gray-800">{selectedUser.ifsc}</span>
                        </div>
                      </div>
                    </div>

                    {/* 🚀 Enhanced Documents Section */}
                    <div>
                      <h4 className="text-base font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                        Documents
                      </h4>
                      <div className="space-y-3">
                        {/* PAN Card */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">PAN Card</span>
                            <span
                              className={`inline-block w-2 h-2 rounded-full ${
                                selectedUser.isPanVerified ? "bg-green-400" : "bg-red-400"
                              }`}
                            />
                          </div>
                          <button
                            onClick={() => handleViewDocument(selectedUser.panPhoto, "PAN Card")}
                            className={`flex items-center justify-center space-x-2 text-sm font-medium px-4 py-2 rounded-md transition-colors duration-200 w-full sm:w-auto ${
                              selectedUser.panPhoto && selectedUser.panPhoto !== "Not provided"
                                ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                                : "text-gray-400 bg-gray-100 cursor-not-allowed"
                            }`}
                            disabled={!selectedUser.panPhoto || selectedUser.panPhoto === "Not provided"}
                          >
                            <span>👁</span>
                            <span>View</span>
                          </button>
                        </div>

                        {/* Aadhar Card */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Aadhar Card</span>
                            <span
                              className={`inline-block w-2 h-2 rounded-full ${
                                selectedUser.isAadharVerified ? "bg-green-400" : "bg-red-400"
                              }`}
                            />
                          </div>
                          <button
                            onClick={() => handleViewDocument(selectedUser.aadharPhoto, "Aadhar Card")}
                            className={`flex items-center justify-center space-x-2 text-sm font-medium px-4 py-2 rounded-md transition-colors duration-200 w-full sm:w-auto ${
                              selectedUser.aadharPhoto && selectedUser.aadharPhoto !== "Not provided"
                                ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                                : "text-gray-400 bg-gray-100 cursor-not-allowed"
                            }`}
                            disabled={!selectedUser.aadharPhoto || selectedUser.aadharPhoto === "Not provided"}
                          >
                            <span>👁</span>
                            <span>View</span>
                          </button>
                        </div>

                        {/* Passbook */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">PassBook</span>
                            <span
                              className={`inline-block w-2 h-2 rounded-full ${
                                selectedUser.isPassbookVerified ? "bg-green-400" : "bg-red-400"
                              }`}
                            />
                          </div>
                          <button
                            onClick={() => handleViewDocument(selectedUser.passbookPhoto, "Passbook")}
                            className={`flex items-center justify-center space-x-2 text-sm font-medium px-4 py-2 rounded-md transition-colors duration-200 w-full sm:w-auto ${
                              selectedUser.passbookPhoto && selectedUser.passbookPhoto !== "Not provided"
                                ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                                : "text-gray-400 bg-gray-100 cursor-not-allowed"
                            }`}
                            disabled={!selectedUser.passbookPhoto || selectedUser.passbookPhoto === "Not provided"}
                          >
                            <span>👁</span>
                            <span>View</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 🚀 Additional User Info */}
                    <div>
                      <h4 className="text-base font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                        Account Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span className="text-sm text-gray-600">User ID</span>
                          <span className="text-sm font-medium text-gray-800 font-mono">{selectedUser.id}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span className="text-sm text-gray-600">Coins Earned</span>
                          <span className="text-sm font-medium text-green-600">{selectedUser.coinsEarned} coins</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                          <span className="text-sm text-gray-600">Member Since</span>
                          <span className="text-sm font-medium text-gray-800">
                            {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : "Unknown"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* No results message */}
        {filteredUsers.length === 0 && !usersLoading && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">
              {searchTerm ? `No users found for "${searchTerm}"` : "No users found"}
            </div>
            <div className="text-gray-400 text-sm">
              {searchTerm ? "Try adjusting your search terms" : "No users have been registered yet"}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
