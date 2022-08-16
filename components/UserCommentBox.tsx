import React, { useState } from 'react';
import { CommentData, currentUser } from '../data/data';

import VotingBox from './VotingBox';
import UserMeReply from './UserMeReply';
import SingleComment from './SingleComment';

export default function UserCommentBox(
  props: CommentData & {
    setComments: React.Dispatch<React.SetStateAction<CommentData[]>>;
    replyTo: string | null;
    comments: CommentData[];
    parentCommenthLength: number;
  }
) {
  const [replyState, setReplyState] = useState(false);
  const nestedComments = props.replies;
  const selectedUser = props.user.userId === currentUser.userId;

  return (
    <div>
      <div className="w-full rounded-2xl bg-white p-4">
        <div className="flex flex-col flex-col-reverse gap-4 sm:flex-row">
          <VotingBox
            replyId={props.id}
            setComments={props.setComments}
            selectedUser={selectedUser}
            score={props.score}
            vote={props.vote}
          />
          <SingleComment
            replyTo={props.replyTo}
            setReplyState={setReplyState}
            setComments={props.setComments}
            createdAt={props.createdAt}
            content={props.content}
            id={props.id}
            user={props.user}
            selectedUser={selectedUser}
          />
        </div>
      </div>
      {replyState && (
        <UserMeReply
          comments={props.comments}
          setReplyState={setReplyState}
          parentCommenthLength={props.replies.length}
          replyId={props.id}
          userId={currentUser.userId}
          image={currentUser.image}
          username={currentUser.username}
          setComments={props.setComments}
        />
      )}
      {nestedComments.length > 0 && (
        <div className="mt-4 flex flex-row pl-6">
          <div className="border-l-2 pr-6"> </div>
          <div className="flex w-full flex-col gap-4">
            {nestedComments.map((comment) => (
              <UserCommentBox
                parentCommenthLength={props.replies.length}
                comments={props.comments}
                replyTo={props.user.username}
                setComments={props.setComments}
                key={comment.id}
                {...comment}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
