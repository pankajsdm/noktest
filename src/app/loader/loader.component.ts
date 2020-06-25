import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {


  @Input() number: number;
  @Input() message: string;
  totalNum = [];

  constructor() { }

  ngOnInit() {
    for(let i=0; i<=this.number; i++){
      this.totalNum.push(i);
    }
    
  }

}
