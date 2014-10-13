#!/usr/bin/env python
#-*- coding: utf-8 -*-
import tornado.web
import tornado.httpserver
import tornado.options
import tornado.ioloop
from tornado.options import define,options

import os
import time
import json


from common.logLib import *
from common.mysqlLib import *

import urlparse

defaultport=8888
import socket
hostname=socket.gethostname()
hostname=socket.gethostbyname(hostname)
hostname=u"cp01-rd-bu-09-da02.cp01.baidu.com"
#print hostname

import re
import urllib
#CAS setting
CAS_SETTINGS = {
	#replace this with your cas server url
	'cas_server' : 'https://uuap.baidu.com/',
    #'cas_server' : 'http://itebeta.baidu.com:8100',

	#replace this with your website url
	'service_url' : "http://"+hostname+":"+str(defaultport)+"/",
	#CAS protocol version, 1.0 or 2.0? default is 2.0.
	'version' : 2
}
########################################
class authenticateBase(tornado.web.RequestHandler):
    def get_upps_user(self):
        #what you finally get
        userid = None
        try:
            server_ticket = self.get_argument( 'ticket' )
        except Exception, e:
            #print(str(e))
            return userid
        #validate the STprint server_ticket
        validate_suffix = '/validate' if CAS_SETTINGS[ 'version' ] == 1 else '/proxyValidate'
        validate_url = CAS_SETTINGS[ 'cas_server'] + validate_suffix + '?service=' + urllib.quote( CAS_SETTINGS[ 'service_url' ] ) + '&ticket=' + urllib.quote( server_ticket )
        response = urllib.urlopen( validate_url ).read()
        pattern = r'<cas:user>(.*)</cas:user>'
        match = re.search( pattern, response )
        if match:
            userid = match.groups()[ 0 ]
        if not userid:
            pass
        return userid
    def get_cookie_user(self):
        return self.get_secure_cookie("user")

class LoginHandler(authenticateBase):
    def get(self):
        userid=self.get_upps_user()
        if(userid):
            self.set_secure_cookie("user",userid)
            self.render("family.html",usrname=userid)
        else:
            redirect_url = CAS_SETTINGS[ 'cas_server' ] + '/login?service=' + CAS_SETTINGS[ 'service_url' ]
            self.redirect( redirect_url )

class LogoutHandler(tornado.web.RequestHandler):
    def get( self ):
        #redirect to cas server
        self.clear_cookie("user")
        redirect_url = CAS_SETTINGS[ 'cas_server' ] + '/logout'
        self.redirect( redirect_url )
########################################

class pjt(tornado.web.RequestHandler):
    def get(self):
        mysql=mysqlLib()
        pjt_list=mysql.query_pjt({"offset":0,"row_cnt":10})
        mysql.close()
        self.render("pjtadd.html",pjt_list=pjt_list)
    def post(self):
        name=self.get_argument("pjt_name").encode('utf-8')
        info=self.get_argument("pjt_info").encode('utf-8')
        mysql=mysqlLib()
        n,last_id=mysql.add_pjt(param=(name,info,0))
        mysql.close()
        ret_dict={"add_result":str(n),"last_id":str(last_id)}
        self.write(json.dumps(ret_dict))
class task(tornado.web.RequestHandler):
    def get(self):
        pjt_id=self.get_argument("pjt_id").encode('utf-8')
        mysql=mysqlLib()
        task_list=mysql.query_task({"offset":0,"row_cnt":10})
        mysql.close()
        self.render("taskadd.html",task_list=task_list,pjt_id=pjt_id)
    def post(self):
        pjt_id=self.get_argument("pjt_id").encode('utf-8')
        name=self.get_argument("name_name").encode('utf-8')
        version=self.get_argument("name_version").encode('utf-8')
        info=self.get_argument("name_info").encode('utf-8')
        testtype=self.get_argument("name_testtype").encode('utf-8')
        processtype=self.get_argument("name_processtype").encode('utf-8')
        filepath=self.get_argument("name_filepath").encode('utf-8')

        param=(pjt_id,name,version,info,testtype,processtype,filepath,0)
        mysql=mysqlLib()
        n,last_id=mysql.add_task(param)
        mysql.close()
        ret_dict={"add_result":str(n),"last_id":str(last_id)}
        self.write(json.dumps(ret_dict))
class assureinfo(tornado.web.RequestHandler):
    def get(self):
        pjt_id=self.get_argument("pjt_id").encode('utf-8')
        task_id=self.get_argument("task_id").encode('utf-8')
        mysql=mysqlLib()
        pjt_list=mysql.query_pjt({"offset":0,"row_cnt":10})
        task_list=mysql.query_task({"offset":0,"row_cnt":10})
        mysql.close()
        self.render("assureinfo.html",task_list=task_list,pjt_list=pjt_list,pjt_id=pjt_id,task_id=task_id)
    def post(self):
        pjt_id=self.get_argument("pjt_id").encode('utf-8')
        task_id=self.get_argument("task_id").encode('utf-8')
        now=datetime.datetime.now().strftime("%y-%m-%d %H:%M:%S")

        mysql=mysqlLib()
        param=(now,task_id)
        n=mysql.update_task_starttime(param)
        param=(1,task_id)
        n=mysql.update_task_status(param)
        mysql.close()
        ret_dict={"update_result":str(n)}
        self.write(json.dumps(ret_dict))
class testrunner(tornado.web.RequestHandler):
    def get(self):
        pjt_id=self.get_argument("pjt_id").encode('utf-8')
        task_id=self.get_argument("task_id").encode('utf-8')
        mysql=mysqlLib()
        pjt_list=mysql.query_pjt({"id":pjt_id,"offset":0,"row_cnt":10})
        task_list=mysql.query_task({"pjt_id":pjt_id,"task_id":task_id,"offset":0,"row_cnt":10})
        mysql.close()
        self.render("testrunner.html",task_list=task_list,pjt_list=pjt_list)
    def post(self):
        try:
            post_param=eval(self.request.body)
            pjt_id=post_param['pjt_id']
            task_id=post_param['task_id']

            mysql=mysqlLib()
            task_list=mysql.query_task({"pjt_id":pjt_id,"task_id":task_id,"offset":0,"row_cnt":10})
            json_data={'status':str(task_list[0][10])}
            self.write(json.dumps(json_data))
        except:
            pass

class BaseHandler(tornado.web.RequestHandler):
    def get_current_user(self):
        return self.get_secure_cookie("user")
