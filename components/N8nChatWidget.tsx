"use client";

import { useEffect } from "react";
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

export function N8nChatWidget() {
  useEffect(() => {
    createChat({
      webhookUrl: process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL as string,
      initialMessages: ["Hallo! 👋", "Ik ben de AI-assistent van RD Future Solutions. Waarmee kan ik je helpen?"],
      i18n: {
        en: {
          title: "RD Future Solutions",
          subtitle: "Stel je vraag, we helpen je graag verder.",
          footer: "",
          getStarted: "Nieuw gesprek",
          inputPlaceholder: "Typ je vraag...",
        },
      },
    } as unknown as Parameters<typeof createChat>[0]);
  }, []);

  return <div></div>;
}
