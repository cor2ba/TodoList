import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-works-individual',
  templateUrl: './works-individual.component.html',
  styleUrls: ['./works-individual.component.css'],
})
export class WorksIndividualComponent implements OnInit {
  @Input()
  worksInfo: any;

  @Output()
  changeInfo: EventEmitter<number> = new EventEmitter();
  showDates = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  deleteRegister(worksInfo: any): void {
    this.http
      .delete('http://localhost:8080/api/new/' + worksInfo._id)
      .subscribe((res) => {
        this.changeInfo.emit();
      });
  }

  activateEdition(): void {
    this.showDates = true;
  }

  back(): void {
    this.changeInfo.emit();
  }

  editWorks(worksInfo: any, newName: any): void {
    if (newName.value.length === 0) {
      return alert('Debes cambiar el texto o volver');
    }
    var params = { texto: newName.value };
    this.http
      .put('http://localhost:8080/api/new/' + worksInfo._id, params)
      .subscribe((res) => {
        this.changeInfo.emit();
      });
  }
}
