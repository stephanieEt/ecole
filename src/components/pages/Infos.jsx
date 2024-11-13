import React, { useEffect, useState } from "react";
import axios from "axios";

const Infos = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/infos-pratiques",
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
              {item.info.map((infoItem, index) => (
                <p key={index}>{infoItem.children[0].text}</p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Infos;
