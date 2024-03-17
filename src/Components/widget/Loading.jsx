import React from 'react'

const Loading = ({ center }) => {
  console.log('loading...');
  return <div className={center ? 'loading loading-center' : 'loading'}></div>;
};

export default Loading