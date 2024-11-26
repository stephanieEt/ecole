import { useEffect, useState } from "react";
import axios from "axios";

const Infos = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSections, setOpenSections] = useState({}); // Gérer l'ouverture des sections

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/infos-pratiques?fields[0]=titre&fields[1]=texte&populate[document][fields][0]=name&populate[document][fields][1]=url`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
            },
          }
        );
        setData(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Gestion de l'ouverture/fermeture des sections
  const toggleSection = (id) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Alterne entre ouvert et fermé
    }));
  };

  return (
    <div className="infos-page">
      <h1>Informations Pratiques</h1>

      {loading && <p className="loading">Chargement des informations...</p>}
      {error && <p className="error">Erreur : {error.message}</p>}

      {/* Affichage des informations pratiques */}
      {data && data.length > 0 && (
        <div className="infos-content">
          {data.map((item) => (
            <div key={item.id} className="info-item">
              <div
                className="info-header"
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => toggleSection(item.id)} // Gestion du clic
              >
                <h3 style={{ margin: "0" }}>{item.titre}</h3>
                <span
                  style={{
                    marginLeft: "auto",
                    transform: openSections[item.id]
                      ? "rotate(90deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.3s",
                  }}
                >
                  ▶
                </span>
              </div>

              {/* Affichage conditionnel du texte */}
              {openSections[item.id] && (
                <div className="info-content" style={{ marginTop: "10px" }}>
                  {item.texte &&
                    item.texte.map((texteItem, index) => (
                      <p key={index}>{texteItem.children[0].text}</p>
                    ))}

                  {/* Lien vers un document si disponible */}
                  {item.document && (
                    <a
                      href={`${import.meta.env.VITE_BASE_URL}${
                        item.document.url
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      Voir le document
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Infos;
