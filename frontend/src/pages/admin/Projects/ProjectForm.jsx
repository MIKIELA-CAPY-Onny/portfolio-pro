﻿import {
  useEffect,
  useState
} from 'react';
import {
  useNavigate,
  useParams,
  Link
} from 'react-router-dom';
import {
  motion
} from 'framer-motion';
import toast from 'react-hot-toast';
import {
  projectApi
} from '@api/projectApi';
import Input from '@components/common/Input';
import Textarea from '@components/common/TextArea';
import Button from '@components/common/Button';
import FileField from '@components/admin/FileField';
import {
  extractError
} from '@utils/helpers';

const empty = {
  title: '',
  slug: '',
  short_description: '',
  description: '',
  cover_image: null,
  demo_url: '',
  github_url: ''
};

const ProjectForm = () => {
  const {
    id
  } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    projectApi.getById(id)
      .then(({
        data
      }) => setForm({
        ...empty,
        ...(data?.project || data?.data || data)
      }))
      .catch((err) => toast.error(extractError(err)))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const set = (key) => (e) => setForm((p) => ({
    ...p,
    [key]: e.target.value
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) await projectApi.update(id, form);
      else await projectApi.create(form);
      toast.success(isEdit ? 'Projet mis Ã  jour !' : 'Projet crÃ©Ã© !');
      navigate('/admin/projects');
    } catch (err) {
      toast.error(extractError(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return null;

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
    div className = "mb-6" >
    <
    Link to = "/admin/projects"
    className = "text-xs"
    style = {
      {
        color: 'var(--text-muted)'
      }
    } >
    &
    larr; Retour aux projets <
    /Link> <
    h1 className = "text-2xl font-bold mt-2"
    style = {
      {
        color: 'var(--text-primary)'
      }
    } > {
      isEdit ? 'Modifier le projet' : 'Nouveau projet'
    } <
    /h1> <
    /div>

    <
    form onSubmit = {
      handleSubmit
    }
    className = "admin-card p-6 space-y-5 max-w-2xl" >
    <
    Input label = "Titre"
    value = {
      form.title
    }
    onChange = {
      set('title')
    }
    required / >
    <
    Input label = "Slug"
    value = {
      form.slug
    }
    onChange = {
      set('slug')
    }
    hint = "Laissez vide pour gÃ©nÃ©rer automatiquement" / >
    <
    Textarea label = "Description courte"
    value = {
      form.short_description || ''
    }
    onChange = {
      set('short_description')
    }
    /> <
    Textarea label = "Description"
    value = {
      form.description || ''
    }
    onChange = {
      set('description')
    }
    /> <
    FileField label = "Image de couverture"
    value = {
      form.cover_image || null
    }
    onChange = {
      (path) => setForm((p) => ({
        ...p,
        cover_image: path
      }))
    }
    /> <
    div className = "grid grid-cols-1 sm:grid-cols-2 gap-5" >
    <
    Input label = "Lien dÃ©mo"
    type = "url"
    value = {
      form.demo_url || ''
    }
    onChange = {
      set('demo_url')
    }
    /> <
    Input label = "Lien GitHub"
    type = "url"
    value = {
      form.github_url || ''
    }
    onChange = {
      set('github_url')
    }
    /> <
    /div> <
    div className = "flex justify-end gap-3" >
    <
    Button variant = "ghost"
    onClick = {
      () => navigate('/admin/projects')
    } > Annuler < /Button> <
    Button type = "submit"
    loading = {
      saving
    } > {
      isEdit ? 'Mettre Ã  jour' : 'CrÃ©er'
    } < /Button> <
    /div> <
    /form> <
    /motion.div>
  );
};

export default ProjectForm;