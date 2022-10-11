import React from 'react';

export default function VotingButton({
  vote,
  direction,
  selectedUser,
  handleScore
}: {
  vote: {
    submitted: boolean;
    state: 'upvoted' | 'downvoted' | null;
  };
  direction: 'upvoted' | 'downvoted';
  selectedUser: boolean;
  handleScore: (direction: 'upvoted' | 'downvoted') => void;
}) {
  return (
    <button
      disabled={vote.state === direction || selectedUser}
      onClick={() => handleScore(direction)}
      type="button"
      className={`${
        selectedUser
          ? 'hover:disabled:bg-gray-x200 disabled:text-gray-300'
          : 'disabled:text-blue-500 hover:disabled:bg-gray-200'
      } h-8 w-8 text-center text-lg font-bold text-gray-300 hover:bg-gray-200 hover:text-gray-500 `}>
      {direction === 'upvoted' ? '+' : '-'}
    </button>
  );
}
