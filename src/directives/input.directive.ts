import { Directive, ElementRef, inject, OnInit, Renderer2 } from "@angular/core";
import { FormService } from "../services/form.service";
import { fromEvent, Subscription } from "rxjs";

/**
 * This directive defines appearance and functionalities for input fielappService.
 */
@Directive({
    selector: "[cr_input]"
})
export class InputDirective implements OnInit{
    private readonly hostEl = inject(ElementRef)
    private readonly renderer = inject(Renderer2)
    private readonly fs = inject(FormService)
    private subscription: Subscription = new Subscription();
    constructor() { }

    ngOnInit(){
        const focusEvent = fromEvent(this.hostEl.nativeElement, 'focus')
        const focusSubscription = focusEvent.subscribe((event: any) => {
            const inputEl = event.target as HTMLInputElement;
            const labelEl = inputEl.nextElementSibling;
            this.renderer.addClass(labelEl, "focused")
        })

        const blurEvent = fromEvent(this.hostEl.nativeElement, 'blur')
        const blurSubscription = blurEvent.subscribe((event: any) => {
            const inputEl = event.target as HTMLInputElement;
            const labelEl = inputEl.nextElementSibling;
            const inputValue = this.fs.currentFormFields().get(inputEl.id)?.value;
            if(inputValue == null || inputValue.length == 0) this.renderer.removeClass(labelEl, "focused");
        })

        const keydownEvent = fromEvent(this.hostEl.nativeElement, 'keydown')
        const keydownSubscription = keydownEvent.subscribe((event: any) => {
            const inputEl = event.target as HTMLInputElement;
            if(inputEl.id !== 'name' && event.code == 'Space') event.preventDefault();
        })
        
        const formSubmittedSubscription = this.fs.formSubmitted.subscribe(() =>  this.removeCSSClassFromLabels())
        
        this.subscription.add(focusSubscription);
        this.subscription.add(blurSubscription);
        this.subscription.add(keydownSubscription);
        this.subscription.add(formSubmittedSubscription);
    }


    /**
     * Removes the 'focused' CSS class from all label elements within the same parent as the host element.
     * This is used to reset the appearance of the form fielappService after the form has been submitted.
     */
    removeCSSClassFromLabels(){
        const labels = this.hostEl.nativeElement.parentElement.querySelectorAll('label')
        labels.forEach((label: HTMLLabelElement) => this.renderer.removeClass(label, 'focused'))
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}