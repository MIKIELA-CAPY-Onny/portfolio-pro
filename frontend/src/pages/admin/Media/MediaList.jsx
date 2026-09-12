import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiUpload, FiTrash2, FiImage, FiFileText } from "react-icons/fi";
import { mediaApi } from "@api/mediaApi";
import Loader from "@components/common/Loader";
import ConfirmDialog from "@components/common/ConfirmDialog";
import { extractError, getFileUrl, formatFileSize } from "@utils/helpers";
import { formatDate } from "@utils/formatters";

const MediaList = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = () => {
    mediaApi
      .getAll()
      .then(({ data }) => setMedia(data?.media || []))
      .catch((err) => toast.error(extractError(err)))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await mediaApi.upload(file);
      toast.success("Fichier téléversé !");
      load();
    } catch (err) {
      toast.error(extractError(err));
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await mediaApi.delete(toDelete.id);
      setMedia((prev) => prev.filter((x) => x.id !== toDelete.id));
      toast.success("Média supprimé");
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
        <Loader size="lg" text="Chargement des médias..." />
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
          Médiathèque
        </h1>
        <label className="btn-primary cursor-pointer">
          <FiUpload size={16} />{" "}
          {uploading ? "Téléversement..." : "Téléverser un fichier"}
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {media.length === 0 ? (
        <div className="admin-card p-10 text-center">
          <FiImage
            size={40}
            className="mx-auto mb-4"
            style={{ color: "var(--text-muted)" }}
          />
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Aucun média pour le moment. Téléversez une image ou un PDF !
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {media.map((item, i) => {
            const isPdf = item.mime_type === "application/pdf";
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="admin-card p-3"
              >
                <div
                  className="w-full h-28 rounded-lg mb-2 overflow-hidden flex items-center justify-center"
                  style={{ backgroundColor: "var(--bg-primary)" }}
                >
                  {isPdf ? (
                    <FiFileText
                      size={32}
                      style={{ color: "var(--text-muted)" }}
                    />
                  ) : (
                    <img
                      src={getFileUrl(item.path)}
                      alt={item.original_name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <p
                  className="text-xs font-medium truncate"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.original_name}
                </p>
                <p
                  className="text-[10px] mb-2"
                  style={{ color: "var(--text-muted)" }}
                >
                  {formatFileSize(Number(item.size))} ·{" "}
                  {formatDate(item.uploaded_at)}
                </p>
                <div className="flex items-center justify-between">
                  <a
                    href={getFileUrl(item.path)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs underline"
                    style={{ color: "var(--color-primary-light)" }}
                  >
                    Ouvrir
                  </a>
                  <button
                    onClick={() => setToDelete(item)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-red-400"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!toDelete}
        loading={deleting}
        message={`Supprimer le média « ${toDelete?.original_name} » ?`}
        onCancel={() => setToDelete(null)}
        onConfirm={handleDelete}
      />
    </motion.div>
  );
};

export default MediaList;
