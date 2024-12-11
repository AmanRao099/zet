import React from 'react';
import './Topservices.css';

// A function to generate filled or empty stars based on the rating
const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= rating ? 'star filled' : 'star'}>★</span>
    );
  }
  return stars;
};

const topServices = [
  {
    id: 1,
    name: 'AC Technician',
    provider: 'John Doe',
    image: '/images/Ac.jpg',
    description: 'Professional AC installation and repair services.',
    reviews: [
      { customer: 'Alice', feedback: 'Great service! My AC is working perfectly now.', rating: 5 },
      { customer: 'Bob', feedback: 'Fast and reliable. Highly recommend.', rating: 4 }
    ]
  },
  {
    id: 2,
    name: 'Electrician',
    provider: 'Mike Smith',
    image: '/images/electrician.jpg',
    description: 'Expert electrical repairs and installations services.',
    reviews: [
      { customer: 'Sarah', feedback: 'Excellent work and very professional.', rating: 5 },
      { customer: 'Liam', feedback: 'Came on time and fixed the issue quickly.', rating: 4 }
    ]
  },
  {
    id: 3,
    name: 'Plumber',
    provider: 'Emma Brown',
    image: '/images/plumber.jpg',
    description: 'Reliable plumbing services for homes and offices.',
    reviews: [
      { customer: 'Sophia', feedback: 'Fast response and affordable pricing.', rating: 5 },
      { customer: 'Daniel', feedback: 'Great service, solved my leaking issue right away.', rating: 4 }
    ]
  },
  {
    id: 4,
    name: 'Carpenter',
    provider: 'David Lee',
    image: '/images/carpenter.jpg',
    description: 'Skilled carpentry work for all your needs.',
    reviews: [
      { customer: 'Olivia', feedback: 'Amazing craftsmanship. Highly recommend.', rating: 5 },
      { customer: 'Ethan', feedback: 'Great attention to detail. Very satisfied with the work.', rating: 4 }
    ]
  }
];

const TopServices = () => {
  return (
    <div className="top-services-container">
      <h2>Trending Services</h2>
      <div className="services-list">
        {topServices.map(service => (
          <div key={service.id} className="service-card">
            <img src={service.image} alt={service.name} className="service-image" />
            <h3>{service.name}</h3>
            <p className="provider">Provided by: {service.provider}</p>
            <p>{service.description}</p>
            <div className="reviews">
              <h4>Customer Reviews:</h4>
              {service.reviews.map((review, index) => (
                <div key={index} className="review">
                  <strong>{review.customer}:</strong> {review.feedback}
                  <div className="stars">{renderStars(review.rating)}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopServices;
