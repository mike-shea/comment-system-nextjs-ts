import React, { useState } from 'react';
import Image from 'next/image';
import { dateParser } from '../helpers/helpers';
import PortalWrapper from './PortalWrapper';
import DeleteCommentModal from './DeleteCommentModal';
import { CommentList, SingleCommentType } from '../data/commentData2';

const youTag = (
  <p className=" ml-2 flex rounded-sm bg-gray-800 px-2 py-1 text-xs font-bold leading-none text-blue-100">
    You
  </p>
);

export default function SingleComment({
  currentComment,
  replyTo,
  selectedUser,
  setComments,
  setReplyState
}: {
  currentComment: SingleCommentType;
  replyTo: SingleCommentType | null;
  selectedUser: boolean;
  setComments: React.Dispatch<React.SetStateAction<CommentList | null>>;
  setReplyState: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [editState, setEditState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const [commentText, setCommentText] = useState(currentComment.content);

  function saveChanges() {
    setComments((prevState) => {
      if (!prevState) return null;
      const newState = structuredClone(prevState);
      newState[currentComment.id].content = commentText;
      return newState;
    });
    setEditState(false);
    setDeleteState(false);
    setReplyState(false);
  }

  function deleteComment() {
    setComments((prevState) => {
      if (!prevState) return null;
      const newState = structuredClone(prevState);
      delete newState[currentComment.id];
      if (replyTo) {
        const replies = newState[replyTo.id].replies.filter(
          (replyIds) => replyIds !== currentComment.id
        );
        newState[replyTo.id].replies = replies;
      }
      return newState;
    });
    setEditState(false);
    setDeleteState(false);
    setReplyState(false);
  }
  return (
    <div className="flex w-full flex-col">
      <div className="flex h-10 flex-row items-center">
        <div className="h-8 w-8 rounded-full bg-gray-300">
          <Image layout="responsive" src={currentComment.user.image} />
        </div>
        <h3 className="pl-4 text-sm font-bold text-gray-600">{currentComment.user.username}</h3>
        {selectedUser && youTag}
        <p className="pl-3 text-sm text-gray-400">{dateParser(currentComment.createdAt)}</p>
        {!selectedUser && (
          <button
            onClick={() => setReplyState(true)}
            className="ml-auto text-sm font-bold text-blue-600"
            type="button">
            Reply
          </button>
        )}
        {selectedUser && (
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
            {currentComment.replyTo && (
              <span className="font-semibold text-blue-500">@{replyTo?.user.username} </span>
            )}
            {currentComment.content}
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
