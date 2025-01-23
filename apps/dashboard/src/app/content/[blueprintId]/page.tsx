import { getPageBlueprints } from '../../../utils/api/fetchers';
import { PageContentListing } from '../../../components/PageContentListing/PageContentListing';
import { Refresher } from '../../../components/Refresher/Refresher';
import { NextPage } from 'next';

type HomeProps = {
  params: Promise<{ blueprintId: string }>;
  searchParams: Promise<unknown>;
};

export const dynamic = 'force-dynamic';

// export default async function Home({ params }: HomeProps) {
//   const pageBlueprints = await getPageBlueprints();
//   const matchedPageBlueprint = pageBlueprints?.find((el) => el._id === params.blueprintId);

//   if (!matchedPageBlueprint) return <div>Invalid blueprint id</div>;

//   return (
//     <main className="flex min-h-screen">
//       <div className="w-full flex flex-col">
//         <h3 className="mb-3">Content</h3>
//         <PageContentListing blueprintId={matchedPageBlueprint._id} />
//       </div>
//       <Refresher />
//     </main>
//   );

const Home: NextPage<HomeProps> = async ({ params }: HomeProps) => {
  const pageBlueprints = await getPageBlueprints();
  const { blueprintId } = await params;

  const matchedPageBlueprint = pageBlueprints?.find(
    (el) => el._id === blueprintId
  );

  if (!matchedPageBlueprint) return <div>Invalid blueprint id</div>;

  return (
    <main className="flex min-h-screen">
      <div className="w-full flex flex-col">
        <h3 className="mb-3">Content</h3>
        <PageContentListing blueprintId={matchedPageBlueprint._id} />
      </div>
      <Refresher />
    </main>
  );
};
export default Home;
