"use client";
import React, { useContext } from "react";
import { authContext } from "../../authContext/authContext";

export default function HomePage() {
  const { userData } = useContext<any>(authContext);

  return (
    <div className="min-h-screen bg-gray-100">
    {/* Navbar */}
 

    {/* Main Layout */}
    <main className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      
      {/* Sidebar Left */}
      <aside className="hidden md:block md:col-span-1">
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h2 className="font-semibold text-gray-700">My Profile</h2>
          <div className="mt-3 flex flex-col items-center">
            <img
              src={userData?.photo}
              alt="profile"
              className="w-16 h-16 rounded-full"
            />
            <p className="mt-2 font-medium">Reyad</p>
            <span className="text-sm text-gray-500">Web Developer</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold text-gray-700 mb-3">Shortcuts</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="/settings" className="hover:text-blue-600">⚙ Settings</a></li>
            <li><a href="/saved" className="hover:text-blue-600">💾 Saved Posts</a></li>
            <li><a href="/groups" className="hover:text-blue-600">👥 My Groups</a></li>
          </ul>
        </div>
      </aside>

      {/* Feed */}
      <section className="md:col-span-2">
        {/* Create Post */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <textarea
            placeholder="What's on your mind?"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          />
          <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Post
          </button>
        </div>

        {/* Example Post */}
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <img src={userData?.photo} className="w-10 h-10 rounded-full" alt="user" />
            <div>
              <p className="font-semibold">Reyad</p>
              <span className="text-sm text-gray-500">2 hrs ago</span>
            </div>
          </div>
          <p className="text-gray-700 mb-3">
            This is my first post on SocialApp 🚀
          </p>
          {/* <img
            src="https://source.unsplash.com/random/600x300"
            alt="post"
            className="rounded-lg"
          /> */}
          <p>post1</p>
          <p>post2</p>
          <p>post3</p>
        </div>
      </section>

      {/* Right Sidebar */}
      <aside className="hidden md:block md:col-span-1">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold text-gray-700 mb-3">Suggestions</h3>
          <ul className="space-y-3">
            <li className="flex items-center justify-between">
              <span className="font-medium">Ahmed</span>
              <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-600">
                Add
              </button>
            </li>
            <li className="flex items-center justify-between">
              <span className="font-medium">Sara</span>
              <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-600">
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
