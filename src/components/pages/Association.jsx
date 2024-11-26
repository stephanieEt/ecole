import { useState, useEffect } from "react";

const Association = () => {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null); // ID de l'élément sélectionné

  // Récupération des données depuis l'API avec le token
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/associations`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`, // En-tête d'autorisation
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        setData(result.data); // Récupération des données dans "data"
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  return (
    <div className="association-container">
      <h1>Associations</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {/* Rendu du titre comme élément cliquable */}
            <button
              onClick={() => setSelectedId(item.id)}
              style={{
                background: "none",
                border: "none",
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
                fontSize: "30px",
              }}
            >
              {item.titre}
            </button>
            {/* Affichage du texte si l'élément est sélectionné */}
            {selectedId === item.id && (
              <p>
                {item.texte.map((textBlock, index) =>
                  textBlock.children.map((child, childIndex) => (
                    <span key={`${index}-${childIndex}`}>{child.text}</span>
                  ))
                )}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Association;
