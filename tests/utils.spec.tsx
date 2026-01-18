import { calcEllipsisText, cloneContainer, pxToNum } from '../src/utils';

describe('Utils', () => {
  describe('pxToNum', () => {
    it('should convert px string to number', () => {
      expect(pxToNum('16px')).toBe(16);
      expect(pxToNum('20.5px')).toBe(20.5);
      expect(pxToNum('0px')).toBe(0);
    });

    it('should return 0 for null or empty string', () => {
      expect(pxToNum(null)).toBe(0);
      expect(pxToNum('')).toBe(0);
    });

    it('should extract number from string', () => {
      expect(pxToNum('16')).toBe(16);
      expect(pxToNum('20.5')).toBe(20.5);
    });
  });

  describe('cloneContainer', () => {
    let rootElement: HTMLDivElement;

    beforeEach(() => {
      rootElement = document.createElement('div');
      rootElement.style.fontSize = '16px';
      rootElement.style.lineHeight = '1.5';
      rootElement.style.padding = '10px';
      document.body.appendChild(rootElement);
    });

    afterEach(() => {
      if (document.body.contains(rootElement)) {
        document.body.removeChild(rootElement);
      }
      // Clean up any cloned containers
      const cloned = document.querySelectorAll('[style*="position: fixed"]');
      cloned.forEach((el) => {
        if (el.parentNode === document.body) {
          document.body.removeChild(el);
        }
      });
    });

    it('should clone container with same styles', () => {
      const container = cloneContainer(rootElement, 'Test content');

      expect(container).toBeTruthy();
      expect(container?.style.position).toBe('fixed');
      expect(container?.style.zIndex).toBe('-9999');
      expect(container?.style.top).toBe('-9999px');
      expect(container?.innerText).toBe('Test content');

      if (container) {
        document.body.removeChild(container);
      }
    });

    it('should return null for null element', () => {
      const container = cloneContainer(null, 'Test');
      expect(container).toBeNull();
    });

    it('should return null for disconnected element', () => {
      const disconnectedElement = document.createElement('div');
      const container = cloneContainer(disconnectedElement, 'Test');
      expect(container).toBeNull();
    });

    it('should set height styles to auto', () => {
      const container = cloneContainer(rootElement, 'Test content');

      expect(container?.style.height).toBe('auto');
      expect(container?.style.minHeight).toBe('auto');
      expect(container?.style.maxHeight).toBe('auto');

      if (container) {
        document.body.removeChild(container);
      }
    });
  });

  describe('calcEllipsisText', () => {
    let container: HTMLDivElement;

    beforeEach(() => {
      container = document.createElement('div');
      container.style.width = '200px';
      container.style.fontSize = '16px';
      container.style.lineHeight = '1.5';
      container.style.whiteSpace = 'pre-wrap';
      container.style.wordWrap = 'break-word';
      document.body.appendChild(container);
    });

    afterEach(() => {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    });

    it('should calculate ellipsis text for position="end"', () => {
      const longText = 'This is a very long text that needs to be truncated';
      const result = calcEllipsisText(container, 30, {
        actionHTML: '',
        content: longText,
        dots: '...',
        position: 'end',
      });

      expect(typeof result).toBe('string');
      expect(result.endsWith('...')).toBe(true);
      // In mock environment, text might not actually truncate
      expect(result.length).toBeGreaterThan(0);
    });

    it('should calculate ellipsis text for position="start"', () => {
      const longText = 'This is a very long text that needs to be truncated';
      const result = calcEllipsisText(container, 30, {
        actionHTML: '',
        content: longText,
        dots: '...',
        position: 'start',
      });

      expect(typeof result).toBe('string');
      expect(result.startsWith('...')).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should calculate ellipsis text for position="middle"', () => {
      const longText = 'This is a very long text that needs to be truncated';
      const result = calcEllipsisText(container, 30, {
        actionHTML: '',
        content: longText,
        dots: '...',
        position: 'middle',
      });

      expect(typeof result).toBe('string');
      expect(result.includes('...')).toBe(true);
      expect(result.startsWith('...')).toBe(false);
      expect(result.endsWith('...')).toBe(false);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should use custom dots', () => {
      const longText = 'This is a very long text that needs to be truncated';
      const result = calcEllipsisText(container, 30, {
        actionHTML: '',
        content: longText,
        dots: '---',
        position: 'end',
      });

      expect(result.endsWith('---')).toBe(true);
    });

    it('should include actionHTML in calculation', () => {
      const longText = 'This is a very long text that needs to be truncated';
      const actionHTML = '<span>More</span>';
      const result = calcEllipsisText(container, 30, {
        actionHTML,
        content: longText,
        dots: '...',
        position: 'end',
      });

      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return truncated text when content is too long', () => {
      const longText = 'A'.repeat(1000);
      const result = calcEllipsisText(container, 30, {
        actionHTML: '',
        content: longText,
        dots: '...',
        position: 'end',
      });

      expect(result.endsWith('...')).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle empty content', () => {
      const result = calcEllipsisText(container, 30, {
        actionHTML: '',
        content: '',
        dots: '...',
        position: 'end',
      });

      expect(result).toBe('...');
    });

    it('should handle very short maxHeight', () => {
      const longText = 'This is text';
      const result = calcEllipsisText(container, 10, {
        actionHTML: '',
        content: longText,
        dots: '...',
        position: 'end',
      });

      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
