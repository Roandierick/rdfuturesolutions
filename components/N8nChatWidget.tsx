"use client";

import { useEffect } from "react";
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export function N8nChatWidget() {
  useEffect(() => {
    createChat({ webhookUrl: process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL as string });
  }, []);

  return <div></div>;
}
