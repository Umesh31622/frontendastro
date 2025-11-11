import React from "react";
import Messages from "./Messages";

export default function SendWhatsApp({ token }) {
  return <Messages defaultChannel="whatsapp" token={token} />;
}
