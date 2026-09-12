import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiPlus, FiEdit2, FiTrash2, FiAward } from "react-icons/fi";
import { certificationApi } from "@api/certificationApi";
import Loader from "@components/common/Loader";
import ConfirmDialog from "@components/common/ConfirmDialog";
import { extractError, getFileUrl } from "@utils/helpers";
import { formatDate } from "@utils/formatters";

const CertificationList = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    certificationApi
      .getAll()
      .then(({ data }) => setCertifications(data?.certifications || []))
      .catch((err) => toast.error(extractError(err)))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await certificationApi.delete(toDelete.id);
      setCertifications((prev) => prev.filter((x) => x.id !== toDelete.id));
      toast.success("Certification supprimée");
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
        <Loader size="lg" text="Chargement des certifications..." />
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
          Certifications
        </h1>
        <Link to="/admin/certifications/create" className="btn-primary">
          <FiPlus size={16} /> Nouvelle certification
        </Link>
      </div>

      {certifications.length === 0 ? (
        <div className="admin-card p-10 text-center">
          <FiAward
            size={40}
            className="mx-auto mb-4"
            style={{ color: "var(--text-muted)" }}
          />
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Aucune certification pour le moment. Créez-en une !
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="admin-card p-4"
            >
              {cert.image && (
                <img
                  src={getFileUrl(cert.image)}
                  alt={cert.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
              )}
              <h3
                className="font-semibold text-sm mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                {cert.title}
              </h3>
              <p
                className="text-xs mb-3"
                style={{ color: "var(--text-muted)" }}
              >
                {cert.organization} · {formatDate(cert.issue_date) || "—"}
              </p>
              <div className="flex items-center justify-between">
                {cert.pdf ? (
                  <a
                    href={getFileUrl(cert.pdf)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs underline"
                    style={{ color: "var(--color-primary-light)" }}
                  >
                    Voir le PDF
                  </a>
                ) : (
                  <span />
                )}
                <div className="flex gap-1">
                  <Link
                    to={`/admin/certifications/edit/${cert.id}`}
                    className="p-2 rounded-lg hover:bg-white/10"
                    style={{ color: "var(--color-primary-light)" }}
                  >
                    <FiEdit2 size={15} />
                  </Link>
                  <button
                    onClick={() => setToDelete(cert)}
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
        message={`Supprimer la certification « ${toDelete?.title} » ?`}
        onCancel={() => setToDelete(null)}
        onConfirm={handleDelete}
      />
    </motion.div>
  );
};

export default CertificationList;
