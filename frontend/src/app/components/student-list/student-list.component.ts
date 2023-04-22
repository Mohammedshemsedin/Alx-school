import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentsListComponent implements OnInit {

  students?: Student[];
  currentStudent: Student = {};
  currentIndex = -1;
  title = '';

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.retrieveStudents();
  }

  retrieveStudents(): void {
    this.studentService.getAll()
      .subscribe({
        next: (data) => {
          this.students = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveStudents();
    this.currentStudent = {};
    this.currentIndex = -1;
  }

  setActiveStudent(student: Student, index: number): void {
    this.currentStudent = student;
    this.currentIndex = index;
  }

  removeAllStudents(): void {
    this.studentService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentStudent = {};
    this.currentIndex = -1;

    this.studentService.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.students = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}