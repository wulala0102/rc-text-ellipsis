// use jsx to render html, do not modify simple.html

import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/index.css';
import TextEllipsis from '../src';

const longText =
  'This is a very long text that needs to be truncated with ellipsis. It contains multiple sentences and should demonstrate the text ellipsis functionality. The component supports different positions for the ellipsis including start, middle, and end positions. You can also expand and collapse the text by clicking the action button.';

const App: React.FC = () => {
  const textEllipsisRef = React.useRef<any>(null);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>rc-text-ellipsis Examples</h1>

      <div style={{ marginBottom: '40px' }}>
        <h2>Basic Usage (Single Line)</h2>
        <TextEllipsis
          rows={1}
          content={longText}
          expandText="Expand"
          collapseText="Collapse"
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Multiple Lines (3 rows)</h2>
        <TextEllipsis
          rows={3}
          content={longText}
          expandText="Read More"
          collapseText="Show Less"
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Custom Dots</h2>
        <TextEllipsis
          rows={2}
          dots="..."
          content={longText}
          expandText="More"
          collapseText="Less"
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Position: Start</h2>
        <TextEllipsis
          rows={2}
          position="start"
          content={longText}
          expandText="Expand"
          collapseText="Collapse"
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Position: Middle</h2>
        <TextEllipsis
          rows={2}
          position="middle"
          content={longText}
          expandText="Expand"
          collapseText="Collapse"
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>With Custom Action</h2>
        <TextEllipsis
          rows={2}
          content={longText}
          action={(expanded) => (
            <span style={{ color: 'red', fontWeight: 'bold' }}>
              {expanded ? '[ Fold ]' : '[ Unfold ]'}
            </span>
          )}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>With Ref Control</h2>
        <TextEllipsis
          ref={textEllipsisRef}
          rows={2}
          content={longText}
          expandText="Expand"
          collapseText="Collapse"
        />
        <div style={{ marginTop: '10px' }}>
          <button onClick={() => textEllipsisRef.current?.toggle(true)}>
            Expand from outside
          </button>
          <button onClick={() => textEllipsisRef.current?.toggle(false)} style={{ marginLeft: '10px' }}>
            Collapse from outside
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>With Click Handler</h2>
        <TextEllipsis
          rows={2}
          content={longText}
          expandText="Expand"
          collapseText="Collapse"
          onClickAction={(e) => {
            console.log('Action clicked:', e);
            alert('Action clicked!');
          }}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Short Text (No Ellipsis)</h2>
        <TextEllipsis
          rows={3}
          content="This is a short text."
          expandText="Expand"
          collapseText="Collapse"
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>With Suffix (Always Visible)</h2>
        <TextEllipsis
          rows={2}
          content={longText}
          suffix={(expanded, isOverflow) => (
            <span style={{ color: 'blue', marginLeft: '4px', cursor: 'pointer' }}>
              {isOverflow ? (expanded ? '[Collapse]' : '[Expand]') : '[Complete]'}
            </span>
          )}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>With Suffix (Custom Style)</h2>
        <TextEllipsis
          rows={2}
          content={longText}
          suffix={(expanded, isOverflow) => (
            <span
              style={{
                color: '#1890ff',
                fontWeight: 'bold',
                padding: '2px 8px',
                border: '1px solid #1890ff',
                borderRadius: '4px',
                marginLeft: '8px',
                fontSize: '12px'
              }}
            >
              {isOverflow ? (expanded ? '▲' : '▼') : '✓'}
            </span>
          )}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>With Suffix (Short Text - No Overflow)</h2>
        <TextEllipsis
          rows={3}
          content="This is a short text that doesn't need ellipsis."
          suffix={(expanded, isOverflow) => (
            <span style={{ color: isOverflow ? 'orange' : 'green', marginLeft: '4px' }}>
              {isOverflow ? '[Has More]' : '[End]'}
            </span>
          )}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2>Suffix vs Action (Suffix has priority)</h2>
        <TextEllipsis
          rows={2}
          content={longText}
          expandText="Expand"
          collapseText="Collapse"
          suffix={(expanded, isOverflow) => (
            <span style={{ color: 'green' }}>
              [Suffix is shown because it takes priority]
            </span>
          )}
        />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('__react-content'));
