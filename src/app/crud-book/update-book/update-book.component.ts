import {Component, OnInit} from '@angular/core';
import {Book} from '../../model/Book';
import {ActivatedRoute} from '@angular/router';
import {BookService} from '../../service/book.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss']
})
export class UpdateBookComponent implements OnInit {
  book: Book;
  status = 'Form Edit Book!!!';
  success: any = {
    message: 'update_success'
  };

  constructor(private atRouter: ActivatedRoute,
              private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
    this.atRouter.paramMap.subscribe(ctgId => {
      const id = +ctgId.get('id');
      this.bookService.detailBook(id).subscribe(bks => {
        this.book = bks;
      });
    });
  }

  ngUpdate() {
    this.bookService.updateBook(this.book.id, this.book).subscribe(() => {
      this.status = 'Update Success!';
    })
  };
}
