import { Component } from '@geajs/core';
import './Button.css';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'glass';
  disabled?: boolean;
  click?: (e: MouseEvent) => void;
}

export default class Button extends Component {
  template() {
    const variant = this.props?.variant || 'primary';
    const disabled = this.props?.disabled || false;
    const click = this.props?.click;

    return (
      <button 
        class={`gea-btn gea-btn-${variant}`} 
        disabled={disabled}
        click={click}
      >
        {this.props?.children}
      </button>
    );
  }
}
