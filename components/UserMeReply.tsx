import React, { useState } from 'react';
import Image from 'next/image';
import { CommentData, CurrentUserObject } from '../data/data';
import { dateParser } from '../helpers/helpers';

export default function UserMeReply(
  props: CurrentUserObject & {
    setComments: React.Dispatch<React.SetStateAction<CommentData[]>>;
    replyId?: string;
    parentCommenthLength: number;
    comments: CommentData[];
    setReplyState?: React.Dispatch<React.SetStateAction<boolean>>;
  }
) {
  const [text, setText] = useState('');

  function submitReply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('text:', text);
    if (!props.replyId) {
      props.setComments((prevState) => {
        const newState = structuredClone(prevState);
        newState.push({
          id: (props.comments.length + 1).toString(),
          content: text,
          createdAt: new Date().toUTCString(),
          score: 1,
          replyingTo: null,
          vote: {
            submitted: false,
            state: null
          },
          user: {
            image: props.image,
            username: props.username,
            userId: props.userId
          },
          replies: []
        });
        return newState;
      });
    } else {
      props.setComments((prevState) => {
        const newState = structuredClone(prevState);
        if (props.replyId) {
          let selectedComment: CommentData | undefined;
          const commentDepth = props.replyId.split('-').join('').length;

          for (let i = 0; i <= commentDepth; i += 2) {
            const selectedId = props.replyId.substring(0, i + 1);

            if (!selectedComment) {
              selectedComment = newState.find((comment) => comment.id === selectedId);
            } else if (selectedComment) {
              selectedComment = selectedComment.replies.find(
                (comment) => comment.id === selectedId
              );
            }
          }

          if (selectedComment) {
            const newComment: CommentData = {
              id: `${props.replyId}-${props.parentCommenthLength + 1}`,
              content: text,
              createdAt: new Date().toUTCString(),
              score: 1,
              replyingTo: selectedComment.id,
              vote: {
                submitted: false,
                state: null
              },
              user: {
                image: props.image,
                username: props.username,
                userId: props.userId
              },
              replies: []
            };

            selectedComment.replies.unshift(newComment);
          }
        }
        return newState;
      });
    }

    setText('');
    if (props.setReplyState) props.setReplyState(false);
  }
  return (
    <div className="mt-4 w-full rounded-2xl bg-white p-4">
      <form onSubmit={submitReply} className="flex gap-4">
        <div className="h-8 w-8 rounded-full bg-gray-300">
          <Image layout="responsive" src={props.image} />
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
