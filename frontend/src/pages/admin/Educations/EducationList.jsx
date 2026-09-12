import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiPlus, FiEdit2, FiTrash2, FiBook } from "react-icons/fi";
import { educationApi } from "@api/educationApi";
import Loader from "@components/common/Loader";
import ConfirmDialog from "@components/common/ConfirmDialog";
import { truncate, extractError } from "@utils/helpers";

const EducationList = () => {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    educationApi
      .getAll()
      .then(({ data }) => setEducations(data?.educations || []))
      .catch((err) => toast.error(extractError(err)))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await educationApi.delete(toDelete.id);
      setEducations((prev) => prev.filter((x) => x.id !== toDelete.id));
      toast.success("Formation supprimée");
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
        <Loader size="lg" text="Chargement des formations..." />
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
          Formations
        </h1>
        <Link to="/admin/educations/create" className="btn-primary">
          <FiPlus size={16} /> Nouvelle formation
        </Link>
      </div>

      {educations.length === 0 ? (
        <div className="admin-card p-10 text-center">
          <FiBook
            size={40}
            className="mx-auto mb-4"
            style={{ color: "var(--text-muted)" }}
          />
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Aucune formation pour le moment. Créez-en une !
          </p>
        </div>
      ) : (
        <div
          className="admin-card divide-y"
          style={{ borderColor: "var(--border-color)" }}
        >
          {educations.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center justify-between gap-4 py-3 px-4"
              style={{ borderColor: "var(--border-color)" }}
            >
              <div className="min-w-0">
                <p
                  className="text-sm font-medium truncate"
                  style={{ color: "var(--text-primary)" }}
                >
                  {edu.diploma}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {edu.school} · {edu.start_year} – {edu.end_year || "en cours"}
                </p>
                {edu.description && (
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {truncate(edu.description, 120)}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Link
                  to={`/admin/educations/edit/${edu.id}`}
                  className="p-2 rounded-lg hover:bg-white/10"
                  style={{ color: "var(--color-primary-light)" }}
                >
                  <FiEdit2 size={15} />
                </Link>
                <button
                  onClick={() => setToDelete(edu)}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-red-400"
                >
                  <FiTrash2 size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!toDelete}
        loading={deleting}
        message={`Supprimer la formation « ${toDelete?.diploma} » ?`}
        onCancel={() => setToDelete(null)}
        onConfirm={handleDelete}
      />
    </motion.div>
  );
};

export default EducationList;
