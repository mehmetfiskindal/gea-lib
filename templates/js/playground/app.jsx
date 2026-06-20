import { Component } from '@geajs/core';
import { Button, Card, counterStore } from '../src';

export default class App extends Component {
  template() {
    return (
      <div style="max-width: 800px; width: 100%; padding: 2rem;">
        <div style="text-align: center; margin-bottom: 3rem;">
          <h1 style="font-size: 3rem; font-weight: 800; background: linear-gradient(135deg, #a78bfa 0%, #ec4899 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.5rem; letter-spacing: -0.05em;">
            GeaJS Library Playground
          </h1>
          <p style="color: var(--text-secondary); font-size: 1.1rem;">
            Interactive sandbox demonstrating your reactive components
          </p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr; gap: 2rem;">
          
          {/* Reactive Counter Card */}
          <Card 
            title="Reactive State Demo" 
            footer={
              <Button variant="glass" click={() => counterStore.reset()}>
                Reset Counter
              </Button>
            }
          >
            <p style="margin-bottom: 1.5rem;">
              GeaJS utilizes deep proxies to surgically update the DOM. Click the buttons below to see the reactivity in action.
            </p>
            
            <div style="display: flex; align-items: center; justify-content: center; gap: 2rem; margin: 2rem 0; padding: 1.5rem; background: rgba(255,255,255,0.02); border-radius: 16px; border: 1px dashed rgba(255,255,255,0.08);">
              <Button variant="secondary" click={() => counterStore.decrement()}>-</Button>
              <span style="font-family: var(--font-mono); font-size: 3rem; font-weight: bold; min-width: 80px; text-align: center; color: #ffffff;">
                {counterStore.count}
              </span>
              <Button variant="primary" click={() => counterStore.increment()}>+</Button>
            </div>
          </Card>

          {/* Button Variant Showcase */}
          <Card title="Button Variants">
            <p style="margin-bottom: 1.5rem;">
              Beautiful styled buttons with hover glows and tap micro-animations.
            </p>
            
            <div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;">
              <Button variant="primary" click={() => alert('Primary clicked!')}>
                Primary Glow
              </Button>
              <Button variant="secondary" click={() => alert('Secondary clicked!')}>
                Secondary Glow
              </Button>
              <Button variant="glass" click={() => alert('Glass clicked!')}>
                Glassmorphic
              </Button>
              <Button variant="primary" disabled={true}>
                Disabled
              </Button>
            </div>
          </Card>

          {/* Integration Guide */}
          <Card title="How to Import">
            <p style="margin-bottom: 1rem;">Import components directly into your GeaJS project:</p>
            <pre style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); font-family: var(--font-mono); font-size: 0.9rem; color: #a78bfa; overflow-x: auto; white-space: pre-wrap;">
{`import { Button, Card } from 'your-library-name';

// In template:
<Card title="My Card">
  <Button click={() => doSomething()}>Click Me</Button>
</Card>`}
            </pre>
          </Card>
          
        </div>
      </div>
    );
  }
}
