import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Photos = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAlbums, setOpenAlbums] = useState({});
  const [selectedPhoto, setSelectedPhoto] = useState(null); // État pour la photo sélectionnée

  useEffect(() => {
    const apiUrl = `${
      import.meta.env.VITE_BASE_URL
    }/api/photos?fields[0]=titre&populate[photos][fields][0]=name&populate[photos][fields][1]=url`;

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
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

  const toggleAlbum = (id) => {
    setOpenAlbums((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openPhoto = (photoUrl) => {
    setSelectedPhoto(photoUrl);
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error) {
    return <div className="error">Erreur : {error}</div>;
  }

  return (
    <div className="photos-page">
      <h1 className="page-title">Galerie Photos</h1>
      <div className="albums">
        {data.map((album) => (
          <div key={album.id} className="album">
            <div className="album-header" onClick={() => toggleAlbum(album.id)}>
              <h3>{album.titre}</h3>
              <span className="chevron-icon">
                {openAlbums[album.id] ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>

            {openAlbums[album.id] && (
              <div className="album-content">
                {album.photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="photo-item"
                    onClick={() =>
                      openPhoto(`${import.meta.env.VITE_BASE_URL}${photo.url}`)
                    }
                  >
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}${photo.url}`}
                      alt={photo.name}
                      className="photo-img"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modale pour afficher une photo en grand */}
      {selectedPhoto && (
        <div className="photo-modal" onClick={closePhoto}>
          <div
            className="photo-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedPhoto} alt="Aperçu" />
            <button className="close-button" onClick={closePhoto}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photos;
