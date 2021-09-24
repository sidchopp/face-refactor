import React from 'react';

const Rank = ({ entries }) => {
  return (
    <div>
      <h4>
        {`Number of times you have used this App before: ${entries}`}
      </h4>
    </div>
  );
}

export default Rank;