import {
  Directive,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  signal,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { CR_APP_CONFIG } from '../tokens/app.token';
import { SettingsService } from '../services/settings.service';

/**
 * This directive creates a tooltip for the buttons or links
 */
@Directive({
  selector: '[crTooltip]',
})
export class TooltipDirective implements OnInit, OnDestroy {
  private readonly renderer = inject(Renderer2);
  private readonly el = inject(ElementRef).nativeElement as HTMLElement;
  private readonly tooltipEl = this.renderer.createElement('span') as HTMLSpanElement;
  private readonly containerEl = this.renderer.createElement('div') as HTMLDivElement;
  private readonly subscription = new Subscription();
  private readonly isSidebarExpanded = signal(false);
  private readonly appConfig = inject(CR_APP_CONFIG);
  private readonly settings = inject(SettingsService);
  @Input('tooltipText') tooltipText: string = '';
  ngOnInit(): void {
    if (this.appConfig.isBrowser){
      document.body.appendChild(this.containerEl);
      this.containerEl.appendChild(this.tooltipEl);
      this.tooltipEl.classList.add('tooltip_targetEl');
    }
    const mouseenter$ = fromEvent(this.el, 'mouseenter');
    const mouseenterSubscription = mouseenter$.subscribe(() => {
      const hostElPos = this.el.getBoundingClientRect();
      this.setStyleonMouseEnter(this.tooltipEl, hostElPos);
    });

    const mouseleave$ = fromEvent(this.el, 'mouseleave');
    const mouseleaveSubscription = mouseleave$.subscribe(() => {
      this.tooltipEl.style.visibility = 'hidden'
      this.tooltipEl.style.transform = `scale(0)`
    })

    const sidebarSubscription = this.settings.isExpandedSidebar$.subscribe(value => {
      this.isSidebarExpanded.set(value);
    })

    this.subscription.add(mouseenterSubscription);
    this.subscription.add(mouseleaveSubscription);
    this.subscription.add(sidebarSubscription);
  }

  /**
   * Sets the style for the tooltip element when the mouse enters the host element.
   * @param el The tooltip element
   * @param hostElPos The position of the host element
   */
  setStyleonMouseEnter(el: HTMLSpanElement, hostElPos: DOMRect) {
    el.textContent = this.tooltipText;
    el.style.left = `${hostElPos.left + hostElPos.width + 10}px`;
    el.style.top = `${hostElPos.top + hostElPos.height / 4.5}px`;
    el.style.transform = `${this.isSidebarExpanded() ? 'scale(0)' : 'scale(1)'}`;
    el.style.visibility = `${this.isSidebarExpanded() ? 'hidden' : 'visible'}`;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
