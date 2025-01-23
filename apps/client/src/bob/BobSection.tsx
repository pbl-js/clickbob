import React from 'react';
import { BobSectionClient } from './BobSection.client';

export type BobSectionProps = {
  name: string;
};

export const BobSection = ({ name }: BobSectionProps) => {
  return <BobSectionClient name={name} />;
};
