import { PageBlueprintsListing } from '../../components/PageBlueprintsListing/PageBlueprintsListing';

export default async function Home({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen">
      <div className="w-full h-full flex p-5 gap-10">
        <div className="w-[350px]">
          <h3 className="mb-3">Pages</h3>
          <PageBlueprintsListing />
        </div>

        <div className="w-full ">{children}</div>
      </div>
    </main>
  );
}
