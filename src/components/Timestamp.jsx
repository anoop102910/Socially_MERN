import React from "react";
import { formatDistanceToNow, parseISO } from "date-fns";

const Timestamp = ({ date, className }) => {
  const timeAgo = formatDistanceToNow(parseISO(date), { addSuffix: true });
  return <span className={className}>{timeAgo}</span>;
};

export default Timestamp;
