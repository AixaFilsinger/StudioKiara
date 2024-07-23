import React from 'react';
import uñas from '../../assets/uñass.jpg';



const Card = ({ imageUrl, title, description }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="card">
      <img src={imageUrl} className="card-img-top" alt="..." onClick={openModal} />
      <div className="card-title">
        <h5>{title}</h5>
      </div>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>{description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const Servicios = () => {
  const cards = [
    { id: 1, imageUrl: {uñas}, title: 'Card 1', description: 'Description for Card 1' },
    { id: 2, imageUrl: {uñas}, title: 'Card 2', description: 'Description for Card 2' },
    { id: 3, imageUrl: {uñas}, title: 'Card 3', description: 'Description for Card 3' },
    { id: 4, imageUrl: {uñas}, title: 'Card 4', description: 'Description for Card 4' },
  ];

  return (
    <div className="cards-container">
      {cards.map(card => (
        <Card key={card.id} imageUrl={card.imageUrl} title={card.title} description={card.description} />
      ))}
    </div>
  );
};

export default Servicios;