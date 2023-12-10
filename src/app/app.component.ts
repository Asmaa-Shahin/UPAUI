import { Component } from '@angular/core';
import { LoggedUser } from './shared/models/userVM';
import { AuthenticationService } from './shared/services/guards/authentication.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as signalR from '@microsoft/signalr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Assets Management System';
  currentUser: LoggedUser;
  isRefreshed = false;
  lang = localStorage.getItem("lang")
  direction: string = "";
  userCookieObj: LoggedUser;
  userObj: LoggedUser;
  private hubConnection!: signalR.HubConnection;
  selectedLang: string;
  messages: string[] = [];
  newMessage: string = '';
  constructor(private authenticationService: AuthenticationService, private router: Router,
    private translate: TranslateService) {


    if (localStorage.getItem("lang") == null) {
      this.lang == 'en'
      this.direction = 'ltr';
    }
    else if (this.lang == 'en') {
      this.direction = 'ltr';
    } else if (this.lang == 'ar') {
      this.direction = 'rtl';
    }

  }
  ngOnInit(): void {
    // this.userObj = {
    //   email: '', userNameAr: '', id: '', userName: '', roleName: '', roleNames: [], displayName: '', token: '', isRemembered: false,
    //   governorateId: 0, organizationId: 0, govName: '', orgName: '', govNameAr: '', orgNameAr: ''
    // }
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:42082/ChatHub') // Ensure this URL is correct
    .configureLogging(signalR.LogLevel.Information)
    .build();

    this.hubConnection.start()
      .then(() => {
        console.log('Connected to SignalR hub!');
      })
      .catch(err => {
        console.error(err.toString());
      });

    this.hubConnection.on('ReceiveMessage', (message: string) => {
      this.messages.push(message);
    });
  }
  sendMessage() {
    if (this.newMessage) {
      this.hubConnection.invoke('SendMessage', this.newMessage);
      this.newMessage = '';
    }
  }
}
