import React from 'react';
import Head from 'next/head';
import ChatCard from '../components/chat/ChatCard';

export default function ChatPage() {
  return (
    <>
      <Head>
        <title>Chat com Designer - ONVEX</title>
        <meta name="description" content="Converse diretamente com um designer" />
      </Head>
      <ChatCard />
    </>
  );
}
