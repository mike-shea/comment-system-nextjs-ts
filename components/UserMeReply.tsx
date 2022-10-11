import React, { useState } from 'react';
import Image from 'next/image';
import { newIdTag } from '../helpers/helpers';
import { CommentList, CurrentUserObject, SingleCommentType } from '../data/commentData2';

export default function UserMeReply({
  currentUser,
  setComments,
  replyId,
  setReplyState
}: {
  currentUser: CurrentUserObject;
  setComments: React.Dispatch<React.SetStateAction<CommentList | null>>;
  replyId?: string;
  setReplyState?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [text, setText] = useState('');

  function addComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setComments((prevState) => {
      if (!prevState) return null;
      const newId = newIdTag();
      const newState = structuredClone(prevState);
      const post: SingleCommentType = {
        id: newId,
        content: text,
        createdAt: new Date().toUTCString(),
        score: 1,
        replyTo: replyId ?? null,
        vote: {
          submitted: false,
          state: null
        },
        user: {
          image: currentUser.image,
          username: currentUser.username,
          userId: currentUser.userId
        },
        replies: []
      };
      newState[newId] = post;
      if (replyId) {
        newState[replyId].replies.unshift(newId);
      }
      return newState;
    });
    setText('');
    if (setReplyState) setReplyState(false);
  }

  return (
    <div className="mt-4 w-full rounded-2xl bg-white p-4">
      <form onSubmit={addComment} className="flex gap-4">
        <div className="h-8 w-8 rounded-full bg-gray-300">
          <Image layout="responsive" src={currentUser.image} />
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="h-28 grow border p-3"
          placeholder="Add a comment"
          id="name"
          name="name"
        />
        <button
          type="submit"
          className="h-min rounded-lg bg-blue-600 px-8 py-2 font-bold text-blue-100">
          Send
        </button>
      </form>
    </div>
  );
}
