import mysql.connector
import random
import requests

def send_mail(Supervisor,Alumno,Password,Mail):
    url = 'https://api.emailjs.com/api/v1.0/email/send'
    headers = {'Content-Type': 'application/json'}
    template_params = {
        'supervisor': Supervisor,
        'alumno': Alumno,
        'password': Password,
        'correo_supervisor': Mail
    }
    payload = {
    'service_id': "pasantiasfic",
    'template_id': "template_vscujgd",
    'user_id': "gl-GLP7ieqq7xBhMd",
    'template_params': template_params,
    # 'recipient': Mail
    }
    print(payload)
    response = requests.post(url, json=payload)
    if response.status_code == 200:
        print('Email sent successfully.')   
    else:
        print(f'Failed to send email. Status code: {response.status_code}, Response: {response.text}')

def select_all_person():
    connection = mysql.connector.connect(
        user='root', password='passroot', host='mysql', port="3306", database='pasantiasfic')
    cursor = connection.cursor()
    cursor.execute("SELECT * from Internship") 
    students = cursor.fetchall()
    connection.close()
    return students

def create_user(Mail, Password, Id_Role):
    connection = mysql.connector.connect( user='root', password='passroot', host='mysql', port="3306", database='pasantiasfic')
    cursor = connection.cursor()
    cursor.execute("INSERT INTO User (Mail, Password, Id_Role) VALUES (%s, %s, %s)", (Mail, Password, Id_Role))
    connection.commit()
    last_inserted_id = cursor.lastrowid
    connection.close()
    return last_inserted_id

def create_supervisor(Name, Charge, Phone_Number, Cellphone_Number, Job_Title ,Mail,UserName):
    """
    Funcion que crea supervisores en la base de datos.
    :param Name: Nombre del supervisor
    :param Charge: Cargo del supervisor
    :param Phone_Number: Numero de telefono del supervisor
    :param Cellphone_Number: Numero de celular del supervisor
    :param Job_Title: Titulo profesional del supervisor
    :param Mail: Correo electronico del supervisor
    :return: Id del supervisor creado
    """ 
    contraseña = str(random.randint(1000,9999)) #Genera una contraseña aleatoria de 4 digitos
    Id_User = create_user(Mail, contraseña, 4) #Crea un usuario con rol de supervisor (4)
    connection = mysql.connector.connect(
        user='root', password='passroot', host='mysql', port="3306", database='pasantiasfic')
    cursor = connection.cursor() #Conexion a la base de datos
    cursor.execute("INSERT INTO Supervisor (Id_User,Name, Charge, Phone_Number, Cellphone_Number, Job_Title,Mail,f_accepts) VALUES (%s,%s, %s, %s, %s, %s, %s,0)",
                    (Id_User,Name, Charge, Phone_Number, Cellphone_Number, Job_Title ,Mail)) #Ejecuta el comando SQL
    connection.commit() #Confirma los cambios
    last_inserted_id = cursor.lastrowid
    connection.close() #Cierra la conexion, muy importante porque sino se sql queda colgado
    #Todos los inserts se hacen de la misma manera, por lo que no se hará mayor enfasis en los coments
    mail = send_mail(Name,UserName,contraseña,Mail)
    print(mail)
    return last_inserted_id

def create_company(rut,Name,Country,Direction,Website):
    """
    Funcion que crea empresas en la base de datos.
    :param rut: Rut de la empresa
    :param Name: Nombre de la empresa
    :param Country: Pais de la empresa
    :param Direction: Direccion de la empresa
    :param Website: Sitio web de la empresa
    :return: Id de la empresa creada
    """
    connection = mysql.connector.connect(
        user='root', password='passroot', host='mysql', port="3306", database='pasantiasfic')
    cursor = connection.cursor()
    cursor.execute("INSERT INTO Company (Name, Rut, Country, Direction,Website) VALUES (%s, %s, %s, %s, %s)",
                    (Name, rut ,Country["label"],Direction,Website))
    connection.commit()
    last_inserted_id = cursor.lastrowid 
    connection.close()
    return last_inserted_id

