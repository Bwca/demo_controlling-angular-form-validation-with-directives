import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[ifApplicable]',
})
export class IfApplicableDirective {
  @Input('ifApplicableControl') control!: AbstractControl<
    unknown,
    unknown
  > | null;

  @Input('ifApplicable') set applicable(condition: boolean) {
    queueMicrotask(() => {
      if (condition) {
        this.createControlView();
      } else {
        this.removeControlView();
      }
    });
  }

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainerRef: ViewContainerRef
  ) {}

  private createControlView(): void {
    this.control?.enable();
    this.viewContainerRef.createEmbeddedView(this.templateRef);
  }

  private removeControlView(): void {
    this.control?.disable();
    this.viewContainerRef.clear();
  }
}
