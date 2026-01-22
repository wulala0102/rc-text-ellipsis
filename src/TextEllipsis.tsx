import classNames from 'classnames';
import * as React from 'react';
import { useTextEllipsis } from './hooks/useTextEllipsis';

export interface TextEllipsisProps {
  className?: string;
  style?: React.CSSProperties;
  rows?: number;
  dots?: string;
  content?: string;
  expandText?: string;
  collapseText?: string;
  position?: 'start' | 'middle' | 'end';
  onClickAction?: (e: React.MouseEvent) => void;
  action?: (expanded: boolean) => React.ReactNode;
  suffix?: (expanded: boolean, isOverflow: boolean) => React.ReactNode;
}

export interface TextEllipsisRef {
  toggle: (expanded?: boolean) => void;
}

const TextEllipsis = React.forwardRef<TextEllipsisRef, TextEllipsisProps>(
  (props, ref) => {
    const {
      className,
      style,
      rows = 1,
      dots = '...',
      content = '',
      expandText = '',
      collapseText = '',
      position = 'end',
      onClickAction,
      action,
      suffix,
    } = props;

    const rootRef = React.useRef<HTMLDivElement>(null);
    const actionRef = React.useRef<HTMLSpanElement>(null);
    const suffixRef = React.useRef<HTMLSpanElement>(null);

    // action 和 suffix 互斥，优先使用 suffix
    // 当提供了 suffix 时使用 suffix 模式，否则使用 action 模式
    const useSuffix = !!suffix;

    const { text, expanded, hasAction, isOverflow, toggle } = useTextEllipsis({
      content,
      rows,
      dots,
      position,
      expandText,
      rootRef,
      actionRef,
      suffixRef,
      action: useSuffix ? undefined : action,
      suffix: useSuffix ? suffix : undefined,
    });

    const handleClickAction = (event: React.MouseEvent) => {
      toggle();
      onClickAction?.(event);
    };

    React.useImperativeHandle(ref, () => ({
      toggle,
    }));

    const actionText = expanded ? collapseText : expandText;

    const renderAction = () => {
      const actionContent = action ? action(expanded) : actionText;
      return (
        <span
          ref={actionRef}
          className="rc-text-ellipsis__action"
          onClick={handleClickAction}
        >
          {actionContent}
        </span>
      );
    };

    const renderSuffix = () => {
      if (!suffix) {
        return null;
      }
      const suffixContent = suffix(expanded, isOverflow);
      return (
        <span
          ref={suffixRef}
          className="rc-text-ellipsis__suffix"
        >
          {suffixContent}
        </span>
      );
    };

    return (
      <div
        ref={rootRef}
        className={classNames('rc-text-ellipsis', className)}
        style={style}
      >
        {expanded ? content : text}
        {useSuffix ? renderSuffix() : (hasAction && renderAction())}
      </div>
    );
  },
);

TextEllipsis.displayName = 'TextEllipsis';

export default TextEllipsis;
