import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { catchError, map, tap, shareReplay } from 'rxjs/operators';
import { MessagesService } from './messages.service';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {

  subject$ = new BehaviorSubject([]);
  courses$: Observable<Course[]> = this.subject$.asObservable();

  constructor(private httpClient: HttpClient,
              private messagesService: MessagesService,
              private loadingService: LoadingService) {
    this.loadServices();
   }

  loadServices() {
    const loadCourses$ = this.httpClient.get<Course[]>('/api/courses')
      .pipe(
        map(res => res['payload']),
        catchError(err => {
          const message = 'Could not load courses';
          this.messagesService.showMessages(message);
          return throwError(err);
        }),
        tap(courses => this.subject$.next(courses))
      );
    
    this.loadingService.showLoaderUntilCompleted(loadCourses$).subscribe();

  };

  saveCourseChanges(courseId, changes): Observable<any> {

    const courses = this.subject$.getValue();

    const index = courses.findIndex(course => course.id === courseId);

    const newCoursesArray = [...courses];

    const updatedCourse = {
      ...newCoursesArray[index],
      ...changes
    };

    newCoursesArray[index] = updatedCourse;

    this.subject$.next(newCoursesArray)

    return this.httpClient.put(`/api/courses/${courseId}`, changes).pipe(
      catchError(err => {
        const message = 'No se pudo actualizar el cambio';
        this.messagesService.showMessages(message);
        return throwError(err)
      }),
      shareReplay()
    )
  }

  filterByCategory(category) {
    return this.courses$.pipe(
      map(courses => courses.filter(course => course.category === category)
        .sort(sortCoursesBySeqNo))
    )
  }
}
