'use client';
import { DndContext } from '@dnd-kit/core';
import React from 'react';

export default function DraggableContext({ children }: { children: React.ReactNode }) {
  return <DndContext>{children}</DndContext>;
}
