import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./component/auth/login/login.component";
import {InfoComponent} from "./component/info/info.component";
import {ModuleComponent} from "./component/module/module.component";
import {StatsComponent} from "./component/stats/stats.component";
import {ChatComponent} from "./component/chat/chat.component";
import {AgreementComponent} from "./component/agreement/agreement.component";
import {ProfileComponent} from "./component/profile/profile.component";
import {StudentComponent} from "./component/student/student.component";
import {TaskComponent} from "./component/task/task.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'info', component: InfoComponent},
  {path: 'module', component: ModuleComponent},
  {path: 'tasks', component: TaskComponent},
  {path: 'stats', component: StatsComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'agreement', component: AgreementComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'students', component: StudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
