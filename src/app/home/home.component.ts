import {Component, OnInit} from '@angular/core';
import { Course, sortCoursesBySeqNo } from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import { CoursesServiceService } from '../services/courses-service.service';
import { LoadingService } from '../services/loading.service';
import { MessagesService } from '../services/messages.service';
import { CoursesStoreService } from '../services/courses-store.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(
    private coursesStore: CoursesStoreService) {

  }

  ngOnInit() {

    this.reloadCourses();

  };

  reloadCourses(){

    this.beginnerCourses$ = this.coursesStore.filterByCategory('BEGINNER');

    this.advancedCourses$ = this.coursesStore.filterByCategory('ADVANCED');

  }

}




