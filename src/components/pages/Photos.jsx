import { useEffect, useState } from "react";

const Photos = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Remplace cette URL par celle de ton API réelle
    const apiUrl = `${
      import.meta.env.VITE_BASE_URL
    }/api/photos?fields[0]=titre&populate[photos][fields][0]=name&populate[photos][fields][1]=url`;

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`, // Ajout du token dans les en-têtes
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            "Une erreur est survenue lors du chargement des données"
          );
        }

        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div>
      {data.map((album) => (
        <div key={album.id} style={{ marginBottom: "20px" }}>
          <h2>{album.titre}</h2>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {album.photos.map((photo) => (
              <div key={photo.id} style={{ textAlign: "center" }}>
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${photo.url}`}
                  alt={photo.name}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                {/*
                <p style={{ fontSize: "14px", marginTop: "5px" }}>
                  {photo.name.split(".").slice(0, -1).join(".")}
                </p>
*/}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Photos;