class login(BaseHandler):
    def get(self):
        #self.render("login.html",usrname=usrname)
        '''self.write('<html><body><form action="/autotestPlatform/login/" method="post">'
                   'Name: <input type="text" name="name">'
                   '<input type="submit" value="Sign in">'
                   '</form></body></html>')'''
        self.render("login.html",warning='')

    def post(self):
        if(self.get_argument("name")==''):
            self.render("login.html",warning=u'请您输入用户名')
        else:
            self.set_secure_cookie("user", self.get_argument("name"))
            self.redirect("/family/")
class logout(BaseHandler):
    def get(self):
        #self.render("login.html",usrname=usrname)
        '''self.write('<html><body><form action="/autotestPlatform/login/" method="post">'
                   'Name: <input type="text" name="name">'
                   '<input type="submit" value="Sign in">'
                   '</form></body></html>')'''
        self.clear_cookie("user")
        self.redirect("/autotestPlatform/login/")

class mainframework(authenticateBase):
    def get(self):
        userid=self.get_cookie_user()
        print userid
        if(userid):
            #navhtml=navform()
            #print navhtml
            self.render("tree.html",usrname=userid)
        else:
            redirect_url = CAS_SETTINGS[ 'cas_server' ] + '/login?service=' + CAS_SETTINGS[ 'service_url' ]
            self.redirect( redirect_url )
        '''#import getpass
        #usrname=getpass.getuser()
        if not self.current_user:
            #self.set_secure_cookie("user",usrname)
            self.redirect("/login/")
            return
        usrname=tornado.escape.xhtml_escape(self.current_user)
        self.render("tree.html",usrname=usrname)
        #self.redirect("/autotestPlatform/homepage/")'''

    def post(self):
        pjt_id=self.get_argument("pjt_name").encode('utf-8')
        name=self.get_argument("taskname").encode('utf-8')
        version=self.get_argument("version").encode('utf-8')
        info=self.get_argument("taskinfo").encode('utf-8')
        testtype=self.get_argument("test_type").encode('utf-8')
        processtype=self.get_argument("test_process").encode('utf-8')
        filepath=self.get_argument("filepath").encode('utf-8')
        test_time=self.get_argument("test_time").encode('utf-8')
        test_data=self.get_argument("test_data").encode('utf-8')

        param=(pjt_id,name,version,processtype,testtype,filepath,info,test_time,test_data)
        mysql=mysqlLib()
        n,last_id=mysql.add_task_management(param)
        mysql.close()
        ret_dict={"add_result":str(n),"last_id":str(last_id)}
        self.write(json.dumps(ret_dict))

class testmanagement(tornado.web.RequestHandler):
    def post(self):
        post_param=urlparse.parse_qs(self.request.body,True)
        task_id=post_param['task_id'][0]
        username=post_param['username'][0]

        #task_id=self.get_argument("task_id").encode('utf-8')
        mysql=mysql=mysqlLib()
        task=mysql.query_task_management({"id":task_id})
        pjt_id=task[0][1]
        testtype=task[0][5]
        starttime=datetime.datetime.now().strftime("%y-%m-%d %H:%M:%S")
        status=0;
        param=(task_id,pjt_id,testtype,starttime,status,username,)
        n,last_id=mysql.add_test_management(param)
        mysql.close()
        ret_dict={"add_result":str(n),"last_id":str(last_id)}
        #print ret_dict
        self.write(json.dumps(ret_dict))

class deletetask(tornado.web.RequestHandler):
    def post(self):
        task_id=self.get_argument("task_id").encode('utf-8')
        mysql=mysql=mysqlLib()
        n=mysql.del_task_management(param=(task_id,))
        mysql.close()
        ret_dict={"del_result":str(n)}
        self.write(json.dumps(ret_dict))

class refresh(tornado.web.RequestHandler):
    def post(self):
        post_param=urlparse.parse_qs(self.request.body,True)
        #print post_param
        limit=int(post_param['limit'][0])
        offset=int(post_param['offset'][0])
        pjt_id=int(post_param['pjt_id'][0])
        #print limit,offset

        mysql=mysqlLib()
        test_cnt=0
        if(pjt_id == 0):
            test_cnt=mysql.query_total_test_management({})
        else:
            param={"pjt_id":pjt_id}
            test_cnt=mysql.query_total_test_management(param)
        if(pjt_id == 0):
            param={"offset":offset,"row_cnt":limit}
        else:
            param={"offset":offset,"row_cnt":limit,"pjt_id":pjt_id}
        test_list=mysql.query_test_management(param)

        test_info={}
        test_info['cnt']=test_cnt
        ret_dict=[]
        for index,item in enumerate(test_list):
            sub_ret_dict={}
            sub_ret_dict['id']=str(int(item[0]))
            sub_ret_dict['task_id']=str(int(item[1]))
            sub_ret_dict['pjt_id']=str(int(item[2]))
            sub_ret_dict['testtype']=str(int(item[3]))
            sub_ret_dict['starttime']=str(item[4])
            sub_ret_dict['endtime']=str(item[5])
            sub_ret_dict['status']=str(int(item[6]))
            sub_ret_dict['startby']=item[8]
            sub_ret_dict['pjt_name']=pjtidTopjtname(int(item[2]))
            ret_dict.append(sub_ret_dict)
        #print ret_dict
        mysql.close()
        test_info['list']=ret_dict
        self.write(json.dumps(test_info))

class refreshtask(tornado.web.RequestHandler):
    def post(self):
        post_param=urlparse.parse_qs(self.request.body,True)
        #print post_param
        limit=int(post_param['limit'][0])
        offset=int(post_param['offset'][0])
        pjt_id=int(post_param['pjt_id'][0])
        #print limit,offset

        mysql=mysqlLib()
        task_cnt=0
        if(pjt_id == 0):
            task_cnt=mysql.query_total_task_management({})
        else:
            param={"pjt_id":pjt_id}
            task_cnt=mysql.query_total_task_management(param)
        if(pjt_id == 0):
            param={"offset":offset,"row_cnt":limit}
        else:
            param={"offset":offset,"row_cnt":limit,"pjt_id":pjt_id}
        task_list=mysql.query_task_management(param)
       	#print task_list
        mysql.close()
        task_info={}
        task_info['cnt']=task_cnt
        ret_dict=[]
        for index,item in enumerate(task_list):
            sub_ret_dict={}
            sub_ret_dict['id']=str(int(item[0]))
            sub_ret_dict['pjt_id']=str(int(item[1]))
            sub_ret_dict['name']=item[2]
            sub_ret_dict['version']=item[3]
            sub_ret_dict['processtype']=str(int(item[4]))
            sub_ret_dict['testtype']=str(int(item[5]))
            sub_ret_dict['filepath']=item[6]
            sub_ret_dict['info']=item[7]
            sub_ret_dict['pjt_name']=pjtidTopjtname(int(item[1]))
            #print int(item[1])
            ret_dict.append(sub_ret_dict)
        #print ret_dict
       # print ret_dict
        task_info['list']=ret_dict
        self.write(json.dumps(task_info))
