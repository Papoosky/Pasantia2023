from flask import Flask, flash, request, redirect, url_for, send_file
from flask_cors import CORS, cross_origin
from server import *
import os
import shutil
import pprint
import time
# from flaskext.mysql import MySQL
# from locallib import *
# from constantes import *
from pprint import pprint
# from werkzeug.utils import secure_filename
# import os
# import base64

app = Flask(__name__)
app.debug = True
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_HEADERS'] = 'Access-Control-Allow-Origin'


@app.route('/get_hello',methods = ['POST', 'GET'])
def get_hello():
    #Example request
    try: 
        if request.method == 'POST':
            # data = request.json
            return {"status": "Hello world!"}
        else:
            return("no get ono")
    except Exception as e:
        print(e)
        return {"status": "no ok"}

@app.route('/step2_save',methods = ['POST', 'GET'])
def post_step2_save():
    """
    Funcion que crea pasantias. Recibe un json con los datos de la pasantia, empresa y supervisor.
    Llama funciones dedicadas a crear cada uno de los elementos.

    :return: id de la pasantia creada
    """ 
    if request.method == 'POST':
        data = request.json
        pprint(data)
        id_supervisor = create_supervisor(data["Supervisor"], data["Charge"], data["Phone_Number"], data["Cellphone_Number"],
                                        data["Job_Title"],data["Mail"],data["UserName"])
        id_company = create_company(data["Rut"],data["Name"],data["Country"],data["Direction"],data["Website"])
        id_internship = create_internship(id_supervisor, id_company, data["Start_Date"],
                                       data["Finish_Date"], data["Area"], data["Paid"], data["Weekly_Hours"], data["Total_Hours"],data["Functions"],data["Id_Student"])
        return(str(id_internship))
    else:
        return("no post")

@app.route('/get_rules',methods = ['POST', 'GET'])
def get_rules():
    """
    Funcion que obtiene los reglamentos que se han subido al servidor.
    :return: Lista con los nombres de los reglamentos
    """
    if request.method == 'GET':
        shared_path = os.path.join(os.path.dirname(__file__), 'Rules') #Busca la carpeta Rules
        newlist = os.listdir(shared_path) #Listado de sus contenidos, ojo que tambien cuenta carpetas, por lo que hay que eliminarlas
        newlist.remove("Actual") # Borramos la carpeta actual
        newlist.remove("PlaceHolder") # Borramos la carpeta placeholder 
        return (newlist)
    else:
        return("no post")
    
@app.route('/get_actual_rules',methods = ['POST', 'GET'])
def get_actual_rules():
    """
    Funcion que obtiene el reglamento actual.
    :return: Path del reglamento actual
    """
    if request.method == 'GET':
        actual_folder_path = os.path.join(os.path.dirname(__file__), 'Rules/PlaceHolder') #Busca la carpeta actual
        files_in_actual_folder = os.listdir(actual_folder_path) #Listado de sus contenidos, debería ser solo un pdf
        for file_name in files_in_actual_folder:
            if file_name.endswith(".pdf"):
                actual_rules = os.path.join(actual_folder_path, file_name) #Path del archivo pdf
            else:
                print("no pdf")
        return (actual_rules)
    else:
        return("no post")

#Deberia obtener el path del archivo nuevo, tomando como folder base Reglamentos
@app.route('/change_rules',methods = ['POST', 'GET'])
def post_change_rules():
    """
    Funcion que cambia el reglamento actual por uno nuevo.
    Esto se hace moviendo el archivo nuevo a la carpeta de reglamentos actual y moviendo el archivo antiguo a la carpeta de reglamentos general.
    En la carpeta PlaceHolder se guarda el nombre del archivo del reglamento actual
    replacing_file: Nombre del archivo que reemplazará al actual
    :return: Status de la operacion
    """
    if request.method == 'POST':
        data = request.json

        rules_Path = os.path.join(os.path.dirname(__file__), 'Rules')
        actual_folder_path = os.path.join(os.path.dirname(__file__), 'Rules/Actual')
        place_holder_folder_path = os.path.join(os.path.dirname(__file__), 'Rules/PlaceHolder')
        #Con las tres lineas anterior, obtenemos 3 paths, el del folder base, el de la carpeta actual y el de la carpeta placeholder
        files_in_actual_folder = os.listdir(place_holder_folder_path) #Deberia ser solo un pdf***
        try: 
            for file_name in files_in_actual_folder:
                if file_name.endswith(".pdf"):
                    replaced_pdf_old_path = os.path.join(place_holder_folder_path, file_name)
        except Exception as e:
            print("It is probably that actual folder is empty")
            print(e)
            return {"status": "no ok"}
        #Si no hay errores de capa 8, el codigo anterior lo único que hace es setupear una variable con el path del archivo del reglamento antiguo (replaced_pdf_old_path)
        # Y setupear filename, que sería el nombre del archivo del reglamento antiguo
        replaced_pdf_new_path = os.path.join(rules_Path, file_name) #Nuevo path del archivo antiguo, será movido a la carpeta de reglamentos general
        os.replace(replaced_pdf_old_path, replaced_pdf_new_path) #Movemos el archivo antiguo a la carpeta de reglamentos general
        replacing_path = os.path.join(rules_Path, data["replacing_file"]) #Path del archivo que será asignado como nuevo. (reglamentos/nombre.pdf)
        replacing_pdf_new_path = os.path.join(actual_folder_path,"Rules.pdf") #Nuevo path del archivo que será asignado como nuevo. (reglamentos/actual/Rules.pdf)
        #Debido a que react no mimporta dinamicamente, es necesario que las reglas actuales tengan un nombre fijo, en este caso Rules.pdf
        #Para guardar el nombre original del archivo, está la carpeta placeholder!
        holder_pdf_new_path = os.path.join(place_holder_folder_path,data["replacing_file"]) #Nuevo path del archivo que será asignado como nuevo. (reglamentos/placeholder/nombre.pdf)

        shutil.copy(replacing_path, holder_pdf_new_path) #Copiamos el archivo nuevo a la carpeta placeholder
        os.replace(replacing_path, replacing_pdf_new_path) #Reemplazamos el reglamento nuevo en la carpeta actual



        return("New rules are: "+str(data["replacing_file"]))
    else:
        return("no post")
    
