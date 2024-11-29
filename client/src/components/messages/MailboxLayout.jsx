//MailboxLayout.jsx
import { Link, Outlet, Routes, Route } from 'react-router-dom';
import { MailboxProvider } from "../../context/MailboxContext";
import ControlPanel from './ControlPanel';
import Messages from './Messages';
import NewMessage from './NewMessage';
import MessagesSent from './MessagesSent';
import DeletedMessages from './DeletedMessages';
import './MailboxLayout.scss';
const MailboxLayout = ({
    loading,
    handleRefresh,
    handleDeleteSelected,
    handleMarkAsRead,
    handleMarkAsReplied,
    searchTerm,
    setSearchTerm,
  }) => (
  <div className="mailbox-layout content">
    <h3>Messagerie</h3>
    <main className="mailbox">
      <aside className="mailbox-sidebar">
        <ul>
          <li><Link to="">📥 Reçus</Link></li> {/* Chemin relatif pour la route index */}
          <li><Link to="sent">📤 Envoyés</Link></li>
          <li><Link to="new">✉️ Nouveau</Link></li>
          <li><Link to="deleted">🗑️ Supprimés</Link></li>
        </ul>
      </aside>
      <div className="mailbox-content">
      <ControlPanel
        loading={loading}
        handleRefresh={handleRefresh}
        handleDeleteSelected={handleDeleteSelected}
        handleMarkAsRead={handleMarkAsRead}
        handleMarkAsReplied={handleMarkAsReplied}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
        <Outlet /> {/* Affiche le contenu des routes enfants ici */}
        <MailboxProvider>
        <Routes>
          <Route index element={<Messages />} /> {/* Par défaut */}
          <Route path="sent" element={<MessagesSent />} />
          <Route path="new" element={<NewMessage />} />
          <Route path="deleted" element={<DeletedMessages />} />
        </Routes>
        </MailboxProvider>
      </div>
    </main>
  </div>
);

export default MailboxLayout;