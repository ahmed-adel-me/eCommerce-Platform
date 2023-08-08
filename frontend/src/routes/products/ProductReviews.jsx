import React from "react";
import Star from "../../components/Star";

export default function ProductsReviews({ reviews }) {
  return (
    <div className="bg-white rounded-xl p-5 flex-1">
      <h4 className="font-extrabold text-lg mb-5">All reviews</h4>
      {reviews.length > 0 ? (
        <div className="overflow-y-scroll">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      ) : (
        <h4>This product doesnt have reviews.</h4>
      )}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="border-y py-3 space-y-2">
      <div className="flex justify-between">
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <Star key={index} filled={index < review.rating} />
          ))}
        </div>
        <span className="text-gray-500">{review.createdAt}</span>
      </div>
      <h4 className="text-2xl">{review.title}</h4>
      <p>{review.description  }</p>
    </div>
  );
}
