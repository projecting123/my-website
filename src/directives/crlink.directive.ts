import {
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { CR_CSS_CONFIG } from '../tokens/customcss.token';
import { CR_APP_CONFIG } from '../tokens/app.token';

/**
 * This directive creates ripple effect on click of a link.
 */
@Directive({
  selector: '[crLink]',
})
export class CRLinkDirective implements OnInit, OnDestroy {
  public readonly subscription: Subscription = new Subscription();
  private readonly renderer = inject(Renderer2);
  public readonly appConfig = inject(CR_APP_CONFIG);
  public readonly cssConfig = inject(CR_CSS_CONFIG);
  private readonly el = inject(ElementRef).nativeElement as
    | HTMLAnchorElement
    | HTMLButtonElement;
  public readonly ripple_span = this.renderer.createElement(
    'span'
  ) as HTMLSpanElement;
  timeout!: NodeJS.Timeout;
  ngOnInit(): void {
    const alreadyExistStyleEl =
      this.appConfig.documentObj.head.querySelector(`#cr_ripple_style`);
    if (!alreadyExistStyleEl) {
      const style = this.renderer.createElement('style') as HTMLStyleElement;
      style.innerHTML = this.cssConfig.ripple_targetEl_CSS_Rule;
      style.id = 'cr_ripple_style';
      this.appConfig.documentObj.head.appendChild(style);
    }

    this.el.classList.add('ripple_targetEl');
    this.el.appendChild(this.ripple_span);
    const mousedown$ = fromEvent(this.el, 'pointerdown');
    const mousedownSubscription = mousedown$.subscribe((e: any) =>
      this.createRipple(e)
    );
    this.subscription.add(mousedownSubscription);
  }

  /**
   * Creates a ripple effect by adding a `span` element to the host element,
   * and adding a CSS rule to the global stylesheet to define the appearance
   * of the ripple effect.
   */
  createRipple(e: PointerEvent) {
    if (this.timeout) clearTimeout(this.timeout);
    const rippleInnerSpan = document.createElement('span');
    const targetElRect = this.el.getBoundingClientRect();
    const diameter = Math.max(targetElRect.width, targetElRect.height);
    const x = e.clientX - targetElRect.left;
    const y = e.clientY - targetElRect.top;
    rippleInnerSpan.style.position = 'absolute';
    rippleInnerSpan.style.top = `${y}px`;
    rippleInnerSpan.style.left = `${x}px`;
    rippleInnerSpan.style.width = `1px`;
    rippleInnerSpan.style.height = `1px`;
    rippleInnerSpan.style.transition = `all 0.4s ease-in-out`;
    rippleInnerSpan.style.transform = `scale(0)`;
    rippleInnerSpan.style.borderRadius = `50%`;
    rippleInnerSpan.style.backgroundColor = `rgba(0, 92, 187, 0.3)`;
    this.ripple_span.appendChild(rippleInnerSpan);
    requestAnimationFrame(() => {
      rippleInnerSpan.style.transform = `scale(${diameter * 2.5})`;
    });

    const mouseUp$ = fromEvent(this.el, 'pointerup', { once: true });
    const mouseUpSubscription = mouseUp$.subscribe(() => {
      rippleInnerSpan.style.opacity = '0';
      this.timeout = setTimeout(() => rippleInnerSpan.remove(), 400);
    });
    this.subscription.add(mouseUpSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
