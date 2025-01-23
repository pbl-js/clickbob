import Link from 'next/link';
import { RegisteredComponentListing } from '../../../components/RegisteredComponentsListing/RegisteredComponentListing';
import { IframeComunicator } from '../../../components/iframeCommunicator/IframeCommunicator';
import { PAGE_CONTENT } from '../../../utils/api/tags';
import { PageProps } from '../../../utils/types/types';
import { getPageContentDetails, getRegisteredComponents } from '../../../utils/api/fetchers';
import { redirect } from 'next/navigation';
import { CONTENT_PAGE } from '../../../utils/routes';
import { RectLayer } from '../../../components/RectLayer/RectLayer';
import { EditorContextProvider } from './editorContext';
import { RightPanel } from './components/RightPanel/RightPanel';
import { DeleteLayerButton } from './components/DeleteLayerButton/DeleteLayerButton';
import DraggableContext from './DraggableContext';
import { DraggingOverlay } from '../../../components/DraggingOverlay/DraggingOverlay';

export const dynamic = 'force-dynamic';

export default async function Home({ params: { contentId } }: PageProps<{ contentId?: string }>) {
  if (!contentId) redirect(CONTENT_PAGE);

  const details = await getPageContentDetails(contentId);
  const registeredComponents = await getRegisteredComponents();
  console.log('DETAILS: ', details);

  if (!details) return null;
  if (!registeredComponents) return null;

  return (
    <EditorContextProvider>
      <IframeComunicator contentId={contentId} />
      <main className="flex min-h-screen h-screen w-full overflow-hidden">
        <div className="grid pb-0 grid-cols-editor w-full text-sm font-medium">
          <DraggableContext>
            <DraggingOverlay />
            <div className="">
              <div className="border-b">
                <Link
                  href={PAGE_CONTENT}
                  className="flex items-center justify-center w-10 h-10 bg-primary rounded-md mb-3 text-primary-foreground"
                >
                  {'<'}
                </Link>
              </div>

              <div className="border-r h-full p-3">
                <h3 className="mb-3">Registered components</h3>
                <RegisteredComponentListing pageContentId={contentId} />
                <h3 className="mb-3">page content details</h3>
                <p className="mt-6">Name: {details?.name}</p>

                <div className="mt-2 flex flex-col gap-1">
                  {details.components.map((component) => (
                    <div className="p-2 bg-primary rounded-md flex justify-between" key={component._id}>
                      {component.name}
                      <DeleteLayerButton componentId={component._id} pageContentId={details._id} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="border-b">
                <Link
                  href={PAGE_CONTENT}
                  className="flex items-center justify-center w-10 h-10 bg-primary rounded-md text-primary-foreground mb-3"
                >
                  {'<'}
                </Link>
              </div>

              <div className="flex relative h-full overflow-y-auto">
                <RectLayer pageContent={details} registeredComponents={registeredComponents} />
                <iframe
                  className="block w-full border-none"
                  src="http://localhost:4444"
                  title="Iframe dashboard"
                  id="cms-editor-iframe"
                />
              </div>
            </div>
          </DraggableContext>

          <div className="overflow-y-auto">
            <div className="border-b">
              <Link
                href={PAGE_CONTENT}
                className="flex items-center justify-center w-10 h-10 bg-primary rounded-md mb-3 text-primary-foreground"
              >
                {'<'}
              </Link>
            </div>
            <RightPanel details={details} componentsSchema={registeredComponents} />
          </div>
        </div>
      </main>
    </EditorContextProvider>
  );
}
