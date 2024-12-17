import { useState } from "react";

function Footer() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <footer className="text-center text-lg-start container-footer">
        <div className="text-center p-3">
          © 2024 École St Joseph d'Aubigné Racan. Tous droits réservés.
          <a className="nav-link" href="#" onClick={toggleModal}>
            Mentions légales
          </a>
        </div>
      </footer>

      {showModal && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Mentions légales</h2>
            <p>
              Les informations fournies sur ce site sont uniquement à titre
              informatif. École St Joseph d'Aubigné Racan se réserve tous les
              droits. Veuillez consulter notre politique de confidentialité pour
              plus de détails.
            </p>
            <button className="close-button" onClick={toggleModal}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;
