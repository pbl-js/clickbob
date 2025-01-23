import Link from 'next/link';
import React from 'react';

export default function CallToAction(props: {
  headline: string;
  paragraph: string;
  buttonText: string;
  linkText: string;
  linkHref: string;
}) {
  const { headline, paragraph, buttonText, linkText, linkHref } = props;
  console.log('CallToAction props: ', props);

  return (
    <div className="flex flex-col items-center py-3">
      <h2 className="font-medium text-3xl text-center">{headline}</h2>
      <p className="text-center mt-2 text-gray-300">{paragraph}</p>
      <button className="bg-blue-500 py-2 px-5 rounded-xl font-medium mt-5">{buttonText}</button>
      <Link href={linkHref} className="mt-2">
        {linkText}
      </Link>
    </div>
  );
}
