'use client';
import { DndContext } from '@dnd-kit/core';
import React, { useId } from 'react';

export default function DraggableContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const id = useId();
  return <DndContext id={id}>{children}</DndContext>;
}
