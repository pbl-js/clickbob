import {
  ComponentSchemaResponse,
  PageBlueprint_GetRequest,
  PageContentDetails_Response,
  PageContent_GetResponse,
} from '@types';
import { PAGE_BLUEPRINT, PAGE_CONTENT, PAGE_CONTENT_DETAILS, REGISTERED_COMPONENTS } from './tags';

export async function getRegisteredComponents(): Promise<ComponentSchemaResponse[] | undefined> {
  const res = await fetch('http://localhost:8000/api/register-component', {
    next: { tags: [REGISTERED_COMPONENTS] },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch registered components');
  }

  return res.json();
}

// TODO: This function should return {value,error}
export async function getPageBlueprints(): Promise<PageBlueprint_GetRequest | undefined> {
  console.log('getPageBlueprints is called');
  const res = await fetch('http://localhost:8000/api/page-blueprint', {
    next: { tags: [PAGE_BLUEPRINT] },
  });
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch page-blueprints');
  }

  return res.json();
}

export async function getPageContentList(blueprintId: string): Promise<PageContent_GetResponse | undefined> {
  try {
    console.log('getPageContentList is called');
    const url = new URL('http://localhost:8000/api/page-content');
    url.search = new URLSearchParams({
      blueprintId,
    }).toString();

    const res = await fetch(url.toString(), {
      next: { tags: [PAGE_CONTENT] },
    });

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch page-content');
    }

    return res.json();
  } catch (err) {
    console.log('DUPA', err);
    throw new Error('Failed to fetch page-content');
  }
}

export async function getPageContentDetails(pageContentId: string): Promise<PageContentDetails_Response | undefined> {
  try {
    console.log('getPageContentDetails is called');
    const url = new URL('http://localhost:8000/api/page-content-details');
    url.search = new URLSearchParams({
      pageContentId,
    }).toString();

    const res = await fetch(url.toString(), {
      next: { tags: [PAGE_CONTENT_DETAILS(pageContentId)] },
    });

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch page-content-details');
    }

    return res.json();
  } catch (err) {
    throw new Error('Failed to fetch page-content-details');
  }
}
