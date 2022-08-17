import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css'],
})
export class WorksComponent implements OnInit {
  works: any;
  error: any;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.peticionExterna();
  }

  refresh(): void {
    this.peticionExterna();
  }

  createRegister(newText: any): void {
    var input = { texto: newText.value };
    if (!newText.value.length) {
      return alert('Debes poner un mensaje para recordar');
    }

    this.http.post('http://localhost:8080/api/new', input).subscribe((res) => {
      this.peticionExterna();
    });
  }

  peticionExterna(): void {
    this.http.get('http://localhost:8080/api/new').subscribe(
      (res) => (this.works = res),
      (error) => (this.error = error)
    );
  }
}