class dtreedisplay(tornado.web.RequestHandler):
    def post(self):
        mysql=mysqlLib()
        test_list=mysql.query_project_management({})
        mysql.close()
        ret_dict=[]
        for index,item in enumerate(test_list):
            sub_ret_dict={}
            sub_ret_dict['id']=str(int(item[0]))
            sub_ret_dict['name']=item[1]
            sub_ret_dict['info']=item[2]
            sub_ret_dict['status']=str(int(item[3]))
            sub_ret_dict['parent']=str(int(item[4]))
            sub_ret_dict['position']=str(int(item[5]))
            sub_ret_dict['showid']=int(item[6])
            ret_dict.append(sub_ret_dict)
        #print ret_dict
        #print ("in dtreedisplay----\n"+str(ret_dict))
        self.write(json.dumps(ret_dict))

class testreport(tornado.web.RequestHandler):
    def post(self):
        try:
            post_param=urlparse.parse_qs(self.request.body,True)
            test_id=post_param['test_id'][0]

            mysql=mysqlLib()
            test_list=mysql.query_test_script({"task_id":test_id})
            mysql.close()
            ret_dict=[]
            for index,item in enumerate(test_list):
                sub_ret_dict={}
                sub_ret_dict['task_id']=str(int(item[1]))
                sub_ret_dict['caseid']=str(int(item[2]))
                sub_ret_dict['casename']=item[3]
                sub_ret_dict['starttime']=str(item[4])
                sub_ret_dict['endtime']=str(item[5])
                sub_ret_dict['result']=str(item[6])
                ret_dict.append(sub_ret_dict)
            #print ret_dict
            self.write(json.dumps(ret_dict))
        except:
            ret_dict=[]
            sub_ret_dict={}
            sub_ret_dict['log']=u"请选择需要查看的任务流水号"
            ret_dict.append(sub_ret_dict)
            #print ret_dict
            self.write(json.dumps(ret_dict))
class testreportbenchmark(tornado.web.RequestHandler):
    def post(self):
        try:
            post_param=urlparse.parse_qs(self.request.body,True)
            test_id=post_param['test_id'][0]

            mysql=mysqlLib()
            test_list=mysql.query_benchmark_test({"task_id":test_id})
            mysql.close()
            ret_dict=[]
            for index,item in enumerate(test_list):
                sub_ret_dict={}
                sub_ret_dict['task_id']=str(int(item[1]))
                sub_ret_dict['casename']=item[2]
                sub_ret_dict['starttime']=str(item[3])
                sub_ret_dict['endtime']=str(item[4])
                sub_ret_dict['timeelapsed']=time.mktime(time.strptime(sub_ret_dict['endtime'],'%Y-%m-%d %H:%M:%S'))-time.mktime(time.strptime(sub_ret_dict['starttime'],'%Y-%m-%d %H:%M:%S'))
                sub_ret_dict['totalrequest']=int(item[5])
                sub_ret_dict['totalresponse']=int(item[6])
                sub_ret_dict['responserate']=float(sub_ret_dict['totalresponse'])/float(sub_ret_dict['totalrequest'])
                sub_ret_dict['totalerror']=int(item[7])
                sub_ret_dict['errorrate']=float(sub_ret_dict['totalerror'])/float(sub_ret_dict['responserate'])
                sub_ret_dict['qps']=float(sub_ret_dict['totalresponse'])/float(sub_ret_dict['timeelapsed'])
                sub_ret_dict['latency']=1000/float(sub_ret_dict['qps'])
                sub_ret_dict['qps_curve']=item[8]
                sub_ret_dict['mem_use_curve']=item[10]

                d=sub_ret_dict['qps_curve']
                f = open( "./static/qps"+sub_ret_dict['task_id']+".png","wb" )
                f.write(d)
                f.close()
                sub_ret_dict['qps_curve']="/static/qps"+sub_ret_dict['task_id']+".png"

                dd=sub_ret_dict['mem_use_curve']
                ff = open( "./static/mem"+sub_ret_dict['task_id']+".png","wb" )
                ff.write(dd)
                ff.close()
                sub_ret_dict['mem_use_curve']="/static/mem"+sub_ret_dict['task_id']+".png"

                ret_dict.append(sub_ret_dict)
            #print ret_dict
            self.write(json.dumps(ret_dict))
        except:
            ret_dict=[]
            sub_ret_dict={}
            sub_ret_dict['log']=u"请选择需要查看的任务流水号"
            ret_dict.append(sub_ret_dict)
            #print ret_dict
            self.write(json.dumps(ret_dict))

class testreportstatus(tornado.web.RequestHandler):
    def post(self):
        try:
            post_param=urlparse.parse_qs(self.request.body,True)
            test_id=post_param['test_id'][0]

            mysql=mysqlLib()
            test_list=mysql.query_test_management({"id":test_id})
            mysql.close()
            ret_dict=[]
            for index,item in enumerate(test_list):
                sub_ret_dict={}
                sub_ret_dict['log']=item[7].replace("\n","<br/>")
                sub_ret_dict['status']=str(int(item[6]))
            ret_dict.append(sub_ret_dict)
            #print ret_dict
            self.write(json.dumps(ret_dict))
        except:
            pass

class modtask(tornado.web.RequestHandler):
    def post(self):
        task_id=self.get_argument("task_id").encode('utf-8')
        pjt_id=self.get_argument("pjt_name").encode('utf-8')
        name=self.get_argument("taskname").encode('utf-8')
        version=self.get_argument("version").encode('utf-8')
        info=self.get_argument("taskinfo").encode('utf-8')
        testtype=self.get_argument("test_type").encode('utf-8')
        processtype=self.get_argument("test_process").encode('utf-8')
        filepath=self.get_argument("filepath").encode('utf-8')
        param=(pjt_id,name,version,processtype,testtype,filepath,info,task_id)
        mysql=mysqlLib()
        n=mysql.update_task_management(param)
        mysql.close()
        ret_dict={"mod_result":str(n)}
        self.write(json.dumps(ret_dict))

