export const pxToNum = (value: string | null): number => {
  if (!value) {
    return 0;
  }
  const match = value.match(/^\d*(\.\d*)?/);
  return match ? Number(match[0]) : 0;
};

export const cloneContainer = (
  rootElement: HTMLElement | null,
  content: string,
): HTMLDivElement | null => {
  if (!rootElement || !rootElement.isConnected) {
    return null;
  }

  const originStyle = window.getComputedStyle(rootElement);
  const container = document.createElement('div');
  const styleNames: string[] = Array.prototype.slice.call(originStyle);

  styleNames.forEach((name) => {
    container.style.setProperty(name, originStyle.getPropertyValue(name));
  });

  container.style.position = 'fixed';
  container.style.zIndex = '-9999';
  container.style.top = '-9999px';
  container.style.height = 'auto';
  container.style.minHeight = 'auto';
  container.style.maxHeight = 'auto';

  container.innerText = content;
  document.body.appendChild(container);

  return container;
};

interface CalcEllipsisTextOptions {
  content: string;
  position: 'start' | 'middle' | 'end';
  dots: string;
  actionHTML: string;
}

export const calcEllipsisText = (
  container: HTMLDivElement,
  maxHeight: number,
  options: CalcEllipsisTextOptions,
): string => {
  const { content, position, dots, actionHTML } = options;
  const end = content.length;
  const middle = Math.floor((0 + end) / 2);

  const calcEllipse = (): string => {
    const tail = (left: number, right: number): string => {
      if (right - left <= 1) {
        if (position === 'end') {
          return content.slice(0, left) + dots;
        }
        return dots + content.slice(right, end);
      }

      const midPoint = Math.round((left + right) / 2);

      container.innerText = position === 'end'
        ? content.slice(0, midPoint) + dots
        : dots + content.slice(midPoint, end);

      container.innerHTML += actionHTML;

      if (container.offsetHeight > maxHeight) {
        if (position === 'end') {
          return tail(left, midPoint);
        }
        return tail(midPoint, right);
      }

      if (position === 'end') {
        return tail(midPoint, right);
      }

      return tail(left, midPoint);
    };

    return tail(0, end);
  };

  const middleTail = (
    leftPart: [number, number],
    rightPart: [number, number],
  ): string => {
    if (
      leftPart[1] - leftPart[0] <= 1 &&
      rightPart[1] - rightPart[0] <= 1
    ) {
      return (
        content.slice(0, leftPart[0]) +
        dots +
        content.slice(rightPart[1], end)
      );
    }

    const leftMiddle = Math.floor((leftPart[0] + leftPart[1]) / 2);
    const rightMiddle = Math.ceil((rightPart[0] + rightPart[1]) / 2);

    container.innerText =
      content.slice(0, leftMiddle) +
      dots +
      content.slice(rightMiddle, end);
    container.innerHTML += actionHTML;

    if (container.offsetHeight >= maxHeight) {
      return middleTail(
        [leftPart[0], leftMiddle],
        [rightMiddle, rightPart[1]],
      );
    }

    return middleTail(
      [leftMiddle, leftPart[1]],
      [rightPart[0], rightMiddle],
    );
  };

  return position === 'middle'
    ? middleTail([0, middle], [middle, end])
    : calcEllipse();
};
