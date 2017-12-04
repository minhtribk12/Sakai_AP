/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     12/2/2017 5:29:29 PM                         */
/*==============================================================*/


drop table if exists ANNOUNCEMENT_ATTACHMENT;

drop table if exists ANNOUNCEMENT;

drop table if exists RESOURCE_ATTACHMENT;

drop table if exists RESOURCES;

drop table if exists SUBMISSION_ATTACHMENT;

drop table if exists SUBMISSION;

drop table if exists ASSIGNMENT;

drop table if exists ATTACHMENT;

drop table if exists MESSAGE;

drop table if exists DISCUSSION;

drop table if exists GRADEBOOK;

drop table if exists MEMBERSHIP;

drop table if exists COURSE_CLASS;

drop table if exists COURSE;

drop table if exists USERS;

/*==============================================================*/
/* Table: ANNOUNCEMENT                                          */
/*==============================================================*/
create table ANNOUNCEMENT
(
   ANNOUNCEMENT_ID      int not null auto_increment,
   COURSE_CLASS_ID      int,
   USERS_ID             int,
   TITLE                varchar(100),
   CONTENT              varchar(4000),
   DATE_CREATED         datetime,
   primary key (ANNOUNCEMENT_ID)
);

/*==============================================================*/
/* Table: ANNOUNCEMENT_ATTACHMENT                               */
/*==============================================================*/
create table ANNOUNCEMENT_ATTACHMENT
(
   ANNOUNCEMENT_ATTACHMENT_ID int not null auto_increment,
   ANNOUNCEMENT_ID      int,
   ATTACHMENT_ID        int,
   primary key (ANNOUNCEMENT_ATTACHMENT_ID)
);

/*==============================================================*/
/* Table: ASSIGNMENT                                            */
/*==============================================================*/
create table ASSIGNMENT
(
   ASSIGNMENT_ID        int not null auto_increment,
   COURSE_CLASS_ID      int,
   USERS_ID             int,
   TITLE                varchar(100),
   DESCRIPTION          varchar(4000),
   START_DATE           datetime,
   DUE_DATE             datetime,
   DATE_CREATED         datetime,
   primary key (ASSIGNMENT_ID)
);

/*==============================================================*/
/* Table: ATTACHMENT                                            */
/*==============================================================*/
create table ATTACHMENT
(
   ATTACHMENT_ID        int not null auto_increment,
   NAME                 varchar(200),
   URL                  varchar(100),
   DATE_CREATED         datetime,
   primary key (ATTACHMENT_ID)
);

/*==============================================================*/
/* Table: COURSE                                                */
/*==============================================================*/
create table COURSE
(
   COURSE_ID            int not null auto_increment,
   TITLE                varchar(100),
   CODE                 varchar(6),
   START_DATE           datetime,
   END_DATE             datetime,
   SEMESTER             char(3),
   primary key (COURSE_ID)
);

/*==============================================================*/
/* Table: COURSE_CLASS                                          */
/*==============================================================*/
create table COURSE_CLASS
(
   COURSE_CLASS_ID      int not null auto_increment,
   COURSE_ID            int,
   CODE                 varchar(6),
   DESCRIPTION          varchar(4000),
   primary key (COURSE_CLASS_ID)
);

/*==============================================================*/
/* Table: DISCUSSION                                            */
/*==============================================================*/
create table DISCUSSION
(
   DISCUSSION_ID        int not null auto_increment,
   COURSE_CLASS_ID      int,
   USERS_ID             int,
   TOPIC                varchar(100),
   DATE_CREATED         datetime,
   primary key (DISCUSSION_ID)
);

/*==============================================================*/
/* Table: GRADEBOOK                                             */
/*==============================================================*/
create table GRADEBOOK
(
   GRADEBOOK_ID         int not null auto_increment,
   USERS_ID             int,
   COURSE_CLASS_ID      int,
   TITLE                varchar(100),
   GRADE                float,
   NOTE                 varchar(1000),
   primary key (GRADEBOOK_ID)
);

/*==============================================================*/
/* Table: MEMBERSHIP                                            */
/*==============================================================*/
create table MEMBERSHIP
(
   COURSE_CLASS_ID      int not null,
   USERS_ID             int not null,
   ROLE                 varchar(10),
   primary key (COURSE_CLASS_ID, USERS_ID)
);

/*==============================================================*/
/* Table: MESSAGE                                               */
/*==============================================================*/
create table MESSAGE
(
   MESSAGE_ID           int not null auto_increment,
   DISCUSSION_ID        int,
   USERS_ID             int,
   CONTENT              varchar(4000),
   DATE_CREATED         datetime,
   primary key (MESSAGE_ID)
);

/*==============================================================*/
/* Table: RESOURCES                                             */
/*==============================================================*/
create table RESOURCES
(
   RESOURCES_ID         int not null auto_increment,
   COURSE_CLASS_ID      int,
   ATTACHMENT_ID        int,
   NAME                 varchar(200),
   DESCRIPTION          varchar(4000),
   primary key (RESOURCES_ID)
);

/*==============================================================*/
/* Table: SUBMISSION                                            */
/*==============================================================*/
create table SUBMISSION
(
   SUBMISSION_ID        int not null auto_increment,
   ASSIGNMENT_ID        int,
   USERS_ID             int,
   DATE_CREATED         datetime,
   CONTENT              varchar(4000),
   primary key (SUBMISSION_ID)
);

