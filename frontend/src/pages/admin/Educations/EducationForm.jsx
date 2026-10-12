import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { educationApi } from "@api/educationApi";
import Loader from "@components/common/Loader";
import Input from "@components/common/Input";
import Textarea from "@components/common/TextArea";
import Button from "@components/common/Button";
import { extractError } from "@utils/helpers";
import BackLink from "@components/admin/BackLink";

const empty = {
  school: "",
  diploma: "",
  description: "",
  start_year: "",
  end_year: "",
};

const EducationForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    educationApi
      .getById(id)
      .then(({ data }) => setForm({ ...empty, ...(data?.education || {}) }))
      .catch((err) => toast.error(extractError(err)))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        start_year: form.start_year ? Number(form.start_year) : null,
        end_year: form.end_year ? Number(form.end_year) : null,
      };
      if (isEdit) await educationApi.update(id, payload);
      else await educationApi.create(payload);
      toast.success(isEdit ? "Formation mise à jour !" : "Formation créée !");
      navigate("/admin/educations");
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
        <BackLink
          fallback="/admin/educations"
          label="Retour aux formations"
        />
        <h1
          className="text-2xl font-bold mt-2"
          style={{ color: "var(--text-primary)" }}
        >
          {isEdit ? "Modifier la formation" : "Nouvelle formation"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="admin-card p-6 space-y-5 max-w-xl"
      >
        <Input
          label="École / Établissement"
          value={form.school}
          onChange={set("school")}
          required
        />
        <Input
          label="Diplôme"
          value={form.diploma}
          onChange={set("diploma")}
          required
        />
        <Textarea
          label="Description"
          value={form.description || ""}
          onChange={set("description")}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Année de début"
            type="number"
            min="1990"
            max="2100"
            value={form.start_year || ""}
            onChange={set("start_year")}
            required
          />
          <Input
            label="Année de fin"
            type="number"
            min="1990"
            max="2100"
            value={form.end_year || ""}
            onChange={set("end_year")}
            hint="Laisser vide si en cours"
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/educations")}
            type="button"
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

export default EducationForm;
