


import React from "react";


const Card = ({ text, onShowMore }) => {
  return (


        <div
          className="card"
          style={{
            padding: 10,
            border: "1px solid black",
            backgroundColor: "white",
            borderRadius: "5px",
            height: "50px",
            width: "100px"
          }}
        >
          <div>
            {text.substring(0, 20)}...{" "}
            <button onClick={onShowMore}>Show More</button>
          </div>
        </div>


  );
};

export default Card;