class history_query_test_management(tornado.web.RequestHandler):
    def post(self):
        post_param=urlparse.parse_qs(self.request.body,True)
        #print post_param
        limit=int(post_param['limit'][0])
        offset=int(post_param['offset'][0])
        starttime=post_param['starttime'][0]
        endtime=post_param['endtime'][0]
        startby=int(post_param['startby'][0])
        pjt_name=int(post_param['pjt_name'][0])
        test_type=int(post_param['test_type'][0])-1
        test_result=int(post_param['test_result'][0])-1

        #print limit,offset
        mysql=mysqlLib()
        param={"offset":offset,"row_cnt":limit}
        if(starttime != ''):
            param['stime']=starttime
        if(endtime != ''):
            param['etime']=endtime
        if(startby != 0):
            param['startby']=startby
        if(pjt_name != 0):
            param['pjt_id']=pjt_name
        if(test_type != -1):
            param['testtype']=test_type
        if(test_result != -1):
            param['status']=test_result
        task_cnt,task_list=mysql.history_query_test_management(param)
        #print task_list
        param={}
        if(starttime != ''):
            param['stime']=starttime
        if(endtime != ''):
            param['etime']=endtime
        if(startby != 0):
            param['startby']=startby
        if(pjt_name != 0):
            param['pjt_id']=pjt_name
        if(test_type != -1):
            param['testtype']=test_type
        if(test_result != -1):
            param['status']=test_result
        task_cnt_total,task_list_total=mysql.history_query_test_management(param)

        mysql.close()
        task_info={}
        task_info['cnt']=task_cnt_total
        ret_dict=[]
        for index,item in enumerate(task_list):
            sub_ret_dict={}
            sub_ret_dict['id']=str(int(item[0]))
            sub_ret_dict['task_id']=str(int(item[1]))
            sub_ret_dict['pjt_id']=str(int(item[2]))
            sub_ret_dict['testtype']=str(int(item[3]))
            sub_ret_dict['starttime']=str(item[4])
            sub_ret_dict['endtime']=str(item[5])
            sub_ret_dict['status']=str(int(item[6]))
            sub_ret_dict['startby']=item[7]
            sub_ret_dict['pjt_name']=pjtidTopjtname(int(item[2]))
            ret_dict.append(sub_ret_dict)
        #print ret_dict
        task_info['list']=ret_dict
        self.write(json.dumps(task_info))

class homepage(authenticateBase):
    def get(self):
        userid=self.get_cookie_user()
        if(userid):
            print userid
            self.render("index.html",usrname=userid)
        else:
            print userid
            redirect_url=CAS_SETTINGS[ 'cas_server' ] + '/login?service=' + CAS_SETTINGS[ 'service_url' ]
            self.redirect(redirect_url)
        '''#import getpass
        #usrname=getpass.getuser()
        if not self.current_user:
            #self.set_secure_cookie("user",usrname)
            self.redirect("/autotestPlatform/login/")
            return
        usrname=tornado.escape.xhtml_escape(self.current_user)
        self.render("index.html",usrname=usrname)'''


class family(BaseHandler):
    def get(self):
        #import getpass
        #usrname=getpass.getuser()
        if not self.current_user:
            #self.set_secure_cookie("user",usrname)
            self.redirect("/login/")
            return
        usrname=tornado.escape.xhtml_escape(self.current_user)
        self.render("family.html",usrname=usrname)

class chartusagestatpeople(tornado.web.RequestHandler):
    def post(self):
        try:
            mysql=mysqlLib()
            test_list=mysql.query_test_management_early_date({"offset":0,"row_cnt":1})
            startdate=str(test_list[0][0])
            #print startdate
            startdate=datetime.datetime.strptime(startdate,"%Y-%m-%d")
            #print str(startdate)
            nextdate=startdate+datetime.timedelta(days=1)
            #print str(nextdate)
            nextdate=nextdate.strftime('%Y-%m-%d')
            #print str(nextdate)
            now=datetime.datetime.now()
            #print now
            deltaday=(now-startdate).days
            #print deltaday

            ret_dict=[]
            for i in xrange(deltaday+1):
                day=startdate+datetime.timedelta(days=i)
                day=day.strftime('%Y-%m-%d')
                #print day
                usage_statbypeople_per_day=mysql.query_usage_statbypeople_per_day({"starttime":day})
                sub_ret_dict={}
                #sub_ret_dict['day']=str(usage_statbypeople_per_day[0][0])
                sub_ret_dict['day']=day
                sub_ret_dict['usage']=int(usage_statbypeople_per_day[0][1])
                ret_dict.append(sub_ret_dict)
            #print ret_dict
            self.write(json.dumps(ret_dict))

            mysql.close()
        except Exception as e:
            print(str(e))

