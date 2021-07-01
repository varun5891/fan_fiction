import React from "react";

import ReactStars from "react-rating-stars-component";

const star = {
  size: 30,
  value: 0,
  edit: true,
  onChange: (newValue) => {
    console.log(`New value is ${newValue}`);
  }
};



export default function App() {
  return (
    <ReactStars {...star} />
  );
}
