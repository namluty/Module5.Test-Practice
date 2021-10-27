import {Component, OnInit, ViewChild} from '@angular/core';
import {Book} from '../../model/Book';
import {BookService} from '../../service/book.service';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {DialogComponent} from '../../dialog/dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.scss']
})
export class ListBookComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'author', 'description', 'edit', 'delete', 'detail'];
  dataSource: any;
  books: Book[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private bookService: BookService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getListBook();
  }

  getListBook() {
    this.bookService.getListBook().subscribe(listbook => {
      this.books = listbook;
      this.dataSource = new MatTableDataSource<Book>(this.books);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe(() => {
      this.getListBook();
    });
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBook(id);
      }
      console.log(`Dialog result: ${result}`);
    });
  }

}
