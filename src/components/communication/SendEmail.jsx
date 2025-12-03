import React from "react";
import Messages from "./Messages";

export default function SendEmail({ token }) {
  return <Messages defaultChannel="email" />;
}
