"use client";
import React, { useContext, useState, useRef } from "react";
import { authContext } from "../../authContext/authContext";
import Post from "../Posts/PostItems";
import PostLIst from "../Posts/PostLIst";

export default function HomePage() {
  const { userData } = useContext<any>(authContext);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navbar */}

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Left */}
        <aside className="hidden md:block md:col-span-1">
          <div className="bg-slate-800 rounded-xl shadow p-4 mb-6">
            <h2 className="font-semibold text-slate-200">My Profile</h2>
            <div className="mt-3 flex flex-col items-center">
              <img
                src={userData?.photo}
                alt="profile"
                className="w-16 h-16 rounded-full"
              />
              <p className="mt-2 font-medium text-slate-200">{userData?.name}</p>
              <span className="text-sm text-slate-400">Web Developer</span>
            </div>
          </div>
          <div className="bg-slate-800 rounded-xl shadow p-4">
            <h3 className="font-semibold text-slate-200 mb-3">Shortcuts</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href="/settings" className="hover:text-blue-400">
                  ⚙ Settings
                </a>
              </li>
              <li>
                <a href="/saved" className="hover:text-blue-400">
                  💾 Saved Posts
                </a>
              </li>
              <li>
                <a href="/groups" className="hover:text-blue-400">
                  👥 My Groups
                </a>
              </li>
            </ul>
          </div>
        </aside>

        {/* Feed */}
        <section className="md:col-span-2">
          {/* Create Post */}
          <div className="bg-slate-800 rounded-xl shadow p-4 mb-6">
            <textarea
              placeholder="What's on your mind?"
              className="w-full p-3 border border-slate-600 bg-slate-700 text-slate-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            />

            {/* Image Preview */}
            {selectedImage && (
              <div className="mt-3 relative">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full max-h-64 object-cover rounded-lg"
                />
                <button
                  onClick={handleImageRemove}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center gap-2 text-slate-300 hover:text-blue-400 cursor-pointer"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Photo
                </label>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">
                Post
              </button>
            </div>
          </div>

          {/* Example Post */}
          <div className="posts">
           <PostLIst/>
          </div>

        </section>

        {/* Right Sidebar */}
        <aside className="hidden md:block md:col-span-1">
          <div className="bg-slate-800 rounded-xl shadow p-4">
            <h3 className="font-semibold text-slate-200 mb-3">Suggestions</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="font-medium text-slate-200">Ahmed</span>
                <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-400">
                  Add
                </button>
              </li>
              <li className="flex items-center justify-between">
                <span className="font-medium text-slate-200">Sara</span>
                <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-400">
                  Add
                </button>
              </li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
