import '@testing-library/jest-dom';

// Mock window.matchMedia for resize tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock getComputedStyle to provide default values
const mockGetComputedStyle: typeof window.getComputedStyle = (element: Element) => {
  const mockStyle: Partial<CSSStyleDeclaration> = {
    getPropertyValue: (prop: string) => {
      const defaults: Record<string, string> = {
        'line-height': '24px',
        'padding-top': '0px',
        'padding-bottom': '0px',
        'font-size': '16px',
      };
      return defaults[prop] || '';
    },
    lineHeight: '24px',
    paddingTop: '0px',
    paddingBottom: '0px',
    fontSize: '16px',
  };
  return mockStyle as CSSStyleDeclaration;
};

window.getComputedStyle = mockGetComputedStyle;
