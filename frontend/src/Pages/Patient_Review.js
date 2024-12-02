// // UserReviewsPage.js----------------------------Corrected---------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import './Css/Patient_Reviews.css';
// import Header from './Componets/Patientdashboard_Header';
// import Footer from './Componets/Footer';
// import Alert from 'react-bootstrap/Alert';
// import RatingStars from './Componets/RatingStars';
// import axios from 'axios';

// const PatientReviewsPage = () => {
//   const [rating, setRating] = useState(0);
//   const [feedback, setFeedback] = useState('');
//   const [reviews, setReviews] = useState([]);
//   const [alert, setAlert] = useState({ show: false, message: '', type: '' });

//   // Fetch reviews from the backend on component mount
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const { data } = await axios.get('/api/reviews', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`, // Use token from localStorage
//           },
//         });
//         setReviews(data);
//       } catch (error) {
//         console.error('Error fetching reviews:', error.response || error.message); // Debug log
//         setAlert({
//           show: true,
//           message: error.response?.data?.error || 'Failed to fetch reviews',
//           type: 'danger',
//         });
//       }
//     };

//     fetchReviews();

//     fetchReviews();
//   }, []);

//   // Submit a new review
//   const handleSubmitReview = async () => {
//     if (!rating || !feedback) {
//       setAlert({ show: true, message: 'Please provide a rating and feedback.', type: 'danger' });
//       return;
//     }

//     try {
//       const { data } = await axios.post(
//         '/api/reviews',
//         { rating, feedback },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is valid
//           },
//         }
//       );
//       console.log('Review submitted successfully:', data); // Debug log
//       setReviews([...reviews, data.review]);
//       setRating(0);
//       setFeedback('');
//       setAlert({ show: true, message: 'Review submitted successfully!', type: 'success' });
//     } catch (error) {
//       console.error('Error submitting review:', error.response || error.message); // Debug log
//       setAlert({
//         show: true,
//         message: error.response?.data?.error || 'Failed to submit review',
//         type: 'danger',
//       });
//     }

//     setTimeout(() => setAlert({ show: false, message: '', type: '' }), 2000);
//   };

//   return (
//     <>
//       <Header />
//       <div className="container my-5">
//         <h2 className="text-center mb-4">Send Ratings and Reviews</h2>
//         {alert.show && (
//           <Alert
//             variant={alert.type}
//             onClose={() => setAlert({ show: false })}
//             dismissible
//             className="Patient-Review-Alert mb-4"
//           >
//             <strong>{alert.message}</strong>
//           </Alert>
//         )}
//         <div className="review-form shadow p-4 mb-5 bg-light rounded">
//           <h4 className="mb-3">Submit Your Review</h4>
//           <div className="mb-3">
//             <label className="form-label">Rating:</label>
//             <select className="form-select" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
//               <option value="0">Select Rating</option>
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <option key={star} value={star}>
//                   {star} Star{star > 1 ? 's' : ''}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Review:</label>
//             <textarea
//               className="form-control"
//               value={feedback}
//               onChange={(e) => setFeedback(e.target.value)}
//               placeholder="Write your feedback here..."
//               rows="4"
//             ></textarea>
//           </div>
//           <button className="btn btn-primary" onClick={handleSubmitReview}>
//             Submit Review
//           </button>
//         </div>


//         {/* Submitted Reviews */}
//         <div className="reviews-list">
//           <h4 className="mb-3">Submitted Reviews</h4>
//           <ul className="list-group">
//             {reviews.map((review) => (
//               <li key={review._id} className="list-group-item">
//                 <div className="d-flex justify-content-between align-items-start">
//                   <div>
//                     <strong>
//                       Rating:
//                       <RatingStars rating={review.rating} />
//                     </strong>
//                     <p className="mb-0">{review.feedback}</p>
//                     <p className="mb-0">
//                       <strong>Likes:</strong> {review.likes}
//                     </p>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default PatientReviewsPage;



// // UserReviewsPage.js-----------------------------------------
// import React, { useState, useEffect } from 'react';
// import './Css/Patient_Reviews.css';
// import Header from './Componets/Patientdashboard_Header';
// import Footer from './Componets/Footer';
// import Alert from 'react-bootstrap/Alert';
// import RatingStars from './Componets/RatingStars';
// import { FaTrash } from 'react-icons/fa';
// import axios from 'axios';

// const PatientReviewsPage = () => {
//   const [rating, setRating] = useState(0);
//   const [feedback, setFeedback] = useState('');
//   const [reviews, setReviews] = useState([]);
//   const [alert, setAlert] = useState({ show: false, message: '', type: '' });

//   // Fetch reviews from the backend on component mount
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const { data } = await axios.get('/api/reviews', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`, // Use token from localStorage
//           },
//         });
//         // Sort reviews in descending order of creation date
//         const sortedReviews = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//         setReviews(sortedReviews);
//       } catch (error) {
//         console.error('Error fetching reviews:', error.response || error.message);
//         setAlert({
//           show: true,
//           message: error.response?.data?.error || 'Failed to fetch reviews',
//           type: 'danger',
//         });
//       }
//     };

//     fetchReviews();
//   }, []);

//   // Submit a new review
//   const handleSubmitReview = async () => {
//     if (!rating || !feedback) {
//       setAlert({ show: true, message: 'Please provide a rating and feedback.', type: 'danger' });
//       return;
//     }

//     try {
//       const { data } = await axios.post(
//         '/api/reviews',
//         { rating, feedback, createdAt: new Date() }, // Include creation date and time
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is valid
//           },
//         }
//       );
//       console.log('Review submitted successfully:', data);
//       // Add the new review and sort all reviews in descending order
//       const updatedReviews = [...reviews, data.review].sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//       );
//       setReviews(updatedReviews);
//       setRating(0);
//       setFeedback('');
//       setAlert({ show: true, message: 'Review submitted successfully!', type: 'success' });
//     } catch (error) {
//       console.error('Error submitting review:', error.response || error.message);
//       setAlert({
//         show: true,
//         message: error.response?.data?.error || 'Failed to submit review',
//         type: 'danger',
//       });
//     }

//     setTimeout(() => setAlert({ show: false, message: '', type: '' }), 2000);
//   };


//   //new added
//   const handleDeleteReview = async (id) => {
//     try {
//       await axios.delete(`/api/reviews/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setReviews(reviews.filter((review) => review._id !== id));
//       setAlert({ show: true, message: 'Review deleted successfully!', type: 'success' });
//     } catch (error) {
//       console.error('Error deleting review:', error.message);
//       setAlert({ show: true, message: 'Failed to delete review', type: 'danger' });
//     }
//     setTimeout(() => setAlert({ show: false, message: '', type: '' }), 2000);
//   };

//   return (
//     <>
//       <Header />
//       <div className="container my-5">
//         <h2 className="text-center mb-4">Send Ratings and Reviews</h2>
//         {alert.show && (
//           <Alert
//             variant={alert.type}
//             onClose={() => setAlert({ show: false })}
//             dismissible
//             className="Patient-Review-Alert mb-4"
//           >
//             <strong>{alert.message}</strong>
//           </Alert>
//         )}
//         <div className="review-form shadow p-4 mb-5 bg-light rounded">
//           <h4 className="mb-3">Submit Your Review</h4>
//           <div className="mb-3">
//             <label className="form-label">Rating:</label>
//             <select className="form-select" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
//               <option value="0">Select Rating</option>
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <option key={star} value={star}>
//                   {star} Star{star > 1 ? 's' : ''}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Review:</label>
//             <textarea
//               className="form-control"
//               value={feedback}
//               onChange={(e) => setFeedback(e.target.value)}
//               placeholder="Write your feedback here..."
//               rows="4"
//             ></textarea>
//           </div>
//           <button className="btn btn-primary" onClick={handleSubmitReview}>
//             Submit Review
//           </button>
//         </div>

//         {/* Submitted Reviews */}
//         <div className="reviews-list">
//           <h4 className="mb-3">Submitted Reviews</h4>
//           <ul className="list-group">
//             {reviews.map((review) => (
//               <li key={review._id} className="list-group-item d-flex justify-content-between align-items-start">
//                 <div className="d-flex justify-content-between align-items-start">
//                   <div>
//                     <strong>
//                       Rating:
//                       <RatingStars rating={review.rating} />
//                     </strong>
//                     <p className="mb-0">{review.feedback}</p>
//                     <p className="mb-0 text-muted">
//                       <strong>Date:</strong>{' '}
//                       {new Date(review.createdAt).toLocaleString('en-US', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric',
//                         hour: '2-digit',
//                         minute: '2-digit',
//                       })}
//                     </p>
//                     <p className="mb-0">
//                       <strong>Likes:</strong> {review.likes}
//                     </p>
//                   </div>
//                 </div>
//                 <button className="btn btn-danger" onClick={() => handleDeleteReview(review._id)}>
//                   <FaTrash />
//                 </button>
//               </li>
//             ))}

//           </ul>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default PatientReviewsPage;


import React, { useState, useEffect } from 'react';
import './Css/Patient_Reviews.css';
import Header from './Componets/Patientdashboard_Header';
import Footer from './Componets/Footer';
import Alert from 'react-bootstrap/Alert';
import RatingStars from './Componets/RatingStars';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';

const PatientReviewsPage = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [reviews, setReviews] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  // Fetch reviews from the backend on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get('/api/reviews', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        // Sort reviews in descending order of creation date
        const sortedReviews = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setReviews(sortedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error.response || error.message);
        setAlert({
          show: true,
          message: error.response?.data?.error || 'Failed to fetch reviews',
          type: 'danger',
        });
      }
    };

    fetchReviews();
  }, []);

  // Submit a new review
  const handleSubmitReview = async () => {
    if (!rating || !feedback) {
      setAlert({ show: true, message: 'Please provide a rating and feedback.', type: 'danger' });
      return;
    }

    try {
      const { data } = await axios.post(
        '/api/reviews',
        { rating, feedback },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const updatedReviews = [...reviews, data.review].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setReviews(updatedReviews);
      setRating(0);
      setFeedback('');
      setAlert({ show: true, message: 'Review submitted successfully!', type: 'success' });
    } catch (error) {
      console.error('Error submitting review:', error.response || error.message);
      setAlert({
        show: true,
        message: error.response?.data?.error || 'Failed to submit review',
        type: 'danger',
      });
    }

    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 2000);
  };

  // Delete a review
  const handleDeleteReview = async (userId) => {
    try {
      await axios.delete(`/api/reviews/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setReviews(reviews.filter((review) => review.userId !== userId));
      setAlert({ show: true, message: 'Review deleted successfully!', type: 'success' });
    } catch (error) {
      console.error('Error deleting review:', error.response || error.message);
      setAlert({ show: true, message: 'Failed to delete review', type: 'danger' });
    }

    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 2000);
  };

  // Format date and time for display
  const formatDateTime = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  return (
    <>
      <Header />
      <div className="container my-5">
        <h2 className="text-center mb-4">Send Ratings and Reviews</h2>
        {alert.show && (
          <Alert
            variant={alert.type}
            onClose={() => setAlert({ show: false })}
            dismissible
            className="Patient-Review-Alert mb-4"
          >
            <strong>{alert.message}</strong>
          </Alert>
        )}
        <div className="review-form shadow p-4 mb-5 bg-light rounded">
          <h4 className="mb-3">Submit Your Review</h4>
          <div className="mb-3">
            <label className="form-label">Rating:</label>
            <select className="form-select" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              <option value="0">Select Rating</option>
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} Star{star > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Review:</label>
            <textarea
              className="form-control"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback here..."
              rows="4"
            ></textarea>
          </div>
          <button className="btn btn-primary" onClick={handleSubmitReview}>
            Submit Review
          </button>
        </div>

        {/* Submitted Reviews */}
        {/* <div className="reviews-list">
          <h4 className="mb-3">Submitted Reviews</h4>
          <ul className="list-group">
            {reviews.map((review) => (
              <li key={review._id} className="list-group-item d-flex justify-content-between align-items-start mb-1">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <strong>
                      Rating:
                      <RatingStars rating={review.rating} />
                    </strong>
                    <p className="mb-0">{review.feedback}</p>
                    <p className="mb-0 text-muted">
                      <strong>Date:</strong> {formatDateTime(review.createdAt)}
                    </p>
                    <p className="mb-0">
                      <strong>Likes:</strong> {review.likes || 0}
                    </p>
                  </div>
                </div>
              </li>
              
            ))}
          </ul>
        </div> */}
        <div className="reviews-list">
          <h4 className="mb-3">Submitted Reviews</h4>
          {reviews.length === 0 ? (
            <p className="text-left text-muted">Post a review about services</p>
          ) : (
            <ul className="list-group">
              {reviews.map((review) => (
                <li
                  key={review._id}
                  className="list-group-item d-flex justify-content-between align-items-start mb-1"
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <strong>
                        Rating:
                        <RatingStars rating={review.rating} />
                      </strong>
                      <p className="mb-0">{review.feedback}</p>
                      <p className="mb-0 text-muted">
                        <strong>Date:</strong> {formatDateTime(review.createdAt)}
                      </p>
                      <p className="mb-0">
                        <strong>Likes:</strong> {review.likes || 0}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PatientReviewsPage;
