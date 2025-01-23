'use client';

import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Logger({ val }: { val: any }) {
  console.log(val);
  return <div>Logger</div>;
}
