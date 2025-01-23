import Link from 'next/link';
import { CONTENT_PAGE } from '../utils/routes';

export default async function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <h1 className="my-4">Homepage</h1>
      <Link className="flex w-auto p-4 bg-primary rounded-sm" href={CONTENT_PAGE}>
        Go to editor
      </Link>
    </main>
  );
}
