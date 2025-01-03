import React, { useState } from "react";
import { Camera, User, Mail, Key, FileText, FileImage } from "lucide-react";

const UserProfileForm = ({ sendMessage }) => {
  const [formData, setFormData] = useState({
    username: "",
    userId: "",
    email: "",
    bio: "",
    profileUrl: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function login(formData) {
    sendMessage(
      {
        type: "login",
        ...formData,
      },
      null,
      false
    );
    localStorage.setItem("userDetails", JSON.stringify(formData));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "jkfdskjflkjdfslkjfdlkjsd");
    console.log("Form submitted:", formData);
    login(formData);
  };

  return (
    <div className="h-screen flex flex-row items-center justify-center w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-6 px-4">
      <div className="min-w-96">
        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center mb-6">
            Create Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center space-y-3 mb-4">
              <div className="relative w-24 h-24 group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse group-hover:from-purple-500 group-hover:to-blue-500 p-1">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    {formData.profileUrl ? (
                      <img
                        src={formData.profileUrl}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera className="w-8 h-8 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* ProfileImage */}
              <div>
                <label
                  htmlFor="profileUrl"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Profile Image Url
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <FileImage className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="profileUrl"
                    name="profileUrl"
                    required
                    className="block w-full pl-8 pr-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-200"
                    value={formData.profileUrl}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    className="block w-full pl-8 pr-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-200"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* User ID */}
              <div>
                <label
                  htmlFor="userId"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  User ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <Key className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="userId"
                    name="userId"
                    required
                    className="block w-full pl-8 pr-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-200"
                    value={formData.userId}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="block w-full pl-8 pr-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-200"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Bio
                </label>
                <div className="relative">
                  <div className="absolute top-2 left-2 pointer-events-none">
                    <FileText className="h-4 w-4 text-gray-400" />
                  </div>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    className="block w-full pl-8 pr-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-200 resize-none"
                    value={formData.bio}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center items-center py-2 px-4 border-2 border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md mt-6"
            >
              Create Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfileForm;
