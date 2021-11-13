import React from 'react';

const Tags = ({ data }) =>
  data.map((tag, idx) => (
    <span key={idx} className="flex items-center h-6 bg-primary text-white text-xs rounded-xl px-2">
      {tag}
    </span>
  ));
export default Tags;
