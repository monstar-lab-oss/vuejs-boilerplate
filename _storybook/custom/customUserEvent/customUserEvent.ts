// eslint-disable-next-line import/no-extraneous-dependencies
import { userEvent } from "@storybook/testing-library";
import { clickOptions } from "@testing-library/user-event/dist/click";
import { typeOptions } from "@testing-library/user-event/dist/type/typeImplementation";

const DELAY = 500;
const DELAY2 = 100;

const template = /* html */ `
<style>
:host {
  position: absolute;
  z-index: 9999;
  transition: all 500ms ease;
}

.click {
  animation-name: grow;
  animation-duration: 100ms;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
}

.dblClick {
  animation-name: grow;
  animation-duration: 200ms;
  animation-iteration-count: 2;
  animation-timing-function: ease-in-out;
}

.fade {
  animation-name: fade;
  animation-duration: 1000ms;
  animation-delay: 2000ms;
  animation-iteration-count: 1;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@keyframes grow {
    from {
        transform:scale(1);
    }
    to {
        transform:scale(1.5);
    }
}

@keyframes fade {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

#cursor {
  pointer-events: none;
  mix-blend-mode: difference;
}

#cursorEl {
  width: 25px;
  height: 25px;
  background-color: rgba(0,0,0,0.5);
  background-clip: padding-box;
  border: 3px solid rgba(0,0,0,0.25);
  border-radius: 50%;
  box-sizing: border-box;
  transform: translate(-50%, -50%);
}
</style>
<div id="fader">
  <div id="cursor">
    <div id="cursorEl"></div>
  </div>
</div>
`;

class Cursor extends HTMLElement {
  root: ShadowRoot;

  cursor: HTMLDivElement;

  fader: HTMLDivElement;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.root.innerHTML = template;
    this.cursor = this.root.getElementById("cursor") as HTMLDivElement;
    this.fader = this.root.getElementById("fader") as HTMLDivElement;
  }

  clickEffect(className = "click") {
    this.cursor.style.animation = "none";
    this.cursor.offsetHeight; /* trigger reflow */
    this.cursor.style.animation = null as any;
    this.cursor.className = className;
    this.fade();
  }

  moveTo({ top, left }: { top: number; left: number }) {
    this.setAttribute("style", `top:${top}px;left:${left}px`);
    this.fade();
  }

  fade() {
    this.fader.style.animation = "none";
    this.fader.offsetHeight; /* trigger reflow */
    this.fader.style.animation = null as any;
    this.fader.className = "fade";
  }
}

customElements.define("demo-user-event-cursor", Cursor);

const cursor = new Cursor();

function ensureCursor(): Cursor {
  if (
    document.body.getElementsByTagName("demo-user-event-cursor").length === 0
  ) {
    document.body.appendChild(cursor);
  }
  return cursor;
}

async function moveCursorTo(element: Element): Promise<void> {
  const box = element.getBoundingClientRect();

  const { body } = document;
  const docEl = document.documentElement;

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;

  const top = box.top + scrollTop - clientTop + box.height / 2;
  const left = box.left + scrollLeft - clientLeft + box.width / 2;

  ensureCursor().moveTo({
    top,
    left,
  });
  element.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

export function sleep(ms = 250) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise(resolve => setTimeout(resolve, ms));
}

export type CancellationToken = {
  isCancellationRequested: boolean;
};

type WithCancellationToken<T> = T & { token?: CancellationToken };

async function wrapCall(
  element: Element,
  token: CancellationToken | undefined,
  cb: VoidFunction,
  clickEffect?: string
) {
  const isCancelled = () =>
    token?.isCancellationRequested || !document.body.contains(element);
  if (isCancelled()) return;
  await moveCursorTo(element);
  if (isCancelled()) return;
  await sleep(DELAY);
  if (isCancelled()) return;

  if (clickEffect) {
    ensureCursor().clickEffect(clickEffect);
  }
  if (isCancelled()) return;
  await cb();
  if (isCancelled()) return;
  await sleep(DELAY2);
}

export type PlayUserEvent = {
  click(
    element: Element,
    init?: MouseEventInit,
    { token, ...options }?: WithCancellationToken<clickOptions>
  ): Promise<void>;
  dblClick(
    element: Element,
    init?: MouseEventInit,
    // eslint-disable-next-line @typescript-eslint/ban-types
    { token }?: WithCancellationToken<{}>
  ): Promise<void>;
  hover(
    element: Element,
    init?: MouseEventInit,
    // eslint-disable-next-line @typescript-eslint/ban-types
    { token }?: WithCancellationToken<{}>
  ): Promise<void>;
  type(
    element: Element,
    text?: string,
    { token, ...options }?: WithCancellationToken<typeOptions>
  ): Promise<void>;
};

export const playUserEvent: PlayUserEvent = {
  click(element, init, { token, ...options } = {}) {
    return wrapCall(
      element,
      token,
      () => userEvent.click(element, init, options),
      "click"
    );
  },
  dblClick(element, init, { token } = {}) {
    return wrapCall(
      element,
      token,
      () => userEvent.dblClick(element, init),
      "dblClick"
    );
  },
  hover(element, init, { token } = {}) {
    return wrapCall(element, token, () => userEvent.hover(element, init));
  },
  type(element, text: string, { token, ...options } = {}) {
    if (options.delay === undefined) options.delay = DELAY2;
    const newOptions = options as typeOptions & { delay?: 0 | undefined };
    return wrapCall(
      element,
      token,
      () => userEvent.type(element, text, newOptions),
      "click"
    );
  },
};

export default playUserEvent;
