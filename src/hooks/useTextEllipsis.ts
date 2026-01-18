import * as React from 'react';
import { calcEllipsisText, cloneContainer, pxToNum } from '../utils';

interface UseTextEllipsisOptions {
  content: string;
  rows: number;
  dots: string;
  position: 'start' | 'middle' | 'end';
  expandText: string;
  rootRef: React.RefObject<HTMLDivElement>;
  actionRef: React.RefObject<HTMLSpanElement>;
  action?: (expanded: boolean) => React.ReactNode;
}

export const useTextEllipsis = (options: UseTextEllipsisOptions) => {
  const { content, rows, dots, position, expandText, rootRef, actionRef, action } = options;

  const [text, setText] = React.useState(content);
  const [expanded, setExpanded] = React.useState(false);
  const [hasAction, setHasAction] = React.useState(false);
  const needRecalculateRef = React.useRef(false);

  const calcEllipsised = React.useCallback(() => {
    const container = cloneContainer(rootRef.current, content);

    if (!container) {
      needRecalculateRef.current = true;
      return;
    }

    const { paddingBottom, paddingTop, lineHeight } = container.style;
    const maxHeight = Math.ceil(
      (Number(rows) + 0.5) * pxToNum(lineHeight) +
        pxToNum(paddingTop) +
        pxToNum(paddingBottom),
    );

    if (maxHeight < container.offsetHeight) {
      setHasAction(true);
      const actionHTML = action
        ? actionRef.current?.outerHTML ?? ''
        : expandText;

      setText(
        calcEllipsisText(container, maxHeight, {
          content,
          position,
          dots,
          actionHTML,
        }),
      );
    } else {
      setHasAction(false);
      setText(content);
    }

    document.body.removeChild(container);
  }, [content, rows, position, dots, expandText, action, rootRef, actionRef]);

  const toggle = React.useCallback((isExpanded?: boolean) => {
    setExpanded((prev) => (isExpanded !== undefined ? isExpanded : !prev));
  }, []);

  React.useEffect(() => {
    calcEllipsised();

    if (action) {
      const timer = setTimeout(calcEllipsised, 0);
      return () => clearTimeout(timer);
    }
  }, [calcEllipsised, action]);

  React.useEffect(() => {
    const handleResize = () => {
      calcEllipsised();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calcEllipsised]);

  return {
    text,
    expanded,
    hasAction,
    toggle,
  };
};
