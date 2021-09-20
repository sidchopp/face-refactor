import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div >
        {`${name}, your current entry count is...`}{entries}
      </div>
      <div >

      </div>
    </div>
  );
}

export default Rank;