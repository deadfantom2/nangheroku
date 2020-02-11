import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { filter, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) { }

  initTitle() {
    const appTitle = this.titleService.getTitle();
    console.log(appTitle)
    this.router.events
      .pipe(
        filter(event => {
          console.log(event)
          return event instanceof NavigationEnd
        }),
        map((a) => {
          console.log(a)
          const child = this.activatedRoute.firstChild;
          console.log(child);
          if (child.snapshot.data["title"]) {
            return child.snapshot.data["title"];
          }
          return appTitle;
        })
      )
      .subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);
      });
  }
}
