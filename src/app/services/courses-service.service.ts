import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Course } from '../model/course';

@Injectable({
  providedIn: "root",
})
export class CoursesServiceService {
  constructor(private http: HttpClient) {}

  // el shareReplay nos permite hacer solo una petición aunque en un componente nos suscribamos dos veces

  loadAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>("/api/courses").pipe(
      map((res) => res["payload"]),
      shareReplay()
    );
  };

  saveCourseInfo(courseID, changes: Partial<Course>): Observable<any> {
    return this.http.put(`/api/courses/${courseID}`, changes)
  }
}
