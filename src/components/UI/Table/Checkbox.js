import React, { forwardRef, Fragment, useEffect, useRef } from "react";

export const Checkbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);
  return (
    <Fragment>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </Fragment>
  );
});
