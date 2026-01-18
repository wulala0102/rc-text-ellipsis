import React from 'react';
import { createRoot } from 'react-dom/client';
import TextEllipsis from '../src';
import '../assets/index.css';

const longText =
  'This is a very long text that needs to be truncated with ellipsis. It contains multiple sentences and should demonstrate the text ellipsis functionality. The component supports different positions for the ellipsis including start, middle, and end positions. You can also expand and collapse the text by clicking the action button. This component is perfect for limiting text in cards, lists, descriptions, and any other UI elements where space is limited.';

const App: React.FC = () => {
  const textEllipsisRef = React.useRef<any>(null);

  return (
    <div className="container">
      <div className="section">
        <h2>✨ Features</h2>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>🎯 Multi-line text truncation with precise control</li>
          <li>📍 Three ellipsis positions: start, middle, end</li>
          <li>🔄 Expand/collapse functionality</li>
          <li>🎨 Customizable action buttons</li>
          <li>📱 Responsive - auto-recalculates on window resize</li>
          <li>🎛️ Imperative API via ref</li>
          <li>💪 TypeScript support</li>
          <li>⚡ Efficient binary search algorithm</li>
        </ul>
      </div>

      <div className="section">
        <h2>🚀 Installation</h2>
        <div className="code-block">
          npm install rc-text-ellipsis --save
        </div>
      </div>

      <div className="section">
        <h2>📖 Basic Examples</h2>

        <div className="demo-box">
          <div className="demo-title">Single Line Truncation</div>
          <TextEllipsis
            rows={1}
            content={longText}
            expandText="Expand"
            collapseText="Collapse"
          />
          <div className="code-block">
{`<TextEllipsis
  rows={1}
  content="Your text here..."
  expandText="Expand"
  collapseText="Collapse"
/>`}
          </div>
        </div>

        <div className="demo-box">
          <div className="demo-title">Multi-line (3 rows)</div>
          <TextEllipsis
            rows={3}
            content={longText}
            expandText="Read More"
            collapseText="Show Less"
          />
          <div className="code-block">
{`<TextEllipsis
  rows={3}
  content="Your text here..."
  expandText="Read More"
  collapseText="Show Less"
/>`}
          </div>
        </div>

        <div className="demo-box">
          <div className="demo-title">Custom Dots</div>
          <TextEllipsis
            rows={2}
            dots="---"
            content={longText}
            expandText="More"
            collapseText="Less"
          />
          <div className="code-block">
{`<TextEllipsis
  rows={2}
  dots="---"
  content="Your text here..."
  expandText="More"
  collapseText="Less"
/>`}
          </div>
        </div>
      </div>

      <div className="section">
        <h2>📍 Ellipsis Positions</h2>

        <div className="demo-box">
          <div className="demo-title">Position: End (Default)</div>
          <TextEllipsis
            rows={2}
            position="end"
            content={longText}
            expandText="Expand"
            collapseText="Collapse"
          />
        </div>

        <div className="demo-box">
          <div className="demo-title">Position: Start</div>
          <TextEllipsis
            rows={2}
            position="start"
            content={longText}
            expandText="Expand"
            collapseText="Collapse"
          />
        </div>

        <div className="demo-box">
          <div className="demo-title">Position: Middle</div>
          <TextEllipsis
            rows={2}
            position="middle"
            content={longText}
            expandText="Expand"
            collapseText="Collapse"
          />
        </div>
      </div>

      <div className="section">
        <h2>🎨 Custom Action Button</h2>

        <div className="demo-box">
          <div className="demo-title">With Custom Action Render</div>
          <TextEllipsis
            rows={2}
            content={longText}
            action={(expanded) => (
              <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>
                {expanded ? '▲ Collapse' : '▼ Expand'}
              </span>
            )}
          />
          <div className="code-block">
{`<TextEllipsis
  rows={2}
  content="Your text here..."
  action={(expanded) => (
    <span>
      {expanded ? '▲ Collapse' : '▼ Expand'}
    </span>
  )}
/>`}
          </div>
        </div>
      </div>

      <div className="section">
        <h2>🎛️ External Control via Ref</h2>

        <div className="demo-box">
          <div className="demo-title">Control from outside</div>
          <TextEllipsis
            ref={textEllipsisRef}
            rows={2}
            content={longText}
            expandText="Expand"
            collapseText="Collapse"
          />
          <div style={{ marginTop: '1rem' }}>
            <button onClick={() => textEllipsisRef.current?.toggle(true)}>
              Expand Programmatically
            </button>
            <button onClick={() => textEllipsisRef.current?.toggle(false)}>
              Collapse Programmatically
            </button>
            <button onClick={() => textEllipsisRef.current?.toggle()}>
              Toggle
            </button>
          </div>
          <div className="code-block">
{`const ref = useRef();

<TextEllipsis
  ref={ref}
  rows={2}
  content="Your text here..."
/>

<button onClick={() => ref.current?.toggle(true)}>
  Expand
</button>`}
          </div>
        </div>
      </div>

      <div className="section">
        <h2>📚 API Reference</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem', borderBottom: '2px solid #ddd' }}>Prop</th>
              <th style={{ padding: '0.75rem', borderBottom: '2px solid #ddd' }}>Type</th>
              <th style={{ padding: '0.75rem', borderBottom: '2px solid #ddd' }}>Default</th>
              <th style={{ padding: '0.75rem', borderBottom: '2px solid #ddd' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}><code>content</code></td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>string</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>''</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>The text content to display</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}><code>rows</code></td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>number</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>1</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Number of lines to display</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}><code>dots</code></td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>string</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>'...'</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>The ellipsis text</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}><code>position</code></td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>'start' | 'middle' | 'end'</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>'end'</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Position of ellipsis</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}><code>expandText</code></td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>string</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>''</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Text for expand button</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}><code>collapseText</code></td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>string</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>''</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Text for collapse button</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}><code>action</code></td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>(expanded) =&gt; ReactNode</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>-</td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>Custom action button renderer</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem' }}><code>onClickAction</code></td>
              <td style={{ padding: '0.75rem' }}>(e) =&gt; void</td>
              <td style={{ padding: '0.75rem' }}>-</td>
              <td style={{ padding: '0.75rem' }}>Callback when action is clicked</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
