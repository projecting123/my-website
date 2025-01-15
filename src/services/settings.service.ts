import { DOCUMENT } from '@angular/common';
import { inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { SnackbarOptions } from '../interfaces/settings';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private readonly document = inject(DOCUMENT);
    private readonly renderer: Renderer2;
    readonly isExpandedSidebar$ = new BehaviorSubject<boolean>(false);
    constructor(private rendererFactory: RendererFactory2) { 
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }

    /**
     * Opens a snackbar with the given message.
     * @param message The message to show in the snackbar.
     * @param timeout The timeout in milliseconappService to show the snackbar. Defaults to 3000.
     * @param bgColor The background color to use for the snackbar. Defaults to 'SUCCESS'. Possible values are 'SUCCESS', 'WARNING', 'ERROR'.
     */
    openSnackbar(message: string, options: SnackbarOptions) {
        const snackbar = this.renderer.createElement('div');
        this.renderer.addClass(snackbar, 'snackbar');
        const p = this.renderer.createElement('p');
        this.renderer.appendChild(snackbar, p);
        this.renderer.setProperty(p, 'innerHTML', message);
        this.renderer.setStyle(snackbar, 'background-color', options.bgColor == 'SUCCESS' ? 'rgb(40, 167, 69)' : options.bgColor == 'WARNING' ? 'rgb(255, 193, 7)' : 'rgb(226, 27, 47)');
        this.renderer.appendChild(this.document.body, snackbar);

        const snackbarHideTimeout = setTimeout(() => {
            this.renderer.addClass(snackbar, 'snackbar_hide')
        }, 2500);

        const snackbarHideTimeout2 = setTimeout(() => {
            this.renderer.removeClass(snackbar, 'snackbar');
            this.renderer.removeChild(this.document.body, snackbar);
            clearTimeout(snackbarHideTimeout);
            clearTimeout(snackbarHideTimeout2);
        }, 3000);
    }
}