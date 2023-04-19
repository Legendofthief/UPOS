CREATE SCHEMA if not exists refs AUTHORIZATION postgres;
---
create sequence if not exists refs.sq_department start with 1 increment by 1 no cycle;
create sequence if not exists refs.sq_faculty start with 1 increment by 1 no cycle;
create sequence if not exists refs.sq_teacher start with 1 increment by 1 no cycle;
create sequence if not exists refs.sq_discipline start with 1 increment by 1 no cycle;
create sequence if not exists refs.sq_group start with 1 increment by 1 no cycle;
create sequence if not exists refs.sq_student start with 1 increment by 1 no cycle;
create sequence if not exists refs.sq_grade start with 1 increment by 1 no cycle;
---
--
---
create table refs.department(
 id             int not null  default nextval('refs.sq_department')
,DepartmentCode varchar(10)
,DepartmentNm   varchar(100)
,constraint pk_department primary key(id)
);
---
create table refs.faculty(
 id          int not null  default nextval('refs.sq_faculty') 
,FacultyCode varchar(10)
,FacultyNm   varchar(100)
,constraint pk_faculty primary key(id)
);
---
create table refs.term(
 id         int not null 
,TermCode   varchar(10)   --1Y
,TermType   varchar(1)    --Y
,TermQnt    int2          --1
,constraint pk_term primary key(id)
);

insert into refs.term(id,TermCode,TermType,TermQnt)
values(1,'6Y','Y',6);


---
create table refs.teacher(
 id            int not null  default nextval('refs.sq_teacher')
,DepartmentId  int 
,RecordNum     varchar(50)
,FIO           varchar(100)
,qualification varchar(25)
,StartDt       date
,EndDt         date
,constraint pk_teacher primary key(id)
,constraint fk_refs_teacher__refs_department foreign key(departmentid) references refs.department(id)
);
---
create table refs.discipline(
 id              int2 not null  default nextval('refs.sq_discipline')
,TeacherId       int
,DisciplineCode  varchar(50)
,DisciplineNm    varchar(100)
,HoursQnt        int2
,constraint pk_discipline primary key(id)
,constraint fk_refs_discipline__refs_teacher foreign key(teacherid) references refs.teacher(id)
);
---
create table refs.group(
 id            int  not null  default nextval('refs.sq_group') 
,FacultyId     int  not null
,TermId        int2 not null
,GroupCode     varchar(10)
,GroupNm       varchar(100)
,qualification int
,StartDt       date
,constraint pk_group primary key(id)
,constraint fk_refs_group__refs_faculty foreign key(facultyid) references refs.faculty(id)
,constraint fk_refs_group__refs_term foreign key(termid) references refs.term(id)
);
---
create table refs.student(
 id           int not null default nextval('refs.sq_student')
,GroupId      int
,RecordNum    varchar(50)
,StudentName  varchar(100)
,phone        varchar(30)
,photo        varchar(4000)
,constraint pk_student primary key(id)
,constraint fk_refs_group__refs_group foreign key(groupid) references refs.group(id)
);
---
create table refs.grade(
 id            int  not null default nextval('refs.sq_grade')
,StudentId     int  not null
,TeacherId     int  not null
,DisciplineId  int2 not null
,GradeVal      int2 not null
,GradeDttz     timestamptz default current_timestamp
,constraint pk_grade primary key(id)
,constraint fk_grade__refs_student foreign key(studentid) references refs.student(id)
,constraint fk_grade__refs_teacher foreign key(teacherid) references refs.teacher(id)
,constraint fk_grade__refs_discipline foreign key(disciplineid) references refs.discipline(id)
);
---