def create_internship(id_supervisor, id_Company, Start_Date, Finish_Date, Area, Paid, Weekly_Hours, Total_Hours,Functions,ID_Student):
    """
    Funcion que crea pasantias en la base de datos.
    :param id_supervisor: Id del supervisor, entregada por la funcion create_supervisor
    :param id_Company: Id de la empresa, entregada por la funcion create_company
    :param Start_Date: Fecha de inicio de la pasantia
    :param Finish_Date: Fecha de termino de la pasantia
    :param Area: Area de la pasantia (Informatica, Mecanica, etc)
    :param Paid: Si la pasantia es pagada o no
    :param Weekly_Hours: Horas semanales de la pasantia
    :param Total_Hours: Horas totales de la pasantia
    :param Functions: Funciones del pasante
    :return: Id de la pasantia creada
    """
    connection = mysql.connector.connect(
        user='root', password='passroot', host='mysql', port="3306", database='pasantiasfic')
    cursor = connection.cursor()
    cursor.execute("INSERT INTO Internship (Id_Supervisor, Id_Company, Start_Date, Finish_Date, Area, Paid, Weekly_Hours, Total_Hours, Functions,Id_student) VALUES (%s, %s, %s, %s, %s, %s, %s, %s,%s,%s)",
                    (id_supervisor, id_Company, Start_Date, Finish_Date, Area, Paid, Weekly_Hours, Total_Hours,Functions,ID_Student))
    connection.commit()
    last_inserted_id = cursor.lastrowid #Se supone que esto me daria el primarykey
    connection.close()
    return last_inserted_id

def login_verificate(email, password):
    result = get_user(email, password)
    connection = mysql.connector.connect( user='root', password='passroot', host='mysql', port="3306", database='pasantiasfic')
    cursor = connection.cursor()
    print(result)
    if result:
        print("El usuario existe en la base de datos.") 
        if result[4] == 'Student':
            print(result[0])
            cursor.execute("SELECT step FROM Student WHERE Id_User = %s", (result[0],))
            step = cursor.fetchone()
            print(step)
            connection.close()
            return {'success': True,'role': result[4], 'step': step[0]}
        else:    
            connection.close()
            return {'success': True, 'role': result[4]}
    else:
        connection.close()
        print("El usuario no existe en la base de datos.")
        return {'success': False, 'role': ''}
        

def update_step(id, step):
    connection = mysql.connector.connect( user='root', password='passroot', host='mysql', port="3306", database='pasantiasfic')
    cursor = connection.cursor()
    cursor.execute("UPDATE Student SET Step = %s WHERE Id_User = %s", (step, id))
    connection.commit()
    connection.close()
    return {'success': True}

def get_user(email,password):
    connection = mysql.connector.connect( user='root', password='passroot', host='mysql', port="3306", database='pasantiasfic')
    cursor = connection.cursor()
    print("mail= " + email+ "password= " + password)
    cursor.execute("SELECT User.*, Roles.role FROM User JOIN roles ON User.Id_Role = Roles.Id_Role WHERE Mail = %s AND Password = %s ", (email, password))
    # if role == 'Student':
    #     print("Student")
    #     cursor.execute("SELECT *, Roles.role FROM User JOIN roles ON User.Id_Role = Roles.Id_Role JOIN Student on Student.Id_User = User.Id_User WHERE Mail = %s AND Password = %s ", (email, password))
    # elif role == 'Supervisor':
    #     cursor.execute("SELECT User.*, Roles.role,Id_Internship FROM User JOIN Roles ON User.Id_Role = Roles.Id_Role JOIN Supervisor ON User.Id_User = Supervisor.Id_User JOIN Internship ON Supervisor.Id_Supervisor = Internship.Id_Supervisor WHERE User.Mail = %s AND User.Password = %s", (email, password))
    result = cursor.fetchone()
    connection.close()
    return result

def get_student(email,password):
    connection = mysql.connector.connect( user='root', password='passroot', host='mysql', port="3306", database='pasantiasfic')
    cursor = connection.cursor()
    print("mail= " + email+ "password= " + password)
    cursor.execute("SELECT *, Roles.role FROM User JOIN roles ON User.Id_Role = Roles.Id_Role JOIN Student on Student.Id_User = User.Id_User WHERE Mail = %s AND Password = %s ", (email, password))
    result = cursor.fetchone()
    connection.close()
    return result

def get_supervisor(email,password):
    connection = mysql.connector.connect( user='root', password='passroot', host='mysql', port="3306", database='pasantiasfic')
    cursor = connection.cursor()
    print("mail= " + email+ "password= " + password)
    cursor.execute("SELECT User.*, Roles.role,Id_Internship FROM User JOIN Roles ON User.Id_Role = Roles.Id_Role JOIN Supervisor ON User.Id_User = Supervisor.Id_User JOIN Internship ON Supervisor.Id_Supervisor = Internship.Id_Supervisor WHERE User.Mail = %s AND User.Password = %s", (email, password))
    result = cursor.fetchone()
    connection.close()
    return result

def get_professor(email,password):
    connection = mysql.connector.connect( user='root', password='passroot', host='mysql', port="3306", database='pasantiasfic')
    cursor = connection.cursor()
    print("mail= " + email+ "password= " + password)
    cursor.execute("SELECT User.*, Roles.role, Name, Last_Name, Id_Professor FROM User JOIN roles ON User.Id_Role = Roles.Id_Role JOIN Professor on Professor.Id_User = User.Id_User WHERE Mail = %s AND Password = %s ", (email, password))
    result = cursor.fetchone()
    connection.close()
    return result

    
    

