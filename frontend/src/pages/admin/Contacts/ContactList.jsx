import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiMail, FiTrash2, FiCheck, FiInbox } from "react-icons/fi";
import { contactApi } from "@api/contactApi";
import Loader from "@components/common/Loader";
import ConfirmDialog from "@components/common/ConfirmDialog";
import { truncate, extractError } from "@utils/helpers";
import { formatDate } from "@utils/formatters";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    contactApi
      .getAll()
      .then(({ data }) => setContacts(data?.contacts || []))
      .catch((err) => toast.error(extractError(err)))
      .finally(() => setLoading(false));
  }, []);

  const handleMarkRead = async (contact) => {
    try {
      await contactApi.markAsRead(contact.id);
      setContacts((prev) =>
        prev.map((c) => (c.id === contact.id ? { ...c, is_read: true } : c)),
      );
      toast.success("Marqué comme lu");
    } catch (err) {
      toast.error(extractError(err));
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await contactApi.delete(toDelete.id);
      setContacts((prev) => prev.filter((x) => x.id !== toDelete.id));
      toast.success("Message supprimé");
      setToDelete(null);
    } catch (err) {
      toast.error(extractError(err));
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader size="lg" text="Chargement des messages..." />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-2xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Messages reçus
        </h1>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          {contacts.filter((c) => !c.is_read).length} non lu(s)
        </span>
      </div>

      {contacts.length === 0 ? (
        <div className="admin-card p-10 text-center">
          <FiInbox
            size={40}
            className="mx-auto mb-4"
            style={{ color: "var(--text-muted)" }}
          />
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Aucun message pour le moment. Les messages du formulaire de contact
            apparaîtront ici.
          </p>
        </div>
      ) : (
        <div
          className="admin-card divide-y"
          style={{ borderColor: "var(--border-color)" }}
        >
          {contacts.map((contact, i) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="py-3 px-4"
              style={{ borderColor: "var(--border-color)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p
                    className="text-sm font-medium flex items-center gap-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <FiMail
                      size={13}
                      style={{
                        color: contact.is_read
                          ? "var(--text-muted)"
                          : "var(--color-primary-light)",
                      }}
                    />
                    {contact.fullname}
                    {!contact.is_read && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400">
                        Nouveau
                      </span>
                    )}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {contact.email} · {formatDate(contact.created_at)}
                  </p>
                  {contact.subject && (
                    <p
                      className="text-xs mt-1 font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {contact.subject}
                    </p>
                  )}
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {truncate(contact.message, 200)}
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {!contact.is_read && (
                    <button
                      onClick={() => handleMarkRead(contact)}
                      className="p-2 rounded-lg hover:bg-emerald-500/10 text-emerald-400"
                      title="Marquer comme lu"
                    >
                      <FiCheck size={15} />
                    </button>
                  )}
                  <button
                    onClick={() => setToDelete(contact)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-red-400"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!toDelete}
        loading={deleting}
        message={`Supprimer le message de « ${toDelete?.fullname} » ?`}
        onCancel={() => setToDelete(null)}
        onConfirm={handleDelete}
      />
    </motion.div>
  );
};

export default ContactList;
