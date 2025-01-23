'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

export const Refresher = () => {
  const router = useRouter();

  const refreshAction = async () => {
    router.refresh();
  };

  return <button onClick={refreshAction}>Refresher</button>;
};
