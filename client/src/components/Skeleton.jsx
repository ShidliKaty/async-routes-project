import React, { Fragment } from "react";

export const Skeleton = ({ short }) => {
  return (
    <div className="skeleton" style={{ width: short ? "15em" : undefined }} />
  );
};

export const SkeletonList = ({ amount, children }) => {
  return (
    <>
      {Array.from({ length: amount }).map((_, i) => (
        <Fragment key={i}>{children}</Fragment>
      ))}
    </>
  );
};

export const SkeletonButton = () => {
  return <div className="skeleton skeleton-btn" />;
};
