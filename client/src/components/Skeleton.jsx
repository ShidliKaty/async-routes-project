import React, { Fragment, Suspense } from "react";
import { Await } from "react-router-dom";

export const Skeleton = ({ short, inline }) => {
  return (
    <div
      className="skeleton"
      style={{
        width: short ? "15em" : undefined,
        display: inline ? "inline-block" : undefined,
      }}
    />
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
export const SkeletonInput = () => {
  return <div className="skeleton skeleton-input" />;
};

export const SkeletonSimpleText = ({ resolve, children }) => {
  return (
    <Suspense fallback={<Skeleton short inline />}>
      <Await resolve={resolve}>{children}</Await>
    </Suspense>
  );
};
