import { Component } from '@geajs/core';
import './Card.css';

export default class Card extends Component {
  template() {
    const title = this.props?.title;
    const footer = this.props?.footer;

    return (
      <div class="gea-card">
        {title && (
          <div class="gea-card-header">
            <h3 class="gea-card-title">{title}</h3>
          </div>
        )}
        <div class="gea-card-body">
          {this.props?.children}
        </div>
        {footer && (
          <div class="gea-card-footer">
            {footer}
          </div>
        )}
      </div>
    );
  }
}
