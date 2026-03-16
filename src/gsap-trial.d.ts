declare module "gsap-trial/SplitText" {
  export class SplitText {
    chars: Element[];
    words: Element[];
    lines: Element[];
    constructor(
      target: Element | Element[] | string | string[],
      vars?: { type?: string; linesClass?: string }
    );
    revert(): void;
  }
}
