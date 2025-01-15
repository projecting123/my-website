import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ButtonService {
    private readonly renderer!: Renderer2;
    constructor(private readonly rendererFactory: RendererFactory2) {
      this.renderer = this.rendererFactory.createRenderer(null, null);
    }
    /**
   * Disables or enables the button based on the form state and the current action.
   * It also adappService or removes a "disabled_btn" class from the button.
   */
  setButtonDisability(element: HTMLButtonElement, isDisabled: boolean) {
    if (isDisabled) {
      this.renderer.addClass(element, 'disabled_btn');
      this.renderer.setProperty(element, 'disabled', true);
    } else {
      this.renderer.removeClass(element, 'disabled_btn');
      this.renderer.setProperty(element, 'disabled', false);
    }
  }
}