def get_students(step):
    connection = mysql.connector.connect( user='root', password='passroot', host='mysql', port="3306", database='pasantiasfic')
    cursor = connection.cursor()
    cursor.execute("SELECT Student.Id_User, Student.Rut, Student.Name, Student.Last_Name, User.Mail FROM Student INNER JOIN User ON Student.Id_User = User.Id_User WHERE Student.Step = %s", (step,))
    rows = cursor.fetchall()
    students = []
    for row in rows:
        student = {
            'id': row[0],
            'rut': row[1],
            'firstName': row[2],
            'lastName': row[3],
            'email': row[4]
        }
        students.append(student)
    connection.close()
    return students

def get_info_internship(id):
    connection = mysql.connector.connect( user='root', password='passroot', host='mysql', port="3306", database='pasantiasfic')
    cursor = connection.cursor()
    cursor.execute("SELECT Start_Date,Finish_Date,Area,Paid,Weekly_Hours,Total_Hours,Functions,Description,f_entry, f_sent,f_verification FROM Internship JOIN Student on Student.Id_Student = Internship.Id_Student JOIN User on User.Id_User = Student.Id_User WHERE User.Id_User = %s", (id,))
    rows = cursor.fetchall()
    studentInfo = []
    for row in rows:
        student = {
            'start_date': row[0],
            'finish_date': row[1],
            'area': row[2],
            'paid': row[3],
            'weekly_hours': row[4],
            'total_hours': row[5],
            'functions': row[6],
            'description': row[7],
            'f_entry': row[8],
            'f_sent': row[9],
            'f_verification': row[10]
        }
        studentInfo.append(student)
    connection.close()
    return studentInfo

def getStudentName(id):
    connection = mysql.connector.connect( user='root', password='passroot', host='mysql', port="3306", database='pasantiasfic')
    cursor = connection.cursor() 
    cursor.execute("SELECT Student.Name, Student.Last_Name FROM User JOIN Roles ON User.Id_Role = Roles.Id_Role JOIN Supervisor ON User.Id_User = Supervisor.Id_User JOIN Internship ON Supervisor.Id_Supervisor = Internship.Id_Supervisor JOIN Student ON Internship.Id_Student = Student.Id_Student WHERE Id_Internship = %s", (id,))
    result = cursor.fetchone()
    connection.close()
    return result

def getFlagSupervisor(id):
    connection = mysql.connector.connect( user='root', password='passroot', host='mysql', port="3306", database='pasantiasfic')
    cursor = connection.cursor() 
    cursor.execute("SELECT f_accepts FROM Supervisor WHERE Id_User = %s", (id,))
    result = cursor.fetchone()
    connection.close()
    return result

def acceptSupervisor(id):
    connection = mysql.connector.connect( user='root', password='passroot', host='mysql', port="3306", database='pasantiasfic')
    cursor = connection.cursor() 
    cursor.execute("UPDATE Supervisor SET f_accepts = 1 WHERE Id_User = %s", (id,))
    connection.commit()
    connection.close()
    return {'success': True}


def updateStepSupervisor(step, id_internship):
    connection = mysql.connector.connect( user='root', password='passroot', host='mysql', port="3306", database='pasantiasfic')
    cursor = connection.cursor() 
    cursor.execute("UPDATE Student SET Step = %s WHERE Id_Student = (SELECT Id_Student FROM Internship WHERE Id_Internship = %s)", (step,id_internship))
    connection.commit()
    connection.close()
    return {'success': True}

def getCourses(Id_Professor):
    connection = mysql.connector.connect( user='root', password='passroot', host='mysql', port="3306", database='pasantiasfic') 
    cursor = connection.cursor() 
    cursor.execute("SELECT Course.* FROM Course WHERE Id_Professor = %s", (Id_Professor,))
    rows = cursor.fetchall()
    courses = []
    for row in rows:
        course = {
            'id': row[0],
            'name': row[1]
        }
        courses.append(course)
    connection.close()
    return courses
def getCoursesStudents(Id_Course):
    connection = mysql.connector.connect( user='root', password='passroot', host='mysql', port="3306", database='pasantiasfic') 
    cursor = connection.cursor()
    cursor.execute("SELECT Student.Id_Student, Rut, Student.Name, Last_Name, Mail FROM Student JOIN Course on Student.Id_Student = Course.Id_Student JOIN User on User.Id_User = Student.Id_User WHERE Id_Course = %s", (Id_Course,))
    rows = cursor.fetchall()
    students = []
    for row in rows:
        student = {
            'id': row[0],
            'rut': row[1],
            'firstName': row[2],
            'lastName': row[3],
            'email': row[4]
        }
        students.append(student)
    connection.close()
    return students


