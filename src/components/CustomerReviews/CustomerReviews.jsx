
import "./CustomerReviews.css";

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    type: "Women’s Collection",
    rating: 5,
    text: "Beautiful quality and a timeless design. The pieces look even better in person.",
  },
  {
    id: 2,
    name: "Omar K.",
    type: "Men’s Collection",
    rating: 5,
    text: "Simple, elegant, and easy to style. Exactly what I was looking for.",
  },
  {
    id: 3,
    name: "Nour A.",
    type: "Everyday Essentials",
    rating: 5,
    text: "I love the minimalist style. The collection makes putting an outfit together easy.",
  },
];

function CustomerReviews() {
  return (
    <section className="customer-reviews">
      <div className="reviews-heading">
        <p className="reviews-eyebrow">KIND WORDS</p>

        <h2>
          The Love <span>Behind the Look</span>
        </h2>

        <p className="reviews-description">
          A little note from people who share our love for timeless style.
        </p>
      </div>

      <div className="reviews-grid">
        {reviews.map((review) => (
          <article className="review-card" key={review.id}>
            <div
              className="review-stars"
              aria-label={`${review.rating} out of 5 stars`}
            >
              {"★".repeat(review.rating)}
            </div>

            <span className="review-quote" aria-hidden="true">
              “
            </span>

            <p className="review-text">{review.text}</p>

            <div className="review-divider" />

            <div className="review-customer">
              <div className="review-avatar" aria-hidden="true">
                {review.name.charAt(0)}
              </div>

              <div>
                <h3>{review.name}</h3>
                <p>{review.type}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CustomerReviews;