class chartusagestatpeople_new(tornado.web.RequestHandler):
    def post(self):
        try:
            mysql=mysqlLib()
            test_list=mysql.query_test_management_early_date({"offset":0,"row_cnt":1})
            startdate=str(test_list[0][0])
            #print startdate
            startdate=datetime.datetime.strptime(startdate,"%Y-%m-%d")
            #print str(startdate)
            nextdate=startdate+datetime.timedelta(days=1)
            #print str(nextdate)
            nextdate=nextdate.strftime('%Y-%m-%d')
            #print str(nextdate)
            now=datetime.datetime.now()
            #print now
            deltaday=(now-startdate).days
            #print deltaday

            ret_dict={}
            tmp=[]
            for i in xrange(deltaday+1):
                day=startdate+datetime.timedelta(days=i)
                day=day.strftime('%Y-%m-%d')
                #print day
                usage_statbypeople_per_day=mysql.query_usage_statbypeople_per_day({"starttime":day})
                sub_ret_dict=[]
                #sub_ret_dict['day']=str(usage_statbypeople_per_day[0][0])
                time_date=time.mktime(time.strptime(day,'%Y-%m-%d'))
                sub_ret_dict.append(time_date*1000)
                sub_ret_dict.append(int(usage_statbypeople_per_day[0][1]))
                tmp.append(sub_ret_dict)
            ret_dict['per_day_all']=tmp

            '''tmp=[]
            for i in xrange(deltaday+1):
                day=startdate+datetime.timedelta(days=i)
                day=day.strftime('%Y-%m-%d')
                #print day
                usage_statbypeople_per_day=mysql.query_usage_statbypeople_per_day_qa({"starttime":day})
                sub_ret_dict=[]
                #sub_ret_dict['day']=str(usage_statbypeople_per_day[0][0])
                time_date=time.mktime(time.strptime(day,'%Y-%m-%d'))
                sub_ret_dict.append(time_date*1000)
                sub_ret_dict.append(int(usage_statbypeople_per_day[0][1]))
                tmp.append(sub_ret_dict)
            ret_dict['per_day_qa']=tmp

            tmp=[]
            for i in xrange(deltaday+1):
                day=startdate+datetime.timedelta(days=i)
                day=day.strftime('%Y-%m-%d')
                #print day
                usage_statbypeople_per_day=mysql.query_usage_statbypeople_per_day_rd({"starttime":day})
                sub_ret_dict=[]
                #sub_ret_dict['day']=str(usage_statbypeople_per_day[0][0])
                time_date=time.mktime(time.strptime(day,'%Y-%m-%d'))
                sub_ret_dict.append(time_date*1000)
                sub_ret_dict.append(int(usage_statbypeople_per_day[0][1]))
                tmp.append(sub_ret_dict)
            ret_dict['per_day_rd']=tmp'''

            #print ret_dict
            self.write(json.dumps(ret_dict))

            mysql.close()
        except Exception as e:
            print(str(e))

class chartusagestatpeopleacc(tornado.web.RequestHandler):
    def post(self):
        try:
            mysql=mysqlLib()
            test_list=mysql.query_test_management_early_date({"offset":0,"row_cnt":1})
            startdate=str(test_list[0][0])
            #print startdate
            startdate=datetime.datetime.strptime(startdate,"%Y-%m-%d")
            #print str(startdate)
            nextdate=startdate+datetime.timedelta(days=1)
            #print str(nextdate)
            nextdate=nextdate.strftime('%Y-%m-%d')
            #print str(nextdate)
            now=datetime.datetime.now()
            #print now
            deltaday=(now-startdate).days
            #print deltaday

            ret_dict=[]
            for i in xrange(deltaday+1):
                day=startdate+datetime.timedelta(days=i)
                day=day.strftime('%Y-%m-%d')
                #print day
                usage_statbypeople_per_day=mysql.query_usage_statbypeople_acc_day({"starttime":day})
                sub_ret_dict={}
                #sub_ret_dict['day']=str(usage_statbypeople_per_day[0][0])
                sub_ret_dict['day']=day
                sub_ret_dict['usage']=int(usage_statbypeople_per_day[0][0])
                ret_dict.append(sub_ret_dict)
            #print ret_dict
            self.write(json.dumps(ret_dict))

            mysql.close()
        except Exception as e:
            print(str(e))

class chartusagestatpeopleacc_new(tornado.web.RequestHandler):
    def post(self):
        try:
            mysql=mysqlLib()
            test_list=mysql.query_test_management_early_date({"offset":0,"row_cnt":1})
            startdate=str(test_list[0][0])
            #print startdate
            startdate=datetime.datetime.strptime(startdate,"%Y-%m-%d")
            #print str(startdate)
            nextdate=startdate+datetime.timedelta(days=1)
            #print str(nextdate)
            nextdate=nextdate.strftime('%Y-%m-%d')
            #print str(nextdate)
            now=datetime.datetime.now()
            #print now
            deltaday=(now-startdate).days
            #print deltaday

            ret_dict={}
            tmp=[]
            for i in xrange(deltaday+1):
                day=startdate+datetime.timedelta(days=i)
                day=day.strftime('%Y-%m-%d')
                #print day
                usage_statbypeople_per_day=mysql.query_usage_statbypeople_acc_day({"starttime":day})
                sub_ret_dict=[]
                #sub_ret_dict['day']=str(usage_statbypeople_per_day[0][0])
                time_date=time.mktime(time.strptime(day,'%Y-%m-%d'))
                sub_ret_dict.append(time_date*1000)
                sub_ret_dict.append(int(usage_statbypeople_per_day[0][0]))
                tmp.append(sub_ret_dict)
            ret_dict['acc_day_all']=tmp

            '''tmp=[]
            for i in xrange(deltaday+1):
                day=startdate+datetime.timedelta(days=i)
                day=day.strftime('%Y-%m-%d')
                #print day
                usage_statbypeople_per_day=mysql.query_usage_statbypeople_acc_day_qa({"starttime":day})
                sub_ret_dict=[]
                #sub_ret_dict['day']=str(usage_statbypeople_per_day[0][0])
                time_date=time.mktime(time.strptime(day,'%Y-%m-%d'))
                sub_ret_dict.append(time_date*1000)
                sub_ret_dict.append(int(usage_statbypeople_per_day[0][0]))
                tmp.append(sub_ret_dict)
            ret_dict['acc_day_qa']=tmp

            tmp=[]
            for i in xrange(deltaday+1):
                day=startdate+datetime.timedelta(days=i)
                day=day.strftime('%Y-%m-%d')
                #print day
                usage_statbypeople_per_day=mysql.query_usage_statbypeople_acc_day_rd({"starttime":day})
                sub_ret_dict=[]
                #sub_ret_dict['day']=str(usage_statbypeople_per_day[0][0])
                time_date=time.mktime(time.strptime(day,'%Y-%m-%d'))
                sub_ret_dict.append(time_date*1000)
                sub_ret_dict.append(int(usage_statbypeople_per_day[0][0]))
                tmp.append(sub_ret_dict)
            ret_dict['acc_day_rd']=tmp'''

            #print ret_dict
            self.write(json.dumps(ret_dict))

            mysql.close()
        except Exception as e:
            print(str(e))

