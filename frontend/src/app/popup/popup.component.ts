import {Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {PopupService} from "../services/popup.service";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PopupComponent implements OnInit, OnDestroy{
  @Input() id?: string;
  isOpen = false;
  private element: any;

  constructor(private popupService: PopupService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    // add self (this modal instance) to the modal service so it can be opened from any component
    this.popupService.add(this);

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', (el: any) => {
      if (el.target.className === 'jw-popup') {
        this.close();
      }
    });
    this.close();
  }

  ngOnDestroy() {
    // remove self from modal service
    this.popupService.remove(this);

    // remove modal element from html
    this.element.remove();
  }

  open() {
    this.element.style.display = 'block';
    document.body.classList.add('jw-popup-open');
    this.isOpen = true;
  }

  close() {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-popup-open');
    this.isOpen = false;
  }
}