/*==============================================================*/
/* Table: SUBMISSION_ATTACHMENT                                 */
/*==============================================================*/
create table SUBMISSION_ATTACHMENT
(
   SUBMISSION_ATTCHMENT_ID int not null auto_increment,
   SUBMISSION_ID        int,
   ATTACHMENT_ID        int,
   primary key (SUBMISSION_ATTCHMENT_ID)
);

/*==============================================================*/
/* Table: USERS                                                 */
/*==============================================================*/
create table USERS
(
   USERS_ID             int not null,
   NAME                 varchar(200),
   EMAIL                varchar(100),
   PASSWORD             varchar(50),
   primary key (USERS_ID)
);

alter table ANNOUNCEMENT add constraint FK_ANNOUCEMENT_AUTHOR foreign key (USERS_ID)
      references USERS (USERS_ID) on delete restrict on update restrict;

alter table ANNOUNCEMENT add constraint FK_CLASS_ANNOUNCEMENT_LINK foreign key (COURSE_CLASS_ID)
      references COURSE_CLASS (COURSE_CLASS_ID) on delete restrict on update restrict;

alter table ANNOUNCEMENT_ATTACHMENT add constraint FK_ANOUCEMENT_ATTACHMENT_LINK foreign key (ANNOUNCEMENT_ID)
      references ANNOUNCEMENT (ANNOUNCEMENT_ID) on delete restrict on update restrict;

alter table ANNOUNCEMENT_ATTACHMENT add constraint FK_ATTACHMENT_LINK_3 foreign key (ATTACHMENT_ID)
      references ATTACHMENT (ATTACHMENT_ID) on delete restrict on update restrict;

alter table ASSIGNMENT add constraint FK_ASSIGNMENT_AUTHOR foreign key (USERS_ID)
      references USERS (USERS_ID) on delete restrict on update restrict;

alter table ASSIGNMENT add constraint FK_CLASS_ASSIGNMENT_LINK foreign key (COURSE_CLASS_ID)
      references COURSE_CLASS (COURSE_CLASS_ID) on delete restrict on update restrict;

alter table COURSE_CLASS add constraint FK_COURSE_CLASS_LINK foreign key (COURSE_ID)
      references COURSE (COURSE_ID) on delete restrict on update restrict;

alter table DISCUSSION add constraint FK_CLASS_DISCUSSION_LINK foreign key (COURSE_CLASS_ID)
      references COURSE_CLASS (COURSE_CLASS_ID) on delete restrict on update restrict;

alter table DISCUSSION add constraint FK_DISCUSSION_AUTHOR foreign key (USERS_ID)
      references USERS (USERS_ID) on delete restrict on update restrict;

alter table GRADEBOOK add constraint FK_GRADEBOOK_CLASS_LINK foreign key (COURSE_CLASS_ID)
      references COURSE_CLASS (COURSE_CLASS_ID) on delete restrict on update restrict;

alter table GRADEBOOK add constraint FK_USER_GRADEBOOK_LINK foreign key (USERS_ID)
      references USERS (USERS_ID) on delete restrict on update restrict;

alter table MEMBERSHIP add constraint FK_MEMBERSHIP foreign key (USERS_ID)
      references USERS (USERS_ID) on delete restrict on update restrict;

alter table MEMBERSHIP add constraint FK_MEMBERSHIP2 foreign key (COURSE_CLASS_ID)
      references COURSE_CLASS (COURSE_CLASS_ID) on delete restrict on update restrict;

alter table MESSAGE add constraint FK_HAS_MESSAGES foreign key (DISCUSSION_ID)
      references DISCUSSION (DISCUSSION_ID) on delete restrict on update restrict;

alter table MESSAGE add constraint FK_MESSAGE_AUTHOR foreign key (USERS_ID)
      references USERS (USERS_ID) on delete restrict on update restrict;

alter table RESOURCES add constraint FK_CLASS_RESOURCE_LINK foreign key (COURSE_CLASS_ID)
      references COURSE_CLASS (COURSE_CLASS_ID) on delete restrict on update restrict;

alter table RESOURCES add constraint FK_RESOURCE_ATTACHMENT foreign key (ATTACHMENT_ID)
      references ATTACHMENT (ATTACHMENT_ID) on delete restrict on update restrict;

alter table SUBMISSION add constraint FK_SUBMISSION_ASSIGNMENT_LINK foreign key (ASSIGNMENT_ID)
      references ASSIGNMENT (ASSIGNMENT_ID) on delete restrict on update restrict;

alter table SUBMISSION add constraint FK_SUBMISSION_AUTHOR foreign key (USERS_ID)
      references USERS (USERS_ID) on delete restrict on update restrict;

alter table SUBMISSION_ATTACHMENT add constraint FK_ATTACHMENT_LINK foreign key (ATTACHMENT_ID)
      references ATTACHMENT (ATTACHMENT_ID) on delete restrict on update restrict;

alter table SUBMISSION_ATTACHMENT add constraint FK_SUBMISSION_ATTACHMENT_LINK foreign key (SUBMISSION_ID)
      references SUBMISSION (SUBMISSION_ID) on delete restrict on update restrict;

