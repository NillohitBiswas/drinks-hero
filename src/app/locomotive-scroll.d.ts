declare module 'locomotive-scroll' {
  export default class LocomotiveScroll {
    constructor(options?: any);
    on(event: string, callback: () => void): void;
    update(): void;
    scrollTo(target: any, options?: any): void;
    destroy(): void;
    [key: string]: any;
  }
}
