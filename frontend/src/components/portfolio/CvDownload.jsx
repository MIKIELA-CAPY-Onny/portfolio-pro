import { useCallback } from "react";
import { FiDownload, FiEye } from "react-icons/fi";
import toast from "react-hot-toast";
import { getFileUrl, extractError } from "@utils/helpers";
import Button from "@components/common/Button";

/**
 * Renvoie le nom de fichier d'après le chemin stocké (ex: /uploads/documents/xxx.pdf)
 */
const getFileName = (path, defaultName = "CV") => {
  const clean =
    String(path || "")
      .split("/")
      .pop() || defaultName;
  return clean.includes(".") ? clean : `${defaultName}.pdf`;
};

/**
 * Bloc CV public :
 * - "Voir" ouvre le fichier (PDF ou image) dans un nouvel onglet
 * - "Télécharger" force le téléchargement (PDF ou image)
 */
const CvDownload = ({ cv, label = "Mon CV", className = "" }) => {
  const url = getFileUrl(cv);

  const handleDownload = useCallback(async () => {
    if (!url) return;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Fichier introuvable");
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = getFileName(cv, label);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      // Repli : ouvrir dans un nouvel onglet si le téléchargement échoue
      toast.error(extractError(error));
      window.open(url, "_blank", "noopener");
    }
  }, [url, cv, label]);

  if (!url) return null;

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-85"
        style={{
          border: "1px solid var(--border-color)",
          color: "var(--text-secondary)",
          backgroundColor: "var(--bg-tertiary)",
        }}
      >
        <FiEye size={16} />
        Voir le CV
      </a>
      <Button onClick={handleDownload} icon={<FiDownload size={16} />}>
        Télécharger le CV
      </Button>
    </div>
  );
};

export default CvDownload;
