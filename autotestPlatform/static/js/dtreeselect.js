function ping_test(){
	var ip=document.getElementById("textfield_ip").value;
	var port=document.getElementById("textfield_port").value;
	//alert(ip);
	//alert(port);
	$.ajax({
		type: "post",//使用post方法访问后台
		dataType: "json",//返回json格式的数据
		url: "/ping_test/", //要访问的后台地址
		contentType: "application/json; charset=utf-8",
		//cache: false,
		//async: true,
		data: {ip:ip,port:port},//要发送的数据
		start : function(){$("#id_ret_ping_test_loading").html("<img src='/static/r_loading.gif' /><br/>测试中...");
			document.getElementById("id_ret_ping_test").innerHTML = "";
            t="<br/><br/><br/>"
			$("#id_ret_ping_test").html(t);
		},
		beforeSend:function(XMLHttpRequest){
		   //alert('远程调用开始...');
		   $("#id_ret_ping_test_loading").html("<img src='/static/r_loading.gif' /><br/>测试中...");
		   document.getElementById("id_ret_ping_test").innerHTML = "";
            t="<br/><br/><br/>"
			$("#id_ret_ping_test").html(t);
		},
		//complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
		complete:function(XMLHttpRequest,textStatus){
			// alert('远程调用成功，状态文本值：'+textStatus);
			$("#id_ret_ping_test_loading").empty();
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
			alert('error...状态文本值：'+textStatus+" 异常信息："+errorThrown);
			$("#id_ret_ping_test_loading").empty();
		},
		success: function(msg){//msg为返回的数据，在这里做数据绑定
			$("#id_ret_ping_test_loading").empty();
			document.getElementById("id_ret_ping_test").innerHTML = "";
			t=msg.msg;
            t+="<br/><br/><br/>"
			$("#id_ret_ping_test").html(t);
		}
	});
}

function check_pid(){
	var ip=document.getElementById("textfield_ip").value;
	var port=document.getElementById("textfield_port").value;
	//alert(ip);
	//alert(port);
	$.ajax({
		type: "post",//使用post方法访问后台
		dataType: "json",//返回json格式的数据
		url: "/check_pid/", //要访问的后台地址
		contentType: "application/json; charset=utf-8",
		//cache: false,
		//async: true,
		data: {ip:ip,port:port},//要发送的数据
		start : function(){$("#id_ret_check_pid_test_loading").html("<img src='/static/r_loading.gif' /><br/>查看中...");
			document.getElementById("id_ret_check_pid_test").innerHTML = "";
            t="<br/><br/><br/>"
			$("#id_ret_check_pid_test").html(t);
		},
		beforeSend:function(XMLHttpRequest){
		   //alert('远程调用开始...');
		   $("#id_ret_check_pid_test_loading").html("<img src='/static/r_loading.gif' /><br/>查看中...");
		   document.getElementById("id_ret_check_pid_test").innerHTML = "";
            t="<br/><br/><br/>"
			$("#id_ret_check_pid_test").html(t);
		},
		//complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
		complete:function(XMLHttpRequest,textStatus){
			// alert('远程调用成功，状态文本值：'+textStatus);
			$("#id_ret_check_pid_test_loading").empty();
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
			alert('error...状态文本值：'+textStatus+" 异常信息："+errorThrown);
			$("#id_ret_check_pid_test_loading").empty();
		},
		success: function(msg){//msg为返回的数据，在这里做数据绑定
			$("#id_ret_check_pid_test_loading").empty();
			document.getElementById("id_ret_check_pid_test").innerHTML = "";
			t=msg.msg;
            t+="<br/><br/><br/>"
			$("#id_ret_check_pid_test").html(t);
		}
	});
}

function check_process_status(){
	var ip=document.getElementById("textfield_ip").value;
	var port=document.getElementById("textfield_port").value;
	var pid=document.getElementById("textfield_process_status_pid").value;
	//alert(ip);
	//alert(port);
	//alert(pid);
	$.ajax({
		type: "post",//使用post方法访问后台
		dataType: "json",//返回json格式的数据
		url: "/check_process_status/", //要访问的后台地址
		contentType: "application/json; charset=utf-8",
		//cache: false,
		//async: true,
		data: {ip:ip,port:port,pid:pid},//要发送的数据
		start : function(){$("#id_ret_process_status_test_loading").html("<img src='/static/r_loading.gif' /><br/>查看中...");
			document.getElementById("id_ret_process_status_test").innerHTML = "";
            t="<br/><br/><br/>"
			$("#id_ret_process_status_test").html(t);
		},
		beforeSend:function(XMLHttpRequest){
		   //alert('远程调用开始...');
		   $("#id_ret_process_status_test_loading").html("<img src='/static/r_loading.gif' /><br/>查看中...");
		   document.getElementById("id_ret_process_status_test").innerHTML = "";
            t="<br/><br/><br/>"
			$("#id_ret_process_status_test").html(t);
		},
		//complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
		complete:function(XMLHttpRequest,textStatus){
			// alert('远程调用成功，状态文本值：'+textStatus);
			$("#id_ret_process_status_test_loading").empty();
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
			alert('error...状态文本值：'+textStatus+" 异常信息："+errorThrown);
			$("#id_ret_process_status_test_loading").empty();
		},
		success: function(msg){//msg为返回的数据，在这里做数据绑定
			$("#id_ret_process_status_test_loading").empty();
			document.getElementById("id_ret_process_status_test").innerHTML = "";
			t=msg.msg;
            t+="<br/><br/><br/>"
			$("#id_ret_process_status_test").html(t);
		}
	});
}

function upload_plugin(){
	$("#id_ret_uploadfile_plugin_loading").html("<img src='/static/r_loading.gif' /><br/>上传中...");
	document.getElementById("id_ret_uploadfile_plugin_status_test").innerHTML = "";
	t="<br/><br/><br/>"
	$("#id_ret_uploadfile_plugin_status_test").html(t);
	
	$.ajaxFileUpload(
		{
			url: '/upload_plugin/', //用于文件上传的服务器端请求地址
			secureuri: false, //是否需要安全协议，一般设置为false
			fileElementId: 'id_uploadfile_plugin', //文件上传域的ID
			dataType: 'json', //返回值类型 一般设置为json
			success: function (data, status)  //服务器成功响应处理函数
			{
				$("#id_ret_uploadfile_plugin_loading").empty();
				document.getElementById("id_ret_uploadfile_plugin_status_test").innerHTML = "";
				t=data.msg;
				t+="<br/><br/><br/>"
				$("#id_ret_uploadfile_plugin_status_test").html(t);
			},
			error: function (data, status, e)//服务器响应失败处理函数
			{
				$("#id_ret_uploadfile_plugin_loading").empty();
				document.getElementById("id_ret_uploadfile_plugin_status_test").innerHTML = "";
				t=data.msg;
				t+="<br/><br/><br/>"
				$("#id_ret_uploadfile_plugin_status_test").html(t);
			}
		}
	)
	return false;
}

