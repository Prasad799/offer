import React, { useEffect, useRef, useState } from "react";
import { MoreHorizontal, Check, Plus } from "lucide-react";
import { postData, getAll } from "../constants";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  file_url: string;
  email: string;
  password: string;
  name: string;
  uploadedAt: string;
  createdAt: string;
  __v: number;
}

interface UploadCardProps {
  selectedFiles: FileList | null;
  setSelectedFiles: (files: FileList | null) => void;
  uploadSuccess: boolean;
  setUploadSuccess: (success: boolean) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const CLOUD_NAME = "dal8erpfc";
const UPLOAD_PRESET = "ibm_server";

const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  console.log("Uploading file:", file);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) throw new Error("Upload failed");

    const data = await response.json();
    console.log("Cloudinary Response:", data);
    return { name: file.name, url: data.secure_url };
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};

const UploadCard: React.FC<UploadCardProps> = ({
  selectedFiles,
  setSelectedFiles,
  uploadSuccess,
  setUploadSuccess,
  fileInputRef,
}) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    file_url: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    setSelectedFiles(files);
    setUploadSuccess(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getAllUsers = async () => {
    try {
      const response = await getAll("/get_uploads");
      setAllUsers(response.uploads);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleUpload = async () => {
    if (
      window.location.pathname !== "/Admin/12f1c4a3-5b67-4d92-a8c3-9f1c8e60a92e"
    ) {
      setUploadSuccess(true);
      setSelectedFiles(null);
      setFormData({
        name: "",
        email: "",
        password: "",
        file_url: "",
      });
      return;
    }

    setIsLoading(true);
    if (selectedFiles && selectedFiles.length > 0) {
      console.log("Uploading Files...");

      const uploadedFiles = await Promise.all(
        Array.from(selectedFiles).map(async (file) => {
          const data = await uploadToCloudinary(file);
          return data ? { name: file.name, ...data } : null;
        })
      );

      const validFiles = uploadedFiles.filter(
        (file): file is { name: string; url: string } => file !== null
      );
      console.log("Valid Files:", validFiles);

      if (validFiles.length === 0) {
        console.error("No files uploaded.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await postData("/create_user", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          file_url: validFiles[0].url,
        });

        console.log("Upload successful:", response);
        setUploadSuccess(true);
        setSelectedFiles(null);

        // Reset form
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setFormData({
          name: "",
          email: "",
          password: "",
          file_url: "",
        });

        // Refresh the users list
        getAllUsers();
        setIsLoading(false);
      } catch (error) {
        console.error("Upload failed:", error);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="w-full mx-auto">
      {isLoading ? (
        <div className="fixed inset-0 bg-gray-500/50 flex items-center justify-center">
          <div className="relative w-12 h-12">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-b-2 border-[#006699] rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      ) : null}

      {window.location.pathname ===
      "/Admin/12f1c4a3-5b67-4d92-a8c3-9f1c8e60a92e" ? (
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
          />
          <h2 className="text-lg sm:text-xl font-semibold text-center">
            Please Add your BGV Documents
          </h2>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-2 text-sm text-[#006699] hover:text-blue-800 cursor-pointer"
          >
            Or select folder
          </button>
          <div className="mt-4 sm:mt-6 w-full space-y-3 sm:space-y-4">
            {selectedFiles && (
              <div className="bg-gray-50/80 rounded-xl p-3 sm:p-4">
                {Array.from(selectedFiles).map((file, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    {file.name}
                  </div>
                ))}
              </div>
            )}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className="w-full text-sm sm:text-base border-0 bg-gray-50/80 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full text-sm sm:text-base border-0 bg-gray-50/80 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full text-sm sm:text-base border-0 bg-gray-50/80 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleUpload}
                disabled={
                  isLoading ||
                  !selectedFiles ||
                  !formData.name ||
                  !formData.email ||
                  !formData.password
                }
                className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-xl text-sm sm:text-base transition-all duration-300
                ${
                  selectedFiles &&
                  formData.name &&
                  formData.email &&
                  formData.password
                    ? "bg-[#006699] text-white hover:bg-blue-700 transform hover:scale-[1.02]"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg`}
              >
                Upload
              </button>
              <button className="p-2 sm:p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Success Message */}
          {uploadSuccess && (
            <div className="mt-4 sm:mt-6 w-full bg-green-50 border border-green-200 rounded-xl p-3 sm:p-4 animate-scale-in">
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Upload successful!</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full max-w-[384px] bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-4 sm:p-8 animate-scale-in">
          <div className="flex flex-col items-center">
            <div
              className="bg-[#006699] p-3 sm:p-4 rounded-full shadow-lg cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
            />
            <h2 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-bold text-gray-900 text-center">
              Please Add your BGV Documents
            </h2>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 text-sm text-[#006699] hover:text-blue-800 cursor-pointer"
            >
              Or select folder
            </button>
            <div className="mt-4 sm:mt-6 w-full space-y-3 sm:space-y-4">
              {selectedFiles && (
                <div className="bg-gray-50/80 rounded-xl p-3 sm:p-4">
                  <p className="text-sm font-medium text-gray-700">
                    Selected files:
                  </p>
                  {Array.from(selectedFiles).map((file, index) => (
                    <p
                      key={index}
                      className="text-xs sm:text-sm text-gray-600 truncate"
                    >
                      {file.name}
                    </p>
                  ))}
                </div>
              )}
              <select className="w-full text-sm sm:text-base border-0 bg-gray-50/80 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300">
                <option value="">- Select recipient -</option>
                <option value="hr">HR Department</option>
                <option value="manager">Manager</option>
                <option value="team">Team Lead</option>
              </select>
              <input
                type="email"
                placeholder="Email from"
                className="w-full text-sm sm:text-base border-0 bg-gray-50/80 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300"
              />
              <textarea
                placeholder="Message"
                rows={3}
                className="w-full text-sm sm:text-base border-0 bg-gray-50/80 rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300 resize-none"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleUpload}
                  disabled={!selectedFiles}
                  className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-xl text-sm sm:text-base transition-all duration-300
                ${
                  selectedFiles
                    ? "bg-[#006699] text-white hover:bg-blue-700 transform hover:scale-[1.02]"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg`}
                >
                  Upload
                </button>
                <button className="p-2 sm:p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                  <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Success Message */}
            {uploadSuccess && (
              <div className="mt-4 sm:mt-6 w-full bg-green-50 border border-green-200 rounded-xl p-3 sm:p-4 animate-scale-in">
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base font-medium">
                    Files uploaded successfully!
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Users Table */}
      {window.location.pathname ===
        "/Admin/12f1c4a3-5b67-4d92-a8c3-9f1c8e60a92e" && (
        <div className="mt-8 bg-white rounded-2xl p-4 sm:p-6 shadow-xl overflow-x-auto">
          <h2 className="text-lg sm:text-xl font-semibold text-center mb-4">
            All Users
          </h2>
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Password
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Upload Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  File
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allUsers?.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {user.password}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(user.uploadedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-blue-600">
                    <a
                      href={user.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      View File
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UploadCard;
