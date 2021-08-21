import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core'

enum DateColors {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
  Yellow = 'yellow'
}

@Directive({
  selector: '[appDateHighlighter]'
})
export class DateHighlighterDirective implements OnInit {
  @Input() appDateHighlighter = ''

  private colorClass = DateColors.Yellow

  constructor(private el: ElementRef, private renderer2: Renderer2) {}

  ngOnInit(): void {
    this.defineColor()
    this.renderer2.addClass(this.el.nativeElement, this.colorClass)
  }

  private defineColor(): void {
    const date = new Date(this.appDateHighlighter).getTime() || Date.now()
    if (date > this.getTimeFromDaysPassed(7)) {
      this.colorClass = DateColors.Blue
    } else if (date > this.getTimeFromMonthsPassed(1)) {
      this.colorClass = DateColors.Green
    } else if (date < this.getTimeFromMonthsPassed(6)) {
      this.colorClass = DateColors.Red
    }
  }

  private getTimeFromDaysPassed(days: number): number {
    return new Date(Date.now() - days * 24 * 60 * 60 * 1000).getTime()
  }

  private getTimeFromMonthsPassed(monthsPassed: number): number {
    const d = new Date()
    const m = d.getMonth()
    d.setMonth(d.getMonth() - monthsPassed)
    // If still in same month, set date to last day of
    // previous month
    if (d.getMonth() === m) d.setDate(0)
    return d.getTime()
  }
}
