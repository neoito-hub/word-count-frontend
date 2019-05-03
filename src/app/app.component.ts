import { Component, Input, OnInit, ElementRef } from "@angular/core";
import { PostSentenceService, GetWordsService, UsersService } from "./services";
import { LOCALSTORAGE_KEYS } from "./config";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  wordsList = [{ word: "this", count: 2 }];
  constructor(
    private postService: PostSentenceService,
    private getService: GetWordsService,
    private userService: UsersService
  ) {}
  ngOnInit() {
    if (localStorage.getItem(LOCALSTORAGE_KEYS.userId)) {
      this.getwords();
    } else {
      this.userService.create().subscribe();
    }
  }
  getwords() {
    this.getService.get().subscribe(r => {
      Object.keys(r).forEach(k =>
        this.wordsList.push({
          word: k,
          count: r[k]
        })
      );
    });
  }
  onSubmit(v, f) {
    this.postService.post(v.text).subscribe(r => {
      console.log(r);
      f.value = "";
      this.getwords();
    });
  }
}
