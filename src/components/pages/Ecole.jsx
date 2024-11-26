import { useEffect, useState } from "react";
import axios from "axios";

const Ecole = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/ecoles`,
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
    <div className="ecole">
      <h1>L'école</h1>
      {loading && <p>Chargement...</p>}
      {error && <p>Erreur: {error.message}</p>}
      {data && data.length > 0 && (
        <div>
          {data.map((item) => (
            <div key={item.id}>
              {item.info.map((infoItem, index) => (
                <p key={index} className="text large-text custom-spacing">
                  {infoItem.children[0].text}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ecole;