class chartusagestatcountacc(tornado.web.RequestHandler):
    def post(self):
        try:
            mysql=mysqlLib()
            test_list=mysql.query_test_management_early_date({"offset":0,"row_cnt":1})
            startdate=str(test_list[0][0])
            #print startdate
            startdate=datetime.datetime.strptime(startdate,"%Y-%m-%d")
            #print str(startdate)
            nextdate=startdate+datetime.timedelta(days=1)
            #print str(nextdate)
            nextdate=nextdate.strftime('%Y-%m-%d')
            #print str(nextdate)
            now=datetime.datetime.now()
            #print now
            deltaday=(now-startdate).days
            #print deltaday

            #mysql=mysqlLib()
            ret=mysql.query_show_project_management()
    		#print ret
            #mysql.close()
            ret_dict=[]
            for item in ret:
    			sub_ret_dict={}
    			sub_ret_dict['showid']=int(item[6])
    			sub_ret_dict['pjt_name']=item[1]
    			ret_dict.append(sub_ret_dict)
            #print ret_dict

            pjt=[]
            for item in ret_dict:
                #print item['showid']
                pjt.append(item['showid'])

            ret_dict={}
            ret_dict['info']=[]
            for p in pjt:
                info_list=[]
                info={}
                '''if(p == 1):
                    info['name']=u'地点关联'
                if(p == 2):
                    info['name']=u'用户偏好'
                if(p == 3):
                    info['name']=u'用户常驻地'
                if(p == 4):
                    info['name']=u'用户轨迹'
                if(p == 5):
                    info['name']=u'空间索引'
                if(p == 6):
                    info['name']=u'结合历史跨类目推荐' '''

                #mysql=mysqlLib()
                ret=mysql.query_project_management({"showid":p})
                #mysql.close()
                #print ret[0][1]
                info['name']=ret[0][1]

                cnt=[]
                #date_list_temp=[]
                for i in xrange(deltaday+1):
                    tmp=[]
                    day=startdate+datetime.timedelta(days=i)
                    day=day.strftime('%Y-%m-%d')
                    #print day
                    #date_list_temp.append(day)
                    usage_statbypeople_per_day=mysql.query_usage_statbycnt_acc_day({"pjt_id":p,"starttime":day})
                    #cnt.append(int(usage_statbypeople_per_day[0][1]))

                    time_date=time.mktime(time.strptime(day,'%Y-%m-%d'))
                    tmp.append(time_date*1000)
                    tmp.append(int(usage_statbypeople_per_day[0][1]))
                    cnt.append(tmp)
                info['data']=cnt
                #ret_dict['datelist']=date_list_temp
                ret_dict['info'].append(info)
            #print ret_dict
            self.write(json.dumps(ret_dict))

            mysql.close()
        except Exception as e:
            print(str(e))

class chartusagestattestresult(tornado.web.RequestHandler):
    def post(self):
        try:
            mysql=mysqlLib()
            ret=mysql.query_show_project_management()
            ret_pjt=[]
            for item in ret:
    			ret_pjt.append(item[1])
            #print ret_dict
            ret_dict={}
            ret_dict['pjt']=ret_pjt
            #print ret_dict

            total_list=mysql.query_stat_test_result({})
            success_list=mysql.query_stat_test_result({"status":3})
            error_list=[]
            successrate_list=[]
            total_list_new=[]
            success_list_new=[]
            for i in xrange(len(total_list)):
                total_list_new.append(total_list[i][0])
                try:
                    success_list_new.append(success_list[i][0])
                except:
                    success_list_new.append(0)
                error_list.append(total_list_new[i]-success_list_new[i])
                rate_tmp=(float(success_list_new[i])/float(total_list_new[i]))*100
                #rate="%0.2f" %rate_tmp
                rate=float('%.2f' %rate_tmp)
                successrate_list.append(float(rate))
            '''print total_list_new
            print success_list_new
            print error_list'''
            #print successrate_list
            #print total_list
            #print success_list
            mysql.close()
            ret_dict['total']=total_list_new
            ret_dict['success']=success_list_new
            ret_dict['error']=error_list
            ret_dict['successrate']=successrate_list
            self.write(json.dumps(ret_dict))
        except Exception as e:
            print(str(e))

class testhonorlist(tornado.web.RequestHandler):
    def post(self):
        try:
            mysql=mysqlLib()
            honor_list=mysql.query_honor_list({})

            ret_dict=[]
            for item in honor_list:
                sub_ret_dict={}
                sub_ret_dict['startby']=item[0]
                sub_ret_dict['cnt']=item[1]
                ret_dict.append(sub_ret_dict)
            #print ret_dict
            self.write(json.dumps(ret_dict))
            mysql.close()
        except Exception as e:
            print(str(e))

class cfgdownload(tornado.web.RequestHandler):
    def get(self):
        try:
            filename=self.get_argument("filename").encode('utf-8')
            print filename
            filename='./static/cfgdownload/'+filename
            f=open(filename,'r')
            self.set_header('Content-Type','application/octet-stream')
            self.set_header ('Content-Disposition', 'attachment; filename='+filename)
            self.write(f.read())
        except Exception as e:
            print(str(e))

def pjtidTopjtname(pjt_id):
    try:
        mysql=mysqlLib()
        ret=mysql.query_project_management({"showid":pjt_id})
        mysql.close()
        return ret[0][1]
    except Exception as e:
            print(str(e))

def navform():
    try:
        mysql=mysqlLib()
        test_list=mysql.query_project_management({})
        mysql.close()
        ret_dict=[]

        fatherArray={}
        childArray={}
        for index,item in enumerate(test_list):
            sub_ret_dict={}
            name=item[1]
            parent=str(int(item[4]))
            position=str(int(item[5]))
        #    ret_dict.append(sub_ret_dict)
        #print ret_dict
		#print ("in dtreedisplay----\n"+str(ret_dict))
            if(parent=="-1"):
                pass
            elif(parent=="0"):
                #retMap={position,name}
                fatherArray[position]=name
            else:
                #temp = []
                #if(len(childArray)>parent and [parent]!=null):
                #    temp = childArray[parent]
                #temp.append(name)
                #childArray[parent]=temp
                temp=[]
                print str(parent)+"\n"
                if parent in childArray:
                    #print "in child Array---\n"
                    temp = childArray.get(parent)
                    #print str(temp)
                temp.append(name)
                childArray[parent]=temp
                #print "child Array---"+str(childArray)


        print "fatherArray----\n"+str(fatherArray)+"---childArray----\n"+str(childArray)
        htmlStr=""
        for (k,v) in  fatherArray.items():
            htmlStr+="<li><a href=\"#\" id="+"\""+k+"\""+"><i class=\"icon16 icon16-folder\"></i>&nbsp;<b>"+v+"</b><span></span></a>"
            if k in childArray:
                htmlStr+="<ul class=\"sub-menu\">"
                tempList = childArray.get(k)
                for item in tempList:
                    htmlStr+="<li><a href=\"#\"></i>"+item+"</a></li>"
                htmlStr+="</ul>"
            htmlStr+="</li>"

        return htmlStr;
    except Exception as e:
        print(str(e))

