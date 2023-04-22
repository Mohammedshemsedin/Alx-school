import { Component, Input, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentStudent: Student = {
    name: '',
    course: '',
   Aproved: false
  };
  
  message = '';

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getStudent(this.route.snapshot.params["id"]);
    }
  }

  getStudent(id: string): void {
    this.studentService.get(id)
      .subscribe({
        next: (data) => {
          this.currentStudent = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateAproved(status: boolean): void {
    const data = {
      name: this.currentStudent.name,
      course: this.currentStudent.course,
     Aproved: status
    };

    this.message = '';

    this.studentService.update(this.currentStudent.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentStudent.Aproved = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateStudent(): void {
    this.message = '';

    this.studentService.update(this.currentStudent.id, this.currentStudent)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This student was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteStudent(): void {
    this.studentService.delete(this.currentStudent.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/students']);
        },
        error: (e) => console.error(e)
      });
  }

}