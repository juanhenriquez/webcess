import { Directive, HostListener, ElementRef, Renderer2, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[windowBar]'
})
export class WindowBarDirective implements OnInit, AfterViewInit {

  @ViewChild('li') iconGreen;

  isMaximized: boolean = false;
  isDraggableInitialized: boolean = false;

  constructor(
    private el: ElementRef,
    private _renderer: Renderer2
  ) { }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter() {
    const window = this._renderer.parentNode(this.el.nativeElement);
    if (this.isDraggableInitialized) {
      $(window).draggable('enable');
    } else {
      $(window).draggable();
      this.isDraggableInitialized = true;
    }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave() {
    const window = this._renderer.parentNode(this.el.nativeElement);
    $(window).draggable('disable');
  }

  ngOnInit() {
    const window = this._renderer.parentNode(this.el.nativeElement);
    $(window).resizable({
      handles: "all",
      minHeight: 400,
      minWidth: 500,
      start: () => {
        this.isMaximized = false;
        this.onMouseEnter();
        console.log(this.isDraggableInitialized, this.isMaximized);
      }
    });
  }

  ngAfterViewInit() {
    console.log(this.iconGreen);
  }

}