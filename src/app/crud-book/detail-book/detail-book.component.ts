import {Component, OnInit} from '@angular/core';
import {BookService} from '../../service/book.service';
import {Book} from '../../model/Book';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  styleUrls: ['./detail-book.component.scss']
})
export class DetailBookComponent implements OnInit {
  form: any = {};
  book: Book;

  constructor(private atRouter: ActivatedRoute,
              private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
    this.atRouter.paramMap.subscribe(ctgId => {
      const id = +ctgId.get('id');
      this.bookService.detailBook(id).subscribe(res => {
        this.book = res;
      });
    });
  }

}
