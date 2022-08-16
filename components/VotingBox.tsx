import React, { useState } from 'react';
import { CommentData } from '../data/data';

function VotingButton(props: {
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
      disabled={props.vote.state === props.direction || props.selectedUser}
      onClick={() => props.handleScore(props.direction)}
      type="button"
      className={`${
        props.selectedUser
          ? 'hover:disabled:bg-gray-x200 disabled:text-gray-300'
          : 'disabled:text-blue-500 hover:disabled:bg-gray-200'
      } h-8 w-8 text-center text-lg font-bold text-gray-300 hover:bg-gray-200 hover:text-gray-500 `}>
      {props.direction === 'upvoted' ? '+' : '-'}
    </button>
  );
}

export default function VotingBox(props: {
  selectedUser: boolean;
  score: number;
  vote: {
    submitted: boolean;
    state: 'upvoted' | 'downvoted' | null;
  };
  replyId: string;
  setComments: React.Dispatch<React.SetStateAction<CommentData[]>>;
}) {
  function handleScore(direction: 'upvoted' | 'downvoted') {
    const upvotedSelected = direction === 'upvoted';
    if (
      props.selectedUser ||
      (props.vote.state === 'upvoted' && upvotedSelected && props.vote.submitted) ||
      (props.vote.state === 'downvoted' && !upvotedSelected && props.vote.submitted)
    )
      return;
    if (
      (props.vote.state === 'upvoted' && props.vote.submitted && !upvotedSelected) ||
      (props.vote.state === 'downvoted' && props.vote.submitted && upvotedSelected)
    ) {
      props.setComments((prevState) => {
        const newState = structuredClone(prevState);

        let selectedComment: CommentData | undefined;
        const commentDepth = props.replyId.split('-').join('').length;

        for (let i = 0; i <= commentDepth; i += 2) {
          const selectedId = props.replyId.substring(0, i + 1);

          if (!selectedComment) {
            selectedComment = newState.find((comment) => comment.id === selectedId);
          } else if (selectedComment) {
            selectedComment = selectedComment.replies.find((comment) => comment.id === selectedId);
          }
        }
        if (props.vote.state === 'upvoted' && selectedComment) {
          selectedComment.score -= 1;
        }
        if (props.vote.state === 'downvoted' && selectedComment) {
          selectedComment.score += 1;
        }
        if (selectedComment) {
          selectedComment.vote.submitted = false;
          selectedComment.vote.state = null;
        }
        return newState;
      });
      return;
    }
    if (!props.vote.submitted) {
      props.setComments((prevState) => {
        const newState = structuredClone(prevState);

        let selectedComment: CommentData | undefined;
        const commentDepth = props.replyId.split('-').join('').length;

        for (let i = 0; i <= commentDepth; i += 2) {
          const selectedId = props.replyId.substring(0, i + 1);

          if (!selectedComment) {
            selectedComment = newState.find((comment) => comment.id === selectedId);
          } else if (selectedComment) {
            selectedComment = selectedComment.replies.find((comment) => comment.id === selectedId);
          }
        }
        if (upvotedSelected && selectedComment) {
          selectedComment.score = selectedComment.score + 1;
          selectedComment.vote.state = 'upvoted';
          selectedComment.vote.submitted = true;
        }
        if (!upvotedSelected && selectedComment) {
          selectedComment.score = selectedComment.score - 1;
          selectedComment.vote.state = 'downvoted';
          selectedComment.vote.submitted = true;
        }

        return newState;
      });
    }
  }

  return (
    <div className="flex items-start">
      <div className="flex flex-row items-center overflow-hidden rounded-xl bg-gray-100 sm:flex-col">
        <VotingButton
          vote={props.vote}
          direction="upvoted"
          selectedUser={props.selectedUser}
          handleScore={handleScore}
        />
        <div className="flex items-start py-1 px-3 text-sm font-bold text-blue-700 sm:px-0 ">
          <p>{props.score}</p>
        </div>

        <VotingButton
          vote={props.vote}
          direction="downvoted"
          selectedUser={props.selectedUser}
          handleScore={handleScore}
        />
      </div>
    </div>
  );
}