class getshowpjt(tornado.web.RequestHandler):
	def post(self):
		#print "coming post--"
		mysql=mysqlLib()
		ret=mysql.query_show_project_management()
		#print ret
		mysql.close()
		task_info={}
		ret_dict=[]
		for item in ret:
			sub_ret_dict={}
			sub_ret_dict['showid']=int(item[6])
			sub_ret_dict['pjt_name']=item[1]
			ret_dict.append(sub_ret_dict)
        #print ret_dict
		#print "ret_dict"+str(ret_dict)
		task_info['showpjt']=ret_dict
		#print "getshowpjt-----"+ str(task_info)
		self.write(json.dumps(task_info))


class userinfo(tornado.web.RequestHandler):
    def post(self):
        try:
            post_param=urlparse.parse_qs(self.request.body,True)
            username=post_param['username'][0]

            from SOAPpy import WSDL
            from SOAPpy import headerType
            wsdlUrl = 'http://itebeta.baidu.com:8102/ws/UserRemoteService?wsdl'
            server = WSDL.Proxy(wsdlUrl)
            hd = headerType(data={"appKey":"UICWSTestKey"})
            server.soapproxy.header = hd
            user = server.getUserByUsername(arg0=username)
            #print user

            sub_ret_dict={}
            sub_ret_dict['employeeNumber']=user.employeeNumber
            sub_ret_dict['username']=user.username
            sub_ret_dict['name']=user.name
            sub_ret_dict['departmentName']=user.departmentName
            sub_ret_dict['email']=user.email

            #print sub_ret_dict
            self.write(json.dumps(sub_ret_dict))
        except:
            pass

class update(authenticateBase):
    def get(self):
        userid=self.get_cookie_user()
        print userid
        if(userid):
            self.render("update.html",usrname=userid)
        else:
            redirect_url = CAS_SETTINGS[ 'cas_server' ] + '/login?service=' + CAS_SETTINGS[ 'service_url' ]
            self.redirect( redirect_url )

class ping_test(tornado.web.RequestHandler):
    def post(self):
        try:
            post_param=urlparse.parse_qs(self.request.body,True)
            ip=post_param['ip'][0]
            port=post_param['port'][0]
            time.sleep(2)
            sub_ret_dict={}
            ret=u"ping success..."
            ret=ret.replace("\n","<br/>")
            sub_ret_dict['msg']=ret
            #print sub_ret_dict
            self.write(json.dumps(sub_ret_dict))
        except:
            pass
class check_pid(tornado.web.RequestHandler):
    def post(self):
        try:
            post_param=urlparse.parse_qs(self.request.body,True)
            ip=post_param['ip'][0]
            port=post_param['port'][0]
            time.sleep(2)
            sub_ret_dict={}
            ret=u"Ps Info:\nPID       Processor\n6249       manager\n6250       redis_0\n6251       redis_1\n6252       redis_2\n6253       redis_3\n6254       json_0\n6255       pbrpc_0\n6256       stat_0\n6257       sofa_0\n6258       hulu_0\n6259       plugin-place-semantic_0\n6260       plugin-items_0\n6261       plugin-up-nuomi_0\n6262       plugin-nbcitems_0\n6263       plugin-relateitems_0\n6264       plugin-traceuser_0\n6265       plugin-up_0\n6266       plugin-ust_0\n6267       plugin-utraj_0\n6268       plugin-utraj_1\n6269       plugin-utraj_2\n6270       plugin-utraj_3\n6271       plugin-ass:20150102000000_0"
            #print sub_ret_dict
            ret=ret.replace("\n","<br/>")
            #print ret
            sub_ret_dict['msg']=ret
            self.write(json.dumps(sub_ret_dict))
        except:
            pass

class check_process_status(tornado.web.RequestHandler):
    def post(self):
        try:
            post_param=urlparse.parse_qs(self.request.body,True)
            ip=post_param['ip'][0]
            port=post_param['port'][0]
            pid=post_param['pid'][0]
            time.sleep(2)
            sub_ret_dict={}
            ret=u"""Status Info:
Name:	manager
State:	R (running)
Tgid:	6249
Pid:	6249
PPid:	1
TracerPid:	0
Uid:	504	504	504	504
Gid:	506	506	506	506
FDSize:	64
Groups:	506
VmPeak:	   37316 kB
VmSize:	   37316 kB
VmLck:	       0 kB
VmHWM:	    4580 kB
VmRSS:	    4576 kB
VmAnon:	    2864 kB
VmFile:	    1712 kB
VmData:	   15152 kB
VmStk:	     308 kB
VmExe:	    2456 kB
VmLib:	    4708 kB
VmPTE:	     104 kB
VmSwap:	       0 kB
Threads:	1
SigQ:	1/515358
SigPnd:	0000000000000000
ShdPnd:	0000000000000000
SigBlk:	0000000000000000
SigIgn:	0000000000000000
SigCgt:	0000000180011a04
CapInh:	0000000000000000
CapPrm:	0000000000000000
CapEff:	0000000000000000
CapBnd:	ffffffffffffffff
Cpus_allowed:	ffffffff
Cpus_allowed_list:	0-31
Mems_allowed:	00000000,00000003
Mems_allowed_list:	0-1
voluntary_ctxt_switches:	11750337
nonvoluntary_ctxt_switches:	1202"""
            #print sub_ret_dict
            ret=ret.replace("\n","<br/>")
            #print ret
            sub_ret_dict['msg']=ret
            self.write(json.dumps(sub_ret_dict))
        except:
            pass
class upload_plugin(tornado.web.RequestHandler):
    def post(self):
        try:
            '''post_param=urlparse.parse_qs(self.request.body,True)
            ip=post_param['ip'][0]
            port=post_param['port'][0]'''
            time.sleep(2)

            uploadFile=self.request.files['uploadfile_plugin'][0]
            #print uploadFile
            filename = uploadFile['filename']
            print filename
            save_filename=u"/home/map/YangJun/autotestPlatform/autotestPlatform/data/"+filename
            fileObj = open(save_filename, 'wb')
            fileObj.write(uploadFile['body'])

            sub_ret_dict={}
            ret=u"upload success..."
            ret=ret.replace("\n","<br/>")
            #print ret
            sub_ret_dict['msg']=ret
            self.write(json.dumps(sub_ret_dict))
        except Exception as e:
            print(e)
            print('error')
            sub_ret_dict={}
            ret=u"upload fail..."
            ret=ret.replace("\n","<br/>")
            #print ret
            sub_ret_dict['msg']=ret
            self.write(json.dumps(sub_ret_dict))

