import { ComponentType } from 'react';
import { RegisteredComponent } from '@types';

export class BOB {
  static _instance: BOB;

  private _key: string;
  static _customComponents: RegisteredComponent[] = [];

  private constructor(d: string) {
    this._key = d;
  }

  static init(key: string): BOB {
    if (!BOB._instance) {
      BOB._instance = new BOB(key);
    }
    return BOB._instance;
  }

  static registerComponent(
    name: RegisteredComponent['name'],
    // TODO: Maybe its possible to replace this any with generic propsSchema
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: ComponentType<any>,
    propsSchema: RegisteredComponent['propsSchema']
  ): void {
    const isComponentExisted = this._customComponents.some(
      ({ name: customComponentName }) => name === customComponentName
    );

    // TODO: Add error handling if component registration is duplicated
    if (isComponentExisted) return;

    this._customComponents.push({ name, component, propsSchema });
  }
}