function update_plugin(){
	var ip=document.getElementById("textfield_ip").value;
	var port=document.getElementById("textfield_port").value;
	var plugin_name=document.getElementById("textfield_plugin_name").value;
	//alert(ip);
	//alert(port);
	//alert(pid);
	$.ajax({
		type: "post",//使用post方法访问后台
		dataType: "json",//返回json格式的数据
		url: "/update_plugin/", //要访问的后台地址
		contentType: "application/json; charset=utf-8",
		//processData: false,  // tell jQuery not to process the data
		//contentType: false,   // tell jQuery not to set contentType
		//cache: false,
		//async: true,
		data: {ip:ip,port:port,plugin_name:plugin_name},//要发送的数据
		//enctype: 'multipart/form-data',
		start : function(){$("#id_ret_uploadfile_plugin_loading").html("<img src='/static/r_loading.gif' /><br/>更新中...");
			document.getElementById("id_ret_uploadfile_plugin_status_test").innerHTML = "";
            t="<br/><br/><br/>"
			$("#id_ret_uploadfile_plugin_status_test").html(t);
		},
		beforeSend:function(XMLHttpRequest){
		   //alert('远程调用开始...');
		   $("#id_ret_uploadfile_plugin_loading").html("<img src='/static/r_loading.gif' /><br/>更新中...");
		   document.getElementById("id_ret_uploadfile_plugin_status_test").innerHTML = "";
            t="<br/><br/><br/>"
			$("#id_ret_uploadfile_plugin_status_test").html(t);
		},
		//complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
		complete:function(XMLHttpRequest,textStatus){
			// alert('远程调用成功，状态文本值：'+textStatus);
			$("#id_ret_uploadfile_plugin_loading").empty();
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
			alert('error...状态文本值：'+textStatus+" 异常信息："+errorThrown);
			$("#id_ret_uploadfile_plugin_loading").empty();
		},
		success: function(msg){//msg为返回的数据，在这里做数据绑定
			$("#id_ret_uploadfile_plugin_loading").empty();
			document.getElementById("id_ret_uploadfile_plugin_status_test").innerHTML = "";
			t=msg.msg;
            t+="<br/><br/><br/>"
			$("#id_ret_uploadfile_plugin_status_test").html(t);
		}
	});
}

function upload_cfg(){
	$("#id_ret_uploadfile_cfg_loading").html("<img src='/static/r_loading.gif' /><br/>上传中...");
	document.getElementById("id_ret_uploadfile_cfg_status_test").innerHTML = "";
	t="<br/><br/><br/>"
	$("#id_ret_uploadfile_cfg_status_test").html(t);
	
	$.ajaxFileUpload(
		{
			url: '/upload_cfg/', //用于文件上传的服务器端请求地址
			secureuri: false, //是否需要安全协议，一般设置为false
			fileElementId: 'id_uploadfile_cfg', //文件上传域的ID
			dataType: 'json', //返回值类型 一般设置为json
			success: function (data, status)  //服务器成功响应处理函数
			{
				$("#id_ret_uploadfile_cfg_loading").empty();
				document.getElementById("id_ret_uploadfile_cfg_status_test").innerHTML = "";
				t=data.msg;
				t+="<br/><br/><br/>"
				$("#id_ret_uploadfile_cfg_status_test").html(t);
			},
			error: function (data, status, e)//服务器响应失败处理函数
			{
				$("#id_ret_uploadfile_cfg_loading").empty();
				document.getElementById("id_ret_uploadfile_cfg_status_test").innerHTML = "";
				t=data.msg;
				t+="<br/><br/><br/>"
				$("#id_ret_uploadfile_cfg_status_test").html(t);
			}
		}
	)
	return false;
}


function update_cfg(){
	var ip=document.getElementById("textfield_ip").value;
	var port=document.getElementById("textfield_port").value;
	var cfg_type=document.getElementById("id_select_cfg_type").selectedIndex;
	var cfg_name=document.getElementById("textfield_cfg_name").value;
	//alert(ip);
	//alert(port);
	//alert(pid);
	$.ajax({
		type: "post",//使用post方法访问后台
		dataType: "json",//返回json格式的数据
		url: "/update_cfg/", //要访问的后台地址
		contentType: "application/json; charset=utf-8",
		//processData: false,  // tell jQuery not to process the data
		//contentType: false,   // tell jQuery not to set contentType
		//cache: false,
		//async: true,
		data: {ip:ip,port:port,cfg_type:cfg_type,cfg_name:cfg_name},//要发送的数据
		//enctype: 'multipart/form-data',
		start : function(){$("#id_ret_uploadfile_cfg_loading").html("<img src='/static/r_loading.gif' /><br/>更新中...");
			document.getElementById("id_ret_uploadfile_cfg_status_test").innerHTML = "";
            t="<br/><br/><br/>"
			$("#id_ret_uploadfile_cfg_status_test").html(t);
		},
		beforeSend:function(XMLHttpRequest){
		   //alert('远程调用开始...');
		   $("#id_ret_uploadfile_cfg_loading").html("<img src='/static/r_loading.gif' /><br/>更新中...");
		   document.getElementById("id_ret_uploadfile_cfg_status_test").innerHTML = "";
            t="<br/><br/><br/>"
			$("#id_ret_uploadfile_cfg_status_test").html(t);
		},
		//complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
		complete:function(XMLHttpRequest,textStatus){
			// alert('远程调用成功，状态文本值：'+textStatus);
			$("#id_ret_uploadfile_cfg_loading").empty();
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
			alert('error...状态文本值：'+textStatus+" 异常信息："+errorThrown);
			$("#id_ret_uploadfile_cfg_loading").empty();
		},
		success: function(msg){//msg为返回的数据，在这里做数据绑定
			$("#id_ret_uploadfile_cfg_loading").empty();
			document.getElementById("id_ret_uploadfile_cfg_status_test").innerHTML = "";
			t=msg.msg;
            t+="<br/><br/><br/>"
			$("#id_ret_uploadfile_cfg_status_test").html(t);
		}
	});
}

function update_log_level(){
	var ip=document.getElementById("textfield_ip").value;
	var port=document.getElementById("textfield_port").value;
	var log_pid=document.getElementById("textfield_log_pid").value;
	var log_level=document.getElementById("textfield_log_level").value;
	//alert(ip);
	//alert(port);
	//alert(log_pid);
	$.ajax({
		type: "post",//使用post方法访问后台
		dataType: "json",//返回json格式的数据
		url: "/update_log_level/", //要访问的后台地址
		contentType: "application/json; charset=utf-8",
		//processData: false,  // tell jQuery not to process the data
		//contentType: false,   // tell jQuery not to set contentType
		//cache: false,
		//async: true,
		data: {ip:ip,port:port,log_pid:log_pid,log_level:log_level},//要发送的数据
		//enctype: 'multipart/form-data',
		start : function(){$("#id_ret_uploadfile_log_loading").html("<img src='/static/r_loading.gif' /><br/>修改中...");
			document.getElementById("id_ret_uploadfile_log_status_test").innerHTML = "";
            t="<br/><br/><br/>"
			$("#id_ret_uploadfile_log_status_test").html(t);
		},
		beforeSend:function(XMLHttpRequest){
		   //alert('远程调用开始...');
		   $("#id_ret_uploadfile_log_loading").html("<img src='/static/r_loading.gif' /><br/>修改中...");
		   document.getElementById("id_ret_uploadfile_log_status_test").innerHTML = "";
            t="<br/><br/><br/>"
			$("#id_ret_uploadfile_log_status_test").html(t);
		},
		//complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
		complete:function(XMLHttpRequest,textStatus){
			// alert('远程调用成功，状态文本值：'+textStatus);
			$("#id_ret_uploadfile_log_loading").empty();
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
			alert('error...状态文本值：'+textStatus+" 异常信息："+errorThrown);
			$("#id_ret_uploadfile_log_loading").empty();
		},
		success: function(msg){//msg为返回的数据，在这里做数据绑定
			$("#id_ret_uploadfile_log_loading").empty();
			document.getElementById("id_ret_uploadfile_log_status_test").innerHTML = "";
			t=msg.msg;
            t+="<br/><br/><br/>"
			$("#id_ret_uploadfile_log_status_test").html(t);
		}
	});
}

//////////////////////////////////////////////////////
//dtree选择事件
//d.s=function(nodeID){
	//alert(nodeID-3);
//}post
//var modpjthtml="";

