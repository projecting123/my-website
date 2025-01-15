import { Directive, OnInit } from '@angular/core';

@Directive({
    selector: '[crCard]',
})
export class CardDirective implements OnInit{
    ngOnInit(): void {}
}