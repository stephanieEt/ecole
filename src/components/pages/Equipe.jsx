import { useEffect, useState } from "react";
import axios from "axios";

const Equipe = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1337/api/equipe-educatives",
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
    <div className="equipe">
      <h1>L'équipe Éducative</h1>
      {loading && <p>Chargement...</p>}
      {error && <p>Erreur: {error.message}</p>}
      {data && data.length > 0 && (
        <div>
          {data.map((item) => (
            <div key={item.id}>
              <div className="equipe-details">
                {item.Equipe.split("\n").map((line, index) => (
                  <p key={index} className="text large-text custom-spacing">
                    {line.trim() || <br />}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Equipe;
