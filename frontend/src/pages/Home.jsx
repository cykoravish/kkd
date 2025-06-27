import { useState } from "react";

function Home() {
  const [userData, setUserData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C3E8FF] to-[#FFFFFF] flex flex-col">
      {/* Logo */}
      <div className="px-4 py-4">
        <img src="/logo.png" alt="kkd" className="w-20 sm:w-24 md:w-28" />
      </div>

      {/* Form section */}
      <div className="mx-auto px-4 pt-16 lg:pt-8">
        <div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-sm text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-black mb-1">
            Welcome Back!
          </h1>
          <p className="text-sm md:text-base mb-6 font-semibold">
            Log in to continue using your account.
          </p>

          <form onSubmit={submitHandler}>
            <div className="text-start">
              <label htmlFor="email" className="font-semibold">
                Email / Mobile Number
              </label>
              <input
                type="text"
                placeholder="Enter your Email / Mobile Number"
                value={userData.emailOrPhone}
                onChange={(e) =>
                  setUserData({ ...userData, emailOrPhone: e.target.value })
                }
                className="w-full mb-4 mt-2 p-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 bg-[#EEF0FB] placeholder:text-[#333333] text-sm"
              />
            </div>

            <div className="text-start">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your Password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                className="w-full mb-4 mt-2 p-3 bg-[#EEF0FB] rounded focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-[#333333] text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#333333] text-white py-3 rounded hover:bg-[#151515] transition"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
