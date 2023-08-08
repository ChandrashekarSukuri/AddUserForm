import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBloat]',
})
export class BloatDirective {
  constructor(elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click')
  clickEvent(event: any) {
    console.log(event);
  }
}
