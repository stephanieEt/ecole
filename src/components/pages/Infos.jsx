import { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronDown, FaChevronUp, FaDownload } from "react-icons/fa"; // Ajouter les icônes modernes

const Infos = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSections, setOpenSections] = useState({});

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

  const toggleSection = (id) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="infos-page">
      <h1>Informations Pratiques</h1>

      {loading && <p className="loading">Chargement des informations...</p>}
      {error && <p className="error">Erreur : {error.message}</p>}

      {data && data.length > 0 && (
        <div className="infos-content">
          {data.map((item) => (
            <div key={item.id} className="info-item">
              <div
                className="info-header"
                onClick={() => toggleSection(item.id)}
              >
                <h3>{item.titre}</h3>
                <span className="icon">
                  {openSections[item.id] ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>

              {openSections[item.id] && (
                <div className="info-content">
                  {item.texte &&
                    item.texte.map((texteItem, index) => (
                      <p key={index}>{texteItem.children[0].text}</p>
                    ))}

                  {item.document && (
                    <a
                      href={`${import.meta.env.VITE_BASE_URL}${
                        item.document.url
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="document-link"
                    >
                      <FaDownload style={{ marginRight: "8px" }} />
                      Télécharger le document
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
