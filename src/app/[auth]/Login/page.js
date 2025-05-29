"use client";
import React, { useState } from "react";
import Logo from "../../image/Logo.png";
import Layer2 from "../../image/Layer_2.png";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to dashboard
      router.push("/SaleChannel");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-h-[50%] flex flex-col md:flex-row bg-white">
      {/* Left Section */}
      <div className="md:w-1/2 flex flex-col items-center justify-center p-10 text-center">
        <Image src={Logo} alt="Logo" width={300} className="mb-6" />
        <Image
          src={Layer2}
          alt="Illustration"
          className="mb-6"
          width={400}
          height={400}
        />
        <h2 className="text-xl font-semibold mb-1">
          Do More. Better. Faster with
        </h2>
        <h1 className="text-2xl font-bold text-black mb-4">eComsChannel</h1>
        <p className="text-sm text-gray-600 max-w-md">
          eComChannels is a complete all-in-one solution for marketplaces. It
          consolidates online marketplaces into a single integrated management
          platform. Launch your product confidently to multiple major
          marketplaces worldwide effortlessly and efficiently.
        </p>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 bg-blue-400 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-white text-xl font-semibold text-center">
            Welcome back to eComsChannel
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          {/* Google Login */}
          <div className="flex justify-center items-center">
            <button className="px-2 gap-2 flex items-center justify-center bg-white text-black py-2 rounded-full shadow ">
              <FcGoogle size={20} />
              Log In with Google
            </button>
          </div>

          {/* Email and Password Login */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-white text-sm">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border-b-1 border-white bg-transparent text-white focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-white text-sm">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border-b-1 border-white bg-transparent text-white focus:outline-none"
                required
              />
            </div>

            <div className="flex justify-between items-center text-white text-sm">
              <div>
                <input type="checkbox" className="mr-2" />
                Remember me
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="py-2 px-6 rounded-full bg-[#7B76F1] text-white text-sm cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Loading..." : "LOG IN"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
