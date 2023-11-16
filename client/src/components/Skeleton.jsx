import React, { Fragment } from "react";

export const Skeleton = ({ short }) => {
  return (
    <div className="skeleton" style={{ width: short ? "25em" : undefined }} />
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
