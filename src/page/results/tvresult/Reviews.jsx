import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GetApi } from "../../../custom-hooks/GetApi";


function Reviews() {
  const { id } = useParams();
  const API_URL = `https://api.themoviedb.org/3/tv/${id}/reviews?language=en-US`;

  // Use the custom hook to fetch reviews
  const { data, error } = GetApi(API_URL);

  // Manage the expanded reviews state
  const [expandedReviews, setExpandedReviews] = useState({});

  // Handle the toggle for expanding the review
  const handleToggleExpand = (index) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };


  // Show error message if data fetching fails
  if (error) {
    return <p>Error: {error}</p>;
  }
  const getTimeAgo = (dateString) => {
    const now = new Date();
    const createdAt = new Date(dateString);
    const timeDifference = now - createdAt;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30); // Average month length
    const years = Math.floor(days / 365); // Average year length

    if (years > 0) {
      return years === 1 ? "1 year ago" : `${years} years ago`;
    } else if (months > 0) {
      return months === 1 ? "1 month ago" : `${months} months ago`;
    } else if (days > 0) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else {
      return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
    }
  };


  return (
    <div className=" mt-4">
      {data?.results.length > 0 && (
        <div>
   
          <span className="p-4">
            {data?.results.length} Review{data?.results.length > 1 && "s"}
          </span>
          {data?.results.length > 0 ? (
            data.results.map((rev, index) => {
              const timeAgo = getTimeAgo(rev.created_at);
              const isExpanded = expandedReviews[index];
              const content = isExpanded
                ? rev.content
                : rev.content.split("\n").slice(0, 3).join("\n");

              // Ensure the avatar path is handled correctly
              const avatarPath = rev.author_details.avatar_path
                ? rev.author_details.avatar_path.startsWith("/")
                  ? `https://image.tmdb.org/t/p/original${rev.author_details.avatar_path}`
                  : rev.author_details.avatar_path
                : null;
              const initials = rev.author
                ? rev.author.slice(0, 1).toUpperCase()
                : "";

              return (
                <div key={index} className="review mb-4 p-4">
                  <span className="flex gap-2">
                    {avatarPath ? (
                      <img
                        className="w-10 h-10 rounded-full"
                        src={avatarPath}
                        alt={`${rev.author}'s avatar`}
                      />
                    ) : (
                      <img
                        className="w-10 h-10 rounded-full bg-white object-cover"
                        src={`https://placehold.co/600x400?text=${initials}`}
                        alt=""
                      />
                    )}

                    <div className="">
                      <h3 className="text-sm font-bold">
                        {rev.author} &bull;{" "}
                        <span className="text-xs font-light">{timeAgo}</span>
                      </h3>
                      <p className=" whitespace-pre-line text-xs ">{content}</p>
                      {rev.content.split("\n").length > 3 && (
                        <button
                          onClick={() => handleToggleExpand(index)}
                          className="btn-link btn-sm m-0 p-0 text-white">
                          {isExpanded ? "Show Less" : "Show More"}
                        </button>
                      )}
                    </div>
                  </span>
                </div>
              );
            })
          ) : (
            <p>No reviews available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Reviews;
