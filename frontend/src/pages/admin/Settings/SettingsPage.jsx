import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiSave } from "react-icons/fi";
import { settingApi } from "@api/settingApi";
import Loader from "@components/common/Loader";
import Input from "@components/common/Input";
import Textarea from "@components/common/TextArea";
import Button from "@components/common/Button";
import { extractError } from "@utils/helpers";

const empty = {
  site_name: "",
  email: "",
  phone: "",
  address: "",
  github: "",
  linkedin: "",
  facebook: "",
  twitter: "",
  instagram: "",
  seo_title: "",
  seo_description: "",
  seo_keywords: "",
};

const SettingsPage = () => {
  const [form, setForm] = useState(empty);
  const [logo, setLogo] = useState(null);
  const [currentLogo, setCurrentLogo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    settingApi
      .get()
      .then(({ data }) => {
        const setting = data?.setting || {};
        setForm({ ...empty, ...setting });
        setCurrentLogo(setting.logo || null);
      })
      .catch((err) => toast.error(extractError(err)))
      .finally(() => setLoading(false));
  }, []);

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      if (logo) payload.file = logo;
      await settingApi.update(payload);
      toast.success("Paramètres enregistrés !");
    } catch (err) {
      toast.error(extractError(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader size="lg" text="Chargement des paramètres..." />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1
        className="text-2xl font-bold mb-6"
        style={{ color: "var(--text-primary)" }}
      >
        Paramètres du site
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        {/* Général */}
        <div className="admin-card p-6 space-y-5">
          <h2
            className="text-sm font-semibold uppercase tracking-wide"
            style={{ color: "var(--text-muted)" }}
          >
            Général
          </h2>
          <Input
            label="Nom du site"
            value={form.site_name || ""}
            onChange={set("site_name")}
            required
          />
          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "var(--text-secondary)" }}
            >
              Logo (optionnel)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLogo(e.target.files?.[0] || null)}
              className="input-field"
            />
            {currentLogo && !logo && (
              <p
                className="mt-1.5 text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                Un logo est déjà configuré.
              </p>
            )}
          </div>
        </div>

        {/* Contact */}
        <div className="admin-card p-6 space-y-5">
          <h2
            className="text-sm font-semibold uppercase tracking-wide"
            style={{ color: "var(--text-muted)" }}
          >
            Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email"
              type="email"
              value={form.email || ""}
              onChange={set("email")}
            />
            <Input
              label="Téléphone"
              value={form.phone || ""}
              onChange={set("phone")}
            />
          </div>
          <Input
            label="Adresse"
            value={form.address || ""}
            onChange={set("address")}
          />
        </div>

        {/* Réseaux sociaux */}
        <div className="admin-card p-6 space-y-5">
          <h2
            className="text-sm font-semibold uppercase tracking-wide"
            style={{ color: "var(--text-muted)" }}
          >
            Réseaux sociaux
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="GitHub"
              value={form.github || ""}
              onChange={set("github")}
              placeholder="https://github.com/..."
            />
            <Input
              label="LinkedIn"
              value={form.linkedin || ""}
              onChange={set("linkedin")}
              placeholder="https://linkedin.com/in/..."
            />
            <Input
              label="Facebook"
              value={form.facebook || ""}
              onChange={set("facebook")}
              placeholder="https://facebook.com/..."
            />
            <Input
              label="Twitter / X"
              value={form.twitter || ""}
              onChange={set("twitter")}
              placeholder="https://x.com/..."
            />
            <Input
              label="Instagram"
              value={form.instagram || ""}
              onChange={set("instagram")}
              placeholder="https://instagram.com/..."
            />
          </div>
        </div>

        {/* SEO */}
        <div className="admin-card p-6 space-y-5">
          <h2
            className="text-sm font-semibold uppercase tracking-wide"
            style={{ color: "var(--text-muted)" }}
          >
            SEO
          </h2>
          <Input
            label="Titre SEO"
            value={form.seo_title || ""}
            onChange={set("seo_title")}
          />
          <Textarea
            label="Description SEO"
            value={form.seo_description || ""}
            onChange={set("seo_description")}
            rows={3}
          />
          <Input
            label="Mots-clés"
            value={form.seo_keywords || ""}
            onChange={set("seo_keywords")}
            hint="Séparés par des virgules"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" loading={saving} icon={<FiSave size={16} />}>
            Enregistrer les paramètres
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default SettingsPage;
