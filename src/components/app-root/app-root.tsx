import { Component, Host, h } from '@stencil/core';
// @ts-ignore
//import {mock} from 'jest';
@Component({
  tag: 'app-root',
})
export class AppRoot {
  render() {
    return <Host>Hello World</Host>;
  }
}
