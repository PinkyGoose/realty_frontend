import React, { useState, useEffect } from 'react';

// function RentalList() {
//   const [rentals, setRentals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     // Загрузка данных с сервера
// //     fetch('http://localhost:8000/rentals')
// //       .then((response) => {
// //         if (!response.ok) {
// //           throw new Error('Failed to fetch data');
// //         }
// //         return response.json();
// //       })
// //       .then((data) => {
// //         setRentals(data);
// //         setLoading(false);
// //       })
// //       .catch((error) => {
// //         setError(error.message);
// //         setLoading(false);
// //       });
// //   }, []);
//   useEffect(() => {
//     const mockData = [
//       {
//         id: 1,
//         title: 'Cozy Apartment near Downtown',
//         description: 'A beautiful 2-bedroom apartment located near the metro.',
//         photoUrl: 'https://via.placeholder.com/300',
//         distanceToMetro: '5 minutes walk',
//       },
//       {
//         id: 2,
//         title: 'Modern Studio Apartment',
//         description: 'A modern studio apartment with all amenities included.',
//         photoUrl: 'https://via.placeholder.com/300',
//         distanceToMetro: '10 minutes drive',
//       },
//     ];
  
//     setTimeout(() => {
//       setRentals(mockData);
//       setLoading(false);
//     }, 1000);
//   }, []);
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       <h1>Available Rentals</h1>
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
//         {rentals.map((rental) => (
//           <div
//             key={rental.id}
//             style={{
//               border: '1px solid #ccc',
//               borderRadius: '8px',
//               padding: '16px',
//               width: '300px',
//             }}
//           >
//             <img
//               src={rental.photoUrl}
//               alt={rental.title}
//               style={{ width: '100%', borderRadius: '8px' }}
//             />
//             <h2>{rental.title}</h2>
//             <p>{rental.description}</p>
//             <p><strong>Distance to Metro:</strong> {rental.distanceToMetro}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default RentalList;
export default function RentalList() {
    const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    // useEffect(() => {
    //   const mockData = [
    //     {
    //       id: 1,
    //       title: 'Cozy Apartment near Downtown',
    //       description: 'A beautiful 2-bedroom apartment located near the metro.',
    //       photoUrl: 'https://via.placeholder.com/300',
    //       distanceToMetro: '5 minutes walk',
    //     },
    //     {
    //       id: 2,
    //       title: 'Modern Studio Apartment',
    //       description: 'A modern studio apartment with all amenities included.',
    //       photoUrl: 'https://via.placeholder.com/300',
    //       distanceToMetro: '10 minutes drive',
    //     },
    //   ];
    //   setRentals(mockData);
    // }, []);
    useEffect(() => {
    // Загрузка данных с сервера
    fetch('http://192.168.0.250:4000/realtor_objects')
      .then((response) => {
        if (!response.ok) {
          alert(response.error());
          throw new Error('Failed to fetch data: ' + response.error());
        }
        return response.json();
      })
      .then((data) => {
        setRentals(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
      <div className="rental-list">
        {rentals.map((rental) => (
          <RentalCard key={rental.id} rental={rental} />
        ))}
      </div>
    );
  }
  
const RentalCard = ({ rental }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Автоматическое переключение миниатюр каждые 7 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % rental.thumbnails.length);
    }, 7000);

    return () => clearInterval(interval); // Очистка таймера при размонтировании
  }, [rental.thumbnails.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % rental.thumbnails.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + rental.thumbnails.length) % rental.thumbnails.length
    );
  };

  const currentThumbnail =
    rental.thumbnails.length > 0
      ? `data:image/png;base64,${rental.thumbnails[currentIndex]}`
      : null;

  return (
    <div className="rental-card">
      <div className="thumbnail-container">
        {currentThumbnail ? (
          <img src={currentThumbnail} alt={`${rental.name} thumbnail`} />
        ) : (
          <div className="placeholder">No Image Available</div>
        )}
        <button className="arrow left" onClick={handlePrevious}>
          ◀
        </button>
        <button className="arrow right" onClick={handleNext}>
          ▶
        </button>
      </div>
      <h2>{rental.name}</h2>
      <p>{rental.phone}</p>
      <p>
        <strong>Distance to Metro:</strong> {rental.metroDistance}
      </p>
    </div>
  );
};