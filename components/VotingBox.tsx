import React from 'react';

export default function VotingBox() {
  return (
    <div className="flex flex-row items-center justify-items-stretch sm:flex-col">
      <button
        type="button"
        className="flex h-8 rounded-l-lg bg-gray-100 text-center text-lg font-bold text-blue-400 disabled:text-gray-300 sm:rounded-none sm:rounded-t-lg">
        <span className="w-8">+</span>
      </button>
      <div className="flex h-8 items-center bg-gray-100 text-center font-bold text-blue-700 sm:h-4">
        <span className="w-8 items-center text-center text-sm ">4</span>
      </div>
      <button
        type="button"
        className="flex h-8 rounded-r-lg bg-gray-100 text-center text-lg font-bold text-blue-400 disabled:text-gray-300 sm:rounded-none sm:rounded-b-lg">
        <span className="w-8">-</span>
      </button>
    </div>
  );
}
