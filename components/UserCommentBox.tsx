import React, { useState } from 'react';

import SingleComment from './SingleComment';
import VotingBox from './VotingBox';
import UserMeReply from './UserMeReply';

import { SingleCommentType, currentUser, CommentList } from '../data/commentData2';

export default function UserCommentBox({
  setComments,
  comments,
  currentComment,
  replyTo
}: {
  comments: CommentList;
  setComments: React.Dispatch<React.SetStateAction<CommentList | null>>;
  currentComment: SingleCommentType;
  replyTo: SingleCommentType | null;
}) {
  const [replyState, setReplyState] = useState(false);

  const selectedUser = currentUser.userId === currentComment.user.userId;
  return (
    <div>
      <div className="w-full rounded-2xl bg-white p-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <VotingBox
            commentId={currentComment.id}
            setComments={setComments}
            selectedUser={selectedUser}
            score={currentComment.score}
            vote={currentComment.vote}
          />
          <SingleComment
            replyTo={replyTo ?? null}
            currentComment={currentComment}
            setReplyState={setReplyState}
            setComments={setComments}
            selectedUser={selectedUser}
          />
        </div>
      </div>
      {replyState && (
        <UserMeReply
          setReplyState={setReplyState}
          replyId={currentComment.id}
          setComments={setComments}
          currentUser={currentUser}
        />
      )}
      {comments[currentComment.id].replies.length > 0 && (
        <div className="mt-4 flex flex-row pl-6">
          <div className="border-l-2 pr-6"> </div>
          <div className="flex w-full flex-col gap-4">
            {comments[currentComment.id].replies.map((commentId) => (
              <UserCommentBox
                replyTo={currentComment}
                comments={comments}
                setComments={setComments}
                key={commentId}
                currentComment={comments[commentId]}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