function post_add_task_management(taskname,pjt_name,test_process,test_type,version,filepath,taskinfo,test_time,test_data){
	$.post("/autotestPlatform/mainframework/",{taskname:taskname,pjt_name:pjt_name,test_process:test_process,test_type:test_type,version:version,filepath:filepath,taskinfo:taskinfo,test_time:test_time,test_data:test_data},
	function(data){
		var add_result=data.add_result;
		var pjt_id=data.last_id;
		fun_task(0,1);
		if(add_result == "1"){
			//alert("任务创建成功");
			$.xDialog({
					title:'温馨提示',
					content:'<table class="table table-noborder table-condensed" style="font-size:16px"><tr><td width="80px" align="left" font-size="16px">创建任务成功<br/><br/>您可以继续启动任务</td></tr> </table>',
					ok:function(){
						//alert("ok");
						//window.location.href="/autotestPlatform/mainframework/";
						//setTab('a',2,4);
					},
					cancel:function(){
						//alert("cancel");
						//window.location.href="/autotestPlatform/mainframework/";
						//setTab('a',2,4);
					}
				});
		}
		else{
			//alert("任务创建失败");
			$.xDialog({
					title:'温馨提示',
					content:'<table class="table table-noborder table-condensed" style="font-size:16px"><tr><td width="80px" align="left" font-size="16px">创建任务失败<br/><br/>请检查你的输入是否有误</td></tr> </table>',
					ok:function(){
						//alert("ok");
						//window.location.href="/autotestPlatform/mainframework/";
						//setTab('a',2,4);
					},
					cancel:function(){
						//alert("cancel");
						//window.location.href="/autotestPlatform/mainframework/";
						//setTab('a',2,4);
					}
				});
		}
	},
	"json");//这里返回的类型有：json,html,xml,text
	
	fun_task(0,1);
}

function post_mod_task_management(task_id,taskname,pjt_name,test_process,test_type,version,filepath,taskinfo){
	$.post("/autotestPlatform/modtask/",{task_id:task_id,taskname:taskname,pjt_name:pjt_name,test_process:test_process,test_type:test_type,version:version,filepath:filepath,taskinfo:taskinfo},
	function(data){
		var mod_result=data.mod_result;
		fun_task(0,1);
		if(mod_result == "1" || mod_result == "0"){
			//alert("任务创建成功");
			$.xDialog({
					title:'温馨提示',
					content:'<table class="table table-noborder table-condensed" style="font-size:16px"><tr><td width="80px" align="left" font-size="16px">修改任务成功<br/><br/>您可以继续启动任务</td></tr> </table>',
					ok:function(){
						//alert("ok");
						//window.location.href="/autotestPlatform/mainframework/";
						//setTab('a',2,4);
					},
					cancel:function(){
						//alert("cancel");
						//window.location.href="/autotestPlatform/mainframework/";
						//setTab('a',2,4);
					}
				});
		}
		else{
			//alert("任务修改失败");
			$.xDialog({
					title:'温馨提示',
					content:'<table class="table table-noborder table-condensed" style="font-size:16px"><tr><td width="80px" align="left" font-size="16px">修改任务失败<br/><br/>请检查你的输入是否有误</td></tr> </table>',
					ok:function(){
						//alert("ok");
						//window.location.href="/autotestPlatform/mainframework/";
						//setTab('a',2,4);
					},
					cancel:function(){
						//alert("cancel");
						//window.location.href="/autotestPlatform/mainframework/";
						//setTab('a',2,4);
					}
				});
		}
	},
	"json");//这里返回的类型有：json,html,xml,text
}


/*function start_task_instance(task_id){
	$.ajax({
		type: "post",//使用post方法访问后台
		dataType: "json",//返回json格式的数据
		url: "/autotestPlatform/testmanagement/",//要访问的后台地址
		contentType: "application/json; charset=utf-8",
		cache: false,
		async: true,
		data: {task_id:task_id,i:123,j:456},//要发送的数据
		//start : function(){},
		//complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
		success: function(msg){//msg为返回的数据，在这里做数据绑定
			var add_result=msg.add_result;
			var pjt_id=msg.last_id;
			if(add_result == "1"){
				$.xDialog({
					title:'温馨提示',
					content:'<table class="table table-noborder table-condensed"><tr><td width="80px" align="left" font-size="16px"><b>启动任务成功<br/><br/>您可以到测试管理页查看测试任务实时状态</b></td></tr> </table>',
					ok:function(){
						//alert("ok");
						window.location.href="/autotestPlatform/mainframework/";
						setTab('a',2,4);
					},
					cancel:function(){
						//alert("cancel");
						//window.location.href="/autotestPlatform/mainframework/";
						setTab('a',2,4);
					}
				});
				setTab('a',2,4);
			}
			else{
				alert("启动任务失败");
			}
	},
	});
}*/

function start_task_instance(task_id){
	var username=document.getElementById("id_user_name").innerHTML;
	$.ajax({
		type: "post",//使用post方法访问后台
		dataType: "json",//返回json格式的数据
		url: "/autotestPlatform/testmanagement/",//要访问的后台地址
		contentType: "application/json; charset=utf-8",
		cache: false,
		async: false,
		data: {task_id:task_id,username:username,i:"task_instance"},//要发送的数据
		//start : function(){},
		//complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
		success: function(data){//msg为返回的数据，在这里做数据绑定
			var add_result=data.add_result;
			var pjt_id=data.last_id;
			if(add_result == "1"){
			//window.location.href="/autotestPlatform/mainframework/";
			//setTab('a',2,4);
				//alert("启动任务成功");
				$.xDialog({
					title:'温馨提示',
					content:'<table class="table table-noborder table-condensed"  style="font-size:16px"><tr><td width="80px" align="left">启动任务成功<br/><br/>您可以到测试管理页查看测试任务实时状态</td></tr> </table>',
					ok:function(){
						//alert("ok");
						//window.location.href="/autotestPlatform/mainframework/";
						setTab('a',2,4);
						fun(0,1);
						//run();
					},
					cancel:function(){
						//alert("cancel");
						//window.location.href="/autotestPlatform/mainframework/";
					}
				});
			}
			else{
				//alert("启动任务失败");
				$.xDialog({
					title:'温馨提示',
					content:'<table class="table table-noborder table-condensed"  style="font-size:16px"><tr><td width="80px" align="left">启动任务失败<br/><br/>请联系系统管理员检查服务状态</td></tr> </table>',
					ok:function(){
						//alert("ok");
						//window.location.href="/autotestPlatform/mainframework/";
					},
					cancel:function(){
						//alert("cancel");
						//window.location.href="/autotestPlatform/mainframework/";
					}
				});
			}
		}
	});
	//setTab('a',2,4);
	//alert("test");
	//window.location.href="/autotestPlatform/mainframework/";
	//setTab('a',2,4);
	/*$.post("/autotestPlatform/testmanagement/",{task_id:task_id},
	function(data){
		var add_result=data.add_result;
		var pjt_id=data.last_id;
		if(add_result == "1"){
			//alert("启动任务成功");
			$.xDialog({
				title:'温馨提示',
				content:'<table class="table table-noborder table-condensed"  style="font-size:16px"><tr><td width="80px" align="left">启动任务成功<br/><br/>您可以到测试管理页查看测试任务实时状态</td></tr> </table>',
				ok:function(){
					//alert("ok");
					//window.location.href="/autotestPlatform/mainframework/";
					//setTab('a',2,4);
				},
				cancel:function(){
					//alert("cancel");
					//window.location.href="/autotestPlatform/mainframework/";
				}
			});
		}
		else{
			//alert("启动任务失败");
			$.xDialog({
				title:'温馨提示',
				content:'<table class="table table-noborder table-condensed"  style="font-size:16px"><tr><td width="80px" align="left">启动任务失败<br/><br/>请联系系统管理员检查服务状态</td></tr> </table>',
				ok:function(){
					//alert("ok");
					window.location.href="/autotestPlatform/mainframework/";
					//setTab('a',1,4);
				},
				cancel:function(){
					//alert("cancel");
					window.location.href="/autotestPlatform/mainframework/";
				}
			});
		}
	},
	"json");//这里返回的类型有：json,html,xml,text  */
}

