import React from "react";
import { Link, Outlet, Routes, Route } from "react-router-dom";
import { MailboxProvider } from "./MailboxContext";
import ControlPanel from "./ControlPanel";
import Messages from "./Messages";
import NewMessage from "./NewMessage";
import MessagesSent from "./MessagesSent";
import DeletedMessages from "./DeletedMessages";
import "./MailboxLayout.scss";

const MailboxLayout = () => (
  <MailboxProvider>
    <div className="mailbox-layout content">
      <h3>Messagerie</h3>
      <main className="mailbox">
        <aside className="mailbox-sidebar">
          <ul>
            <li><Link to="">📥 Reçus</Link></li>
            <li><Link to="sent">📤 Envoyés</Link></li>
            <li><Link to="new">✉️ Nouveau</Link></li>
            <li><Link to="deleted">🗑️ Supprimés</Link></li>
          </ul>
        </aside>
        <div className="mailbox-content">
          <ControlPanel />
          <Outlet />
          <Routes>
            <Route index element={<Messages />} />
            <Route path="sent" element={<MessagesSent />} />
            <Route path="new" element={<NewMessage />} />
            <Route path="deleted" element={<DeletedMessages />} />
          </Routes>
        </div>
      </main>
    </div>
  </MailboxProvider>
);

export default MailboxLayout;
