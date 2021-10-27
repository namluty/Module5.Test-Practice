import {Component, OnInit} from '@angular/core';
import {Book} from '../../model/Book';
import {BookService} from '../../service/book.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {
  form: any = {};
  book: Book;
  status = 'Please fill in the form to create book';

  constructor(private bookService: BookService) {
  }

  ngOnInit(): void {
  }

  ngCreate() {

    this.book = new Book(
      this.form.title,
      this.form.author,
      this.form.description
    );
    this.bookService.createBook(this.book).subscribe(() => {
        this.status = 'Create success!';
    });
  }
}