function delete_task(task_id){
	//alert(task_id);
	$.post("/autotestPlatform/deletetask/",{task_id:task_id},
	function(data){
		var del_result=data.del_result;
		fun_task(0,1);
		if(del_result == "1"){
			//alert("删除任务成功");
			$.xDialog({
				title:'温馨提示',
				content:'<table class="table table-noborder table-condensed"  style="font-size:16px"><tr><td width="80px" align="left">删除任务成功</td></tr> </table>',
				ok:function(){
					//alert("ok");
					//window.location.href="/autotestPlatform/mainframework/";
					//setTab('a',2,4);
				},
				cancel:function(){
					//alert("cancel");
					//window.location.href="/autotestPlatform/mainframework/";
				}
			});
			//setTab('a',2,4);
		}
		else{
			//alert("删除任务失败");
			$.xDialog({
				title:'温馨提示',
				content:'<table class="table table-noborder table-condensed"  style="font-size:16px"><tr><td width="80px" align="left">删除任务失败<br/><br/>请联系系统管理员检查服务状态</td></tr> </table>',
				ok:function(){
					//alert("ok");
					//window.location.href="/autotestPlatform/mainframework/";
					//setTab('a',2,4);
				},
				cancel:function(){
					//alert("cancel");
					//window.location.href="/autotestPlatform/mainframework/";
				}
			});
		}
	},
	"json");//这里返回的类型有：json,html,xml,text
}

function query_task(task_id){
	var task_name=document.getElementById("taskname_"+task_id+"1").innerText;
	var pjt_name=document.getElementById("pjt_"+task_id+"2").innerText;
	var processtype=document.getElementById("processtype_"+task_id+"4").innerText;
	var testtype=document.getElementById("testtype_"+task_id+"5").innerText;
	var version=document.getElementById("version_"+task_id+"3").innerText;
	var filepath=document.getElementById("filepath_"+task_id+"6").title;
	var info=document.getElementById("info_"+task_id+"7").innerText;
	
	var t="";
	t+="<table class='table table-noborder table-condensed'><tr><td width='80px' align='right'>任务名称：</td> <td width='80%' align='left'>";
	t+=task_name;
	t+="</td></tr>  <tr><td align='right'>所属项目：</td><td align='left'>";
	t+=pjt_name;
	t+="</td></tr>  <tr><td align='right'>版本类型：</td><td align='left'>";
	t+=processtype;
	t+="</td></tr> <tr><td align='right'>测试类型：</td><td align='left'>";
	t+=testtype;
	t+="</td></tr>  <tr><td width='80px' align='right'>测试版本：</td> <td width='80%' align='left'>";
	t+=version;
	t+="</td></tr> <tr><td width='80px' align='right'>版本路径：</td> <td width='80%' align='left'>";
	t+=filepath;
	t+="</td></tr> <tr><td width='80px' align='right'>任务描述：</td> <td width='80%' align='left'>";
	t+=info;
	t+="</td></tr> </table>";
	$.xDialog({
		title:'查看任务',
		content:t,
		ok:function(){
			//alert("ok");
		},
		cancel:function(){
			//alert("cancel");
		}
	});
}

function addshowpjt(pjt_name){
		var optiontext="";
		optiontext+="<option>";
		optiontext+="请选择所属项目";
		optiontext+="</option>";
		
		//var pjt_selected=document.getElementById("processtype_"+task_id+"4").innerText;
		
		$.ajax({
			type: "post",//使用post方法访问后台
			dataType: "json",//返回json格式的数据
			url: "/autotestPlatform/getshowpjt/",//要访问的后台地址
			contentType: "application/json; charset=utf-8",
			cache: false,
			async: false,
			data: {},//要发送的数据
			//start : function(){},
			//complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
			success: function(data){//msg为返回的数据，在这里做数据绑定
				var retList = data.showpjt;
				$.each(retList, function(i,n){
					if(pjt_name != n.pjt_name){
						optiontext+="<option>";
						optiontext+=n.pjt_name;
						optiontext+="</option>";
					}
					else{
						optiontext+="<option selected='selected'>";
						optiontext+=n.pjt_name;
						optiontext+="</option>";
					}
				});
			}
		});
		return optiontext;	
}

