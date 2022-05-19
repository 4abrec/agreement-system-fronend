export class CONSTANTS {
  static ROLES = {
    anonymous: 'ROLE_ANON',
    student: 'ROLE_STUDENT',
    admin: 'ROLE_ADMIN',
  }
  static EMPTY = 'EMPTY ID'
  static TOKEN_KEY = 'AuthToken';
  static USERNAME_KEY = 'AuthUsername';
  static AUTHORITIES_KEY = 'AuthAuthorities';
  static TOKEN_HEADER_KEY = 'Authorization';
  static TOKEN_TYPE_KEY = 'AuthTokenType';
  static USER_ID = "UserID";

  static TABS = {
    login: 'login',
    register: 'register',
    taskCreation: 'task-creation',
    taskView: 'task-view',
    info: 'info',
    marks: 'marks',
    journal: 'journal',
    tasks: 'tasks',
  };
}
