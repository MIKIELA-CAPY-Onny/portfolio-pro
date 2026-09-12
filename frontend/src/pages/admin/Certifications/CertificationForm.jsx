import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { certificationApi } from "@api/certificationApi";
import Loader from "@components/common/Loader";
import Input from "@components/common/Input";
import Button from "@components/common/Button";
import { extractError } from "@utils/helpers";

const empty = {
  title: "",
  organization: "",
  issue_date: "",
};

const CertificationForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    certificationApi
      .getById(id)
      .then(({ data }) => setForm({ ...empty, ...(data?.certification || {}) }))
      .catch((err) => toast.error(extractError(err)))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title || "");
      formData.append("organization", form.organization || "");
      formData.append("issue_date", form.issue_date || "");
      if (image) formData.append("image", image);
      if (pdf) formData.append("pdf", pdf);

      if (isEdit) await certificationApi.update(id, formData);
      else await certificationApi.create(formData);
      toast.success(
        isEdit ? "Certification mise à jour !" : "Certification créée !",
      );
      navigate("/admin/certifications");
    } catch (err) {
      toast.error(extractError(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader size="lg" text="Chargement..." />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-6">
        <Link
          to="/admin/certifications"
          className="text-xs"
          style={{ color: "var(--text-muted)" }}
        >
          &larr; Retour aux certifications
        </Link>
        <h1
          className="text-2xl font-bold mt-2"
          style={{ color: "var(--text-primary)" }}
        >
          {isEdit ? "Modifier la certification" : "Nouvelle certification"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="admin-card p-6 space-y-5 max-w-xl"
      >
        <Input
          label="Titre"
          value={form.title}
          onChange={set("title")}
          required
        />
        <Input
          label="Organisation"
          value={form.organization || ""}
          onChange={set("organization")}
        />
        <Input
          label="Date d'obtention"
          type="date"
          value={form.issue_date || ""}
          onChange={set("issue_date")}
        />

        <div>
          <label
            className="block text-sm font-medium mb-1.5"
            style={{ color: "var(--text-secondary)" }}
          >
            Image (optionnel)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="input-field"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-1.5"
            style={{ color: "var(--text-secondary)" }}
          >
            PDF (optionnel)
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdf(e.target.files?.[0] || null)}
            className="input-field"
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/certifications")}
          >
            Annuler
          </Button>
          <Button type="submit" loading={saving}>
            {isEdit ? "Mettre à jour" : "Créer"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default CertificationForm;
