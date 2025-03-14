"use client";

import React, { useMemo, useState } from "react";
import { FiUpload } from "react-icons/fi";
import useCountryList from "react-select-country-list";

type Country = {
  value: string;
  label: string;
};

const steps = [
  "Personal Information",
  "Educational Details",
  "Work Experience",
  "Skills & Achievements",
  "Family Details",
  "Upload Documents",
];

const InterviewApplicationForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"audio" | "video" | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    dob: "",
    gender: "",
    address: "",
    maritalStatus: "",
    nationality: "",
    highestQualification: "",
    university: "",
    passingYear: "",
    percentage: "",
    certifications: "",
    companyName: "",
    jobTitle: "",
    jobDuration: "",
    responsibilities: "",
    skillsLearned: "",
    technicalSkills: "",
    softSkills: "",
    achievements: "",
    languagesSpoken: "",
    fatherName: "",
    motherName: "",
    siblings: "",
    profileImage: null as File | null,
    resume: null as File | null,
    additionalDocs: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const countryList = useCountryList();

  const countries: Country[] = countryList.getData();

  const filteredCountries = useMemo(
    () => countries.filter((country) => country.label !== "India"),
    [countries]
  );

  const handleFileChange = (
    name: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (file.type === "audio/mp3") {
        setFileType("audio");
      } else if (file.type === "video/mp4") {
        setFileType("video");
      } else {
        alert("Invalid file type. Please upload a .mp3 or .mp4 file.");
        return;
      }

      setFormData((prev) => ({ ...prev, [name]: file }));

      const fileUrl = URL.createObjectURL(file);
      setFilePreview(fileUrl);
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      dob: "",
      gender: "",
      address: "",
      maritalStatus: "",
      nationality: "",
      highestQualification: "",
      university: "",
      passingYear: "",
      percentage: "",
      certifications: "",
      companyName: "",
      jobTitle: "",
      jobDuration: "",
      responsibilities: "",
      skillsLearned: "",
      technicalSkills: "",
      softSkills: "",
      achievements: "",
      languagesSpoken: "",
      fatherName: "",
      motherName: "",
      siblings: "",
      profileImage: null as File | null,
      resume: null as File | null,
      additionalDocs: null as File | null,
    });
    setStep(1);
    setShowPopup(true);
  };

  return (
    <div className="flex flex-col justify-start pt-20 items-center bg-[url(/6114100.jpg)] bg-cover min-h-screen">
      <h2 className="text-3xl font-bold text-white text-center mb-20">
        Detail Form
      </h2>
      <div className="w-[50%]">
        <div className="flex mb-4">
          {steps.map((label, index) => (
            <div
              key={index}
              className={`px-4 py-2 mx-1 rounded-full text-center  text-sm font-semibold ${
                step === index + 1
                  ? "text-black bg-white"
                  : "bg-opacity-50 border text-white border-white"
              }`}
              onClick={() => setStep(index + 1)}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg   p-10 rounded-lg shadow-lg w-full">
          {step === 1 && (
            <div>
              <label
                htmlFor="fullName"
                className="block text-white text-sm font-medium mb-1"
              >
                Full Name <span className="ml-1 text-red-700">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Full Name"
                value={formData?.fullName}
                className="w-full p-3 mb-3 border rounded-lg"
                onChange={handleChange}
                required
              />

              <label
                htmlFor="email"
                className="block text-white text-sm font-medium mb-1"
              >
                Email <span className="ml-1 text-red-700">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData?.email}
                className="w-full p-3 mb-3 border rounded-lg"
                onChange={handleChange}
                required
              />

              <label
                htmlFor="password"
                className="block text-sm   text-white font-medium mb-1"
              >
                Password <span className="ml-1  text-red-700">*</span>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formData?.password}
                className="w-full p-3 mb-3 border rounded-lg"
                onChange={handleChange}
                required
              />

              <label
                htmlFor="phone"
                className="block   text-white text-sm font-medium mb-1"
              >
                Phone Number <span className="ml-1 text-red-700">*</span>
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone Number"
                value={formData?.phone}
                className="w-full p-3 mb-3 border rounded-lg"
                onChange={handleChange}
                pattern="^\d{11}$"
                maxLength={11}
                required
              />
              <div className="mb-3">
                <label
                  htmlFor="dob"
                  className="block text-white text-sm font-medium mb-1"
                >
                  Date of Birth
                </label>
                <input
                  type="datetime-local"
                  name="dob"
                  id="dob"
                  value={formData?.dob ? formData.dob + "T00:00" : ""}
                  className="w-full p-3 mb-3 border rounded-lg"
                  onChange={(e) => {
                    const dateValue = e.target.value.split("T")[0];
                    setFormData((prevData) => ({
                      ...prevData,
                      dob: dateValue,
                    }));
                  }}
                  required
                />
              </div>

              <label
                htmlFor="gender"
                className="block text-sm text-white font-medium mb-1"
              >
                Gender <span className="ml-1 text-red-700">*</span>
              </label>
              <select
                name="gender"
                id="gender"
                className="w-full p-3 mb-3 border rounded-lg"
                onChange={handleChange}
                value={formData?.gender}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <label
                htmlFor="address"
                className="block text-sm text-white font-medium mb-1"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                className="w-full p-3 mb-3 border rounded-lg"
                onChange={handleChange}
                value={formData?.address}
              />

              <label
                htmlFor="maritalStatus"
                className="block text-sm text-white font-medium mb-1"
              >
                Marital Status
              </label>

              <select
                name="maritalStatus"
                id="maritalStatus"
                className="w-full p-3 mb-3 border rounded-lg"
                onChange={handleChange}
                value={formData?.maritalStatus}
                required
              >
                <option value="">Select</option>
                <option value="male">1</option>
                <option value="female">2</option>
                <option value="other">Other</option>
              </select>

              <label
                htmlFor="nationality"
                className="block text-sm  text-white font-medium mb-1"
              >
                Nationality <span className="ml-1 text-red-700">*</span>
              </label>
              <select
                id="nationality"
                name="nationality"
                onChange={handleChange}
                value={formData.nationality}
                className="w-full p-3 mb-3 border rounded-lg"
              >
                <option value="">Select Nationality</option>
                {filteredCountries.map((country: Country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>

              <div className="flex justify-end">
                <button
                  onClick={nextStep}
                  className="py-2 px-4 bg-gray-200 text-gray-800 rounded"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <label
                htmlFor="highestQualification"
                className="block text-sm text-white font-medium mb-1"
              >
                Highest Qualification
              </label>
              <input
                type="text"
                name="highestQualification"
                id="highestQualification"
                placeholder="Highest Qualification"
                value={formData.highestQualification}
                className="w-full p-3 mb-3 border rounded-lg"
                onChange={handleChange}
              />

              <label
                htmlFor="university"
                className="block text-sm text-white font-medium mb-1"
              >
                University/College Name
              </label>
              <input
                type="text"
                name="university"
                id="university"
                placeholder="University/College Name"
                value={formData.university}
                className="w-full p-3 mb-3 border rounded-lg"
                onChange={handleChange}
              />

              <label
                htmlFor="passingYear"
                className="block text-sm text-white font-medium mb-1"
              >
                Passing Year <span className="ml-1 text-red-700">*</span>
              </label>
              <input
                type="text"
                name="passingYear"
                id="passingYear"
                placeholder="Passing Year"
                value={formData.passingYear}
                className="w-full p-3 mb-3 border rounded-lg"
                onChange={handleChange}
              />

              <label
                htmlFor="percentage"
                className="block text-sm text-white font-medium mb-1"
              >
                Percentage/CGPA <span className="ml-1 text-red-700">*</span>
              </label>
              <input
                type="text"
                name="percentage"
                id="percentage"
                placeholder="Percentage/CGPA"
                value={formData.percentage}
                className="w-full p-3 mb-3 border rounded-lg"
                required
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[A-Za-z\s]*$/.test(value)) {
                    handleChange(e);
                  }
                }}
              />

              <label
                htmlFor="certifications"
                className="block text-sm text-white font-medium mb-1"
              >
                Additional Certifications
              </label>
              <input
                type="text"
                name="certifications"
                id="certifications"
                placeholder="Additional Certifications"
                value={formData.certifications}
                className="w-full p-3 mb-3 border rounded-lg"
                onChange={handleChange}
              />

              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="mr-2 py-2 px-4  bg-gray-200 rounded"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="py-2 px-4 bg-gray-200 text-gray-800 rounded"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="mb-3">
                <label
                  htmlFor="companyName"
                  className="block text-sm text-white font-medium mb-1"
                >
                  Current/Last Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  placeholder="Current/Last Company Name"
                  className="w-full p-3 mt-1 border rounded-lg"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="jobTitle"
                  className="block text-sm text-white font-medium mb-1"
                >
                  Job Title/Designation
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  placeholder="Current/Last Company Name"
                  className="w-full p-3 mt-1 border rounded-lg"
                  value={formData.jobTitle}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="jobDuration"
                  className="block text-sm text-white font-medium mb-1"
                >
                  Duration (From - To)
                </label>
                <input
                  type="text"
                  id="jobDuration"
                  name="jobDuration"
                  placeholder="Duration (From - To)"
                  className="w-full p-3 mt-1 border rounded-lg"
                  value={formData.jobDuration}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="responsibilities"
                  className="block text-sm  text-white font-medium mb-1"
                >
                  Key Responsibilities
                </label>
                <textarea
                  id="responsibilities"
                  name="responsibilities"
                  placeholder="Key Responsibilities"
                  className="w-full p-3 mt-1 border rounded-lg"
                  value={formData.responsibilities}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="skillsLearned"
                  className="block text-sm text-white font-medium mb-1"
                >
                  Skills Learned
                </label>
                <textarea
                  id="skillsLearned"
                  name="skillsLearned"
                  placeholder="Skills Learned"
                  className="w-full p-3 mt-1 border rounded-lg"
                  value={formData.skillsLearned}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="block text-sm text-white font-medium mb-1"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="py-2 px-4 bg-gray-200 text-gray-800 rounded"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="mb-3">
                <label
                  htmlFor="technicalSkills"
                  className="block text-sm text-white font-medium mb-1"
                >
                  Technical Skills
                </label>
                <input
                  type="text"
                  id="technicalSkills"
                  name="technicalSkills"
                  placeholder="Technical Skills"
                  className="w-full p-3 mt-1 border rounded-lg"
                  value={formData.technicalSkills}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="softSkills"
                  className="block text-sm  text-white font-medium mb-1"
                >
                  Soft Skills
                </label>
                <input
                  type="text"
                  id="softSkills"
                  name="softSkills"
                  placeholder="Soft Skills"
                  className="w-full p-3 mt-1 border rounded-lg"
                  value={formData.softSkills}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="achievements"
                  className="block text-sm text-white font-medium mb-1"
                >
                  Achievements
                </label>
                <textarea
                  id="achievements"
                  name="achievements"
                  placeholder="Key Responsibilities"
                  className="w-full p-3 mt-1 border rounded-lg"
                  value={formData.achievements}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="languagesSpoken"
                  className="block text-sm  text-white font-medium mb-1"
                >
                  Languages Spoken
                </label>
                <select
                  id="languagesSpoken"
                  name="languagesSpoken"
                  className="w-full p-3 mt-1 border rounded-lg"
                  value={formData.languagesSpoken}
                  onChange={handleChange}
                >
                  <option value="">Select a Language</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="block text-sm text-white font-medium mb-1"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="py-2 px-4 bg-gray-200 text-gray-800 rounded"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <div className="mb-3">
                <label
                  htmlFor="fatherName"
                  className="block text-sm text-white font-medium mb-1"
                >
                  Father Name
                </label>
                <input
                  type="text"
                  id="fatherName"
                  name="fatherName"
                  placeholder="Father's Name"
                  className="w-full p-3 mt-1 border rounded-lg"
                  value={formData.fatherName}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="motherName"
                  className="block text-sm text-white font-medium mb-1"
                >
                  Mohers Name
                </label>
                <input
                  type="text"
                  id="motherName"
                  name="motherName"
                  placeholder="Father's Name"
                  className="w-full p-3 mt-1 border rounded-lg"
                  value={formData.motherName}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="siblings"
                  className="block text-sm text-white font-medium mb-1"
                >
                  Number of Silings
                </label>
                <input
                  type="text"
                  id="siblings"
                  name="siblings"
                  placeholder="Number of Siblings"
                  className="w-full p-3 mt-1 border rounded-lg"
                  value={formData.siblings}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[A-Za-z\s]*$/.test(value)) {
                      handleChange(e);
                    }
                  }}
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="block text-sm text-white font-medium mb-1"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  className="py-2 px-4 bg-gray-200 text-gray-800 rounded"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              <div className="mb-3">
                <label
                  htmlFor="profileImage"
                  className="w-full flex flex-col items-center p-3 mb-3 border-2 border-dashed rounded-lg cursor-pointer"
                >
                  <FiUpload size={24} className="mb-2" />
                  <span className="text-sm text-white">
                    Upload Profile Image
                  </span>
                </label>
                <input
                  type="file"
                  id="profileImage"
                  className="hidden"
                  accept="audio/mp3, video/mp4"
                  onChange={(e) => handleFileChange("profileImage", e)}
                />

                {filePreview && (
                  <div className="mt-3">
                    {fileType === "audio" ? (
                      <audio controls className="w-full">
                        <source src={filePreview} type="audio/mp3" />
                        Your browser does not support the audio element.
                      </audio>
                    ) : fileType === "video" ? (
                      <video controls className="w-full h-72">
                        <source src={filePreview} type="video/mp4" />
                        Your browser does not support the video element.
                      </video>
                    ) : null}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label
                  htmlFor="resume"
                  className="w-full flex flex-col items-center p-3 mb-3 border-2 border-dashed rounded-lg cursor-pointer"
                >
                  <FiUpload size={24} className="mb-2" />
                  <span className="text-sm text-white">
                    Upload Resume (PDF)
                  </span>
                </label>
                <input
                  type="file"
                  id="resume"
                  className="hidden"
                  onChange={(e) => handleFileChange("resume", e)}
                />
                {formData.resume && (
                  <div className="text-center mt-2">
                    <p className="text-sm">{formData.resume.name}</p>
                    <p className="text-xs text-gray-500">Resume Preview</p>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label
                  htmlFor="additionalDocs"
                  className="w-full flex flex-col items-center p-3 mb-3 border-2 border-dashed rounded-lg cursor-pointer"
                >
                  <FiUpload size={24} className="mb-2" />
                  <span className="text-sm text-white">
                    Upload Additional Documents
                  </span>
                </label>
                <input
                  type="file"
                  id="additionalDocs"
                  className="hidden"
                  onChange={(e) => handleFileChange("additionalDocs", e)}
                />
                {formData.additionalDocs && (
                  <div className="text-center mt-2">
                    <p className="text-sm">{formData.additionalDocs.name}</p>
                    <p className="text-xs text-white">
                      Additional Document Preview
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={prevStep}
                  className="mr-2 py-2 px-4 bg-gray-200 rounded"
                >
                  Back
                </button>
                <button
                  className="py-2 px-4 bg-gray-200 text-gray-800 rounded"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Form Submitted Successfully!
            </h2>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewApplicationForm;
