import React from 'react';
import VotingBox from './VotingBox';

export default function UserCommentBox() {
  return (
    <div>
      <div className="w-full rounded-2xl bg-white p-4">
        <div className="flex flex-col flex-col-reverse gap-4 sm:flex-row">
          <VotingBox />
          <div id="comment" className="flex w-full flex-col">
            <div id="titleBar" className="flex h-10 w-full flex-row items-center">
              <img
                src={user.image.png}
                className="h-8 w-8 rounded-full bg-gray-300"
                alt={user.username}
              />
              <h3 className="pl-4 text-sm font-bold text-gray-600">{user.username}</h3>
              {user.userId === 4 && <YouSpanStyles>you</YouSpanStyles>}
              <p className="pl-3 text-sm text-gray-400">{user.createdAt}</p>
              <ReplyButtonStyles type="button" onClick={() => setReplyState()}>
                Reply
              </ReplyButtonStyles>
            </div>
            <div id="commentText" className="pt-2 text-gray-600">
              <p>{user.content}</p>
            </div>
          </div>
        </div>
      </div>
      {reply && <UserMeReply parent={user.id} />}

      {nestedComments &&
        nestedComments.map((comment, i) => (
          <div key={`${comment.id}-${i}a`} className="flex flex-row py-4">
            <div key={`${comment.id}-${i}b`} className="ml-4 border-l-2 pl-8">
              {' '}
            </div>
            <div key={`${comment.id}-${i}c`} className="grow">
              <UserCommentBox key={comment.id} allComments={allComments} user={comment} />
            </div>
          </div>
        ))}
    </div>
  );
}
