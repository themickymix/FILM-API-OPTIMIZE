import React from "react";
import { IMG_URL } from "../../server/config";
import { Link } from "react-router-dom";
function Card1({ name, img, id, type }) {
  return (
    <Link
      to={`/${type}/${name
        .replace(/\s+/g, "-")
        .replace(/-/g, "-")
        .toLowerCase()}/${id}`}>
      <div>
        <img src={IMG_URL + img} alt={name} />
        <span>{name}</span>
      </div>
    </Link>
  );
}

export default Card1;
