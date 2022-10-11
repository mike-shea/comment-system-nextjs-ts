import React from 'react';
import { CommentList } from '../data/commentData2';
import VotingButton from './VotingButton';

export default function VotingBox({
  selectedUser,
  score,
  vote,
  commentId,
  setComments
}: {
  selectedUser: boolean;
  score: number;
  vote: {
    submitted: boolean;
    state: 'upvoted' | 'downvoted' | null;
  };
  commentId: string;
  setComments: React.Dispatch<React.SetStateAction<CommentList | null>>;
}) {
  function handleScore(voteDirection: 'upvoted' | 'downvoted') {
    if (selectedUser) return;
    if (vote.submitted && vote.state === voteDirection) return;
    if (vote.submitted && vote.state !== voteDirection) {
      setComments((prevState) => {
        if (!prevState) return null;
        const newState = structuredClone(prevState);
        newState[commentId].vote.submitted = false;
        newState[commentId].vote.state = null;
        newState[commentId].score =
          voteDirection === 'upvoted'
            ? newState[commentId].score + 1
            : newState[commentId].score - 1;
        return newState;
      });
    }

    if (!vote.submitted) {
      setComments((prevState) => {
        if (!prevState) return null;
        const newState = structuredClone(prevState);
        newState[commentId].vote.submitted = true;
        newState[commentId].vote.state = voteDirection;
        newState[commentId].score =
          voteDirection === 'upvoted'
            ? newState[commentId].score + 1
            : newState[commentId].score - 1;
        return newState;
      });
    }
  }

  return (
    <div className="flex items-start">
      <div className="flex flex-row items-center overflow-hidden rounded-xl bg-gray-100 sm:flex-col">
        <VotingButton
          vote={vote}
          direction="upvoted"
          selectedUser={selectedUser}
          handleScore={handleScore}
        />
        <div className="flex items-start py-1 px-3 text-sm font-bold text-blue-700 sm:px-0 ">
          <p>{score}</p>
        </div>

        <VotingButton
          vote={vote}
          direction="downvoted"
          selectedUser={selectedUser}
          handleScore={handleScore}
        />
      </div>
    </div>
  );
}