function mod_task(task_id){
	//alert(task_id);
	//
	//alert(showpjt);
	var task_name=document.getElementById("taskname_"+task_id+"1").innerText;
	var pjt_name=document.getElementById("pjt_"+task_id+"2").innerText;
	//var pjt_num=document.getElementById("pjt_"+task_id+"2").selectedIndex;
	
	var showpjt=addshowpjt(pjt_name);
	
	var processtype=document.getElementById("processtype_"+task_id+"4").innerText;
	var testtype=document.getElementById("testtype_"+task_id+"5").innerText;
	var version=document.getElementById("version_"+task_id+"3").innerText;
	var filepath=document.getElementById("filepath_"+task_id+"6").title;
	var info=document.getElementById("info_"+task_id+"7").innerText;
	var t="";
	t+="<table class='table table-noborder table-condensed'><tr><td width='80px' align='right'><b class='requier'>*</b>任务名称：</td> <td width='80%' align='left'><input name='textfield' class='input-large' id='textfield_taskname' type='text' size='50' value="+task_name+"></td></tr>";
	//alert(pjt_num);
	
	t+="<tr><td align='right'><b class='requier'>*</b>所属项目：</td><td align='left'><select name='select' class='select-large' id='select_pjtname'>";
//	t+="<option value='请选择所属项目'>请选择所属项目</option><option value='地点关联' >地点关联</option><option value='用户偏好' >用户偏好</option><option value='用户常驻地' >用户常驻地</option><option value='用户轨迹' >用户轨迹</option><option value='空间索引' selected='selected'>空间索引</option>";
	t+=showpjt;
	
//	t+=modpjthtml;
	t+="</select></td></tr>";
	
	if(processtype=="自测版本"){t+="<tr><td align='right'><b class='requier'>*</b>版本类型：</td><td align='left'><input name='RadioGroup1' class='radio radio-first' type='radio' id='RadioGroup1_testprocess001' checked='checked'>自测版本 <input name='RadioGroup1' class='radio' type='radio' id='RadioGroup1_testprocess002'>提测版本</td></tr>";}
	else if(processtype=="提测版本"){t+="<tr><td align='right'><b class='requier'>*</b>版本类型：</td><td align='left'><input name='RadioGroup1' class='radio radio-first' type='radio' id='RadioGroup1_testprocess001' >自测版本 <input name='RadioGroup1' class='radio' type='radio' id='RadioGroup1_testprocess002' checked='checked'>提测版本</td></tr>";}

	if(testtype=="功能测试"){	t+="<tr><td align='right'><b class='requier'>*</b>测试类型：</td><td align='left'><input class='check check-first' type='checkbox' id='checkbox_testtype001' checked='checked'>功能测试 <input class='check check-first' type='checkbox' id='checkbox_testtype002'>性能测试";}	//</td></tr>
	else if(testtype=="性能测试"){	t+="<tr><td align='right'><b class='requier'>*</b>测试类型：</td><td align='left'><input class='check check-first' type='checkbox' id='checkbox_testtype001' >功能测试 <input class='check check-first' type='checkbox' id='checkbox_testtype002' checked='checked'>性能测试";}
	else if(testtype=="功能+性能"){	t+="<tr><td align='right'><b class='requier'>*</b>测试类型：</td><td align='left'><input class='check check-first' type='checkbox' id='checkbox_testtype001' checked='checked'>功能测试 <input class='check check-first' type='checkbox' id='checkbox_testtype002' checked='checked'>性能测试";}
	
	t+="&nbsp;&nbsp;<a href='javascript:ac_toggle();' style='color:blue;text-decoration:none' ><i class='icon14 icon14-arrowdown'></i>高级配置</a></td>";
	t+="</tr>";
	t+="<tr id='id_advanced_configuration' style='display:none;font-size:12px;color:blue;'><td style='text-align:right;font-size:12px;color:blue;'>测试时间：</td>";
	t+="<td align='left' > <input style='font-size:12px;color:blue;' name='textfield' class='input-small' id='textfield_time' type='text' size='5' value='15'";
	t+=" onFocus=\"if(value==defaultValue){value='';this.style.color='#000'}\" ";
	t+=" onBlur=\"if(!value){value=defaultValue;this.style.color='#999'}\" ";
	t+=" style=\"color:#999999\" ";
	t+=">&nbsp;&nbsp;分钟</td></tr>";
	
	t+="<tr id='id_advanced_configuration_data' style='display:none;font-size:12px;color:blue;'><td style='text-align:right;font-size:12px;color:blue;'>测试数据：</td>";
	t+="<td align='left' width='70%'><textarea  style='font-size:12px;color:blue;overflow-y:hidden;height:16px;width:30px;' id='textfield_data'></textarea></td></tr>";
	
	
	t+="<tr><td width='80px' align='right'><b class='requier'>*</b>测试版本：</td> <td width='80%' align='left'><input name='textfield' class='input-large' id='textfield_testversion' type='text' size='50' value="+version+"></td></tr>";
	t+="<tr><td width='80px' align='right'><b></b>版本路径：</td> <td width='80%' align='left'><input name='textfield' class='input-large' id='textfield_filepath' type='text' size='50' value="+filepath+"></td></tr>";
	t+="<tr><td width='80px' align='right'><b></b>任务描述：</td> <td width='80%' align='left'><input name='textfield' class='input-large' id='textfield_taskinfo' type='text' size='50' value="+info+"></td></tr>";
	t+="<tr><td width='80px' align='right'></td> <td width='80%' align='left' id='id_warning_mod_task' style='font-size:14px;color:red;font-weight:bold;'>&nbsp;</td> </tr>";
	t+="</table>";
	
	//alert("mod ok ---"+t);
	$.xDialog({
		title:'修改任务',
		content:t,
		ok:function(){
			//alert("ok");
			var taskname='';
			taskname=$("#textfield_taskname").val();
			//alert(taskname);
								
			var pjt_name='';
			pjt_name=document.getElementById("select_pjtname").selectedIndex;
			//alert(pjt_name);
			
			var test_process='';
			if($('#RadioGroup1_testprocess001').prop('checked')){
				test_process=0;
			}
			else if($('#RadioGroup1_testprocess002').prop('checked')){
				test_process=1;
			}
			else{
				test_process=-1;
			}
			//alert(test_process);
			
			var test_type='';
			if($('#checkbox_testtype001').prop('checked') && !($('#checkbox_testtype002').prop('checked'))){
				test_type=0;
			}
			else if(!($('#checkbox_testtype001').prop('checked')) && $('#checkbox_testtype002').prop('checked')){
				test_type=1;
			}
			else if(!($('#checkbox_testtype001').prop('checked')) && !($('#checkbox_testtype002').prop('checked'))){
				test_type=-1;
			}
			else{
				test_type=2;
			}
			//alert(test_type);
			
			var version='';
			version=$("#textfield_testversion").val();
			//alert(version);
			
			var filepath='';
			filepath=$("#textfield_filepath").val();
			//alert(filepath);
			
			var taskinfo='';
			taskinfo=$("#textfield_taskinfo").val();
			
			var warning='';
			if(!taskname){
				warning='请输入任务名称';
				document.getElementById("id_warning_mod_task").innerHTML=warning;
				return false;
			}
			else if(!pjt_name){
				warning='请选择所属项目';
				document.getElementById("id_warning_mod_task").innerHTML=warning;
				return false;
			}
			else if(test_process != 0 && test_process != 1){
				warning='请选择版本类型';
				document.getElementById("id_warning_mod_task").innerHTML=warning;
				return false;
			}
			else if(test_type != 0 && test_type != 1 && test_type != 2){
				warning='请选择测试类型';
				document.getElementById("id_warning_mod_task").innerHTML=warning;
				return false;
			}
			else if(!version){
				warning='请输入测试版本';
				document.getElementById("id_warning_mod_task").innerHTML=warning;
				return false;
			}
			/*var re =/^(\d{1,})-(\d{1,})-(\d{1,})-(\d{1,})$/;
			if(!re.test(version)){
				warning='请输入测试版本,格式如：1-0-11-4';
				document.getElementById("id_warning_mod_task").innerHTML=warning;
				return false;
			}*/
								
			//else{
				//alert(taskinfo);
				post_mod_task_management(task_id,taskname,pjt_name,test_process,test_type,version,filepath,taskinfo);
				//alert("修改一下");
			//}
		},
		cancel:function(){
			//alert("cancel");
		}
	});
}