@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        data = request.json
        login = login_verificate(data['email'],data['password'])
        print(login['role'])

        if login['success']:
            if login["role"] == "Student":
                student = get_student(data['email'],data['password'])
                return {'id_user' : student[0],'name': student[9] + " " + student[10],'email' : data['email'],'role': login['role'], 'step' : login['step'], 'id_student' : student[6]}
            elif login["role"] == "Supervisor":
                supervisor = get_supervisor(data['email'],data['password'])
                return {'id_user' : supervisor[0],'email' : data['email'],'role': login['role'], 'id_internship' : supervisor[5]}
            elif login["role"] == "Professor":
                professor = get_professor(data['email'],data['password'])
                return {'id_user' : professor[0],'email' : data['email'],'role': login['role'], 'name': professor[5] + " " + professor[6], 'id_professor' : professor[7]}
            else:
                user = get_user(data['email'],data['password'])
                return {'id' : user[0],'email' : data['email'],'role': login['role']}
        else:
            return ('algo salió mal2')
    else:
        return("no post")
    
#                 if login['role'] == 'Student':
#                     return {'id_user' : user[0],'name': user[9] + " " + user[10],'email' : data['email'],'role': login['role'], 'step' : login['step']}
#                 elif login['role'] == 'Supervisor':
#                     return {'id_user' : user[0],'name':"blank",'email' : data['email'],'role': login['role'], 'id_internship' : user[1]}
#             else:
#                 return {'email': '','role': login['role']}
#         else:
#         return("no post")
    
@app.route('/updatestep', methods=['POST', 'GET'])
def updatestep():
    if request.method == 'POST':
        data = request.json
        update = update_step(data['email'],data['step'])
        if update['success']:
            return ("updated")
        else:
            return ("no updated")
    else:
        return("no post")
@app.route('/get_students', methods=['POST', 'GET'])
def get_student_array():
    if request.method == 'POST':
        data = request.json
        student = get_students(data['step'])
        return student
    else:
        return("no post")
    

    

@app.route('/upload_rules',methods = ['POST', 'GET'])
def post_upload_rules():
    """
    Funcion que sube un reglamento al servidor.
    :return: Status de la operacion
    """
    file = request.files['file']
    filename = file.filename
    if filename == '':
        return('No selected file')
    if filename.rsplit('.', 1)[1].lower() != "pdf":
        return("It's not a pdf")
    rules_Path = os.path.join(os.path.dirname(__file__), 'Rules')
    a = file.save(os.path.join(rules_Path, str(time.time()) + "_" + filename))
    return("Subido con exito")

@app.route('/get_student_info',methods = ['POST', 'GET'])
def get_student_info():
    """
    Funcion que obtiene la informacion de un estudiante.
    :return: Informacion del estudiante
    """
    if request.method == 'POST':
        data = request.json
        print(data)
        studentInfo = get_info_internship(data['id'])
        print(studentInfo)
        return studentInfo
    else:
        return("no post")

@app.route('/get_student_name',methods = ['POST', 'GET'])
def get_student_name():
    """
    Funcion que obtiene el nombre de un estudiante.
    :return: Nombre del estudiante
    """
    if request.method == 'POST':
        data = request.json
        studentName = getStudentName(data['id_internship'])
        return {"nombre": studentName[0], 'apellido': studentName[1]}
    else:
        return("no post")

@app.route('/get_flag_supervisor',methods = ['POST', 'GET'])    
def get_flag_supervisor():
    """
    Funcion que obtiene el flag de supervisor.
    :return: Flag de supervisor
    """
    if request.method == 'POST':
        data = request.json
        flag = getFlagSupervisor(data['id_user'])
        return {"flag": flag}
    else:
        return("no post")


@app.route('/accept_supervisor',methods = ['POST', 'GET'])
def accept_supervisor():
    """
    Funcion que acepta un supervisor.
    :return: Status de la operacion
    """
    if request.method == 'POST':
        data = request.json
        acceptSupervisor(data['id_user'])
        return {"updated": "ok"}
    else:
        return("no post")

@app.route ('/updatestepsupervisor',methods = ['POST', 'GET'])
def updatestepsupervisor():
    """
    Funcion que actualiza el paso de un supervisor.
    :return: Status de la operacion
    """
    if request.method == 'POST':
        data = request.json
        updateStepSupervisor(data['step'],data['id_internship'])
        return {"updated": "ok"}
    else:
        return("no post")
    
@app.route('/get_courses',methods = ['POST', 'GET'])
def get_courses():
    """
    Funcion que obtiene los cursos de un estudiante.
    :return: Cursos del estudiante
    """
    if request.method == 'POST':
        data = request.json
        courses = getCourses(data['Id_Professor'])
        return courses
    else:
        return("no post")
    
@app.route('/get_courses_students',methods = ['POST', 'GET'])
def get_courses_students():
    """
    Funcion que obtiene los cursos de un estudiante.
    :return: Cursos del estudiante
    """
    if request.method == 'POST':
        data = request.json
        courses = getCoursesStudents(data['Id_Course'])
        return courses
    else:
        return("no post")
    
if __name__ == '__main__':
    app.run()
