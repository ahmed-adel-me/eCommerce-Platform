import { useState } from "react";
import SubmitBtn from "../../components/SubmitBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { createReview as createReviewFn } from "../../api/endpoints/reviews";
import Star from "../../components/Star";
import useUser from "../../hooks/useUser";

export default function CreateReview({ className }) {
  const { data: user } = useUser();
  const { productId } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (props) => createReviewFn(props),
    onSuccess: () => {
      queryClient.invalidateQueries("product");
    },
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    mutate({ title, description, rating, user: user.id, product: productId });
    setTitle("");
    setDescription("");
    setRating(0);
  };
  return (
    <div className={"bg-white rounded-xl p-5 h-fit " + className}>
      <h4 className="font-extrabold text-lg mb-5">Add a review</h4>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <Stars rating={rating} setRating={setRating} />
        <input
          className="input-style"
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <textarea
          className="input-style"
          name="description"
          cols="30"
          rows="5"
          placeholder="Description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <SubmitBtn
          text={"Submit your review"}
          className={"bg-green-900 w-fit"}
          isLoading={isPending}
        />
      </form>
    </div>
  );
}

function Stars({ rating, setRating }) {
  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          filled={index < rating}
          onClick={() => handleStarClick(index)}
        />
      ))}
    </div>
  );
}
