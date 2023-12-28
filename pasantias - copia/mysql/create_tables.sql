CREATE TABLE if not exists pasantiasfic.Roles
 (
   Role VARCHAR(10) NOT NULL,
   Id_Role INT NOT NULL,
   PRIMARY KEY (Id_Role)
 );
 
 CREATE TABLE if not exists pasantiasfic.Company
 (
   Id_Company INT NOT NULL AUTO_INCREMENT,
   Name VARCHAR(40) NOT NULL,
   Rut VARCHAR(12) NOT NULL,
   Country VARCHAR(40) NOT NULL,
   Direction VARCHAR(150) NOT NULL,
   Website VARCHAR(100) NOT NULL,
   PRIMARY KEY (Id_Company)
 );
 
 CREATE TABLE if not exists pasantiasfic.User
 (
   Id_User INT NOT NULL AUTO_INCREMENT,
   Mail VARCHAR(60) NOT NULL,
   Password VARCHAR(25) NOT NULL,
   Id_Role INT NOT NULL,
   PRIMARY KEY (Id_User),
   FOREIGN KEY (Id_Role) REFERENCES Roles(Id_Role)
 );
 
 CREATE TABLE if not exists pasantiasfic.Supervisor
 (
   Id_Supervisor INT NOT NULL AUTO_INCREMENT,
   Name VARCHAR(60) NOT NULL,
   Charge VARCHAR(50) NOT NULL,
   Phone_Number INT NOT NULL,
   Cellphone_Number INT NOT NULL,
   Job_Title VARCHAR(50) NOT NULL,
   Mail VARCHAR(60) NOT NULL,
   Id_User INT NOT NULL,
   f_accepts INT NULL,
   PRIMARY KEY (Id_Supervisor),
   FOREIGN KEY (Id_User) REFERENCES User(Id_User)
 );

CREATE TABLE if not exists pasantiasfic.Student
 (
   Id_Student INT NOT NULL AUTO_INCREMENT,
   Step INT NOT NULL,
   Rut VARCHAR(12) NOT NULL,
   Name VARCHAR(40) NOT NULL,
   Last_Name VARCHAR(40) NOT NULL,
   Id_User INT NOT NULL,
   PRIMARY KEY (Id_Student),
   FOREIGN KEY (Id_User) REFERENCES User(Id_User)
 );

 CREATE TABLE if not exists pasantiasfic.Internship
 (
   Id_Internship INT NOT NULL AUTO_INCREMENT,
   Start_Date VARCHAR(30) NOT NULL,
   Finish_Date VARCHAR(30) NOT NULL,
   Area VARCHAR(25) NOT NULL,
   Paid VARCHAR(3) NOT NULL,
   Weekly_Hours INT NOT NULL,
   Total_Hours INT NOT NULL,
   Functions VARCHAR(500) NOT NULL,
   Description VARCHAR(280) NULL,
   f_entry INT NULL,
   f_sent INT NULL,
   f_verification INT NULL,
   Id_Supervisor INT NULL,
   Id_Company INT NULL,
   Id_Student INT NULL,
   PRIMARY KEY (Id_Internship),
   FOREIGN KEY (Id_Supervisor) REFERENCES Supervisor(Id_Supervisor),
   FOREIGN KEY (Id_Company) REFERENCES Company(Id_Company),
   FOREIGN KEY (Id_Student) REFERENCES Student(Id_Student)
 );
 
 CREATE TABLE if not exists pasantiasfic.Professor
 (
   Id_Professor INT NOT NULL AUTO_INCREMENT,
   Rut VARCHAR(12) NOT NULL,
   Name VARCHAR(40) NOT NULL,
   Last_Name VARCHAR(40) NOT NULL,
   Id_User INT NOT NULL,
   PRIMARY KEY (Id_Professor),
   FOREIGN KEY (Id_User) REFERENCES User(Id_User)
 );

 CREATE TABLE if not exists pasantiasfic.Course
 (
   Id_Course INT NOT NULL AUTO_INCREMENT,
   NAME VARCHAR(40) NOT NULL,
   Hall INT NOT NULL,
   Section INT NOT NULL,
   Year INT NOT NULL,
   Semester INT NOT NULL,
   Id_Internship INT NOT NULL,
   Id_Professor INT NOT NULL,
   Id_Student INT NOT NULL,
   PRIMARY KEY (Id_Course),
   FOREIGN KEY (Id_Internship) REFERENCES Internship(Id_Internship),
   FOREIGN KEY (Id_Professor) REFERENCES Professor(Id_Professor),
   FOREIGN KEY (Id_Student) REFERENCES Student(Id_Student)
 );