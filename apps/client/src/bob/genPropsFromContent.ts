import { DataFieldContent, DataFieldContentArray } from '@types';

function propGenerator(prop: DataFieldContent) {
  if (prop.type === 'string') {
    return {
      [prop.name]: prop.value,
    };
  }

  if (prop.type === 'number') {
    return {
      [prop.name]: prop.value,
    };
  }

  if (prop.type === 'boolean') {
    return {
      [prop.name]: prop.value,
    };
  }

  // Think about refactoring this function
  if (prop.type === 'object') {
    return {
      [prop.name]: prop.subfields.reduce((acc, val): any => {
        return {
          ...acc,
          ...propGenerator(val),
        };
      }, {}),
    };
  }
}

export function genPropsFromContent(propsRaw: DataFieldContentArray) {
  return propsRaw.reduce((acc, val) => {
    return {
      ...acc,
      ...propGenerator(val),
    };
  }, {});
}
