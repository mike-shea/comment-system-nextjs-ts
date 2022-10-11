import React, { useState, useEffect, useMemo } from 'react';
import type { NextPage } from 'next';
import { commentDataFlat, CommentList, currentUser } from '../data/commentData2';

import UserCommentBox from '../components/UserCommentBox';
import UserMeReply from '../components/UserMeReply';

let loadedOnce = false;
const Home: NextPage = () => {
  const [comments, setComments] = useState<CommentList | null>(null);

  useEffect(() => {
    if (loadedOnce) return;
    const cachedState = localStorage.getItem('commentState');
    if (cachedState) setComments(JSON.parse(cachedState));
    else if (!cachedState) setComments(commentDataFlat);
    loadedOnce = true;
  }, []);

  useEffect(() => {
    if (!comments) return;
    localStorage.setItem('commentState', JSON.stringify(comments));
  }, [comments]);

  const commentsTopLevel = useMemo(() => {
    if (!comments) return [];
    const topLevelCommentsArray = [];
    let commentId: keyof CommentList;
    for (commentId in comments) {
      if (comments[commentId].replyTo === null) {
        topLevelCommentsArray.push(commentId);
      }
    }
    return topLevelCommentsArray;
  }, [comments]);

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-4 py-10 px-8">
      {comments &&
        commentsTopLevel.map((comment) => (
          <UserCommentBox
            replyTo={null}
            comments={comments}
            setComments={setComments}
            key={comment}
            currentComment={comments[comment]}
          />
        ))}
      {comments && <UserMeReply setComments={setComments} currentUser={currentUser} />}
    </main>
  );
};

export default Home;
