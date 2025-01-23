'use client';
// TODO: Remove this useClient by trying to synchronize front builder with server builder
import { BOB } from '../bob/bobInstance';
import './global.css';
// import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import SuperRichCallToAction from '../components/SuperRichCallToAction/SuperRichCallToAction';
import clsx from 'clsx';

BOB.init('example-of-api-key');

const ProductTile = dynamic(
  async () => (await import('../components/ProductTile/ProductTile')).default
);
const CallToAction = dynamic(
  async () => (await import('../components/CallToAction/CallToAction')).default
);
const RichCallToAction = dynamic(
  async () =>
    (await import('../components/RichCallToAction/RichCallToAction')).default
);

BOB.registerComponent('testProductTile', ProductTile, [
  { name: 'title', type: 'string' },
  { name: 'subtitle', type: 'string', defaultValue: 'default subtitle' },
  { name: 'priceTotal', type: 'number' },
  { name: 'withBorder', type: 'boolean', defaultValue: false },
  {
    name: 'productData',
    type: 'object',
    subfields: [
      {
        name: 'name',
        type: 'string',
      },
      {
        name: 'count',
        type: 'number',
      },
    ],
  },
]);

BOB.registerComponent('callToAction', CallToAction, [
  { name: 'headline', type: 'string', defaultValue: 'Lorem Ipsum' },
  {
    name: 'paragraph',
    type: 'string',
    defaultValue:
      'Lorem ipsum dolor sit amet, consectetur adipisci elit sed diam nonummy nibh euismod tincidunt ut laoreet dolore.',
  },
  { name: 'buttonText', type: 'string', defaultValue: 'Button' },
  { name: 'linkText', type: 'string', defaultValue: 'Check lates video' },
  { name: 'linkHref', type: 'string', defaultValue: '#' },
]);

BOB.registerComponent('richCallToAction', RichCallToAction, [
  {
    name: 'headline',
    type: 'object',
    subfields: [
      {
        name: 'content',
        type: 'string',
        defaultValue: 'Lorem ipsum',
      },
      {
        name: 'fontSize',
        type: 'number',
        defaultValue: 14,
      },
      {
        name: 'color',
        type: 'string',
        defaultValue: 'white',
      },
      {
        name: 'uppercase',
        type: 'boolean',
        defaultValue: false,
      },
    ],
  },
  {
    name: 'paragraph',
    type: 'object',
    subfields: [
      {
        name: 'content',
        type: 'string',
        defaultValue: 'Lorem ipsum',
      },
      {
        name: 'fontSize',
        type: 'number',
        defaultValue: 14,
      },
      {
        name: 'color',
        type: 'string',
        defaultValue: 'white',
      },
      {
        name: 'uppercase',
        type: 'boolean',
        defaultValue: false,
      },
    ],
  },
  { name: 'buttonText', type: 'string', defaultValue: 'Button' },
  { name: 'linkText', type: 'string', defaultValue: 'Check lates video' },
  { name: 'linkHref', type: 'string', defaultValue: '#' },
]);

// header: {
//   headline: {
//     content: string;
//     fontSize: number;
//     color: string;
//     uppercase: boolean;
//   };
//   paragraph: {
//     content: string;
//     fontSize: number;
//     color: string;
//     uppercase: boolean;
//   };
//   buttonText: string;
//   linkText: string;
//   linkHref: string;
// };
// banner: {
//   text: string;
//   styles: {
//     background: string;
//     textColor: string;
//     borderColor: string;
//     borderSize: number;
//   };
// };

BOB.registerComponent('SuperRichCallToAction', SuperRichCallToAction, [
  {
    name: 'header',
    type: 'object',
    subfields: [
      {
        name: 'headline',
        type: 'object',
        subfields: [
          {
            name: 'content',
            type: 'string',
            defaultValue: 'Lorem ipsum',
          },
          {
            name: 'fontSize',
            type: 'number',
            defaultValue: 14,
          },
          {
            name: 'color',
            type: 'string',
            defaultValue: 'white',
          },
          {
            name: 'uppercase',
            type: 'boolean',
            defaultValue: false,
          },
        ],
      },
      {
        name: 'paragraph',
        type: 'object',
        subfields: [
          {
            name: 'content',
            type: 'string',
            defaultValue: 'Lorem ipsum',
          },
          {
            name: 'fontSize',
            type: 'number',
            defaultValue: 14,
          },
          {
            name: 'color',
            type: 'string',
            defaultValue: 'white',
          },
          {
            name: 'uppercase',
            type: 'boolean',
            defaultValue: false,
          },
        ],
      },
      { name: 'buttonText', type: 'string', defaultValue: 'Button' },
      { name: 'linkText', type: 'string', defaultValue: 'Check lates video' },
      { name: 'linkHref', type: 'string', defaultValue: '#' },
    ],
  },
  {
    name: 'banner',
    type: 'object',
    subfields: [
      {
        name: 'text',
        type: 'string',
        defaultValue: 'Lorem ipsum',
      },
      {
        name: 'styles',
        type: 'object',
        subfields: [
          {
            name: 'background',
            type: 'string',
            defaultValue: '#4f4f4f',
          },
          {
            name: 'textColor',
            type: 'string',
            defaultValue: 'white',
          },
          {
            name: 'borderColor',
            type: 'string',
            defaultValue: 'red',
          },
          {
            name: 'withBorder',
            type: 'boolean',
            defaultValue: false,
          },
          {
            name: 'borderSize',
            type: 'number',
            defaultValue: 1,
          },
        ],
      },
    ],
  },
]);

BOB.registerComponent('4levelNesting', ProductTile, [
  {
    name: 'products',
    type: 'object',
    subfields: [
      {
        name: 'products count',
        type: 'number',
        defaultValue: 10,
      },
      {
        name: 'product-one',
        type: 'object',
        subfields: [
          {
            name: 'name',
            type: 'string',
            defaultValue: 'Product name',
          },
          {
            name: 'specification-one',
            type: 'object',
            subfields: [
              {
                name: 'name',
                type: 'string',
              },
              {
                name: 'extra information',
                type: 'object',
                subfields: [
                  {
                    name: 'info one',
                    type: 'string',
                  },
                  {
                    name: 'info two',
                    type: 'string',
                  },
                  {
                    name: 'info three',
                    type: 'string',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, 'overflow-hidden')}>
        {children}
      </body>
    </html>
  );
}
