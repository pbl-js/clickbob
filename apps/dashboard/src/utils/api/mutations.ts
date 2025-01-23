'use server';

import {
  ComponentSchema,
  PageContentAddComponent_Request,
  PageContentDeleteComponent_request,
  PageContentUpdateComponents_Request,
} from '@types';
import { revalidateTag } from 'next/cache';
import { PAGE_CONTENT, PAGE_CONTENT_DETAILS, REGISTERED_COMPONENTS } from './tags';

export async function postRegisteredComponents(components: ComponentSchema[]): Promise<ComponentSchema[] | undefined> {
  const res = await fetch('http://localhost:8000/api/register-component', {
    method: 'POST',
    body: JSON.stringify(components),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  revalidateTag(REGISTERED_COMPONENTS);

  if (!res.ok) {
    throw new Error('Failed update registered components');
  }

  return res.json();
}

export async function deletePageContent(id: string): Promise<ComponentSchema[] | undefined> {
  console.log('deletePageContent is called');

  const url = new URL('http://localhost:8000/api/page-content');
  url.search = new URLSearchParams({
    id,
  }).toString();

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  revalidateTag(PAGE_CONTENT);

  if (!res.ok) {
    throw new Error('Failed delete page content');
  }

  return res.json();
}

export async function addComponentToPageContent({
  componentBlueprintId,
  pageContentId,
  componentData,
}: PageContentAddComponent_Request) {
  console.log('addComponentToPageContent runs');

  try {
    const res = await fetch('http://localhost:8000/api/page-content/add-component', {
      method: 'POST',
      body: JSON.stringify({
        componentBlueprintId,
        pageContentId,
        componentData,
      }),
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    revalidateTag(PAGE_CONTENT_DETAILS(pageContentId));

    return {
      status: 'Success',
      data: await res.json(),
    };
  } catch (error) {
    return { status: 'Error', message: error };
  }
}

export async function deleteComponentFromPageContent({
  componentId,
  pageContentId,
}: PageContentDeleteComponent_request) {
  console.log('addComponentToPageContent runs');
  try {
    await fetch('http://localhost:8000/api/page-content/delete-component', {
      method: 'POST',
      body: JSON.stringify({
        pageContentId,
        componentId,
      }),
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    revalidateTag(PAGE_CONTENT_DETAILS(pageContentId));

    return {
      status: 'Success',
    };
  } catch (err) {
    return {
      status: 'Error',
      message: err,
    };
  }
}

//
export async function updateComponentsFromPageContent({
  pageContentId,
  components,
}: PageContentUpdateComponents_Request) {
  console.log('updateComponentsFromPageContent');
  try {
    await fetch('http://localhost:8000/api/page-content/update-components', {
      method: 'POST',
      body: JSON.stringify({
        pageContentId,
        components,
      }),
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    revalidateTag(PAGE_CONTENT_DETAILS(pageContentId));

    return { status: 'Success' };
  } catch (error) {
    return { status: 'Error', message: error };
  }
}
