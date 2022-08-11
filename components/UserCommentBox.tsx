import React from 'react';
import VotingBox from './VotingBox';

export default function UserCommentBox() {
  return (
    <div className="w-full rounded-2xl bg-white p-4">
      <div className="flex flex-col flex-col-reverse gap-4 sm:flex-row">
        <VotingBox />
        <div id="comment" className="flex w-full flex-col">
          <div id="titleBar" className="flex h-10 w-full flex-row items-center">
            <img src="" className="h-8 w-8 rounded-full bg-gray-300" alt="" />
            <h3 className="pl-4 text-sm font-bold text-gray-600">User Name</h3>
            <span className=" ml-2 flex rounded-sm bg-gray-800 px-2 py-1 text-xs font-bold leading-none text-blue-100">
              You
            </span>
            <p className="pl-3 text-sm text-gray-400">Comment TimeStamp</p>
            <button className="ml-auto text-sm font-bold text-blue-600" type="button">
              Reply
            </button>
          </div>
          <div id="commentText" className="pt-2 text-gray-600">
            <p>User Content</p>
          </div>
        </div>
      </div>
    </div>
  );
}
