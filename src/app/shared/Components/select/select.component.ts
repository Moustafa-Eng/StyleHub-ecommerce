import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {
//decorate title with input to receive data from parent component
@Input() title:string = "";
//Decorate categories with input to receive data from parent component
@Input() categories: string[] = [];
@Output()selectedValue = new EventEmitter();


detectChange(event:any){
  //Emit event and send data to parent component to filter products by category
  this.selectedValue.emit(event);
  }
}
