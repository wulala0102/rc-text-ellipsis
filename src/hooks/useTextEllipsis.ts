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
  suffixRef: React.RefObject<HTMLSpanElement>;
  action?: (expanded: boolean) => React.ReactNode;
  suffix?: (expanded: boolean, isOverflow: boolean) => React.ReactNode;
}

export const useTextEllipsis = (options: UseTextEllipsisOptions) => {
  const { content, rows, dots, position, expandText, rootRef, actionRef, suffixRef, action, suffix } = options;

  const [text, setText] = React.useState(content);
  const [expanded, setExpanded] = React.useState(false);
  const [hasAction, setHasAction] = React.useState(false);
  const [isOverflow, setIsOverflow] = React.useState(false);
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
      setIsOverflow(true);
      setHasAction(true);

      // 如果使用 suffix，需要计算 suffix 的 HTML
      const suffixHTML = suffix
        ? suffixRef.current?.outerHTML ?? ''
        : '';

      // 如果使用 action，需要计算 action 的 HTML
      const actionHTML = action
        ? actionRef.current?.outerHTML ?? ''
        : expandText;

      setText(
        calcEllipsisText(container, maxHeight, {
          content,
          position,
          dots,
          actionHTML: suffix ? suffixHTML : actionHTML,
        }),
      );
    } else {
      setIsOverflow(false);
      setHasAction(false);
      setText(content);
    }

    document.body.removeChild(container);
  }, [content, rows, position, dots, expandText, action, suffix, rootRef, actionRef, suffixRef]);

  const toggle = React.useCallback((isExpanded?: boolean) => {
    setExpanded((prev) => (isExpanded !== undefined ? isExpanded : !prev));
  }, []);

  React.useEffect(() => {
    calcEllipsised();

    if (action || suffix) {
      const timer = setTimeout(calcEllipsised, 0);
      return () => clearTimeout(timer);
    }
  }, [calcEllipsised, action, suffix]);

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
    isOverflow,
    toggle,
  };
};
