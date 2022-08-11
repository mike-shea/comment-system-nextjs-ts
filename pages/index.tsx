import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import UserCommentBox from '../components/UserCommentBox';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex max-w-3xl flex-col gap-4 py-10 px-8">
        <UserCommentBox />
      </main>
    </div>
  );
};

export default Home;