class update_plugin(tornado.web.RequestHandler):
    def post(self):
        try:
            post_param=urlparse.parse_qs(self.request.body,True)
            ip=post_param['ip'][0]
            port=post_param['port'][0]
            plugin_name=post_param['plugin_name'][0]
            time.sleep(2)
            sub_ret_dict={}
            ret=u"update success..."
            #print sub_ret_dict
            ret=ret.replace("\n","<br/>")
            #print ret
            sub_ret_dict['msg']=ret
            self.write(json.dumps(sub_ret_dict))
        except:
            pass

class upload_cfg(tornado.web.RequestHandler):
    def post(self):
        try:
            '''post_param=urlparse.parse_qs(self.request.body,True)
            ip=post_param['ip'][0]
            port=post_param['port'][0]'''
            time.sleep(2)

            uploadFile=self.request.files['uploadfile_cfg'][0]
            #print uploadFile
            filename = uploadFile['filename']
            print filename
            save_filename=u"/home/map/YangJun/autotestPlatform/autotestPlatform/data/"+filename
            fileObj = open(save_filename, 'wb')
            fileObj.write(uploadFile['body'])

            sub_ret_dict={}
            ret=u"upload success..."
            ret=ret.replace("\n","<br/>")
            #print ret
            sub_ret_dict['msg']=ret
            self.write(json.dumps(sub_ret_dict))
        except Exception as e:
            print(e)
            print('error')
            sub_ret_dict={}
            ret=u"upload fail..."
            ret=ret.replace("\n","<br/>")
            #print ret
            sub_ret_dict['msg']=ret
            self.write(json.dumps(sub_ret_dict))

class update_cfg(tornado.web.RequestHandler):
    def post(self):
        try:
            post_param=urlparse.parse_qs(self.request.body,True)
            ip=post_param['ip'][0]
            port=post_param['port'][0]
            cfg_type=post_param['cfg_type'][0]
            cfg_name=post_param['cfg_name'][0]
            time.sleep(2)
            sub_ret_dict={}
            ret=u"update success..."
            #print sub_ret_dict
            ret=ret.replace("\n","<br/>")
            #print ret
            sub_ret_dict['msg']=ret
            self.write(json.dumps(sub_ret_dict))
        except:
            pass


class update_log_level(tornado.web.RequestHandler):
    def post(self):
        try:
            post_param=urlparse.parse_qs(self.request.body,True)
            ip=post_param['ip'][0]
            port=post_param['port'][0]
            log_pid=post_param['log_pid'][0]
            log_level=post_param['log_level'][0]
            time.sleep(2)
            sub_ret_dict={}
            ret=u"update success..."
            #print sub_ret_dict
            ret=ret.replace("\n","<br/>")
            #print ret
            sub_ret_dict['msg']=ret
            self.write(json.dumps(sub_ret_dict))
        except Exception as e:
            sub_ret_dict={}
            ret=u"update error...\n"+str(e)
            #print sub_ret_dict
            ret=ret.replace("\n","<br/>")
            #print ret
            sub_ret_dict['msg']=ret
            self.write(json.dumps(sub_ret_dict))

if __name__ == "__main__":
    settings={"template_path": os.path.join(os.path.dirname(__file__), "template") ,
    "static_path": os.path.join(os.path.dirname(__file__), "static") ,
    "debug":False,
    "cookie_secret":"61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo="}
    define("port", default=defaultport, help="run on the given port", type=int)

    tornado.options.parse_command_line()
    app=tornado.web.Application(handlers=[
    (r"/autotestPlatform/pjt/",pjt),
    (r"/autotestPlatform/task/",task),
    (r"/autotestPlatform/assureinfo/",assureinfo),
    (r"/autotestPlatform/testrunner/",testrunner),
    (r"/autotestPlatform/mainframework/",mainframework),
    (r"/autotestPlatform/testmanagement/",testmanagement),
    (r"/autotestPlatform/refresh/",refresh),
    (r"/autotestPlatform/refreshtask/",refreshtask),
    (r"/autotestPlatform/deletetask/",deletetask),
    (r"/autotestPlatform/dtreedisplay/",dtreedisplay),
    (r"/autotestPlatform/testreport/",testreport),
    (r"/autotestPlatform/testreportbenchmark/",testreportbenchmark),
    (r"/autotestPlatform/testreportstatus/",testreportstatus),
    (r"/autotestPlatform/modtask/",modtask),
    (r"/autotestPlatform/login/",login),
    (r"/autotestPlatform/logout/",logout),
    (r"/autotestPlatform/history_query_test_management/",history_query_test_management),
    (r"/autotestPlatform/homepage/",homepage),
    (r"/autotestPlatform/",homepage),
    (r"/autotestPlatform/chartusagestatpeople/",chartusagestatpeople),
    (r"/autotestPlatform/chartusagestatpeopleacc/",chartusagestatpeopleacc),
    (r"/autotestPlatform/chartusagestatcountacc/",chartusagestatcountacc),
    (r"/autotestPlatform/chartusagestattestresult/",chartusagestattestresult),
    (r"/autotestPlatform/testhonorlist/",testhonorlist),
    (r"/autotestPlatform/cfgdownload/",cfgdownload),
	(r"/autotestPlatform/getshowpjt/",getshowpjt),
    (r"/autotestPlatform/userinfo/",userinfo),
    (r"/autotestPlatform/chartusagestatpeople_new/",chartusagestatpeople_new),
    (r"/autotestPlatform/chartusagestatpeopleacc_new/",chartusagestatpeopleacc_new),

    (r"/family/",family),
    (r"/update/",update),
    ( r'/ping_test/',ping_test),
    ( r'/check_pid/',check_pid),
    ( r'/check_process_status/',check_process_status),
    ( r'/upload_plugin/',upload_plugin),
    ( r'/update_plugin/',update_plugin),
    ( r'/upload_cfg/',upload_cfg),
    ( r'/update_cfg/',update_cfg),
    ( r'/update_log_level/',update_log_level),


	( r'/', LoginHandler),
    ( r'/logout/',LogoutHandler),


    ],**settings
    )
    HttpServer=tornado.httpserver.HTTPServer(app)
    HttpServer.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()