function query_test_status_report(test_id){
	setTab('a',3,4);
	//alert(test_id);
	//document.getElementById("id_serialnum").innerHTML=test_id;
	var time = 1500;
	var interval; //调度器对象。
	var status='0';
	interval3 = setInterval(testreportstatus,time);
	interval1 = setInterval(testreport,time); 
	interval2 = setInterval(testreportbenchmark,time); 
	
	function testreportstatus(){
		$.ajax({
			type: "post",//使用post方法访问后台
			dataType: "json",//返回json格式的数据
			url: "/autotestPlatform/testreportstatus/",//要访问的后台地址
			contentType: "application/json; charset=utf-8",
			cache: false,
			async: false,
			data: {test_id:test_id,i:"task_instance"},//要发送的数据
			//start : function(){},
			//complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
			success: function(msg){//msg为返回的数据，在这里做数据绑定
				document.getElementById("id_log_1").innerHTML = "";
				var t="";
				$.each(msg, function(i,n){
					t+=n.log;
					status=n.status;
					if(status == '0' || status == '1'){
						t+="<p style='text-align:center'><img src='/static/l_loading.gif'></p>";
					}else{
						clearInterval(interval3);
					}
				});
				$("#id_log_1").append(t);
				//var c = window.document.body.scrollHeight;
				//window.scroll(0,c); 
			}
		});
	}
	
	function testreport(){
	$.ajax({
		type: "post",//使用post方法访问后台
		dataType: "json",//返回json格式的数据
		url: "/autotestPlatform/testreport/",//要访问的后台地址
		contentType: "application/json; charset=utf-8",
		cache: false,
		async: false,
		data: {test_id:test_id,i:"task_instance"},//要发送的数据
		//start : function(){},
		//complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
		success: function(msg){//msg为返回的数据，在这里做数据绑定
			//$("#ID_Tbl_Author_Summary tr:not(:first)").remove();
			document.getElementById("id_log_2").innerHTML = "";
			if(msg.length>=1){
				var t;
				t = "";
				t+="<div>";
				t+="<table class='table table_bordered' id='ID_Tbl_Author_Summary'>";
				t+="<thead>";
				t+="<tr id='ID_Tbl_Head'>";
				t+="<th>序号</th>";
				t+="<th>用例ID</th>";
				t+="<th>用例名称</th>";
				t+="<th>开始时间</th>";
				t+="<th>结束时间</th>";
				t+="<th>测试结果</th>";
				/*t+="</tr>";
				t+="</thead>";
				t+="<tbody id='ID_TBody'>";
				t+="<tr id='template'><td id='ID_Feature'></td> <td id='ID_ScriptNum'></td> <td id='ID_PASSNum'></td> <td id='ID_FailNum'></td> <td id='ID_PASSRate'></td> <td id='ID_FeatureStatus'></td></tr>";
				*/
				$.each(msg, function(i,n){
					if(status == '0' || status == '1'){
						//t+="<p style='text-align:center'><img src='/static/l_loading.gif'></p>";
					}else{
						clearInterval(interval1);
					}
					
					var result;
					if(n.result == "0"){
						result="FAIL";
					}
					else if(n.result == "1"){
						result="PASS";
					}
					else if(n.result == "-1"){
						result="EXCEPTION";
					}
					
					t+="<tr>";
					t += "<td id='ID_"+i+"_0'>" + (parseInt(i)+1) + "</td>";
					//t += "<td id='ID_"+i+"_1'>" + n.task_id + "</td>";
					t += "<td id='ID_"+i+"_2'>" + n.caseid + "</td>";
					t += "<td id='ID_"+i+"_3'><a href='#'>" + n.casename + "</a></td>";
					t += "<td id='ID_"+i+"_4'>" + n.starttime + "</td>";
					t += "<td id='ID_"+i+"_6'>" + n.endtime+ "</td>";
					t += "<td id='ID_"+i+"_6'>" + result + "</td>";
					t += "</tr>";
				});
				t+="</tbody>";
				t+="</table>";
				t+="</div>";
				$("#id_log_2").append(t);
			}
		}
	});
	}

	function testreportbenchmark(){
		//alert(status);
		$.ajax({
			type: "post",//使用post方法访问后台
			dataType: "json",//返回json格式的数据
			url: "/autotestPlatform/testreportbenchmark/",//要访问的后台地址
			contentType: "application/json; charset=utf-8",
			cache: false,
			async: false,
			data: {test_id:test_id,i:"task_instance"},//要发送的数据
			//start : function(){},
			//complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
			success: function(msg){//msg为返回的数据，在这里做数据绑定
				/*var div = document.getElementById("id_log_3");
				while(div.hasChildNodes()) //当div下还存在子节点时 循环继续
				{
					div.removeChild(div.firstChild);
				}*/
				document.getElementById("id_log_3").innerHTML = "";
				var t="";
				$.each(msg, function(i,n){
					//alert(status);
					if(status == '0' || status == '1'){
						//alert(status);
						//t+="<p style='text-align:center'><img src='/static/l_loading.gif'></p>";
					}else{
						//alert(status);
						clearInterval(interval2);
					}
					t+="<p style='text-align:center;font-size:16px'>"+n.casename+" 自动化测试报告</p>";
					t+="<p style='text-align:right;font-style:italic'><a href='https://github.com/JunneYang/easyBenchmarkTesttool'>@easyBenchmarkTesttool 2014</a></p>"
					t+="<p>一、指标统计</p>";
					t+="<table class='table table_bordered' id='ID_Tbl_Author_Summary_AAA' >";
					t+="<tbody id='ID_TBody_AAA' >";
					t+="<tr id='template'><td>StartTime:</td><td id='id_start_time' ><b>"+n.starttime+"</b></td> ";
					t+="<td>EndTime:</td> <td id='id_endtime'><b>"+n.endtime+"</b></td>";
					t+="<td>TimeElapsed(s):</td> <td id='id_timeelapsed'><b>"+n.timeelapsed+"</b></td></tr>";
					t+="<tr id='template'><td>TotalRequest:</td><td id='id_total_request'><b>"+n.totalrequest+"</b></td> ";
					t+="<td>TotalResponse:</td> <td id='id_total_response'><b>"+n.totalresponse+"</b></td>";
					t+="<td>ResponseRate:</td> <td id='id_responserate'><b>"+n.responserate+"</b></td></tr>";
					t+="<tr id='template'><td>TotalResponse:</td><td id='id_total_response'><b>"+n.totalresponse+"</b></td> ";
					t+="<td>TotalError:</td> <td id='id_total_error'><b>"+n.totalerror+"</b></td>";
					t+="<td>ErrorRate:</td> <td id='id_errorrate'><b>"+n.errorrate+"</b></td></tr>";
					t+="<tr id='template'><td>QPS:</td><td id='id_qps'><b>"+n.qps+"</b></td> ";
					t+="<td>Latency(ms):</td> <td id='id_latency'><b>"+n.latency+"</b></td>";
					t+="<td></td> <td id='ID_PASSNum_AAA'></td></tr>";
					t+="</tbody>";
					t+="</table>";
					
					t+="<p>二、性能曲线</p>";
					t+="<p><li>QPS(query per second)曲线:<br/><img src='"+n.qps_curve+"' alt=''></li></p>";
					//t+="<p><li>CPU_IDLE曲线(努力支持中...)<br/><img src='xx.png' alt=''></li></p>";
					t+="<p><li>内存占用曲线<br/><img src='"+n.mem_use_curve+"' alt=''></li></p>";
				});
				$("#id_log_3").append(t);
			}
		});
	}
			
	
}

function user_info(){
	username=document.getElementById("id_user_name").innerHTML;
	$.ajax({
		type: "post",//使用post方法访问后台
		dataType: "json",//返回json格式的数据
		url: "/autotestPlatform/userinfo/",//要访问的后台地址
		contentType: "application/json; charset=utf-8",
		cache: false,
		async: true,
		data: {username:username,i:"task_instance"},//要发送的数据
		//start : function(){},
		//complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
		success: function(data){//msg为返回的数据，在这里做数据绑定
			var employeeNumber=data.employeeNumber;
			var username=data.username;
			var name=data.name;
			var departmentName=data.departmentName;
			var email=data.email;
			
			var t="";
			t+="<table class='table table-noborder table-condensed'><tr><td width='80px' align='right'>工号：</td> <td width='80%' align='left'>";
			t+=employeeNumber;
			t+="</td></tr>  <tr><td align='right'>用户名：</td><td align='left'>";
			t+=username;
			t+="</td></tr>  <tr><td align='right'>姓名：</td><td align='left'>";
			t+=name;
			t+="</td></tr> <tr><td align='right'>部门：</td><td align='left'>";
			t+=departmentName;
			t+="</td></tr>  <tr><td width='80px' align='right'>邮箱：</td> <td width='80%' align='left'>";
			t+=email;
			t+="</td></tr> </table>";
			$.xDialog({
				title:'个人信息',
				content:t,
				ok:function(){
					//alert("ok");
				},
				cancel:function(){
					//alert("cancel");
				}
			});
		}
	});
}

$(document).ready(function(){
	query_test_management('1');
});

