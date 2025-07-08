"use client"

import { useState, useMemo } from "react"
import Header from "../../components/header/Header"
import { IoIosArrowRoundBack, IoIosSearch, IoIosClose } from "react-icons/io"
import { Link } from "react-router-dom"

export default function Users() {
  const [selectedUser, setSelectedUser] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const usersPerPage = 9

  const contacts = [
    {
      id: 1,
      name: "Esther Howard",
      phone: "(505) 555-0125",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      role: "Contractor",
      email: "ak@gmail.com",
      dateOfBirth: "15-3-2004",
      address: "Prem nagar",
      pinCode: "248001",
      state: "Dehradun",
      country: "India",
      accountNumber: "7873 2323 2343 3234",
      accountHolder: "Avneesh",
      bankName: "SBI bank",
      ifsc: "SBIN230001",
    },
    {
      id: 2,
      name: "John Smith",
      phone: "(555) 123-4567",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      role: "Developer",
      email: "john@gmail.com",
      dateOfBirth: "22-8-1995",
      address: "Main Street 123",
      pinCode: "110001",
      state: "Delhi",
      country: "India",
      accountNumber: "9876 5432 1098 7654",
      accountHolder: "John Smith",
      bankName: "HDFC Bank",
      ifsc: "HDFC0001234",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      phone: "(555) 987-6543",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      role: "Designer",
      email: "sarah@gmail.com",
      dateOfBirth: "10-12-1992",
      address: "Park Avenue 456",
      pinCode: "400001",
      state: "Mumbai",
      country: "India",
      accountNumber: "1234 5678 9012 3456",
      accountHolder: "Sarah Johnson",
      bankName: "ICICI Bank",
      ifsc: "ICIC0001234",
    },
    {
      id: 4,
      name: "Michael Brown",
      phone: "(555) 456-7890",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      role: "Manager",
      email: "michael@gmail.com",
      dateOfBirth: "5-7-1988",
      address: "Oak Street 789",
      pinCode: "560001",
      state: "Bangalore",
      country: "India",
      accountNumber: "5678 9012 3456 7890",
      accountHolder: "Michael Brown",
      bankName: "Axis Bank",
      ifsc: "UTIB0001234",
    },
    {
      id: 5,
      name: "Emily Davis",
      phone: "(555) 321-0987",
      image: "https://randomuser.me/api/portraits/women/23.jpg",
      role: "Analyst",
      email: "emily@gmail.com",
      dateOfBirth: "18-11-1996",
      address: "Elm Street 321",
      pinCode: "600001",
      state: "Chennai",
      country: "India",
      accountNumber: "2345 6789 0123 4567",
      accountHolder: "Emily Davis",
      bankName: "PNB Bank",
      ifsc: "PUNB0001234",
    },
    {
      id: 6,
      name: "David Wilson",
      phone: "(555) 654-3210",
      image: "https://randomuser.me/api/portraits/men/89.jpg",
      role: "Consultant",
      email: "david@gmail.com",
      dateOfBirth: "25-4-1990",
      address: "Maple Avenue 654",
      pinCode: "700001",
      state: "Kolkata",
      country: "India",
      accountNumber: "3456 7890 1234 5678",
      accountHolder: "David Wilson",
      bankName: "BOI Bank",
      ifsc: "BKID0001234",
    },
    {
      id: 7,
      name: "Lisa Anderson",
      phone: "(555) 789-0123",
      image: "https://randomuser.me/api/portraits/women/56.jpg",
      role: "Coordinator",
      email: "lisa@gmail.com",
      dateOfBirth: "12-9-1993",
      address: "Pine Street 987",
      pinCode: "500001",
      state: "Hyderabad",
      country: "India",
      accountNumber: "4567 8901 2345 6789",
      accountHolder: "Lisa Anderson",
      bankName: "Canara Bank",
      ifsc: "CNRB0001234",
    },
    {
      id: 8,
      name: "Robert Taylor",
      phone: "(555) 012-3456",
      image: "https://randomuser.me/api/portraits/men/12.jpg",
      role: "Specialist",
      email: "robert@gmail.com",
      dateOfBirth: "30-1-1987",
      address: "Cedar Lane 012",
      pinCode: "380001",
      state: "Ahmedabad",
      country: "India",
      accountNumber: "5678 9012 3456 7890",
      accountHolder: "Robert Taylor",
      bankName: "Union Bank",
      ifsc: "UBIN0001234",
    },
    {
      id: 9,
      name: "Jennifer Martinez",
      phone: "(555) 345-6789",
      image: "https://randomuser.me/api/portraits/women/78.jpg",
      role: "Executive",
      email: "jennifer@gmail.com",
      dateOfBirth: "8-6-1991",
      address: "Birch Road 345",
      pinCode: "302001",
      state: "Jaipur",
      country: "India",
      accountNumber: "6789 0123 4567 8901",
      accountHolder: "Jennifer Martinez",
      bankName: "Indian Bank",
      ifsc: "IDIB0001234",
    },
    {
      id: 10,
      name: "Christopher Lee",
      phone: "(555) 678-9012",
      image: "https://randomuser.me/api/portraits/men/34.jpg",
      role: "Technician",
      email: "christopher@gmail.com",
      dateOfBirth: "14-10-1989",
      address: "Willow Street 678",
      pinCode: "411001",
      state: "Pune",
      country: "India",
      accountNumber: "7890 1234 5678 9012",
      accountHolder: "Christopher Lee",
      bankName: "Central Bank",
      ifsc: "CBIN0001234",
    },
    // Adding more dummy data for pagination demo
    ...Array.from({ length: 100 }, (_, i) => ({
      id: 11 + i,
      name: `User ${11 + i}`,
      phone: `(555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      image: `https://randomuser.me/api/portraits/${i % 2 === 0 ? "women" : "men"}/${Math.floor(Math.random() * 99) + 1}.jpg`,
      role: ["Developer", "Designer", "Manager", "Analyst", "Consultant"][Math.floor(Math.random() * 5)],
      email: `user${11 + i}@gmail.com`,
      dateOfBirth: `${Math.floor(Math.random() * 28) + 1}-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 30) + 1990}`,
      address: `Address ${11 + i}`,
      pinCode: String(Math.floor(Math.random() * 900000) + 100000),
      state: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"][Math.floor(Math.random() * 5)],
      country: "India",
      accountNumber: `${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000}`,
      accountHolder: `User ${11 + i}`,
      bankName: ["SBI Bank", "HDFC Bank", "ICICI Bank", "Axis Bank", "PNB Bank"][Math.floor(Math.random() * 5)],
      ifsc: `BANK${String(Math.floor(Math.random() * 900000) + 100000)}`,
    })),
  ]

  // Filter contacts based on search term
  const filteredContacts = useMemo(() => {
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  // Pagination logic
  const totalPages = Math.ceil(filteredContacts.length / usersPerPage)
  const currentContacts = filteredContacts.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)

  const handleViewDetails = (contact) => {
    setIsLoading(true)
    // Simulate loading
    setTimeout(() => {
      setSelectedUser(contact)
      setIsLoading(false)
    }, 300)
  }

  const handleCloseDetails = () => {
    setSelectedUser(null)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    setSelectedUser(null) // Close details when changing page
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset to first page when searching
    setSelectedUser(null) // Close details when searching
  }

  const clearSearch = () => {
    setSearchTerm("")
    setCurrentPage(1)
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
            Registered Users
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
          Showing {currentContacts.length} of {filteredContacts.length} users
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
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-800 truncate">{contact.name}</p>
                        <p className="text-xs text-gray-500 truncate">{contact.phone}</p>
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
                    {filteredContacts.map((contact) => (
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
                        <p className="text-sm text-gray-500">{selectedUser.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="text-sm font-medium text-blue-600 hover:underline">History</button>
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
                          <span className="text-sm font-medium text-gray-800">+91 78345 34343</span>
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
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <span className="text-sm text-gray-600">PassBook</span>
                          <button className="flex items-center justify-center space-x-2 text-sm font-medium text-gray-800 bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200 w-full sm:w-auto">
                            <span>👁</span>
                            <span>View</span>
                          </button>
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
        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">No users found</div>
            <div className="text-gray-400 text-sm">Try adjusting your search terms</div>
          </div>
        )}
      </div>
    </div>
  )
}
