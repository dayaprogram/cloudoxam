
import { Directive, ElementRef, Input } from '@angular/core';
declare var MathJax: any;
/*{
  Hub: {
    Queue: (param: Object[]) =&gt; void;
  }
}*/
@Directive({
  selector: '[MathJax]'
})
export class MathJaxDirective {


  @Input("MathJax") private value: string = "";

  constructor(private element: ElementRef) { }

  ngOnChanges() {
    this.element.nativeElement.innerHTML = this.value;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.element.nativeElement]);
  }
}
