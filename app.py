from flask import Flask, request, Response, render_template, jsonify
import json
import string
from os import listdir
import os
import logging
from logging.handlers import RotatingFileHandler
import pyodbc
import random


class Chatbot:
    def __init__(self):
        self.jsonData = None
        self.clueData = None
        self.conditionData = None

      
    def getJson(self):
        #fileName = os.getcwd()+'\\static\\tutorial\\content.json'
        fileName = os.getcwd()+'/static/tutorial/content.json'
        with open(fileName, encoding='utf-8') as json_data:
            self.jsonData = json.load(json_data)

        #fileName = os.getcwd()+'\\static\\tutorial\\clues.json'
        fileName = os.getcwd()+'/static/tutorial/clues.json'
        with open(fileName, encoding='utf-8') as json_data:
            self.clueData = json.load(json_data)

        #fileName = os.getcwd()+'\\static\\tutorial\\conditions.json'
        fileName = os.getcwd()+'/static/tutorial/conditions.json'
        with open(fileName, encoding='utf-8') as json_data:
            self.conditionData = json.load(json_data)

    
    def getData(self,condition,topic,index):
        data = ''
        #check notepad++ for old code

        if condition[0] == 'L':
            topics = ['Introduction','Tutorial','Task Reminder','Clue_Ins','Clue','Clue_End_Ins','Redundant_Ins','Redundant','Submit','Conclusion']
            if(topic != 'Clue'):
                if( (str(int(index)+1) not in self.jsonData[condition][topic]) ):
                    topic = topics[topics.index(topic)+1]
                    index = "0"
            else:
                topic = topics[topics.index(topic)+1]
                index = "0"

            if(topic == 'Clue'):
                data = [self.clueData['main']]
            #elif(topic == 'Redundant'):
            #    data = [self.clueData['redundant']]
            else:
                index = str(int(index)+1)
                data = [self.jsonData[condition][topic][index]]
        else:
            topics = ['Introduction','Tutorial','Task Reminder','Clue_Ins','Clue','Clue_End_Ins','Redundant_Ins','Redundant','Submit','Conclusion']
            if(topic != 'Clue' and topic != 'Redundant'):
                if( (str(int(index)+1) not in self.jsonData[condition][topic]) ):
                    topic = topics[topics.index(topic)+1]
                    index = "0"
            elif(topic == 'Redundant'):
                if( (str(int(index)+1) not in self.clueData['redundant']) ):
                    topic = topics[topics.index(topic)+1]
                    index = "0"
            elif(topic == 'Clue'):
                if( (str(int(index)+1) not in self.clueData['main']) ):
                    topic = topics[topics.index(topic)+1]
                    index = "0"

            index = str(int(index)+1)
            if(topic == 'Clue'):
                data = [self.clueData['main']]
            elif(topic == 'Redundant'):
                data = [self.clueData['redundant'][index]]
            else:
                data = [self.jsonData[condition][topic][index]]


        return (topic,index,data)

    def insertConsent(self,sessionId,fullname,uid,conditionId):
        server = 'mumachatserver.database.windows.net'
        database = 'mumachatdb'
        username = 'it-dci'
        password = 'Revanth1@#'
        driver= '{ODBC Driver 17 for SQL Server}'
        #sessionId = ''
        conn = pyodbc.connect('DRIVER='+driver+';SERVER='+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
        cursor = conn.cursor()
        try:

            cursor.execute('''SELECT COUNT(*) FROM ParticipantConsent where unumber = (?)''',uid)
            row_count = cursor.fetchone()[0]
            print(row_count)

            if row_count == 0:
                if sessionId == None or sessionId == '':
                    cursor.execute('''SELECT MAX(sessionId) FROM ParticipantConsent''')
                    sessionId = cursor.fetchone()[0]+1
                elif sessionId == 0:
                    sessionId = 1

                insertValues = (sessionId,conditionId,fullname,uid)
                #print(insertValues)
                cursor.execute('''INSERT INTO ParticipantConsent (sessionId,conditionId,fullname,unumber)  VALUES (?,?,?,?)''',insertValues)
                conn.commit()
                conn.close()
            else:
                sessionId = 0
        except:
            print('error')
            conn.close()
        return sessionId

    def updateMatrixResult(self,sessionId,workGrid):
        server = 'mumachatserver.database.windows.net'
        database = 'mumachatdb'
        username = 'it-dci'
        password = 'Revanth1@#'
        driver= '{ODBC Driver 17 for SQL Server}'
        conn = pyodbc.connect('DRIVER='+driver+';SERVER='+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
        cursor = conn.cursor()
        try:
            
            updateValues = (workGrid,sessionId)
            query = """UPDATE MatrixResult SET workGrid = ?  where sessionId = ?"""
            #print(insertValues)
            cursor.execute(query,updateValues)
            conn.commit()
            conn.close()
        except:
            print('error')
            conn.close()
        return sessionId


    def insertTransaction(self,sessionId,conditionId,clueId,Response,timeTaken,gridAction):
        #print("Transaction")
        server = 'mumachatserver.database.windows.net'
        database = 'mumachatdb'
        username = 'it-dci'
        password = 'Revanth1@#'
        driver= '{ODBC Driver 17 for SQL Server}'
        #sessionId = ''
        conn = pyodbc.connect('DRIVER='+driver+';SERVER='+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
        cursor = conn.cursor()
        try:
            if sessionId == None or sessionId == '':
                #cursor.execute('''SELECT MAX(sessionId) FROM Transactions''')
                #sessionId = cursor.fetchone()[0]+1
                sessionId = 9999
            elif sessionId == 0:
                sessionId = 1
            
            insertValues = (sessionId,conditionId,clueId,Response,round(float(timeTaken)),gridAction)
            #print(insertValues)
            cursor.execute('''INSERT INTO Transactions VALUES (?,?,?,?,?,?)''',insertValues)
            conn.commit()
            conn.close()
        except:
            print('error')
            conn.close()
        return sessionId

    def getRedundantClueById(self,clueId):
        #print(type(clueId))
        #print(clueId)
        return self.clueData['redundant'][clueId]
       

    def insertMatrixResult(self,sessionId,conditionId,matrixDict,timeTaken,workGrid,usedHints,sonaid,uid):
        #print("Matrix Result")
        server = 'mumachatserver.database.windows.net'
        database = 'mumachatdb'
        username = 'it-dci'
        password = 'Revanth1@#'
        driver= '{ODBC Driver 17 for SQL Server}'
        #sessionId = ''
        conn = pyodbc.connect('DRIVER='+driver+';SERVER='+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
        cursor = conn.cursor()
        try:
            if timeTaken=='NaN':
                timeTaken=0
                print("success enter")
            insertValues = (sessionId,conditionId,matrixDict,timeTaken,workGrid,usedHints,sonaid,uid)
            #print(insertValues)
            print(uid)
            cursor.execute('''INSERT INTO MatrixResult (sessionId,conditionId,matrixDict,timetaken,workGrid,usedHints,sonaid,uid) VALUES (?,?,?,?,?,?,?,?)''',insertValues)
            conn.commit()
            conn.close()
            print("success")
        except:
            print('error')
            conn.close()
        return sessionId

    def getMatrixResult(self,recordId):
        server = 'mumachatserver.database.windows.net'
        database = 'mumachatdb'
        username = 'it-dci'
        password = 'Revanth1@#'
        driver= '{ODBC Driver 17 for SQL Server}'
        #sessionId = ''
        row = ''
        conn = pyodbc.connect('DRIVER='+driver+';SERVER='+server+';PORT=1433;DATABASE='+database+';UID='+username+';PWD='+ password)
        cursor = conn.cursor()
        try:
            insertValues = (int(recordId))
            #print(insertValues)
            cursor.execute('''SELECT 
                    id as ID,
                    fullname as "Full Name", 
                    unumber as "U Number", 
                    mr.sonaid as "SONA ID", 
                    mr.conditionId as "Condition (ARC)",
                    matrixDict as "Matrix Result", 
                    timetaken as "Time Taken", 
                    workGrid as "Work Grid", 
                    usedHints as "Unused Hints", 
                    mr.insertTimestamp as "Inserted TS"
               FROM [dbo].[ParticipantConsent] as pc
               JOIN [dbo].[MatrixResult] as mr
               ON mr.sessionId = pc.sessionId
               AND mr.sonaid = pc.sonaid
               WHERE id = ?''',insertValues)
            row = cursor.fetchone()
            
            conn.commit()
            conn.close()
            print("success")
        except:
            print('error')
            conn.close()
        return row


app = Flask(__name__)
chatbot = Chatbot()

@app.route('/', defaults={'report': False})
def consent(report=False):
    #print("hit")
    report = False
    if 'report' in request.args:
        report = request.args['report'].lower()
        print(report)
        #print("hitmanif1")
    if report and report == "true":
        #print("hitmanif2")
        return render_template("report.html")
    else:
        #print("hitmanif3")
        return render_template("consent.html")

@app.route('/getSession')
def getSession():
    name = ''
    uid = '' 
    sonaid = ''
    if 'name' in request.args:
        name = request.args['name']
        
    if 'uid' in request.args:
        uid = request.args['uid']

    if 'sonaid' in request.args:
        sonaid = request.args['sonaid']
        
    fileName = os.getcwd()+'/static/tutorial/availableLimit.json'
    allowedLimit = None
    randomCondition = 0
    with open(fileName, encoding='utf-8') as json_data:
        allowedLimit = json.load(json_data)
    #print(allowedLimit)
    availableConditions = [condition[0] for condition in list(allowedLimit.items()) if condition[1] !=0] 
    print(availableConditions)
    if len(availableConditions) != 0:
        randomCondition = random.choice(availableConditions)
        currentLimit = allowedLimit[randomCondition]
    else:
        return jsonify({"condition":0})
    
    while currentLimit == 0 and len(availableConditions) != 0:
        availableConditions.remove(randomCondition)
        randomCondition = random.choice(availableConditions)
        currentLimit = allowedLimit[randomCondition]
    allowedLimit[randomCondition] = currentLimit-1
    sessionId = chatbot.insertConsent(None,name,uid,randomCondition)
    print(sessionId)
    with open(fileName, 'w', encoding='utf-8') as outfile:
        json.dump(allowedLimit, outfile)
    return jsonify({"condition":randomCondition,"sessionId":sessionId, "uid":uid})

@app.route('/<int:clue_id>')
def home(clue_id):
    chatbot.getJson()
    #print("Clue ID:" + str(clue_id))
    return render_template("index.html")


@app.route('/getResponse',methods=['GET'])
def getResponse():
    condition = ''
    topic = ''
    index = ''
    sessionId = ''
    response = ''
    timeTaken=''
    gridAction = ''
    uid =''
    if 'condition' in request.args:
        condition = request.args['condition']
        #print(condition)
    if 'topic' in request.args:
        topic = request.args['topic']
        #print(topic)
    if 'index' in request.args:
        index = request.args['index']
        #print(index)
    if 'sessionId' in request.args:
        sessionId = request.args['sessionId']
        #print(sessionId)
    if 'response' in request.args:
        response = request.args['response']
        #print(response)
    if 'timeTaken' in request.args:
        timeTaken = request.args['timeTaken']
        #print(timeTaken)
    if 'gridAction' in request.args:
        gridAction = request.args['gridAction']
        #print(gridAction)
    if 'uid' in request.args:
        uid = request.args['uid']
    #if(topic in ['Clue','Redundant_Ins','Redundant','Submit']):
        #print("Insert Data")
        #sessionId = chatbot.insertTransaction(sessionId,chatbot.conditionData[condition],index,response,timeTaken,gridAction)
        #print(sessionId)
    topic,index,data = chatbot.getData(condition,topic,index)
    
    return jsonify({"botResponse":data,'topic':topic,'index':index,'sessionId':sessionId,'condition':condition, 'uid':uid})


@app.route('/getMatrixResult',methods=['GET'])
def getMatrixResult():
    recordId = ''
    
    if 'recordId' in request.args:
        recordId = request.args['recordId']
    
    data = chatbot.getMatrixResult(recordId)
    result = {'id':data[0],
              'fullname':data[1],
              'uid':data[2],
              'sonaid':data[3],
              'conditionId':data[4],
              'matrixDict':data[5],
              'timetaken':data[6],
              'workGrid':data[7],
              'usedHints':data[8]
              }
    return json.dumps({"result":result})

@app.route('/storeMatrixResult',methods=['GET'])
def storeMatrixResult():
    condition = ''
    sessionId = ''
    matrixDict = ''
    timeTaken = ''
    usedHints = ''
    workGrid = ''
    sonaid = ''
    uid = ''
    
    if 'sessionId' in request.args:
        sessionId = request.args['sessionId']
        #print(sessionId)
    if 'condition' in request.args:
        condition = request.args['condition']
        #print(condition)
    if 'timeTaken' in request.args:
        timeTaken = request.args['timeTaken']
        #print(timeTaken)
    if 'matrixDict' in request.args:
        matrixDict = request.args['matrixDict']
        #print(matrixDict)
    if 'workGrid' in request.args:
        workGrid = request.args['workGrid']
        #print(workGrid)
    if 'usedHints' in request.args:
        usedHints = request.args['usedHints']
        #print(usedHints)
    if 'sonaid' in request.args:
        sonaid = request.args['sonaid']
        print(sonaid)
    if 'uid' in request.args:
        uid = request.args['uid']
        print(uid)

    chatbot.insertMatrixResult(sessionId,chatbot.conditionData[condition],matrixDict,timeTaken,workGrid,usedHints,sonaid,uid)
    print(request.args)
    return jsonify({"result":"success"})




@app.route('/updateMatrixResult',methods=['POST'])
def updateMatrixResult():
    sessionId = ''
    workGrid = ''
    
    req_data = request.get_data
    sessionId = request.form.get("sessionId")
    workGrid = request.form.get("workGrid")
    
    chatbot.updateMatrixResult(sessionId,workGrid)
    #print("Update matrix:")
    return jsonify({"result":"success"});
    
@app.route('/getRedundantClueById',methods=['GET'])
def getRedundantClueById():
    id = ''
    if 'id' in request.args:
        id = request.args['id']
        #print(id)

    data = chatbot.getRedundantClueById(id)
    return jsonify({"clue":data})

#@app.route('/getResponse',methods=['GET'])
#def getResponse():
#    userMessage = ''
#    if 'userMessage' in request.args:
#        userMessage = request.args['userMessage']
#    print(userMessage)
#    botResponse = userMessage
#    return jsonify({"botResponse":botResponse})

#@app.route('/getJson',methods=['GET'])
#def getJson():
#    fileName = os.getcwd()+'\\static\\tutorial\\content.json'
#    with open(fileName, encoding='utf-8') as json_data:
#        content= json.load(json_data)
#        return jsonify({"jsonContent":content})



if __name__ == "__main__":
    try:
        app.run(host='0.0.0.0',port=5000)
        app.debug=True
    finally:
        print("Exit")