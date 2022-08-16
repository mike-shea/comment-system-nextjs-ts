import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { dateParser } from '../helpers/helpers';
import type { CurrentUserObject, CommentData } from '../data/data';
import PortalWrapper from './PortalWrapper';
import DeleteCommentModal from './DeleteCommentModal';

const youTag = (
  <p className=" ml-2 flex rounded-sm bg-gray-800 px-2 py-1 text-xs font-bold leading-none text-blue-100">
    You
  </p>
);

export default function SingleComment(props: {
  id: string;
  user: {
    image: StaticImageData;
    username: string;
    userId: string;
  };
  createdAt: string;
  content: string;
  selectedUser: boolean;
  replyTo: string | null;
  setComments: React.Dispatch<React.SetStateAction<CommentData[]>>;
  setReplyState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [editState, setEditState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const [commentText, setCommentText] = useState(props.content);

  function saveChanges() {
    setEditState(false);
    props.setComments((prevState) => {
      const newState = structuredClone(prevState);

      let selectedComment: CommentData | undefined;
      const commentDepth = props.id.length;

      for (let i = 0; i <= commentDepth; i += 2) {
        const selectedId = props.id.substring(0, i + 1);
        console.log('selected Id', selectedId);
        if (!selectedComment) {
          selectedComment = newState.find((comment) => comment.id === selectedId);
        } else if (selectedComment) {
          selectedComment = selectedComment.replies.find((comment) => comment.id === selectedId);
        }
      }
      if (selectedComment) selectedComment.content = commentText;

      return newState;
    });
  }

  function deleteComment() {
    setEditState(false);
    props.setComments((prevState) => {
      const newState = structuredClone(prevState);

      let selectedComment: CommentData | undefined;
      const commentDepth = props.id.length - 1;

      for (let i = 0; i <= commentDepth; i += 2) {
        const selectedId = props.id.substring(0, i + 1);
        console.log('selected Id', selectedId);
        if (!selectedComment) {
          if (i === commentDepth) {
            const commentToDelete = newState.findIndex((comment) => comment.id === props.id);
            newState.splice(commentToDelete, 1);
            break;
          }
          selectedComment = newState.find((comment) => comment.id === selectedId);
        } else if (selectedComment) {
          selectedComment = selectedComment.replies.find((comment) => comment.id === selectedId);
        }
        if (selectedComment && i === commentDepth - 2) {
          const commentToDelete = selectedComment.replies.findIndex(
            (comment) => comment.id === props.id
          );
          selectedComment.replies.splice(commentToDelete, 1);
          break;
        }
      }

      return newState;
    });
  }

  return (
    <div className="flex w-full flex-col">
      <div className="flex h-10 flex-row items-center">
        <div className="h-8 w-8 rounded-full bg-gray-300">
          <Image layout="responsive" src={props.user.image} />
        </div>
        <h3 className="pl-4 text-sm font-bold text-gray-600">{props.user.username}</h3>
        {props.selectedUser && youTag}
        <p className="pl-3 text-sm text-gray-400">{dateParser(props.createdAt)}</p>
        {!props.selectedUser && (
          <button
            onClick={() => props.setReplyState(true)}
            className="ml-auto text-sm font-bold text-blue-600"
            type="button">
            Reply
          </button>
        )}
        {props.selectedUser && (
          <div className="ml-auto flex gap-4">
            {editState && (
              <button
                onClick={() => setDeleteState(true)}
                className="text-sm font-bold text-red-600"
                type="button">
                Delete
              </button>
            )}
            {deleteState && (
              <PortalWrapper>
                <DeleteCommentModal deleteComment={deleteComment} setDeleteState={setDeleteState} />
              </PortalWrapper>
            )}
            <button
              onClick={() => setEditState(true)}
              className="text-sm font-bold text-blue-600"
              type="button">
              Edit
            </button>
          </div>
        )}
      </div>
      <div className="h-full w-full pt-2 text-gray-600">
        {!editState && (
          <p className="p-1">
            {props.replyTo && (
              <span className="font-semibold text-blue-500">@{props.replyTo} </span>
            )}
            {props.content}
          </p>
        )}
        {editState && (
          <>
            <textarea
              rows={3}
              onChange={(e) => {
                setCommentText(e.currentTarget.value);
              }}
              className=" w-full border-2 p-2"
              value={commentText}
            />
            <button
              onClick={() => saveChanges()}
              className="ml-auto text-sm font-bold text-blue-600"
              type="button">
              Save Changes
            </button>
          </>
        )}
      </div>
    </div>
  );
}
