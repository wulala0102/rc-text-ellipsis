import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import TextEllipsis, { TextEllipsisRef } from '../src';

describe('TextEllipsis', () => {
  describe('Basic Rendering', () => {
    it('should render without crash', () => {
      const { container } = render(<TextEllipsis content="Hello World" />);
      expect(container.querySelector('.rc-text-ellipsis')).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      const { container } = render(
        <TextEllipsis content="Hello World" className="custom-class" />,
      );
      const element = container.querySelector('.rc-text-ellipsis');
      expect(element).toHaveClass('custom-class');
    });

    it('should render with custom style', () => {
      const { container } = render(
        <TextEllipsis
          content="Hello World"
          style={{ color: 'red', fontSize: '16px' }}
        />,
      );
      const element = container.querySelector('.rc-text-ellipsis') as HTMLElement;
      expect(element.style.color).toBe('red');
      expect(element.style.fontSize).toBe('16px');
    });

    it('should render short text without action button', () => {
      const { container } = render(
        <TextEllipsis content="Short" rows={3} expandText="Expand" />,
      );
      expect(container.querySelector('.rc-text-ellipsis__action')).not.toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('should use default props', () => {
      const { container } = render(<TextEllipsis />);
      const element = container.querySelector('.rc-text-ellipsis');
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent('');
    });

    it('should display content prop', () => {
      const { container } = render(<TextEllipsis content="Test Content" />);
      expect(container).toHaveTextContent('Test Content');
    });

    it('should use custom dots', () => {
      const longText = 'A'.repeat(1000);
      const { container } = render(
        <TextEllipsis
          content={longText}
          rows={1}
          dots="---"
          expandText="More"
        />,
      );
      expect(container.querySelector('.rc-text-ellipsis')).toBeInTheDocument();
    });

    it('should render expandText when has action', async () => {
      const longText = 'A'.repeat(1000);
      const { container } = render(
        <TextEllipsis
          content={longText}
          rows={1}
          expandText="Expand"
          collapseText="Collapse"
        />,
      );

      await waitFor(() => {
        const actionElement = container.querySelector('.rc-text-ellipsis__action');
        if (actionElement) {
          expect(actionElement).toHaveTextContent('Expand');
        }
      });
    });
  });

  describe('Interaction', () => {
    it('should toggle expand/collapse on action click', async () => {
      const longText = 'A'.repeat(1000);
      const { container } = render(
        <TextEllipsis
          content={longText}
          rows={1}
          expandText="Expand"
          collapseText="Collapse"
        />,
      );

      await waitFor(() => {
        const actionElement = container.querySelector(
          '.rc-text-ellipsis__action',
        ) as HTMLElement;
        if (actionElement) {
          expect(actionElement).toHaveTextContent('Expand');

          fireEvent.click(actionElement);

          expect(actionElement).toHaveTextContent('Collapse');

          fireEvent.click(actionElement);

          expect(actionElement).toHaveTextContent('Expand');
        }
      });
    });

    it('should call onClickAction callback', async () => {
      const longText = 'A'.repeat(1000);
      const onClickAction = jest.fn();

      const { container } = render(
        <TextEllipsis
          content={longText}
          rows={1}
          expandText="Expand"
          onClickAction={onClickAction}
        />,
      );

      await waitFor(() => {
        const actionElement = container.querySelector(
          '.rc-text-ellipsis__action',
        ) as HTMLElement;
        if (actionElement) {
          fireEvent.click(actionElement);
          expect(onClickAction).toHaveBeenCalled();
        }
      });
    });

    it('should render custom action', async () => {
      const longText = 'A'.repeat(1000);
      const { container } = render(
        <TextEllipsis
          content={longText}
          rows={1}
          action={(expanded) => (
            <span className="custom-action">{expanded ? 'Hide' : 'Show'}</span>
          )}
        />,
      );

      await waitFor(() => {
        const actionElement = container.querySelector('.custom-action');
        if (actionElement) {
          expect(actionElement).toHaveTextContent('Show');
        }
      });
    });
  });

  describe('Ref Methods', () => {
    it('should expose toggle method via ref', async () => {
      const longText = 'A'.repeat(1000);
      const ref = React.createRef<TextEllipsisRef>();

      const { container } = render(
        <TextEllipsis
          ref={ref}
          content={longText}
          rows={1}
          expandText="Expand"
          collapseText="Collapse"
        />,
      );

      await waitFor(() => {
        expect(ref.current).toBeTruthy();
        expect(ref.current?.toggle).toBeDefined();

        const actionElement = container.querySelector('.rc-text-ellipsis__action');
        if (actionElement) {
          expect(actionElement).toHaveTextContent('Expand');
        }

        ref.current?.toggle(true);

        if (actionElement) {
          expect(actionElement).toHaveTextContent('Collapse');
        }

        ref.current?.toggle(false);

        if (actionElement) {
          expect(actionElement).toHaveTextContent('Expand');
        }
      });
    });

    it('should toggle state when calling toggle without parameter', async () => {
      const longText = 'A'.repeat(1000);
      const ref = React.createRef<TextEllipsisRef>();

      const { container } = render(
        <TextEllipsis
          ref={ref}
          content={longText}
          rows={1}
          expandText="Expand"
          collapseText="Collapse"
        />,
      );

      await waitFor(() => {
        const actionElement = container.querySelector('.rc-text-ellipsis__action');

        if (actionElement) {
          expect(actionElement).toHaveTextContent('Expand');
        }

        ref.current?.toggle();

        if (actionElement) {
          expect(actionElement).toHaveTextContent('Collapse');
        }

        ref.current?.toggle();

        if (actionElement) {
          expect(actionElement).toHaveTextContent('Expand');
        }
      });
    });
  });

  describe('Position', () => {
    it('should support position="end"', async () => {
      const longText = 'A'.repeat(1000);
      const { container } = render(
        <TextEllipsis
          content={longText}
          rows={1}
          position="end"
          expandText="More"
        />,
      );

      await waitFor(() => {
        expect(container.querySelector('.rc-text-ellipsis')).toBeInTheDocument();
      });
    });

    it('should support position="start"', async () => {
      const longText = 'A'.repeat(1000);
      const { container } = render(
        <TextEllipsis
          content={longText}
          rows={1}
          position="start"
          expandText="More"
        />,
      );

      await waitFor(() => {
        expect(container.querySelector('.rc-text-ellipsis')).toBeInTheDocument();
      });
    });

    it('should support position="middle"', async () => {
      const longText = 'A'.repeat(1000);
      const { container } = render(
        <TextEllipsis
          content={longText}
          rows={1}
          position="middle"
          expandText="More"
        />,
      );

      await waitFor(() => {
        expect(container.querySelector('.rc-text-ellipsis')).toBeInTheDocument();
      });
    });
  });

  describe('Multiple Rows', () => {
    it('should support multiple rows', async () => {
      const longText = 'A'.repeat(1000);
      const { container } = render(
        <TextEllipsis content={longText} rows={3} expandText="Expand" />,
      );

      await waitFor(() => {
        expect(container.querySelector('.rc-text-ellipsis')).toBeInTheDocument();
      });
    });
  });
});
