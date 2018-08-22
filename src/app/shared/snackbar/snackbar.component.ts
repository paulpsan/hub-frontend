import { Component, OnInit } from '@angular/core';
import { MessageDataService } from '../../services/service.index';

@Component({
  selector: 'hub-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {

  public message;
  constructor(private _messageDataService: MessageDataService) { }

  ngOnInit() {
    this._messageDataService.messageData$.subscribe(data => this.message = data)
  }

}