/*==============================================================*/
Insert into USERS (USERS_ID, NAME, EMAIL, PASSWORD)
Values(1, 'Nguyen Minh Tri', 'nmtribk@hcmut.edu.vn', '202cb962ac59075b964b07152d234b70');
Insert into USERS (USERS_ID, NAME, EMAIL, PASSWORD)
Values(2, 'Pham Duc Minh Chau', 'phamducminhchau@gmail.com', '202cb962ac59075b964b07152d234b70');
Insert into USERS (USERS_ID, NAME, EMAIL, PASSWORD)
Values(3, 'Le Huynh Duy Thai', 'duythai1912@gmail.com', '202cb962ac59075b964b07152d234b70');
Insert into USERS (USERS_ID, NAME, EMAIL, PASSWORD)
Values(4, 'Teacher A', 'a@hcmut.edu.vn', '202cb962ac59075b964b07152d234b70');
Insert into USERS (USERS_ID, NAME, EMAIL, PASSWORD)
Values(5, 'Teacher B', 'b@hcmut.edu.vn', '202cb962ac59075b964b07152d234b70');
Insert into USERS (USERS_ID, NAME, EMAIL, PASSWORD)
Values(6, 'Teacher C', 'c@hcmut.edu.vn', '202cb962ac59075b964b07152d234b70');
Insert into USERS (USERS_ID, NAME, EMAIL, PASSWORD)
Values(7, 'Teacher D', 'd@hcmut.edu.vn', '202cb962ac59075b964b07152d234b70');
Insert into USERS (USERS_ID, NAME, EMAIL, PASSWORD)
Values(8, 'Teacher E', 'e@hcmut.edu.vn', '202cb962ac59075b964b07152d234b70');
Insert into USERS (USERS_ID, NAME, EMAIL, PASSWORD)
Values(9, 'Teacher F', 'f@hcmut.edu.vn', '202cb962ac59075b964b07152d234b70');
/*==============================================================*/
Insert into COURSE (COURSE_ID, TITLE, CODE, START_DATE, END_DATE, SEMESTER)
Values(1, 'Advanced Programming', '055130', STR_TO_DATE('09-01-2017', '%m-%d-%Y'), STR_TO_DATE('02-01-2018', '%m-%d-%Y'), 'I');
Insert into COURSE (COURSE_ID, TITLE, CODE, START_DATE, END_DATE, SEMESTER)
Values(2, 'Advanced Algorithms', '055127', STR_TO_DATE('09-01-2017', '%m-%d-%Y'), STR_TO_DATE('02-01-2018', '%m-%d-%Y'), 'I');
Insert into COURSE (COURSE_ID, TITLE, CODE, START_DATE, END_DATE, SEMESTER)
Values(3, 'Big Data', '055032', STR_TO_DATE('09-01-2017', '%m-%d-%Y'), STR_TO_DATE('02-01-2018', '%m-%d-%Y'), 'I');
Insert into COURSE (COURSE_ID, TITLE, CODE, START_DATE, END_DATE, SEMESTER)
Values(4, 'Distributed Systems', '055150', STR_TO_DATE('03-01-2018', '%m-%d-%Y'), STR_TO_DATE('08-01-2018', '%m-%d-%Y'), 'II');
/*==============================================================*/
Insert into COURSE_CLASS (COURSE_CLASS_ID, COURSE_ID, CODE, DESCRIPTION)
Values(1,1,'AP_01','Teacher A');
Insert into COURSE_CLASS (COURSE_CLASS_ID, COURSE_ID, CODE, DESCRIPTION)
Values(2,1,'AP_02','Teacher B');
Insert into COURSE_CLASS (COURSE_CLASS_ID, COURSE_ID, CODE, DESCRIPTION)
Values(3,2,'AA_01','Teacher C');
Insert into COURSE_CLASS (COURSE_CLASS_ID, COURSE_ID, CODE, DESCRIPTION)
Values(4,2,'AA_02','Teacher D');
Insert into COURSE_CLASS (COURSE_CLASS_ID, COURSE_ID, CODE, DESCRIPTION)
Values(5,3,'BD_01','Teacher E');
Insert into COURSE_CLASS (COURSE_CLASS_ID, COURSE_ID, CODE, DESCRIPTION)
Values(6,3,'BD_02','Teacher F');
Insert into COURSE_CLASS (COURSE_CLASS_ID, COURSE_ID, CODE, DESCRIPTION)
Values(7,4,'DS_01','Teacher E');
/*==============================================================*/
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(1,'attachment_1','url://...',STR_TO_DATE('10-01-2017', '%d-%m-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(2,'attachment_2','url://...',STR_TO_DATE('10-01-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(3,'attachment_3','url://...',STR_TO_DATE('10-01-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(4,'attachment_4','url://...',STR_TO_DATE('10-11-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(5,'attachment_5','url://...',STR_TO_DATE('10-21-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(6,'attachment_6','url://...',STR_TO_DATE('10-01-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(7,'attachment_7','url://...',STR_TO_DATE('10-22-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(8,'attachment_8','url://...',STR_TO_DATE('11-12-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(9,'attachment_9','url://...',STR_TO_DATE('10-01-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(10,'attachment_10','url://...',STR_TO_DATE('11-13-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(11,'attachment_11','url://...',STR_TO_DATE('11-15-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(12,'attachment_12','url://...',STR_TO_DATE('10-01-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(13,'attachment_13','url://...',STR_TO_DATE('11-17-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(14,'attachment_14','url://...',STR_TO_DATE('11-20-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(15,'attachment_15','url://...',STR_TO_DATE('10-01-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(16,'attachment_16','url://...',STR_TO_DATE('10-01-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(17,'attachment_17','url://...',STR_TO_DATE('10-01-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(18,'attachment_18','url://...',STR_TO_DATE('10-01-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(19,'attachment_19','url://...',STR_TO_DATE('10-01-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(20,'attachment_20','url://...',STR_TO_DATE('10-01-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(21,'attachment_21','url://...',STR_TO_DATE('10-01-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(22,'attachment_22','url://...',STR_TO_DATE('10-01-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(23,'attachment_23','url://...',STR_TO_DATE('10-01-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(24,'attachment_24','url://...',STR_TO_DATE('10-01-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(25,'attachment_25','url://...',STR_TO_DATE('10-01-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(26,'attachment_26','url://...',STR_TO_DATE('10-01-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(27,'attachment_27','url://...',STR_TO_DATE('10-01-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(28,'attachment_28','url://...',STR_TO_DATE('10-01-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(29,'attachment_29','url://...',STR_TO_DATE('10-01-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(30,'attachment_30','url://...',STR_TO_DATE('10-01-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(31,'attachment_31','url://...',STR_TO_DATE('10-01-2017', '%m-%d-%Y'));
Insert into ATTACHMENT (ATTACHMENT_ID, NAME, URL, DATE_CREATED)
Values(32,'attachment_32','url://...',STR_TO_DATE('10-01-2017', '%m-%d-%Y'));
/*==============================================================*/
Insert into ANNOUNCEMENT (ANNOUNCEMENT_ID, COURSE_CLASS_ID, USERS_ID, TITLE, CONTENT, DATE_CREATED)
Values(1,1,4,'AP_Announcement 1','abc',STR_TO_DATE('10-01-2017', '%m-%d-%Y'));
Insert into ANNOUNCEMENT (ANNOUNCEMENT_ID, COURSE_CLASS_ID, USERS_ID, TITLE, CONTENT, DATE_CREATED)
Values(2,1,4,'AP_Announcement 2','abc',STR_TO_DATE('10-11-2017', '%m-%d-%Y'));
Insert into ANNOUNCEMENT (ANNOUNCEMENT_ID, COURSE_CLASS_ID, USERS_ID, TITLE, CONTENT, DATE_CREATED)
Values(3,3,6,'AA_Announcement 1','abc',STR_TO_DATE('10-21-2017', '%m-%d-%Y'));
Insert into ANNOUNCEMENT (ANNOUNCEMENT_ID, COURSE_CLASS_ID, USERS_ID, TITLE, CONTENT, DATE_CREATED)
Values(4,3,6,'AA_Announcement 2','abc',STR_TO_DATE('10-22-2017', '%m-%d-%Y'));
Insert into ANNOUNCEMENT (ANNOUNCEMENT_ID, COURSE_CLASS_ID, USERS_ID, TITLE, CONTENT, DATE_CREATED)
Values(5,5,8,'BD_Announcement 1','abc',STR_TO_DATE('11-12-2017', '%m-%d-%Y'));
Insert into ANNOUNCEMENT (ANNOUNCEMENT_ID, COURSE_CLASS_ID, USERS_ID, TITLE, CONTENT, DATE_CREATED)
Values(6,5,8,'BD_Announcement 2','abc',STR_TO_DATE('11-13-2017', '%m-%d-%Y'));
Insert into ANNOUNCEMENT (ANNOUNCEMENT_ID, COURSE_CLASS_ID, USERS_ID, TITLE, CONTENT, DATE_CREATED)
Values(7,1,4,'AP_Announcement 3','abc',STR_TO_DATE('11-15-2017', '%m-%d-%Y'));
Insert into ANNOUNCEMENT (ANNOUNCEMENT_ID, COURSE_CLASS_ID, USERS_ID, TITLE, CONTENT, DATE_CREATED)
Values(8,1,4,'AP_Announcement 4','abc',STR_TO_DATE('11-17-2017', '%m-%d-%Y'));
Insert into ANNOUNCEMENT (ANNOUNCEMENT_ID, COURSE_CLASS_ID, USERS_ID, TITLE, CONTENT, DATE_CREATED)
Values(9,3,6,'AA_Announcement 3','abc',STR_TO_DATE('11-20-2017', '%m-%d-%Y'));
Insert into ANNOUNCEMENT (ANNOUNCEMENT_ID, COURSE_CLASS_ID, USERS_ID, TITLE, CONTENT, DATE_CREATED)
Values(10,5,8,'BD_Announcement 3','abc',STR_TO_DATE('11-25-2017', '%m-%d-%Y'));
Insert into ANNOUNCEMENT (ANNOUNCEMENT_ID, COURSE_CLASS_ID, USERS_ID, TITLE, CONTENT, DATE_CREATED)
Values(11,1,4,'AP_Announcement 5','abc',STR_TO_DATE('11-28-2017', '%m-%d-%Y'));
/*==============================================================*/
Insert into ANNOUNCEMENT_ATTACHMENT (ANNOUNCEMENT_ATTACHMENT_ID, ANNOUNCEMENT_ID, ATTACHMENT_ID)
Values(1,1,1);
Insert into ANNOUNCEMENT_ATTACHMENT (ANNOUNCEMENT_ATTACHMENT_ID, ANNOUNCEMENT_ID, ATTACHMENT_ID)
Values(2,2,4);
Insert into ANNOUNCEMENT_ATTACHMENT (ANNOUNCEMENT_ATTACHMENT_ID, ANNOUNCEMENT_ID, ATTACHMENT_ID)
Values(3,3,5);
Insert into ANNOUNCEMENT_ATTACHMENT (ANNOUNCEMENT_ATTACHMENT_ID, ANNOUNCEMENT_ID, ATTACHMENT_ID)
Values(4,4,7);
Insert into ANNOUNCEMENT_ATTACHMENT (ANNOUNCEMENT_ATTACHMENT_ID, ANNOUNCEMENT_ID, ATTACHMENT_ID)
Values(5,5,8);
Insert into ANNOUNCEMENT_ATTACHMENT (ANNOUNCEMENT_ATTACHMENT_ID, ANNOUNCEMENT_ID, ATTACHMENT_ID)
Values(6,6,10);
Insert into ANNOUNCEMENT_ATTACHMENT (ANNOUNCEMENT_ATTACHMENT_ID, ANNOUNCEMENT_ID, ATTACHMENT_ID)
Values(7,7,11);
Insert into ANNOUNCEMENT_ATTACHMENT (ANNOUNCEMENT_ATTACHMENT_ID, ANNOUNCEMENT_ID, ATTACHMENT_ID)
Values(8,8,13);
Insert into ANNOUNCEMENT_ATTACHMENT (ANNOUNCEMENT_ATTACHMENT_ID, ANNOUNCEMENT_ID, ATTACHMENT_ID)
Values(9,8,14);
/*==============================================================*/
Insert into ASSIGNMENT (ASSIGNMENT_ID, COURSE_CLASS_ID, USERS_ID, TITLE, DESCRIPTION, START_DATE, DUE_DATE)
Values(1,1,4,'AP_Assignment1','Build e-learning system', STR_TO_DATE('10-01-2017', '%m-%d-%Y'), STR_TO_DATE('11-01-2017', '%m-%d-%Y'));
Insert into ASSIGNMENT (ASSIGNMENT_ID, COURSE_CLASS_ID, USERS_ID, TITLE, DESCRIPTION, START_DATE, DUE_DATE)
Values(2,1,4,'AP_Assignment2','Build Neural Network', STR_TO_DATE('12-01-2017', '%m-%d-%Y'), STR_TO_DATE('01-01-2018', '%m-%d-%Y'));
Insert into ASSIGNMENT (ASSIGNMENT_ID, COURSE_CLASS_ID, USERS_ID, TITLE, DESCRIPTION, START_DATE, DUE_DATE)
Values(3,5,8,'BD_Assignment1','Data cleaning', STR_TO_DATE('10-01-2017', '%m-%d-%Y'), STR_TO_DATE('11-01-2017', '%m-%d-%Y'));
Insert into ASSIGNMENT (ASSIGNMENT_ID, COURSE_CLASS_ID, USERS_ID, TITLE, DESCRIPTION, START_DATE, DUE_DATE)
Values(4,5,8,'BD_Assignment2','Data analysis', STR_TO_DATE('12-01-2017', '%m-%d-%Y'), STR_TO_DATE('01-01-2018', '%m-%d-%Y'));
Insert into ASSIGNMENT (ASSIGNMENT_ID, COURSE_CLASS_ID, USERS_ID, TITLE, DESCRIPTION, START_DATE, DUE_DATE)
Values(5,3,6,'AA_Assignment1','AA-1', STR_TO_DATE('10-01-2017', '%m-%d-%Y'), STR_TO_DATE('11-01-2017', '%m-%d-%Y'));
Insert into ASSIGNMENT (ASSIGNMENT_ID, COURSE_CLASS_ID, USERS_ID, TITLE, DESCRIPTION, START_DATE, DUE_DATE)
Values(6,3,6,'AA_Assignment2','AA-2', STR_TO_DATE('12-01-2017', '%m-%d-%Y'), STR_TO_DATE('01-01-2018', '%m-%d-%Y'));
/*==============================================================*/
Insert into DISCUSSION (DISCUSSION_ID, COURSE_CLASS_ID, USERS_ID, TOPIC, DATE_CREATED)
Values(1,1,1,'ABC',STR_TO_DATE('10-15-2017', '%m-%d-%Y'));
Insert into DISCUSSION (DISCUSSION_ID, COURSE_CLASS_ID, USERS_ID, TOPIC, DATE_CREATED)
Values(2,1,2,'DEF',STR_TO_DATE('10-16-2017', '%m-%d-%Y'));
Insert into DISCUSSION (DISCUSSION_ID, COURSE_CLASS_ID, USERS_ID, TOPIC, DATE_CREATED)
Values(3,3,3,'GHI',STR_TO_DATE('10-17-2017', '%m-%d-%Y'));
Insert into DISCUSSION (DISCUSSION_ID, COURSE_CLASS_ID, USERS_ID, TOPIC, DATE_CREATED)
Values(4,3,2,'JKL',STR_TO_DATE('11-18-2017', '%m-%d-%Y'));
Insert into DISCUSSION (DISCUSSION_ID, COURSE_CLASS_ID, USERS_ID, TOPIC, DATE_CREATED)
Values(5,5,1,'MNO',STR_TO_DATE('11-19-2017', '%m-%d-%Y'));
Insert into DISCUSSION (DISCUSSION_ID, COURSE_CLASS_ID, USERS_ID, TOPIC, DATE_CREATED)
Values(6,5,2,'PQR',STR_TO_DATE('11-25-2017', '%m-%d-%Y'));
Insert into DISCUSSION (DISCUSSION_ID, COURSE_CLASS_ID, USERS_ID, TOPIC, DATE_CREATED)
Values(7,1,3,'STU',STR_TO_DATE('11-26-2017', '%m-%d-%Y'));
Insert into DISCUSSION (DISCUSSION_ID, COURSE_CLASS_ID, USERS_ID, TOPIC, DATE_CREATED)
Values(8,3,2,'VWX',STR_TO_DATE('11-27-2017', '%m-%d-%Y'));
/*==============================================================*/
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(1,1,1,'TUT_1', 9,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(2,1,1,'TUT_2', 8,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(3,1,1,'TUT_3', 10,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(4,1,1,'Assignment_1', 9,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(5,1,1,'Assignment_2', 8,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(6,1,3,'TUT_1', 10,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(7,1,3,'TUT_2', 9,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(8,1,3,'TUT_3', 9,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(9,1,3,'Assignment_1', 9,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(10,1,3,'Assignment_2', 10,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(11,2,1,'TUT_1', 9,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(12,2,1,'TUT_2', 8,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(13,2,1,'TUT_3', 10,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(14,2,1,'Assignment_1', 9,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(15,2,1,'Assignment_2', 8,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(16,2,3,'TUT_1', 10,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(17,2,3,'TUT_2', 9,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(18,2,3,'TUT_3', 9,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(19,2,3,'Assignment_1', 9,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(20,2,3,'Assignment_2', 10,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(21,3,1,'TUT_1', 9,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(22,3,1,'TUT_2', 8,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(23,3,1,'TUT_3', 10,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(24,3,1,'Assignment_1', 9,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(25,3,1,'Assignment_2', 8,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(26,3,3,'TUT_1', 10,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(27,3,3,'TUT_2', 9,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(28,3,3,'TUT_3', 9,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(29,3,3,'Assignment_1', 9,'...');
Insert into GRADEBOOK (GRADEBOOK_ID, USERS_ID, COURSE_CLASS_ID, TITLE, GRADE, NOTE)
Values(30,3,3,'Assignment_2', 10,'...');
/*==============================================================*/
/*Insert into MAX_ID (TABLE_NAME, MAX_INT)
Values();*/
/*==============================================================*/
Insert into MEMBERSHIP (COURSE_CLASS_ID, USERS_ID, ROLE)
Values(1,1,'student');
Insert into MEMBERSHIP (COURSE_CLASS_ID, USERS_ID, ROLE)
Values(3,1,'student');
Insert into MEMBERSHIP (COURSE_CLASS_ID, USERS_ID, ROLE)
Values(5,1,'student');
Insert into MEMBERSHIP (COURSE_CLASS_ID, USERS_ID, ROLE)
Values(1,2,'student');
Insert into MEMBERSHIP (COURSE_CLASS_ID, USERS_ID, ROLE)
Values(3,2,'student');
Insert into MEMBERSHIP (COURSE_CLASS_ID, USERS_ID, ROLE)
Values(5,2,'student');
Insert into MEMBERSHIP (COURSE_CLASS_ID, USERS_ID, ROLE)
Values(1,3,'student');
Insert into MEMBERSHIP (COURSE_CLASS_ID, USERS_ID, ROLE)
Values(3,3,'student');
Insert into MEMBERSHIP (COURSE_CLASS_ID, USERS_ID, ROLE)
Values(5,3,'student');
Insert into MEMBERSHIP (COURSE_CLASS_ID, USERS_ID, ROLE)
Values(1,4,'teacher');
Insert into MEMBERSHIP (COURSE_CLASS_ID, USERS_ID, ROLE)
Values(2,5,'teacher');
Insert into MEMBERSHIP (COURSE_CLASS_ID, USERS_ID, ROLE)
Values(3,6,'teacher');
Insert into MEMBERSHIP (COURSE_CLASS_ID, USERS_ID, ROLE)
Values(4,7,'teacher');
Insert into MEMBERSHIP (COURSE_CLASS_ID, USERS_ID, ROLE)
Values(5,8,'teacher');
Insert into MEMBERSHIP (COURSE_CLASS_ID, USERS_ID, ROLE)
Values(6,9,'teacher');
/*==============================================================*/
Insert into MESSAGE (MESSAGE_ID, DISCUSSION_ID, USERS_ID, CONTENT, DATE_CREATED)
Values(1,1,2,'ABC',STR_TO_DATE('10-15-2017', '%m-%d-%Y'));
Insert into MESSAGE (MESSAGE_ID, DISCUSSION_ID, USERS_ID, CONTENT, DATE_CREATED)
Values(2,1,3,'ABC',STR_TO_DATE('10-15-2017', '%m-%d-%Y'));
Insert into MESSAGE (MESSAGE_ID, DISCUSSION_ID, USERS_ID, CONTENT, DATE_CREATED)
Values(3,2,1,'ABC',STR_TO_DATE('10-16-2017', '%m-%d-%Y'));
Insert into MESSAGE (MESSAGE_ID, DISCUSSION_ID, USERS_ID, CONTENT, DATE_CREATED)
Values(4,2,3,'ABC',STR_TO_DATE('10-16-2017', '%m-%d-%Y'));
Insert into MESSAGE (MESSAGE_ID, DISCUSSION_ID, USERS_ID, CONTENT, DATE_CREATED)
Values(5,3,1,'ABC',STR_TO_DATE('10-17-2017', '%m-%d-%Y'));
Insert into MESSAGE (MESSAGE_ID, DISCUSSION_ID, USERS_ID, CONTENT, DATE_CREATED)
Values(6,3,2,'ABC',STR_TO_DATE('10-17-2017', '%m-%d-%Y'));
Insert into MESSAGE (MESSAGE_ID, DISCUSSION_ID, USERS_ID, CONTENT, DATE_CREATED)
Values(7,4,1,'ABC',STR_TO_DATE('11-18-2017', '%m-%d-%Y'));
Insert into MESSAGE (MESSAGE_ID, DISCUSSION_ID, USERS_ID, CONTENT, DATE_CREATED)
Values(8,4,3,'ABC',STR_TO_DATE('11-18-2017', '%m-%d-%Y'));
Insert into MESSAGE (MESSAGE_ID, DISCUSSION_ID, USERS_ID, CONTENT, DATE_CREATED)
Values(9,5,2,'ABC',STR_TO_DATE('11-19-2017', '%m-%d-%Y'));
Insert into MESSAGE (MESSAGE_ID, DISCUSSION_ID, USERS_ID, CONTENT, DATE_CREATED)
Values(10,5,3,'ABC',STR_TO_DATE('11-19-2017', '%m-%d-%Y'));
Insert into MESSAGE (MESSAGE_ID, DISCUSSION_ID, USERS_ID, CONTENT, DATE_CREATED)
Values(11,6,1,'ABC',STR_TO_DATE('11-25-2017', '%m-%d-%Y'));
Insert into MESSAGE (MESSAGE_ID, DISCUSSION_ID, USERS_ID, CONTENT, DATE_CREATED)
Values(12,6,3,'ABC',STR_TO_DATE('11-25-2017', '%m-%d-%Y'));
Insert into MESSAGE (MESSAGE_ID, DISCUSSION_ID, USERS_ID, CONTENT, DATE_CREATED)
Values(13,7,1,'ABC',STR_TO_DATE('11-26-2017', '%m-%d-%Y'));
Insert into MESSAGE (MESSAGE_ID, DISCUSSION_ID, USERS_ID, CONTENT, DATE_CREATED)
Values(14,7,2,'ABC',STR_TO_DATE('11-26-2017', '%m-%d-%Y'));
Insert into MESSAGE (MESSAGE_ID, DISCUSSION_ID, USERS_ID, CONTENT, DATE_CREATED)
Values(15,8,1,'ABC',STR_TO_DATE('11-27-2017', '%m-%d-%Y'));
Insert into MESSAGE (MESSAGE_ID, DISCUSSION_ID, USERS_ID, CONTENT, DATE_CREATED)
Values(16,8,3,'ABC',STR_TO_DATE('11-27-2017', '%m-%d-%Y'));
/*==============================================================*/
Insert into RESOURCES (RESOURCES_ID, COURSE_CLASS_ID, NAME, DESCRIPTION, ATTACHMENT_ID)
Values(1,1,' Lecture_1','...',2);
Insert into RESOURCES (RESOURCES_ID, COURSE_CLASS_ID, NAME, DESCRIPTION, ATTACHMENT_ID)
Values(2,1,' Lecture_2','...',3);
Insert into RESOURCES (RESOURCES_ID, COURSE_CLASS_ID, NAME, DESCRIPTION, ATTACHMENT_ID)
Values(3,2,' Lecture_1','...',6);
Insert into RESOURCES (RESOURCES_ID, COURSE_CLASS_ID, NAME, DESCRIPTION, ATTACHMENT_ID)
Values(4,2,' Lecture_2','...',9);
Insert into RESOURCES (RESOURCES_ID, COURSE_CLASS_ID, NAME, DESCRIPTION, ATTACHMENT_ID)
Values(5,3,' Lecture_1','...',12);
Insert into RESOURCES (RESOURCES_ID, COURSE_CLASS_ID, NAME, DESCRIPTION, ATTACHMENT_ID)
Values(6,3,' Lecture_2','...',15);
Insert into RESOURCES (RESOURCES_ID, COURSE_CLASS_ID, NAME, DESCRIPTION, ATTACHMENT_ID)
Values(7,4,' Lecture_1','...',16);
Insert into RESOURCES (RESOURCES_ID, COURSE_CLASS_ID, NAME, DESCRIPTION, ATTACHMENT_ID)
Values(8,4,' Lecture_2','...',17);
Insert into RESOURCES (RESOURCES_ID, COURSE_CLASS_ID, NAME, DESCRIPTION, ATTACHMENT_ID)
Values(9,5,' Lecture_1','...',18);
Insert into RESOURCES (RESOURCES_ID, COURSE_CLASS_ID, NAME, DESCRIPTION, ATTACHMENT_ID)
Values(10,5,' Lecture_2','...',19);
Insert into RESOURCES (RESOURCES_ID, COURSE_CLASS_ID, NAME, DESCRIPTION, ATTACHMENT_ID)
Values(11,6,' Lecture_1','...',20);
Insert into RESOURCES (RESOURCES_ID, COURSE_CLASS_ID, NAME, DESCRIPTION, ATTACHMENT_ID)
Values(12,6,' Lecture_2','...',21);
Insert into RESOURCES (RESOURCES_ID, COURSE_CLASS_ID, NAME, DESCRIPTION, ATTACHMENT_ID)
Values(13,7,' Lecture_1','...',22);
Insert into RESOURCES (RESOURCES_ID, COURSE_CLASS_ID, NAME, DESCRIPTION, ATTACHMENT_ID)
Values(14,7,' Lecture_2','...',23);
/*==============================================================*/
Insert into SUBMISSION (SUBMISSION_ID, ASSIGNMENT_ID, USERS_ID, DATE_CREATED, CONTENT)
Values(1,1,1,STR_TO_DATE('10-31-2017', '%m-%d-%Y'),'abc');
Insert into SUBMISSION (SUBMISSION_ID, ASSIGNMENT_ID, USERS_ID, DATE_CREATED, CONTENT)
Values(2,3,1,STR_TO_DATE('10-31-2017', '%m-%d-%Y'),'def');
Insert into SUBMISSION (SUBMISSION_ID, ASSIGNMENT_ID, USERS_ID, DATE_CREATED, CONTENT)
Values(3,5,1,STR_TO_DATE('10-31-2017', '%m-%d-%Y'),'ghi');
Insert into SUBMISSION (SUBMISSION_ID, ASSIGNMENT_ID, USERS_ID, DATE_CREATED, CONTENT)
Values(4,1,2,STR_TO_DATE('10-31-2017', '%m-%d-%Y'),'jkl');
Insert into SUBMISSION (SUBMISSION_ID, ASSIGNMENT_ID, USERS_ID, DATE_CREATED, CONTENT)
Values(5,3,2,STR_TO_DATE('10-31-2017', '%m-%d-%Y'),'mno');
Insert into SUBMISSION (SUBMISSION_ID, ASSIGNMENT_ID, USERS_ID, DATE_CREATED, CONTENT)
Values(6,5,2,STR_TO_DATE('10-31-2017', '%m-%d-%Y'),'pqr');
Insert into SUBMISSION (SUBMISSION_ID, ASSIGNMENT_ID, USERS_ID, DATE_CREATED, CONTENT)
Values(7,1,3,STR_TO_DATE('10-31-2017', '%m-%d-%Y'),'stu');
Insert into SUBMISSION (SUBMISSION_ID, ASSIGNMENT_ID, USERS_ID, DATE_CREATED, CONTENT)
Values(8,3,3,STR_TO_DATE('10-31-2017', '%m-%d-%Y'),'vwx');
Insert into SUBMISSION (SUBMISSION_ID, ASSIGNMENT_ID, USERS_ID, DATE_CREATED, CONTENT)
Values(9,5,3,STR_TO_DATE('10-31-2017', '%m-%d-%Y'),'yz');
/*==============================================================*/
Insert into SUBMISSION_ATTACHMENT (SUBMISSION_ATTCHMENT_ID, SUBMISSION_ID, ATTACHMENT_ID)
Values(1,1,24);
Insert into SUBMISSION_ATTACHMENT (SUBMISSION_ATTCHMENT_ID, SUBMISSION_ID, ATTACHMENT_ID)
Values(2,2,25);
Insert into SUBMISSION_ATTACHMENT (SUBMISSION_ATTCHMENT_ID, SUBMISSION_ID, ATTACHMENT_ID)
Values(3,3,26);
Insert into SUBMISSION_ATTACHMENT (SUBMISSION_ATTCHMENT_ID, SUBMISSION_ID, ATTACHMENT_ID)
Values(4,4,27);
Insert into SUBMISSION_ATTACHMENT (SUBMISSION_ATTCHMENT_ID, SUBMISSION_ID, ATTACHMENT_ID)
Values(5,5,28);
Insert into SUBMISSION_ATTACHMENT (SUBMISSION_ATTCHMENT_ID, SUBMISSION_ID, ATTACHMENT_ID)
Values(6,6,29);
Insert into SUBMISSION_ATTACHMENT (SUBMISSION_ATTCHMENT_ID, SUBMISSION_ID, ATTACHMENT_ID)
Values(7,7,30);
Insert into SUBMISSION_ATTACHMENT (SUBMISSION_ATTCHMENT_ID, SUBMISSION_ID, ATTACHMENT_ID)
Values(8,8,31);
Insert into SUBMISSION_ATTACHMENT (SUBMISSION_ATTCHMENT_ID, SUBMISSION_ID, ATTACHMENT_ID)
Values(9,9,32);