function query_test_management(page){
	document.getElementById("query_id_test_page_current").innerHTML=page;
	
	var starttime=document.getElementById("id_start_time").value;
	var endtime=document.getElementById("id_end_time").value;
	var startby=document.getElementById("query_select_startby").selectedIndex;
	var pjt_name=document.getElementById("query_select_pjtname").selectedIndex;
	//var test_process=document.getElementById("query_select_testprocess").selectedIndex;
	var test_type=document.getElementById("query_select_testtype").selectedIndex;
	var test_result=document.getElementById("query_select_testresult").selectedIndex;
	/*alert(starttime);
	alert(endtime);
	alert(startby);
	alert(pjt_name);
	//alert(test_process);
	alert(test_type);
	alert(test_result);*/
	
	//var task_page_current=parseInt(document.getElementById("query_id_test_page_current").innerHTML);
	var task_page_current=page;
	var offset=(task_page_current-1)*5;
	$.ajax({
			type: "post",//使用post方法访问后台
			dataType: "json",//返回json格式的数据
			url: "/autotestPlatform/history_query_test_management/",//要访问的后台地址
			contentType: "application/json; charset=utf-8",
			cache: false,
			async: false,
			data: {limit:5,offset:offset,starttime:starttime,endtime:endtime,startby:startby,pjt_name:pjt_name,test_type:test_type,test_result:test_result},//要发送的数据
			//start : function(){},
			//complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
			success: function(msg){//msg为返回的数据，在这里做数据绑定
				document.getElementById("id_tbody_query_test_management").innerHTML = "";
				var cnt=msg.cnt;
				document.getElementById("query_id_test_num").innerHTML=cnt;
				var pageTotal = ((parseInt(cnt)+5-1)/5)|0	;//总页数 
				document.getElementById("query_id_test_page_num").innerHTML=pageTotal;
			
				var task_page_list="";
				if(task_page_current<=2 && pageTotal<=5){
					task_page_list+="<span><<</span>";
					for(i=1;i<=pageTotal;i++){
						if(task_page_current == i){
							task_page_list+="<span>"+i+"</span>";
						}
						else{
							task_page_list+="<a href='javascript:query_select_test_page("+i+");'>"+i+"</a>";
						}
					}
					task_page_list+="<span>>></span>";
				}
				else if(task_page_current<=2 && pageTotal>=5){
					task_page_list+="<span><<</span>";
					for(i=1;i<=5;i++){
						if(task_page_current == i){
							task_page_list+="<span>"+i+"</span>";
						}
						else{
							task_page_list+="<a href='javascript:query_select_test_page("+i+");'>"+i+"</a>";
						}
					}
					task_page_list+="<span>>></span>";
				}
				/*else if(task_page_current == pageTotal || task_page_current == pageTotal-1){
					task_page_list+="<span><<</span>";
					for(i=pageTotal-4;i<=pageTotal;i++){
						if(task_page_current == i){
							task_page_list+="<span>"+i+"</span>";
						}
						else{
							task_page_list+="<a href='javascript:query_select_test_page("+i+");'>"+i+"</a>";
						}
					}
					task_page_list+="<span>>></span>";
				}*/
				else if(task_page_current == pageTotal || task_page_current == pageTotal-1){
					task_page_list+="<span><<</span>";
					if(pageTotal-4>=1){
						for(i=pageTotal-4;i<=pageTotal;i++){
							if(task_page_current == i){
								task_page_list+="<span>"+i+"</span>";
							}
							else{
								task_page_list+="<a href='javascript:query_select_test_page("+i+");'>"+i+"</a>";
							}
						}
						task_page_list+="<span>>></span>";
					}
					else{
						for(i=1;i<=pageTotal;i++){
							if(task_page_current == i){
								task_page_list+="<span>"+i+"</span>";
							}
							else{
								task_page_list+="<a href='javascript:query_select_test_page("+i+");'>"+i+"</a>";
							}
						}
						task_page_list+="<span>>></span>";
					}
				}
				else if(task_page_current>2 && pageTotal<task_page_current+2){
					task_page_list+="<span><<</span>";
					for(i=task_page_current-2;i<=pageTotal;i++){
						if(task_page_current == i){
							task_page_list+="<span>"+i+"</span>";
						}
						else{
							task_page_list+="<a href='javascript:query_select_test_page("+i+");'>"+i+"</a>";
						}
					}
					task_page_list+="<span>>></span>";
				}
				else{
					task_page_list+="<span><<</span>";
					for(i=task_page_current-2;i<=task_page_current+2;i++){
						if(task_page_current == i){
							task_page_list+="<span>"+i+"</span>";
						}
						else{
							task_page_list+="<a href='javascript:query_select_test_page("+i+");'>"+i+"</a>";
						}
					}
					task_page_list+="<span>>></span>";
				}
				/*else{
					task_page_list+="<span><<</span><span class='active'>1</span><a href='#'>2</a><a href='#'>3</a><a href='#'>4</a><a href='#'>5</a><a href='#'>>></a>";
				}*/
				document.getElementById("query_id_test_page_list").innerHTML=task_page_list;
				
				var list=msg.list;
				var t="";
				$.each(list, function(i,n){
					var status;
					if(n.status == '0'){
						status="<img src='/static/r_loading.gif' title='等待中...'>";
						t+="<tr id="+n.id+">";
					}
					if(n.status == '1'){
						status="<img src='/static/r_running.gif' title='执行中...'>";
						t+="<tr id="+n.id+">";
					}
					if(n.status == '2'){
						status="<img src='/static/r_exception.png' title='异常'>";
						t+="<tr id="+n.id+">";
					}
					if(n.status == '3'){
						status="<img src='/static/r_success.png' title='成功'>";
						t+="<tr id="+n.id+">";
					}
					if(n.status == '4'){
						status="<img src='/static/r_fail.png' title='失败'>";
						t+="<tr id="+n.id+">";
					}
					
					//t+="<tr id="+n.id+">";
					t+="<td style='display:none;'>"+n.id+"</td>";
					var index=i+1;
					t+="<td>"+index+"</td>";
					t+="<td><a id='serial_num_"+n.id+"1' href='javascript:query_test_status_report("+n.id+");'>"+n.id+"</a></td>";
					t+="<td id='task_"+n.id+"2'>"+n.task_id+"</td>";
					var pjt=n.pjt_name;
					/*if(n.pjt_id == "1"){
						pjt="地点关联";
					}
					if(n.pjt_id == "2"){
						pjt="用户偏好";
					}
					if(n.pjt_id == "3"){
						pjt="用户常驻地";
					}
					if(n.pjt_id == "4"){
						pjt="用户轨迹";
					}
					if(n.pjt_id == "5"){
						pjt="空间索引";
					}
					if(n.pjt_id == "6"){
						pjt="结合历史跨类目推荐";
					}*/
					t+="<td id='pjt_"+n.id+"3'>"+pjt+"</td>";
					var testtype;
					if(n.testtype == "0"){
						testtype="功能测试";
					}
					if(n.testtype == "1"){
						testtype="性能测试";
					}
					if(n.testtype == "2"){
						testtype="功能+性能";
					}
					t+="<td id='test_type_"+n.id+"4'>"+testtype+"</td>";
					var startby;
					if(n.startby == 'None'){
						startby='未知';
					}
					else{
						startby=n.startby;
					}
					t+="<td id='startby_"+n.id+"5'>"+startby+"</td>";
					t+="<td id='start_time_"+n.id+"6'>"+n.starttime+"</td>";
					var endtime;
					if(n.endtime == 'None'){
						endtime="--";
					}else{
						endtime=n.endtime;
					}
					t+="<td id='end_time_"+n.id+"7'>"+endtime+"</td>";
					t+="<td id='test_status_"+n.id+"8'>"+status+"</td>";
					t+="</tr>";
				});
				$("#id_tbody_query_test_management").append(t);
			}
		});
		//clearInterval(interval_query);
}

function query_select_test_page(page){
	document.getElementById("query_id_test_page_current").innerHTML=page;
	query_test_management(page);
}

function log_toggtle(num){
	$("#id_log_"+num).toggle();
}

/*window.onscroll = function () { 
	if (document.documentElement.scrollTop>0 || document.body.scrollTop>0) { 
		document.getElementById("leftBox").style.display = "block"; 
		document.getElementById("id_top_pic").innerHTML = "<img src='/static/top.gif' title='回到顶部'>";
	} 
	else { 
		document.getElementById("leftBox").style.display = "none"; 
	} 
} */

/*function dis_top(select){
	if(select == '0'){
		document.getElementById("id_top_pic").innerHTML = "<img src='/static/top_deep.gif' title='回到顶部'>";
	}
	else if(select == '1'){
		document.getElementById("id_top_pic").innerHTML = "<img src='/static/top.gif' title='回到顶部'>";
	}
}*/

function ac_toggle(){
	//alert('aaa');
	$("#id_advanced_configuration").toggle();
	$("#id_advanced_configuration_data").toggle();
	/*if(document.getElementById('id_advanced_configuration').style.visibility=='hidden'){
		$("#id_advanced_configuration").toggle();
		document.getElementById('id_advanced_configuration').style.visibility='visible';
	}
	else{document.getElementById('id_advanced_configuration').style.visibility='hidden';$("#id_advanced_configuration").toggle();}*/
}

