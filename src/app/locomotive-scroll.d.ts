declare module 'locomotive-scroll' {
  export default class LocomotiveScroll {
    constructor(options?: unknown);
    on(event: string, callback: (...args: unknown[]) => void): void;
    update(): void;
    scrollTo(target: unknown, options?: unknown): void;
    destroy(): void;
    [key: string]: unknown;
  }
}
