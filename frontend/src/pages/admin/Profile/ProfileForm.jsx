﻿import {
  useEffect,
  useState
} from 'react';
import {
  motion
} from 'framer-motion';
import toast from 'react-hot-toast';
import {
  profileApi
} from '@api/profileApi';
import Loader from '@components/common/Loader';
import Input from '@components/common/Input';
import Textarea from '@components/common/TextArea';
import Button from '@components/common/Button';
import FileField from '@components/admin/FileField';
import {
  extractError
} from '@utils/helpers';

const ProfileForm = () => {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    profileApi.get()
      .then(({
        data
      }) => setForm(data?.profile || data?.data || {}))
      .catch((err) => toast.error(extractError(err)))
      .finally(() => setLoading(false));
  }, []);

  const set = (key) => (e) => setForm((p) => ({
    ...p,
    [key]: e.target.value
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await profileApi.update(form);
      toast.success('Profil mis Ã  jour !');
    } catch (err) {
      toast.error(extractError(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className = "flex justify-center py-20" > < Loader size = "lg"
    text = "Chargement du profil..." / > < /div>;
  }
  if (!form) return null;

  return ( <
    motion.div initial = {
      {
        opacity: 0,
        y: 20
      }
    }
    animate = {
      {
        opacity: 1,
        y: 0
      }
    } >
    <
    h1 className = "text-2xl font-bold mb-6"
    style = {
      {
        color: 'var(--text-primary)'
      }
    } > Profil < /h1>

    <
    form onSubmit = {
      handleSubmit
    }
    className = "admin-card p-6 space-y-5 max-w-2xl" >
    <
    Input label = "Nom complet"
    value = {
      form.fullname || ''
    }
    onChange = {
      set('fullname')
    }
    required / >
    <
    Input label = "Titre / Poste"
    value = {
      form.profession || ''
    }
    onChange = {
      set('profession')
    }
    /> <
    Textarea label = "Bio"
    rows = {
      5
    }
    value = {
      form.biography || ''
    }
    onChange = {
      set('biography')
    }
    /> <
    div className = "grid grid-cols-1 sm:grid-cols-2 gap-5" >
    <
    Input label = "Email"
    type = "email"
    value = {
      form.email || ''
    }
    onChange = {
      set('email')
    }
    /> <
    Input label = "TÃ©lÃ©phone"
    value = {
      form.phone || ''
    }
    onChange = {
      set('phone')
    }
    /> <
    /div> <
    Input label = "Localisation"
    value = {
      form.city || ''
    }
    onChange = {
      set('city')
    }
    /> <
    FileField label = "CV (PDF)"
    accept = "application/pdf"
    value = {
      form.cv || null
    }
    onChange = {
      (path) => setForm((p) => ({
        ...p,
        cv: path
      }))
    }
    /> <
    div className = "flex justify-end" >
    <
    Button type = "submit"
    loading = {
      saving
    } > Enregistrer < /Button> <
    /div> <
    /form> <
    /motion.div>
  );
};

export default ProfileForm;