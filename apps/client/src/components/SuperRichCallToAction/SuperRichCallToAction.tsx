import Link from 'next/link';
import React from 'react';

export default function SuperRichCallToAction(props: {
  header: {
    headline: {
      content: string;
      fontSize: number;
      color: string;
      uppercase: boolean;
    };
    paragraph: {
      content: string;
      fontSize: number;
      color: string;
      uppercase: boolean;
    };
    buttonText: string;
    linkText: string;
    linkHref: string;
  };
  banner: {
    text: string;
    styles: {
      withBorder: boolean;
      background: string;
      textColor: string;
      borderColor: string;
      borderSize: number;
    };
  };
}) {
  const { headline, paragraph, buttonText, linkText, linkHref } = props.header;
  console.log('SUPER RICH CALL TO ACTION PROPS: ', props);

  return (
    <div className="flex flex-col items-center py-3">
      <h2
        className="font-medium text-3xl text-center"
        style={{
          fontSize: `${headline.fontSize}px`,
          color: headline.color,
          textTransform: headline.uppercase ? 'uppercase' : 'none',
        }}
      >
        {headline.content}
      </h2>
      <p
        className="text-center mt-2 text-gray-300"
        style={{
          fontSize: `${paragraph.fontSize}px`,
          color: paragraph.color,
          textTransform: paragraph.uppercase ? 'uppercase' : 'none',
        }}
      >
        {paragraph.content}
      </p>
      <button className="bg-blue-500 py-2 px-5 rounded-xl font-medium mt-5">{buttonText}</button>
      <Link href={linkHref} className="mt-2">
        {linkText}
      </Link>
    </div>
  );
}
