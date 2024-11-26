import { useState, useEffect } from "react";

const Contact = () => {
  const [contact, setContact] = useState(null); // État pour les données de contact

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/contacts`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        if (result.data && result.data.length > 0) {
          setContact(result.data[0]); // Utilisez le premier élément du tableau
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []);

  if (!contact) {
    return <p>Chargement des informations de contact...</p>;
  }

  return (
    <div className="contact-container">
      <h1>Contactez-nous</h1>
      <ul>
        <li>
          <strong>Email :</strong>{" "}
          <a href={`mailto:${contact.mail}`}>{contact.mail}</a>
        </li>
        <li>
          <strong>Téléphone :</strong>{" "}
          <a href={`tel:${contact.tel}`}>{contact.tel}</a>
        </li>
      </ul>
    </div>
  );
};

export default Contact;
