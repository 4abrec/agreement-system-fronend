import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../service/token.service";
import {UserDto} from "../../model/userDto";
import {UserService} from "../../service/user-service/user.service";
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {MessageDto} from "../../model/messageDto";
import {interval, map, Observable, startWith} from "rxjs";
import {dateInputsHaveChanged} from "@angular/material/datepicker/datepicker-input-base";
import {ViewProfileDialogComponent} from "../view-profile-dialog/view-profile-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {

  constructor(private tokenService: TokenService, private userService: UserService, private dialog: MatDialog) {
    interval(5000).subscribe(x => {
      this.getAllMessages();
    });
  }

  private _filterUsers(value: string): UserDto[] {
    const filterValue = value.toLowerCase();

    return this.users.filter(state => state.fio.toLowerCase().includes(filterValue));
  }

  public senderUsername: string;
  public recipientUsername: string;
  public roles: string[] = this.tokenService.getAuthorities();
  public chatList: UserDto[];
  public sentMessage: string = "";
  public allMessages: MessageDto[];
  public senderUser: UserDto;
  public selectedUser: UserDto;
  public users: UserDto[];

  myControl = new FormControl();
  filteredUsers: Observable<UserDto[]>;

  ngOnInit(): void {
    this.senderUsername = <string>this.tokenService.getUsername();
    this.scrollChatHistory();
    let sub = this.userService.getAllUserChat(this.senderUsername).subscribe(data => {
      this.chatList = data;
      this.getUserByUsername();
      this.getAllUsers();
      sub.unsubscribe();
    })
  }

  getAllUsersChat() {
    let sub = this.userService.getAllUserChat(this.senderUsername).subscribe(data => {
      this.chatList = data;
      sub.unsubscribe();
    })
  }

  getAllUsers() {
    let sub = this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = this.myControl.valueChanges.pipe(
        startWith(''),
        map(state => (state ? this._filterUsers(state) : this.users.slice())),
      );
      sub.unsubscribe()
    })
  }


  onSelFunc(option: any){
    let sub = this.userService.addChat(this.senderUsername, option.username).subscribe(data => {
      this.getAllUsersChat();
      sub.unsubscribe();
    })
  }


  getUserByUsername() {
    let sub = this.userService.getUserByUsername(this.senderUsername).subscribe(data => {
      this.senderUser = data;
      sub.unsubscribe();
    })
  }

  getAllMessages() {
    let sub = this.userService.getAllMessages(this.senderUsername, this.recipientUsername).subscribe(data => {
      this.allMessages = data;
      console.log(this.allMessages);
      this.scrollChatHistory();
      sub.unsubscribe();
    });

  }

  setFocusChat(id: number) {
    let el = document.getElementById(id.toString())
    let parent = document.querySelector('.chat-list');
    // @ts-ignore
    let menuItem = parent.querySelectorAll('.clearfix');
    for (let i = 0; i < menuItem.length; i++) {
      menuItem[i].classList.remove('active');
    }
    // @ts-ignore
    el.classList.add('active');
    this.scrollChatHistory();
  }

  formatData(date: string): string {
    const formatDate = new Date(date);
    this.scrollChatHistory();
    return formatDate.toLocaleString();
  }

  sendMessage(form: NgForm) {
    console.log(form.value);
    console.log(this.sentMessage);
    let sub = this.userService.sendMessage(this.senderUsername, this.recipientUsername, this.sentMessage).subscribe(data => {
      this.sentMessage = "";
      this.scrollChatHistory();
      this.getAllMessages();
      sub.unsubscribe();
    })
  }

  selectChat(user: UserDto, id: number) {
    this.setFocusChat(id);
    this.selectedUser = user;
    this.recipientUsername = user.username;
    this.getAllMessages();
  }

  scrollChatHistory() {
    const element = document.getElementById("lol");
    // @ts-ignore
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }

  viewProfile(fio: string) {
    console.log(fio);
    const dialogRef = this.dialog.open(ViewProfileDialogComponent, {
      width: '45%',
      panelClass: "myClass",
      maxHeight: "650px",
      data: fio
    });
  }

}
