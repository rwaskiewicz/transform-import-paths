import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-root',
})
export class AppRoot {
  render() {
    return (
      <Host>
          Hello World
      </Host>
    );
  }
}
