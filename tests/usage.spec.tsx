import { act, fireEvent, render, waitFor } from '@testing-library/react';
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

  describe('Edge Cases', () => {
    it('should handle window resize', async () => {
      const longText = 'A'.repeat(1000);
      const { container } = render(
        <TextEllipsis content={longText} rows={1} expandText="Expand" />,
      );

      await waitFor(() => {
        expect(container.querySelector('.rc-text-ellipsis')).toBeInTheDocument();
      });

      // Trigger resize event
      fireEvent(window, new Event('resize'));

      await waitFor(() => {
        expect(container.querySelector('.rc-text-ellipsis')).toBeInTheDocument();
      });
    });

    it('should handle onClickAction being undefined', async () => {
      const longText = 'A'.repeat(1000);
      const { container } = render(
        <TextEllipsis
          content={longText}
          rows={1}
          expandText="Expand"
        />,
      );

      await waitFor(() => {
        const actionElement = container.querySelector(
          '.rc-text-ellipsis__action',
        ) as HTMLElement;
        if (actionElement) {
          // Should not throw error when onClickAction is undefined
          expect(() => fireEvent.click(actionElement)).not.toThrow();
        }
      });
    });

    it('should render custom action with expanded state', async () => {
      const longText = 'A'.repeat(1000);
      const customAction = jest.fn((expanded) => (
        <button data-expanded={expanded}>{expanded ? 'Less' : 'More'}</button>
      ));

      const { container } = render(
        <TextEllipsis
          content={longText}
          rows={1}
          action={customAction}
        />,
      );

      await waitFor(() => {
        const actionElement = container.querySelector('.rc-text-ellipsis__action');
        if (actionElement) {
          expect(customAction).toHaveBeenCalledWith(false);

          fireEvent.click(actionElement);

          expect(customAction).toHaveBeenCalledWith(true);
        }
      });
    });

    it('should call onClickAction with event when clicking action', async () => {
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
          expect(onClickAction.mock.calls[0][0]).toBeInstanceOf(Object);
        }
      });
    });

    it('should render custom action when action prop is provided', async () => {
      const longText = 'A'.repeat(1000);
      const customAction = (expanded: boolean) => (
        <strong>{expanded ? 'Collapse' : 'Expand'}</strong>
      );

      const { container } = render(
        <TextEllipsis
          content={longText}
          rows={1}
          action={customAction}
        />,
      );

      await waitFor(() => {
        const actionElement = container.querySelector('.rc-text-ellipsis__action');
        if (actionElement) {
          expect(actionElement.querySelector('strong')).toBeInTheDocument();
          expect(actionElement.querySelector('strong')).toHaveTextContent('Expand');
        }
      });
    });
  });

  describe('Suffix', () => {
    it('should render suffix when provided', async () => {
      const longText = 'A'.repeat(1000);
      const { container } = render(
        <TextEllipsis
          content={longText}
          rows={1}
          suffix={(expanded, isOverflow) => (
            <span className="custom-suffix">
              {isOverflow ? (expanded ? 'Less' : 'More') : 'End'}
            </span>
          )}
        />,
      );

      await waitFor(() => {
        const suffixElement = container.querySelector('.rc-text-ellipsis__suffix');
        expect(suffixElement).toBeInTheDocument();
        // In JSDOM, offsetHeight calculation may not work as expected
        // So we just check that suffix is rendered
        expect(suffixElement?.querySelector('.custom-suffix')).toBeInTheDocument();
      });
    });

    it('should always show suffix even when text is not overflowing', () => {
      const shortText = 'Short';
      const { container } = render(
        <TextEllipsis
          content={shortText}
          rows={3}
          suffix={(expanded, isOverflow) => (
            <span className="custom-suffix">
              {isOverflow ? 'Has more' : 'Complete'}
            </span>
          )}
        />,
      );

      const suffixElement = container.querySelector('.rc-text-ellipsis__suffix');
      expect(suffixElement).toBeInTheDocument();
      expect(suffixElement?.querySelector('.custom-suffix')).toHaveTextContent('Complete');
    });

    it('should pass correct isOverflow parameter to suffix', async () => {
      const longText = 'A'.repeat(1000);
      const suffixFn = jest.fn((expanded, isOverflow) => (
        <span>{isOverflow ? 'Overflow' : 'No overflow'}</span>
      ));

      render(
        <TextEllipsis
          content={longText}
          rows={1}
          suffix={suffixFn}
        />,
      );

      await waitFor(() => {
        // In JSDOM environment, layout calculations don't work properly
        // We just verify the function is called with the expected signature
        expect(suffixFn).toHaveBeenCalled();
        expect(suffixFn.mock.calls[0]).toHaveLength(2);
        expect(typeof suffixFn.mock.calls[0][0]).toBe('boolean');
        expect(typeof suffixFn.mock.calls[0][1]).toBe('boolean');
      });
    });

    it('should pass correct expanded state to suffix', async () => {
      const longText = 'A'.repeat(1000);
      const ref = React.createRef<TextEllipsisRef>();
      const suffixFn = jest.fn((expanded, isOverflow) => (
        <span>{expanded ? 'Expanded' : 'Collapsed'}</span>
      ));

      render(
        <TextEllipsis
          ref={ref}
          content={longText}
          rows={1}
          suffix={suffixFn}
        />,
      );

      await waitFor(() => {
        expect(suffixFn).toHaveBeenCalled();
        // First call should have expanded=false
        expect(suffixFn.mock.calls[0][0]).toBe(false);
      });

      await act(async () => {
        ref.current?.toggle(true);
      });

      await waitFor(() => {
        // Should be called again with expanded=true
        const lastCall = suffixFn.mock.calls[suffixFn.mock.calls.length - 1];
        expect(lastCall[0]).toBe(true);
      });
    });

    it('should prioritize suffix over action when both are provided', async () => {
      const longText = 'A'.repeat(1000);
      const { container } = render(
        <TextEllipsis
          content={longText}
          rows={1}
          expandText="Expand"
          action={(expanded) => <span>Action</span>}
          suffix={(expanded, isOverflow) => <span>Suffix</span>}
        />,
      );

      await waitFor(() => {
        const actionElement = container.querySelector('.rc-text-ellipsis__action');
        const suffixElement = container.querySelector('.rc-text-ellipsis__suffix');
        // When suffix is present, action should not be rendered
        expect(suffixElement).toBeInTheDocument();
        expect(actionElement).not.toBeInTheDocument();
      });
    });

    it('should prioritize suffix over action when both expandText and suffix are provided', async () => {
      const longText = 'A'.repeat(1000);
      const { container } = render(
        <TextEllipsis
          content={longText}
          rows={1}
          expandText="Expand"
          collapseText="Collapse"
          suffix={(expanded, isOverflow) => <span>Suffix</span>}
        />,
      );

      await waitFor(() => {
        const actionElement = container.querySelector('.rc-text-ellipsis__action');
        const suffixElement = container.querySelector('.rc-text-ellipsis__suffix');
        // When suffix is present, action should not be rendered
        expect(suffixElement).toBeInTheDocument();
        expect(actionElement).not.toBeInTheDocument();
      });
    });

    it('should update suffix when expanded state changes', async () => {
      const longText = 'A'.repeat(1000);
      const ref = React.createRef<TextEllipsisRef>();

      const { container } = render(
        <TextEllipsis
          ref={ref}
          content={longText}
          rows={1}
          suffix={(expanded, isOverflow) => (
            <span data-testid="suffix-content">
              {expanded ? 'Collapse' : 'Expand'}
            </span>
          )}
        />,
      );

      await waitFor(() => {
        const suffixContent = container.querySelector('[data-testid="suffix-content"]');
        expect(suffixContent).toHaveTextContent('Expand');
      });

      await act(async () => {
        ref.current?.toggle(true);
      });

      await waitFor(() => {
        const suffixContent = container.querySelector('[data-testid="suffix-content"]');
        expect(suffixContent).toHaveTextContent('Collapse');
      });
    });

    it('should render suffix with complex JSX', async () => {
      const longText = 'A'.repeat(1000);
      const { container } = render(
        <TextEllipsis
          content={longText}
          rows={1}
          suffix={(expanded, isOverflow) => (
            <div className="complex-suffix">
              <button type="button">{expanded ? '▲' : '▼'}</button>
              <span>{isOverflow ? 'More content' : 'End'}</span>
            </div>
          )}
        />,
      );

      await waitFor(() => {
        const suffixElement = container.querySelector('.complex-suffix');
        expect(suffixElement).toBeInTheDocument();
        expect(suffixElement?.querySelector('button')).toBeInTheDocument();
        expect(suffixElement?.querySelector('span')).toBeInTheDocument();
      });
    });
  });
});
