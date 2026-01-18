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
    } = props;

    const rootRef = React.useRef<HTMLDivElement>(null);
    const actionRef = React.useRef<HTMLSpanElement>(null);

    const { text, expanded, hasAction, toggle } = useTextEllipsis({
      content,
      rows,
      dots,
      position,
      expandText,
      rootRef,
      actionRef,
      action,
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

    return (
      <div
        ref={rootRef}
        className={classNames('rc-text-ellipsis', className)}
        style={style}
      >
        {expanded ? content : text}
        {hasAction && renderAction()}
      </div>
    );
  },
);

TextEllipsis.displayName = 'TextEllipsis';

export default TextEllipsis;
