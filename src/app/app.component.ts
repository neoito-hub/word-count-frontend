import { Component, Input, OnInit } from "@angular/core";
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
    if (!localStorage.getItem(LOCALSTORAGE_KEYS.userId)) {
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
  onSubmit(v) {
    console.log(v);
    this.postService.post(v.text).subscribe(r => {
      console.log(r);
      this.getwords();
    });
  }
}