$(window).load(function() {
		var optiontext="";
		$.post("/autotestPlatform/getshowpjt/",{},
		function(data){
			var retList = data.showpjt;
			$.each(retList, function(i,n){				
				optiontext+="<option>";
				optiontext+=n.pjt_name;
				optiontext+="</option>";
				 });
		},
		"json");
	//	modpjthtml = optiontext;
        $('#x4').click(function(){
				var content="<table class='table table-noborder table-condensed'><tr><td width='80px' align='right'><b class='requier'>*</b>任务名称：</td> <td width='70%' align='left'><input name='textfield' class='input-large' id='textfield_taskname' type='text' size='50' value='输入任务名称,如:openservice 1-0-14 测试'";
				content+=" onFocus=\"if(value==defaultValue){value='';this.style.color='#000'}\" ";
				content+=" onBlur=\"if(!value){value=defaultValue;this.style.color='#999'}\" ";
				content+=" style=\"color:#999999\" ";				
				content+="></td></tr>  <tr><td align='right'><b class='requier'>*</b>所属项目：</td><td align='left'><select name='select' class='select-large' id='select_pjtname'>";
				content+="<option>";
				content+="请选择所属项目";
				content+="</option>";
				content+=optiontext;
				content+="</select></td></tr>  <tr><td align='right'><b class='requier'>*</b>版本类型：</td><td align='left'><input name='RadioGroup1' class='radio radio-first' type='radio' id='RadioGroup1_testprocess001'>自测版本 <input name='RadioGroup1' class='radio' type='radio' id='RadioGroup1_testprocess002'>提测版本</td></tr> <tr><td align='right'><b class='requier'>*</b>测试类型：</td><td align='left'><input class='check check-first' type='checkbox' id='checkbox_testtype001'>功能测试 <input class='check check-first' type='checkbox' id='checkbox_testtype002'>性能测试 ";
				content+="&nbsp;&nbsp;<a href='javascript:ac_toggle();' style='color:blue;text-decoration:none' ><i class='icon14 icon14-arrowdown'></i>高级配置</a></td>";
				content+="</tr>";
				content+="<tr id='id_advanced_configuration' style='display:none;font-size:12px;color:blue;'><td style='text-align:right;font-size:12px;color:blue;'>测试时间：</td>";
				content+="<td align='left' > <input style='font-size:12px;color:blue;' name='textfield' class='input-small' id='textfield_time' type='text' size='5' value='15'";
				content+=" onFocus=\"if(value==defaultValue){value='';this.style.color='#000'}\" ";
				content+=" onBlur=\"if(!value){value=defaultValue;this.style.color='#999'}\" ";
				content+=" style=\"color:#999999\" ";
				content+=">&nbsp;&nbsp;分钟</td></tr>";
				
				content+="<tr id='id_advanced_configuration_data' style='display:none;font-size:12px;color:blue;'><td style='text-align:right;font-size:12px;color:blue;'>测试数据：</td>";
				content+="<td align='left' width='70%'><textarea  style='font-size:12px;color:blue;overflow-y:hidden;height:16px;width:30px;' id='textfield_data'></textarea></td></tr>";
				//&nbsp;&nbsp;<a href='#' style='font-size:12px;color:blue;'>上传</a>&nbsp;&nbsp;<a href='#' style='font-size:12px;color:blue;'>示例下载</a></td>";
				//content+="<td style='text-align:right;font-size:12px;color:blue;'>测试数据</td>";
				//content+="<td style='text-align:right;font-size:12px;color:blue;'><a>上传</a>&nbsp;&nbsp;<a>示例</a></td>";
				//content+="</tr>";
				
				content+="<tr><td width='80px' align='right'><b class='requier'>*</b>测试版本：</td> <td width='70%' align='left'><input name='textfield' class='input-large' id='textfield_testversion' type='text' size='50' style='color:#6e9e9e' value='输入icafe产品的版本号,如:1-0-14-1'";
				content+=" onFocus=\"if(value==defaultValue){value='';this.style.color='#000'}\" ";
				content+=" onBlur=\"if(!value){value=defaultValue;this.style.color='#999'}\" ";
				content+=" style=\"color:#999999\" ";
				content+="></td></tr> <tr><td width='80px' align='right'><b ></b>版本路径：</td> <td width='70%' align='left'><input name='textfield' class='input-large' id='textfield_filepath' type='text' size='50'></td></tr> <tr><td width='80px' align='right'><b></b>任务描述：</td> <td width='70%' align='left'><input name='textfield' class='input-large' id='textfield_taskinfo' type='text' size='50'";
				content+="></td></tr> <tr><td width='80px' align='right'></td> <td width='70%' align='left' id='id_warning_add_task' style='font-size:14px;color:red;font-weight:bold;'>&nbsp;</td> </tr> ";
				content+="</table>";
		  
                $.xDialog({
						//height:'600px',
                        title:'创建任务',
                        content:content,
                        ok:function(){
								var taskname='';
								taskname=$("#textfield_taskname").val();
								//alert(taskname);
								
								var pjt_name='';
								pjt_name=document.getElementById("select_pjtname").selectedIndex;
								//alert(pjt_name);
								
								var test_process='';
								if($('#RadioGroup1_testprocess001').prop('checked')){
									test_process=0;
								}
								else if($('#RadioGroup1_testprocess002').prop('checked')){
									test_process=1;
								}
								else{
									test_process=-1;
								}
								//alert(test_process);
								
								var test_type='';
								if($('#checkbox_testtype001').prop('checked') && !($('#checkbox_testtype002').prop('checked'))){
									test_type=0;
								}
								else if(!($('#checkbox_testtype001').prop('checked')) && $('#checkbox_testtype002').prop('checked')){
									test_type=1;
								}
								else if(!($('#checkbox_testtype001').prop('checked')) && !($('#checkbox_testtype002').prop('checked'))){
									test_type=-1;
								}
								else{
									test_type=2;
								}
								//alert(test_type);
								
								var version='';
								version=$("#textfield_testversion").val();
								//alert(version);
								
								var filepath='';
								filepath=$("#textfield_filepath").val();
								//alert(filepath);
								
								var taskinfo='';
								taskinfo=$("#textfield_taskinfo").val();
								
								/*alert(taskname);
								alert(pjt_name);
								alert(test_process);
								alert(test_type);
								alert(version);
								alert(filepath);
								alert(taskinfo);*/
								var warning='';
								if(!taskname){
									warning='请输入任务名称';
									document.getElementById("id_warning_add_task").innerHTML=warning;
									return false;
								}
								else if(!pjt_name){
									warning='请选择所属项目';
									document.getElementById("id_warning_add_task").innerHTML=warning;
									return false;
								}
								else if(test_process != 0 && test_process != 1){
									warning='请选择版本类型';
									document.getElementById("id_warning_add_task").innerHTML=warning;
									return false;
								}
								else if(test_type != 0 && test_type != 1 && test_type != 2){
									warning='请选择测试类型';
									document.getElementById("id_warning_add_task").innerHTML=warning;
									return false;
								}
								else if(!version){
									warning='请输入测试版本';
									document.getElementById("id_warning_add_task").innerHTML=warning;
									return false;
								}
								var test_time=$("#textfield_time").val();
								var test_data=$("#textfield_data").val();
								//alert(test_time);
								//alert(test_data);
								/*var re =/^(\d{1,})-(\d{1,})-(\d{1,})-(\d{1,})$/;
								if(!re.test(version)){
									warning='请输入测试版本,格式如：1-0-14-1';
									document.getElementById("id_warning_add_task").innerHTML=warning;
									return false;
								}
								
								else{
									post_add_task_management(taskname,pjt_name,test_process,test_type,version,filepath,taskinfo,test_time,test_data);
								}*/
								post_add_task_management(taskname,pjt_name,test_process,test_type,version,filepath,taskinfo,test_time,test_data);
                        },
                        cancel:function(){
                                //alert("cancel");
                        }
                });
        });
});



