import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import { CommentData, comments as initialComments, currentUser } from '../data/data';
// import type { CommentData } from '../data/data';

import UserCommentBox from '../components/UserCommentBox';
import UserMeReply from '../components/UserMeReply';
import { cp } from 'fs/promises';

let loadedOnce = true;
const Home: NextPage = () => {
  const [comments, setComments] = useState<CommentData[]>();

  useEffect(() => {
    const cachedState = localStorage.getItem('commentState');
    if (cachedState && loadedOnce) {
      const parsedState = JSON.parse(cachedState);
      setComments(parsedState);
    }
    if (!cachedState && loadedOnce) {
      console.log('setting initial state');
      setComments(initialComments);
    }
    loadedOnce = false;
  }, []);

  useEffect(() => {
    if (!loadedOnce) {
      console.log('settingState');
      localStorage.setItem('commentState', JSON.stringify(comments));
    }
  }, [comments]);

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-4 py-10 px-8">
      {comments &&
        comments.map((comment) => (
          <UserCommentBox
            parentCommenthLength={comments.length}
            comments={comments}
            replyTo={null}
            setComments={setComments}
            key={comment.id}
            {...comment}
          />
        ))}
      {comments && (
        <UserMeReply
          parentCommenthLength={comments.length}
          comments={comments}
          setComments={setComments}
          {...currentUser}
        />
      )}
    </main>
  );
};

export default Home;
