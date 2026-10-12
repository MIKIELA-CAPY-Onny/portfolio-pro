import { useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

/**
 * Lien de retour unifié pour toutes les pages d'administration.
 *
 * Comportement :
 * - Si l'utilisateur a navigué depuis l'application (historique interne
 *   disponible), on revient à la page précédente (`navigate(-1)`), ce qui
 *   préserve l'état de la page d'origine (scroll, filtres, pagination…).
 * - Sinon (arrivée directe via URL, refresh, nouvel onglet), on retombe
 *   sur la page de liste fournie en `fallback`.
 *
 * props:
 *  - fallback : route de secours (obligatoire), ex. "/admin/certifications"
 *  - label    : libellé du lien (défaut : "Retour")
 */
const BackLink = ({ fallback, label = "Retour", className = "text-xs" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      // location.key !== "default" signifie que l'entrée vient d'une
      // navigation interne (React Router), donc qu'un "précédent" existe.
      if (window.history.length > 1 && location.key !== "default") {
        navigate(-1);
      } else {
        navigate(fallback, { replace: true });
      }
    },
    [navigate, location.key, fallback],
  );

  return (
    <Link
      to={fallback}
      onClick={handleClick}
      className={`${className} inline-flex items-center gap-1.5 transition-opacity hover:opacity-70`}
      style={{ color: "var(--text-muted)" }}
    >
      <span aria-hidden="true">&larr;</span>
      <span>{label}</span>
    </Link>
  );
};

export default BackLink;
