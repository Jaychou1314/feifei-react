<script type="text/javascript">
				var layer, table;
var subimtOrSave = "";
var setPlacebn = true;
var _form;
layui.use(['jquery', 'laydate', 'element', 'layer', 'table', 'form'], function () {
	_form = layui.form;
	var laydate = layui.laydate
		, element = layui.element
		, form = layui.form,
		$ = layui.$;
	layer = layui.layer;
	table = layui.table;
	//监听按钮活动
	active = {
		add: function () {
			$('[name=bankNm]').val("");
			$('[name=bankAccount]').val("");
			add('添加银行帐号', '800', '300');
		},
		openPerson: function () {
			openNewForm("modifyAgentPerson?orgId=" + "727a9fa7-168eb50cd1a-6e0b6d799&personNm=" + $("[name=contactNm]").val());
		},
		openPlace: function () {
			if (setPlacebn) {
				var areaCodeTemp = "";
				$("[name=areaCode]:checked").each(function (id, row) {
					areaCodeTemp += $(row).val() + ",";
				});
				areaCodeTemp = areaCodeTemp.substring(0, areaCodeTemp.length - 1);
				openNewForm("modifyAgentPlace?orgId=" + "727a9fa7-168eb50cd1a-6e0b6d799&areaCode=" + areaCodeTemp);
			}
		},
		upload: function () {
			if ($("#8").find("a").size() > 0) {
				reupload();
			} else {
				openUploadWindow1(1);
			}
		}
	};
	$('.demoTable .layui-btn').on('click', function () {
		var type = $(this).data('type');
		active[type] ? active[type].call(this) : '';
	});
	//监听表格内工具条
	table.on('tool(Mytable)', function (obj) {
		var data = obj.data;
		if (obj.event === 'editPerson') {
			add('修改银行帐号', '800', '300', data);
		} else if (obj.event === 'del') {
			layer.confirm('确认要删除此银行帐号吗？', function (index1) {
				layer.close(index1);
				del(data.uuid)
			});
		} else if (obj.event === 'setDefault') {
			$.post(contextPath + "/basicresource/updateDefaultBankAccount", { "uuid": data.uuid, "ifDefault": 1, "orgId": data.orgId }, function (r) {
				if (r == "true") {
					layer.alert("操作成功，该银行帐号已设为默认!", { offset: (window.screen.availHeight - 500) / 2 + "px", icon: 6 }, function (index) {
						table.reload('Mytable');
						layer.close(index);
					});
				} else {
					layer.closeAll();
					layer.alert("操作失败，请联系系统管理员", { offset: (window.screen.availHeight - 500) / 2 + "px", icon: 5 });
				}
			});

		}
	});
	//表单验证
	form.verify({
		officeTel: function (value) {
			if (!/(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\d3)|(\d{3}\-))?(1[358]\d{9})$)/.test(value)) {
				return '输入格式不正确,使用020-88888888';
			}
		},
		baseLength: [/(^[\d\D]{1,21}$)/, '输入内容超长，最长不得超过21个字符!']
	});
	//监听提交
	form.on('submit(save)', function (data) {
		var formData = data.field;
		var load = layer.load(2);
		data.field["orgId"] = "727a9fa7-168eb50cd1a-6e0b6d799";
		data.field["uuid"] = uuid;
		$.ajax({
			url: contextPath + "/basicresource/saveOrUpdateBankAccount",// 跳转到 action
			data: data.field,
			type: 'post',
			success: function (data) {
				uuid = undefined;
				layer.close(load);
				layer.close(_index);
				if (data == "true") {
					layer.alert("操作成功，账号信息已保存!", { offset: (window.screen.availHeight - 500) / 2 + "px", icon: 6 }, function (index) {
						table.reload('Mytable');
						$("#personForm").hide();
						layer.close(index);
					});
				} else {
					layer.alert("操作失败，" + data, { offset: (window.screen.availHeight - 500) / 2 + "px", icon: 5 });
				}
			}
		});
		$("#personForm").hide();
		return false;
	});
	form.on('submit(saveInfo)', function (data) {
		if ($("[lay-filter=saveInfo]").attr("enable") == 0) { return false; }
		openBackGround();
		if ($("[lay-filter=saveInfo]").hasClass("layui-btn-disabled")) {
			closeBackGround();
			return false;
		}
		var localPersonBn = true;
		var formData = data.field;
		for (var i = 0; i < agentPerson.length; i++) {
			if (agentPerson[i].personNm == formData.contactNm) {
				localPersonBn = false;
			}
		}
		if (localPersonBn) {
			closeBackGround();
			layer.alert("操作失败，本地区业务联系人不存在于本地区专业人员列表中!", { offset: (window.screen.availHeight - 500) / 2 + "px", icon: 5 });
			return false;
		}
		if (agentPersonNum < 5 && $("[lay-filter=saveInfo]").text() == "提交") {
			closeBackGround();
			layer.alert("操作失败，本地区专业人员最少要有5人以上!", { offset: (window.screen.availHeight - 500) / 2 + "px", icon: 5 });
			return false;
		}
		if (agentPlaceNum < 1 && $("[lay-filter=saveInfo]").text() == "提交") {
			closeBackGround();
			layer.alert("操作失败，本地区评审场所最少要有1处以上!", { offset: (window.screen.availHeight - 500) / 2 + "px", icon: 5 });
			return false;
		}
		/*if($("#8").find("a").size()==0&&$("[lay-filter=saveInfo]").text()=="提交"){
			layer.alert("操作失败，要提交监管单位备案开通业务区域，必须上传承诺函!",{offset :(window.screen.availHeight-500)/2+"px",icon:5});
			return false;
		}*/
		if (typeof (areaCode) != "undefined") {
			if (typeof (applyAreaCode) != "undefined") {
				formData.applyAreaCode = applyAreaCode.substring(0, applyAreaCode.length - 1);
			}
			formData.areaCode = areaCode.substring(0, areaCode.length - 1);
		} else {
			areaCode = "";
			$("[name=areaCode]:checked").each(function (id, row) {
				areaCode += $(row).val() + ",";
			});
			formData.areaCode = areaCode.substring(0, areaCode.length - 1);
		}
		var areaValue = "";
		var bn = true;
		$.ajax({
			url: contextPath + "/basicresource/getAgentLocalPlaceList",
			data: { orgId: "727a9fa7-168eb50cd1a-6e0b6d799" },
			success: function (data) {
				var localPlace = data.rows;
				var areaCodelocal = [];
				for (var i = 0; i < localPlace.length; i++) {
					try {
						var areaCodeTemp = localPlace[i].areaCode.split(",");
						for (var j = 0; j < areaCodeTemp.length; j++) {
							if (areaCodeTemp[j] != "") {
								areaCodelocal.push(areaCodeTemp[j]);
							}
						}
					} catch (e) { }
				}
				areaCodelocal = unique(areaCodelocal);
				var areaCodeTemp = [];
				$("[name=areaCode]:checked").each(function (id, row) {
					areaCodeTemp.push($(row).val());
				});
				for (var i = 0; i < areaCodeTemp.length; i++) {
					var ifExists = false;
					for (var j = 0; j < areaCodelocal.length; j++) {
						if (areaCodeTemp[i] == areaCodelocal[j]) {
							ifExists = true;
							break;
						}
					}
					if (!ifExists) {
						bn = false;
						areaValue += $("[name=areaCode][value=" + areaCodeTemp[i] + "]").attr("title") + "，";
					}
				}
				if (!bn) {
					closeBackGround();
					layer.alert("操作失败，申请业务区域：" + areaValue + "未设置对应评审场所!", { offset: (window.screen.availHeight - 500) / 2 + "px", icon: 5 });
					return false;
				}
				$.post(contextPath + "/basicresource/updateAgentArea?subimtOrSave=" + subimtOrSave, formData, function (d) {
					if (d == "true") {
						layer.alert("操作成功，采购代理机构信息已保存成功，当前操作并未新增开展业务区域，若需开展业务区域，请选择需开通区域后再提交!", { offset: (window.screen.availHeight - 500) / 2 + "px", icon: 6 });
						$("#agentNm").empty();
						$("#contactNm").empty();
						$("#contactMobile").empty();
						$("#areaCode tbody").empty();
						//$("#applyAreaCode").empty();
						agentInfoInit();
						areaCode = undefined;
					} else if (d.split("@")[0] == "success") {
						layer.alert("操作成功，采购代理机构新开展业务申请已发送给：" + d.split("@")[1] + "相关人员备案，请耐心等待备案结果，备案结果请留意本页面操作记录或者首页消息栏目!", { offset: (window.screen.availHeight - 500) / 2 + "px", icon: 6 });
						$("#agentNm").empty();
						$("#contactNm").empty();
						$("#contactMobile").empty();
						$("#areaCode tbody").empty();
						//$("#applyAreaCode").empty();
						agentInfoInit();
						areaCode = undefined;
						$("[name=contactPerson].layui-btn-normal").addClass("layui-btn-disabled");
						initOptionList();
					} else if (d == "false") {
						layer.alert("操作失败，请联系系统管理员！", { offset: (window.screen.availHeight - 500) / 2 + "px", icon: 5 });
					} else {
						layer.alert("操作失败，" + d + "地区，没有未设置监管备案人员，请重新选择开展业务区域！", { offset: (window.screen.availHeight - 500) / 2 + "px", icon: 5 });
					}
					table.reload("changeHistory");
					closeBackGround();
				})
			}
		});
		return false;
	});
});
$(function () {
	$("#personForm").hide();
	//初始化数据
	agentInfoInit();
	initAgentPersonTable();
	initAgentPlaceTable();
	tableinit();
	initOptionList();
	loadAttachBaseFile(orgId);
	initChangeHistory();
	initCata();
	//widthOld=$("#Mytable").parent()[0].clientWidth;
});
var columns = [[{ field: 'index', align: 'center', title: '序号', width: '5%', templet: '#indexTpl' }
	, { field: 'bankNm', title: '开户银行', width: '15%' }
	, { field: 'bankAccount', title: '银行账号', width: '18%' }
	, { field: 'accountMan', title: '开户人', width: '23%' }
	, { title: '操作', align: 'center', toolbar: '#barDemo', width: '20%' }]];
//数据表格
function tableinit() {
	var pageWidth = $("#mainFrame").contents().find("body").context.body.clientWidth;
	//初始化表格
	table.render({
		title: "采购代理机构银行账户列表"
		, url: contextPath + "/basicresource/getBankAccountList"
		, where: { "orgId": "727a9fa7-168eb50cd1a-6e0b6d799" }
		, method: "post"
		, elem: '#Mytable'
		//                ,width:pageWidth
		//                ,height:$("body")[0].offsetHeight-$("table:eq(0)")[0].offsetHeight-$(".demoTable:eq(0)")[0].offsetHeight-$("#btn")[0].offsetHeight-60
		, request: { pageName: 'page', limitName: 'rows' }
		, response: { statusName: 'status', statusCode: 0, countName: "total", dataName: "rows" }
		/*,page:true
		,limits:[10,20,30]
		,limit:10*/
		, page: false
		, cols: columns
		, done: function (res, curr, count) {
			$("#Mytable").next().find("table.layui-table thead").prepend("<tr id='7'><th colspan=6 style='text-align:left;line-height:30px'><div style='height:40px;padding-left:5px;line-height:40px'>采购代理机构银行账户列表</div></th></tr>");
		}
	});
};
var orgId, arr, arrApply, index, readOnlybn = false, submitBn = true;
function agentInfoInit(obj, contactNmBn, contactMobileBn) {
	$.ajax({
		url: "getAgentInfo"
		, success: function (data) {
			orgId = data.orgId;
			localContactNm = data.contactNm;
			if (data.updateTime != null && data.updateTime != "") {
				$("#updateTime").text(toDate(data.updateTime));
			} else {
				$("#updateTime").text("初次注册");
			}
			//$("#applyAreaCode").parent().html("<span id='applyAreaCode'></span>");
			//$("#areaCode").parent().html("<span id='areaCode'></span>");
			$("#uuid").val(data.uuid);
			$("#orgCode").text(data.orgCode);
			$("#agentNm").append(data.agentNm);
			$("#tradeAddr").text(data.auditPlaceAddr);
			$("#legalNm").text(data.legalNm);
			$("#legalMobile").text(data.legalTel);
			if (data.agentState == 1) {
				$("#agentStateInfo").html("<span><font color='#666'>正常</font></span>");
			} else if (data.agentState == 0) {
				$("#agentStateInfo").html("<span><font color='orange'>停用</font></span>");
			} else if (data.agentState == 2) {
				$("#agentStateInfo").html("&nssp;<span><font color='orange'>禁用</font></b>");
			}
			if (data.agentState == "0") {
				$("#agentStateInfo").hover(function () {
					index = layer.tips("停用理由：" + data.disableReason, '#agentStateInfo', {
						tips: [1, '#3595CC']
					});
				},
					function () {
						layer.close(index);
					}
				);
			} else if (data.agentState == "2") {
				$("#agentStateInfo").hover(function () {
					index = layer.tips("禁用理由：" + data.disableReason, '#agentStateInfo', {
						tips: [1, '#3595CC']
					});
				},
					function () {
						layer.close(index);
					}
				);
			}
			arr = data.areaCode.split(",");
			$.ajax({
				url: contextPath + "/common/getBusinessTypeCode"
				, data: { "typeNo": "J020" }
				, success: function (r) {
					var rarr = [];
					for (var i = 0; i < r.length; i++) {
						rarr.push(r[i].codeId);
					}
					$.ajax({
						url: "getApplyAreaCode"
						, async: false
						, success: function (arrTemp) {
							arrApply = arrTemp
						}
					})
					readOnlybn = false;
					for (var i = 0; i < arrApply.length; i++) {
						if (arrApply[i].applyState == 3) {
							setPlacebn = true;
							readOnlybn = false;
							submitBn = true;
							break;
						} else if (arrApply[i].applyState == 4) {
							setPlacebn = true;
							readOnlybn = false;
							submitBn = true;
							break;
						} else if (arrApply[i].applyState == 1) {
							setPlacebn = false;
							readOnlybn = true;
							submitBn = false;
						}
					}
					if (!setPlacebn) {
						$("[data-type=openPlace]").addClass("layui-btn-disabled");
					}
					if (!submitBn) {
						$("[lay-filter=saveInfo]").attr("enable", "0");
					}
					if (readOnlybn) {
						readOnly(r, data, contactNmBn, contactMobileBn);
					} else {
						readOrEdit(r, data, contactNmBn, contactMobileBn);
					}
					for (var i = 0; i < arrApply.length; i++) {
						$("[name=areaCode][value=" + arrApply[i].applyAreaCode + "]").parent().next().html(applyStateValue(arrApply[i].applyState)).next().next().attr("title", arrApply[i].options).find("div").text(arrApply[i].options);
						if (arrApply[i].applyState == 1 || arrApply[i].applyState == 2 || arrApply[i].applyState == 3 || arrApply[i].applyState == 4) {
							$("[name=areaCode][value=" + arrApply[i].applyAreaCode + "]").attr("applyState", arrApply[i].applyState).prop("checked", true);
							if (arrApply[i].applyState == 1) {
								$("[name=areaCode][value=" + arrApply[i].applyAreaCode + "]").prop("disabled", true);
							}
						}
						if (data.agentState != "2") {
							$("[name=areaCode][value=" + arrApply[i].applyAreaCode + "]").parent().next().next().html(arrApply[i].orgState == 1 ? " 正常" : " 停用")
						} else {
							$("[name=areaCode][value=" + arrApply[i].applyAreaCode + "]").parent().next().next().html(" 禁用");
						}
					}
					/*if(data.areaCode==""&&arrApply.length==0){
						$("[name=areaCode]:eq(0)").prop("checked",true);
					}*/
					if (typeof (obj) != "undefined") {
						var selectAreaCode = obj.split(",");
						for (var i = 0; i < selectAreaCode.length; i++) {
							$("[name=areaCode][value=" + selectAreaCode[i] + "]").prop("checked", true);
						}
					}
					layui.form.render();
					//$("#applyAreaCode").find("div").removeClass("layui-checkbox-disbaled").css("border-color","#5FB878").find("span").css("background-color","#5FB878");
					$("[name=areaCode]").parent().bind("click", function () {
						changeArea($(this).find("input"));
					});
					/*if(arr.length==1&&arr[0]==""){
					}else{
						for(var i=0;i<arr.length;i++){
							$("[name=areaCode][value="+arr[i]+"]").next().removeClass("layui-checkbox-disbaled");
						}
					}
					renderCheckbox(0);*/
					changeArea();
				}
			})
		}
	})
}
function applyStateValue(obj) {
	var value = "";
	if (obj == 1) {
		value = "备案中";
	} else if (obj == 2) {
		value = "已备案";
	} else if (obj == 3) {
		value = "<font color=red>退回</font>";
	} else if (obj == 4) {
		value = "重新备案待提交";
	}
	return value;
}
/*function renderCheckbox(obj){
	applyAreaCode=undefined,areaCode=undefined,subimtOrSave=undefined;
$("[lay-filter=saveInfo]").text("保存");
	setTimeout(function(){
		for(var i=0;i<arrApply.length;i++){
			if(arrApply[i].applyState==1){
				$("[name=areaCode][value="+arrApply[i].applyAreaCode+"]").next().removeClass("layui-checkbox-disbaled").css("border-color","#1E9FFF").find("span").css("background-color","#1E9FFF");
			}else if(arrApply[i].applyState==3){
				$("[name=areaCode][value="+arrApply[i].applyAreaCode+"]").next().removeClass("layui-checkbox-disbaled").css("border-color","red").find("span").css("background-color","red");
			}else if(arrApply[i].applyState==1||arrApply[i].applyState==2||arrApply[i].applyState==3){
				$("[name=areaCode][value="+arrApply[i].applyAreaCode+"]").next().removeClass("layui-checkbox-disbaled").addClass("layui-form-checked").css("border-color","#5FB878;").find("span").css("background-color","#5FB878;");
			}
		}
	},obj);
}*/
var _tr = $("[name=areaCodeTr]").clone();
function readOnly(r, data, contactNmBn, contactMobileBn) {
	$("[name=areaCodeTr]").remove();
	for (var i = 0; i < r.length; i++) {
		if (i % 2 == 0) {
			$("#areaCode tbody").append(_tr.clone());
			$("[name=areaCodeTr]:last td:first").append("<input type='checkbox' onclick='changeArea(this)' disabled name='areaCode' " + (arr.indexOf(r[i].codeId) == -1 ? "" : "checked") + " value='" + r[i].codeId + "' title='" + r[i].codeValue + "'>");
			$("[name=areaCodeTr]:last td:eq(1)").text("未申请");
			$("[name=areaCodeTr]:last td:eq(2)").text("无");
		} else {
			$("[name=areaCodeTr]:last td:eq(4)").append("<input type='checkbox' onclick='changeArea(this)' disabled name='areaCode' " + (arr.indexOf(r[i].codeId) == -1 ? "" : "checked") + " value='" + r[i].codeId + "' title='" + r[i].codeValue + "'>");
			$("[name=areaCodeTr]:last td:eq(5)").text("未申请");
			$("[name=areaCodeTr]:last td:eq(6)").text("无");
		}
	}
	if (contactNmBn != 1) {
		$("#contactNm").html("");
		$("#contactNm").append("<input type='text' readonly name='contactNm' style='width:40%' lay-verify='required' value='" + data.contactNm + "' autocomplete='off' class='layui-input layui-input-inline'><font color=red>&nbsp;*</font>");
	}
	if (contactMobileBn != 1) {
		$("#contactMobile").html("");
		$("#contactMobile").append("<input type='text' readonly name='contactMobile' style='width:40%' lay-verify='required||phone' value='" + data.contactMobile + "' autocomplete='off' class='layui-input layui-input-inline'><font color=red>&nbsp;*</font>");
	}
	$("[lay-filter=saveInfo]").addClass("layui-btn-disabled");
}
var localContactNm = "";
function readOrEdit(r, data, contactNmBn, contactMobileBn) {
	if (contactNmBn != 1) {
		$("#contactNm").html("");
		$("#contactNm").append("<input type='text' onclick='setLocalContact()' readonly name='contactNm' style='width:40%' lay-verify='required' placeholder='请选择本地区业务联系人' value='" + data.contactNm + "' autocomplete='off' class='layui-input layui-input-inline'><font color=red>&nbsp;*</font>");
	}
	if (contactMobileBn != 1) {
		$("#contactMobile").html("");
		$("#contactMobile").append("<input type='text' name='contactMobile' style='width:40%' lay-verify='required||phone' placeholder='请输入本地区业务联系人手机' value='" + data.contactMobile + "' autocomplete='off' class='layui-input layui-input-inline'><font color=red>&nbsp;*</font>");
	}
	//$("#areaCode").append("<table><tr><th></th><th></th><th></th><th></th></tr><tr>");
	$("[name=areaCodeTr]").remove();
	for (var i = 0; i < r.length; i++) {
		if (i % 2 == 0) {
			$("#areaCode tbody").append(_tr.clone());
			//$("#areaCode").append("<tr><td>");
			$("[name=areaCodeTr]:last td:first").append("<input type='checkbox' onclick='changeArea(this)' name='areaCode' " + (arr.indexOf(r[i].codeId) == -1 ? "" : "checked") + " value='" + r[i].codeId + "' title='" + r[i].codeValue + "'>");
			$("[name=areaCodeTr]:last td:eq(1)").text("未申请");
			$("[name=areaCodeTr]:last td:eq(2)").text("无");
			//$("#areaCode").append("</td><td></td><td></td><td></td></tr>");
		} else {
			//$("#areaCode").append("<tr><td>");
			$("[name=areaCodeTr]:last td:eq(4)").append("<input type='checkbox' onclick='changeArea(this)' name='areaCode' " + (arr.indexOf(r[i].codeId) == -1 ? "" : "checked") + " value='" + r[i].codeId + "' title='" + r[i].codeValue + "'>");
			$("[name=areaCodeTr]:last td:eq(5)").text("未申请");
			$("[name=areaCodeTr]:last td:eq(6)").text("无");
			//$("#areaCode").append("</td><td></td><td></td><td></td></tr>");
		}
	}
	//$("#areaCode").append("</table>");
	$("[lay-filter=saveInfo]").removeClass("layui-btn-disabled");
}
var selectAgentPersonGridCols = [[ //表头
	{ title: '', width: "6%", align: 'center', templet: "#selectTpl" },
	{ title: '姓名', width: "10%", align: 'center', field: 'personNm' },
	{ title: '公民身份证号', width: "19%", field: 'idcardNo' },
	{ title: '学历', width: "15%", field: 'degreeCodeText' }
]];
function setLocalContact() {
	table.render({
		title: '<b>本地区专业人员列表</b>',
		elem: '#selectLocalContact',
		url: contextPath + "/basicresource/getAgentLocalPersonList",
		method: "post",
		request: { pageName: "page", limitName: "rows" },
		response: { statusName: 'status', countName: 'total', dataName: 'rows' },
		page: false,
		cols: selectAgentPersonGridCols
	});
	layer.open({
		type: 1
		, title: "设置本地区业务联系人"
		, content: $("#selectLocalContactDiv")
		, area: ["50%", "400px"]
		, btn: ["确认"]
		, yes: function (index, layero) {
			$("[name=contactNm]").val($("[name=selectAgent]:checked").val());
			layer.close(index);
			$("#selectLocalContactDiv").hide();
		}
		, cancel: function () {
			$("#selectLocalContactDiv").hide();
		}
	})

}
var applyAreaCode;
var areaCode;
var _index;//部分弹出层通用下标
function changeArea(obj) {
	applyAreaCode = "", areaCode = "";
	var bn = true;
	$("[name=areaCode]:checked").each(function (id, row) {
		if ($.inArray($(row).val(), arr) == -1) {
			$("[lay-filter=saveInfo]").text("提交");
			applyAreaCode += $(row).val() + ",";
			subimtOrSave = 1;
			bn = false;
		} else {
			areaCode += $(row).val() + ",";
		}
		if (bn) {
			subimtOrSave = undefined;
			$("[lay-filter=saveInfo]").text("保存");
		}
	})
	if ($("[name=areaCode]:checked").size() == 0) {
		subimtOrSave = undefined;
		$("[lay-filter=saveInfo]").text("保存");
	}
	try {
		if (obj.attr("applyState") == 2) {
			if (obj.filter(":checked").size() == 0) {
				layer.alert(obj.attr("title") + "当前状态已通过，若取消选中并提交将导致该区域开展业务资格被取消，若需再次开通需重新提交监管单位备案。", { offset: (window.screen.availHeight - 500) / 2 + "px", icon: 6 });
			}
		} else if (obj.attr("applyState") == 3) {
			if (obj.filter(":checked").size() == 0) {
				layer.alert(obj.attr("title") + "当前状态退回，若取消选中并提交将不会提交备案申请，若需再次开通需重新提交监管单位备案。", { offset: (window.screen.availHeight - 500) / 2 + "px", icon: 6 });
			}
		} else if (obj.attr("applyState") == 4) {
			if (obj.filter(":checked").size() == 0) {
				layer.alert(obj.attr("title") + "当前状态重新备案待提交，若取消选中并提交将不会提交备案申请，若需再次开通需重新提交监管单位备案。", { offset: (window.screen.availHeight - 500) / 2 + "px", icon: 6 });
			}
		}
	} catch (e) {
		// TODO: handle exception
	}
}
function openAgentInfo(obj) {
	openNewForm("http://changs.ccgp-hunan.gov.cn/gp/agentDetail.do?orgCode=9143070073284214XN&personUuids=2c83828b4c128507014c30ca223e058a,2c83828c4c128b30014c34cf3edb0628,2c83828c4c128b30014c3501cb6d065c,2c83828b4c128507014c30c707e20585,2c83828c4c128b30014c34e457ae0649&placeUuids=self&type=view");
}
/*添加*/
var uuid;
function add(title, w, h, data) {
	if (w === null || w === '') {
		w = 800;
	}
	if (h === null || h === '') {
		h = ($(window).height() - 50);
	}
	if (data != undefined) {
		$('#personForm').form('load', {
			bankNm: data.bankNm,
			bankAccount: data.bankAccount,
		});
		uuid = data.uuid;
	}
	var clientWidth = ($("body")[0].clientWidth - 700) / 2, iTop = (window.screen.availHeight - 500) / 2;
	_index = layer.open({
		type: 1
		, area: [w + 'px', h + 'px']
		, offset: [iTop + "px", clientWidth + "px"]
		, fix: false
		, maxmin: false
		, shadeClose: false
		, shade: 0.4
		, title: [title, 'text-align: letf']
		, cancel: function () {
			$('[name=bankNm]').val("");
			$('[name=bankAccount]').val("");
			$('#personForm').hide();
		}
		, content: $('#personForm')
	})
}
function resetPersonForm() {
	$('[name=bankNm]').val("");
	$('[name=bankAccount]').val("");
}
function del(recUuid) {
	var load = layer.load(2);
	$.ajax({
		url: contextPath + "/basicresource/delBankAccount"
		, type: "post"
		, async: false
		, data: { "uuid": recUuid }
		, success: function (data) {
			layer.close(load);
			if (data == "true") {
				layer.alert("操作成功,该账户已删除!", { offset: (window.screen.availHeight - 500) / 2 + "px", icon: 1 }, function (index) {
					table.reload('Mytable');
					layer.close(index);
				});
			} else {
				layer.alert("操作失败," + data, { offset: (window.screen.availHeight - 500) / 2 + "px", icon: 5 });
			}

		}
	});
}
function autoWidth(obj, width) {
	return width * obj / 100;
}
//初始化操作记录列表
function initOptionList() {
	$.ajax({
		url: "getOptionList"
		, dataType: "json"
		, success: function (data) {
			$("#optionTable tr:eq(2)").find("td").text("");
			$("#optionTable tr:gt(2)").remove();
			//项目情况、项目具体情况
			if (data.length > 0) {
				$("#optionTable").show();
				$("#throughOption").show();
				var optionListTr = $("#optionTable tr:eq(2)").clone();
				for (var i = 0; i < data.length; i++) {
					if (i > 0) {
						$("#optionTable").append(optionListTr.clone());
					}
					$("#optionTable tr").eq(2 + i).find("td:eq(0)").text(i + 1);
					$("#optionTable tr").eq(2 + i).find("td:eq(1)").text(data[i].auditOrgId);
					$("#optionTable tr").eq(2 + i).find("td:eq(2)").text(data[i].auditUserId);
					try {
						$("#optionTable tr").eq(2 + i).find("td:eq(3)").text(toDate(data[i].auditTime));
					} catch (e) {
						// TODO: handle exception
					}
					$("#optionTable tr").eq(2 + i).find("td:eq(4)").text(data[i].optionContent == "" ? "同意" : data[i].optionContent);
				}
			}
		}
	})
}

function toDate(obj) {
	var crtTime = new Date(obj.time);
	return top.dateFtt("yyyy-MM-dd hh:mm", crtTime);
}
function dateFtt(fmt, date) { //author: meizz   
	var o = {
		"M+": date.getMonth() + 1,                 //月份   
		"d+": date.getDate(),                    //日   
		"h+": date.getHours(),                   //小时   
		"m+": date.getMinutes(),                 //分   
		"s+": date.getSeconds(),                 //秒   
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度   
		"S": date.getMilliseconds()             //毫秒   
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
var agentPersonGridCols = [[ //表头
	{ title: '序号', width: "5%", align: 'center', templet: "#indexTpl" },
	{ title: '姓名', width: "6%", align: 'left', field: 'personNm' },
	{ title: '公民身份证号', width: "13%", field: 'idcardNo' },
	{ title: '学历', width: "9%", field: 'degreeCodeText' },
	{ title: '专业', width: "13%", field: 'majorNmText' },
	{ title: '职称', width: "6%", field: 'professionTechTitleCode' },
	{ title: '是否缴纳<br/>社会保险', align: 'center', width: "9%", field: 'socsecuCode', templet: "#socseuCode_TL" },
	{ title: '是否进行<br/>政府采购培训', align: 'center', width: "9%", field: 'trainProveUrl', templet: "#trainProve_TL" },
	/*{title:'设为本地区<br/>业务联系人',align:'left', width:"12%",field:'xxx',templet:"#xxx_TL"},*/
	{ title: '培训证明图片', width: "11%", align: 'center', field: 'trainProveUrl', templet: "#trainProveUrl_TL" }
]];
//初始化代理机构本地专职人员列表
var agentPersonNum;
var agentPerson;
function initAgentPersonTable() {
	table.render({
		title: '<b>本地区专职人员列表</b>',
		elem: '#agentPersonGrid',
		url: contextPath + "/basicresource/getAgentLocalPersonList",
		method: "post",
		request: { pageName: "page", limitName: "rows" },
		response: { statusName: 'status', countName: 'total', dataName: 'rows' },
		page: false,
		cols: agentPersonGridCols,
		done: function (data) {
			agentPerson = data.rows;
			agentPersonNum = data.rows.length;
		}
	});
	$("#agentPersonGrid").next().
		find("table.layui-table thead").
		prepend("<tr id='5'><th colspan=10 style='text-align:left;line-height:30px'><div style='height:30px;padding-left:5px'>本地区专职人员列表</div></th></tr>");
}
var agentPlaceGridCols = [[ //表头
	{ title: '序号', align: 'center', templet: "#indexTpl" },
	{ title: '联系人姓名', width: "100px", align: 'center', field: 'contactPerson' },
	{ title: '联系人手机号', width: "130px", field: 'contactMobile' },
	{ title: '对应业务区域', width: "200px", field: 'areaValue', templet: "#areaValueTpl" },
	{ title: '场所图片', align: 'center', width: "90px", field: 'placePic', templet: "#placePic_TL" },
	{ title: '录音录像', align: 'center', width: "100px", field: 'videoDevicePic1', templet: "#videoDevicePic1_TL" },
	{ title: '录音录像', align: 'center', width: "80px", field: 'videoDevicePic2', templet: "#videoDevicePic2_TL" },
	{ title: '场地使用证明材料', align: 'center', width: "160px", templet: "#placePermission_TL" },
	{ title: '录音录像', align: 'center', width: "100px", templet: "#videoFile_TL" },
	{ title: '书面承诺', align: 'center', width: "90px", templet: "#writtenPromise_TL" }
]];
//初始化代理机构本地评审场所列表
var agentPlaceNum;
function initAgentPlaceTable() {
	table.render({
		title: '<b>本地区评审场所列表</b>',
		elem: '#agentPlaceGrid',
		url: contextPath + "/basicresource/getAgentLocalPlaceList",
		method: "post",
		request: { pageName: "page", limitName: "rows" },
		response: { statusName: 'status', countName: 'total', dataName: 'rows' },
		page: false,
		cols: agentPlaceGridCols,
		done: function (data) {
			//console.info(data);
			agentPlaceNum = data.rows.length;
		}
	});
	$("#agentPlaceGrid").next().find("table.layui-table thead").prepend("<tr id='6'><th colspan=11 style='text-align:left;line-height:40px'><div style='height:40px;padding-left:5px'>本地区评审场所列表</div></th></tr>");
}
var changeHistoryCols = [[
	{ title: '序号', width: "5%", align: 'center', templet: "#indexTpl" },
	{ title: '变更项', width: "12%", field: 'changeType', templet: "#changeTypeTpl" },
	{ title: '变更前', width: "25%", field: 'beforeChange' },
	{ title: '变更后', width: "25%", field: 'afterChange' },
	{ title: '变更时间', width: "15%", align: 'left', field: 'createTime' }


]]
// $(".layui-table-body").find("tbody").append('<tr data-index="4" class=""><td data-field="0" align="center" data-content=""><div class="layui-table-cell laytable-cell-4-0"> 5 </div></td><td data-field="changeType" data-content="04"><div class="layui-table-cell laytable-cell-4-changeType">  录音录像文件网盘链接地址  </div></td><td data-field="beforeChange"><div class="layui-table-cell laytable-cell-4-beforeChange">常德市武陵大道458号:https://pan.baidu.com/s/107ZIzPQG7Hwe_u2iS9cIxQ</div></td><td data-field="afterChange"><div class="layui-table-cell laytable-cell-4-afterChange">https://pan.baidu.com/s/1eGKBHcC77Dt5E8yofJJWzw</div></td><td data-field="createTime" align="left"><div class="layui-table-cell laytable-cell-4-createTime">2019-02-18 16:12:21</div></td></tr>')
//初始化变更历史列表
function initChangeHistory() {
	table.render({
		elem: '#changeHistory',
		url: contextPath + "/basicresource/getChangeHistory",
		method: "post",
		request: { pageName: "page", limitName: "rows" },
		response: { statusName: 'status', countName: 'total', dataName: 'rows' },
		page: {
			limit:10,
			first:"首页",
			last:"尾页",
			prev:"<<上一页",
			next:"下一页>>"
		
		},
		cols: changeHistoryCols,
		done: function (data) {
		//	$("#layui-table-page4").find("div").prepend("<a href='javascript:;' class='layui-page-span layui-page-homepage layui-page-first'>首页</a>")
		//	$(".layui-laypage-next").after("<a href='javascript:;' class='layui-page-span layui-page-endpage'>尾页</a>")
		//	$(".layui-laypage-skip").html("<input type='text' min='1' value='1' class='layui-input'><button type='button' class='layui-laypage-btn'>跳转</button>");
		//	$(".layui-laypage-skip").after("<span><span>共</span><span class='total-page'>7</span><span>页/</span><span class='local-page'>1</span><span>页</span></span>")
		//	$(".layui-laypage-curr").css("display", "none")
		//	$(".layui-laypage-prev").html("<<上一页");
		//	$(".layui-laypage-next").html("下一页>>");
			console.log(data);	
			// 点击首页
			// $(".layui-page-homepage").click(function(){
			// 	alert();
			// })
			// 点击尾页
			$(".layui-page-endpage").click(function(){
				alert();
			})
			$(".total-page").text(data.totalpage);
			$(".local-page").text(data.page);
			console.info(data);
			if ($("#changeHistory").next().find("table.layui-table thead").find("#9").size() == 0) {
				$("#changeHistory").next().find("table.layui-table thead").prepend("<tr id='9'><th colspan=5 style='text-align:left;line-height:30px'><div style='height:30px;padding-left:5px'>变更记录</div></th></tr>");
			}
		}
	});
}
//更新代理机构信息
function updateAgentinfo() {
	var load = layer.load(2);
	$.ajax({
		url: contextPath + "/basicresource/updateAgentInfoFormCcgp"
		, type: "post"
		, data: { "orgId": "727a9fa7-168eb50cd1a-6e0b6d799" }
		, contentType: "application/x-www-form-urlencoded;charset=UTF-8"
		, dataType: 'json'
		, success: function (data) {
			layer.close(load);
			if (data.state == "success") {
				layer.msg(data.msg, { icon: 1, time: 1000 }, function () {
					window.location.reload();
				});
			}
			if (data.state == "fail") {
				layer.alert(data.msg, { icon: 5 });
			}
		}
		, error: function (XMLHttpRequest, textStatus, errorThrown) {
			layer.close(load);
			layer.alert('操作失败，请联系管理员。', { icon: 5 });
		}
	});
}
function markAsLocalPerson(index) {
	if ($("#btn" + agentPerson[index].uuid).html() != "设为本地区业务联系人" || readOnlybn) {
		return false;
	}
	$.ajax({
		url: contextPath + "/basicresource/updateAgentContact",
		type: "post",
		data: { uuid: $("#uuid").val(), contactNm: agentPerson[index].personNm/*,contactMobile:agentPerson[index].personMobile*/ },
		success: function (data) {
			if (data == 'true') {
				localContactNm = agentPerson[index].personNm;
				$("#contactNm").text(agentPerson[index].personNm);
				//$("#contactMobile").text(agentPerson[index].personMobile);
				$("[name=contactPerson]").html("设为本地区业务联系人");
				$("[name=contactPerson]").removeClass("layui-btn-success");
				$("[name=contactPerson]").removeClass("layui-btn-normal");
				$("[name=contactPerson]").addClass("layui-btn-normal");
				$("#btn" + agentPerson[index].uuid).toggleClass("layui-btn-normal");
				$("#btn" + agentPerson[index].uuid).toggleClass("layui-btn-success");
				$("#btn" + agentPerson[index].uuid).html("<i class='layui-icon' style='color:white;'></i>本地区业务联系人");
			}
		}
	})
}
//设为本地联系人按钮
function localContactBtn(data) {
	var value;
	if (data.personNm != localContactNm) {
		value = "<button class='layui-btn layui-btn-sm layui-btn-radius layui-btn-normal " + (readOnlybn ? "layui-btn-disabled" : "") + "' name='contactPerson' onclick='markAsLocalPerson(" + data.LAY_TABLE_INDEX + ")' id='btn" + data.uuid + "'>设为本地区业务联系人</button>";
	} else {
		value = "<button class='layui-btn layui-btn-sm layui-btn-radius layui-btn-success' name='contactPerson' onclick='markAsLocalPerson(" + data.LAY_TABLE_INDEX + ")' id='btn" + data.uuid + "'><i class='layui-icon' style='color:white;'></i>本地区业务联系人</button>";
	}
	return value;
}

function selectTpl(obj) {
	var value;
	if (obj.personNm == localContactNm) {
		value = '<input type="radio" checked name="selectAgent" value="' + obj.personNm + '"/>';
	} else {
		value = '<input type="radio" name="selectAgent" value="' + obj.personNm + '"/>';
	}
	return value;
}
//初始化目录小窗口
function initCata() {
	var width = '85%', height = '18%';
	layer.open({
		type: 1
		, title: '目录'
		, area: ['220px', 'auto']
		, shade: 0
		, offset: [
			height
			, width
		]
		, content: $("#cata")
		, cancel: function (index) {
			$("#cata").hide();
			layer.close(index);
		}
	});
	var cataHeight = Number($("#cata").parent().css("height").split("px")[0]) - 20;
	$("#cata").parent().css({ "overflow": "inherit", "padding-left": "20px", "height": "330px", "background": "#fcfcfc" });
	$("#cata li").css("list-style", "none");
	$("#cata li").each(function (id, row) {
		$(row).hover(function () {
			$(row).css("list-style", "none");
		}, function () {
			$(row).css("list-style", "none");
		})
	})
}
//打开上传文件窗口
function openUploadWindow1(dataType) {
	openUploadWin(orgId, dataType, "01", orgId);
}
var uploadIndex;
//打开上传文件窗口
function openUploadWin(businessId, dataType, categoryId, purchaseReqId) {
	var urlParam = "type=2&businessId=" + businessId + "&dataType=" + dataType + "&categoryId=" + categoryId + "&purchaseReqId=" + purchaseReqId;
	if (businessId == '') {
		urlParam = "type=1&dataType=" + dataType;
	}
	uploadIndex = layer.open({
		title: "上传文件列表",
		type: 2,
		content: contextPath + '/largefile/uploadFile?' + urlParam + "&target=2",
		area: ['635px', '250px']
	})
}
//获取承诺函
function loadAttachBaseFile(businessId) {
	var filedata = { "businessId": businessId };
	$.getJSON(contextPath + "/common/getAttachFilesByBusinessId", filedata, function (result) {
		for (var i = 0; i < result.length; i++) {
			$("#8").find("td").html("");
			var attachFile = result[i];
			var fileSize = (parseFloat(attachFile.fileSize) / 1024).toFixed(3);
			var date = formatTime(attachFile.createTime.time);
			var dataType = attachFile.dataType;
			$("#8").find("td").append("<li id='file_" + attachFile.uuid + "' dataType='" + attachFile.dataType + "'>" +
				"<div><a href='javascript:;' style='color:blue' onclick=\"downloadAttachFile('" + attachFile.uuid + "')\"><b>" + attachFile.fileName + "</b></a>	(<span><em>" + fileSize + "MB</em></span>&nbsp;&nbsp;&nbsp;<span><em>" + date + "</em></span>&nbsp;&nbsp;&nbsp;<span><em>" + attachFile.creatorNm + "</em></span>&nbsp;&nbsp;&nbsp;<span></span>)</div>" +
				"</li>");
			$("#8").parent().parent().prev().find("font").show();
		}
	});
}
function reupload() {
	layer.open({
		title: "提示",
		content: "重新上传承诺函需要您提交给监管部门重新备案，备案通过后才能重新开展政府采购业务，确认重新上传吗？",
		btn: ["确定", "取消"],
		yes: function (index) {
			layer.close(index);
			openUploadWindow1(1);
		}, function(index) {
			layer.close(index);
		}
	})
}
function closeUploadWin() {
	layer.close(uploadIndex);
}
//下载附件
function downloadAttachFile(attachId) {
	window.location.href = contextPath + "/common/downloadAttachFile?attachId=" + attachId;
}
//关闭上传对话框
function uploadWindowClose() {
	openSaveInfo("上传成功...");
	setTimeout("closeUploadWin()", 500);
}
//初始化代理机构已通过业务区域
function initAgentArea() {
	$.ajax({
		url: contextPath + "/basicresource/initAgentArea",
		type: "post",
		success: function (data) {
			if (data.msg == "success") {
				layer.msg("操作成功，当前已通过开展业务区域已初始化，请重新选择需开通业务区域提交监管部门备案，备案通过后才能重新开展政府采购业务！", { icon: 1, time: 1000 });
			}
		}
	})
}
function unique(arr) {
	var hash = [];
	for (var i = 0; i < arr.length; i++) {
		if (hash.indexOf(arr[i]) == -1) {
			hash.push(arr[i]);
		}
	}
	return hash;
}
function showAddr(obj1, obj2, obj3, obj4) {
	index = layer.tips("场所地址：" + obj1 + "<br>场所面积(平方米)：" + obj2 + "<br>对应业务区域：" + obj3, '#' + obj4, {
		maxWidth: 1000,
		tips: [1, '#3595CC']
	});
}
function hideAddr() {
	layer.close(index);
}
function downloadAttachFile(attachId, indxe) {
	window.location.href = contextPath + "/basicresource/downloadAttachFile?uuid=" + attachId + "&index=" + indxe;
}
function openUrl(obj, obj1) {
	var str = "";
	str = '<a onclick="openNewForm(\'' + (obj.split(' ')[0] != undefined ? obj.split(' ')[0] : obj) + '\')" onmouseover="showUrl(\'' + obj + '\',\'' + obj1 + '\')" onmouseout="hideAddr()" id="' + obj1 + 'url" class="layui-btn layui-btn-xs  layui-btn-normal" target="_blank">查看</a>';
	return str;
}
function showUrl(obj, obj1) {
	index = layer.tips(obj, '#' + obj1 + "url", {
		maxWidth: 1000,
		tips: [1, '#3595CC']
	});
}
</script >
	<script type="text/html" id="socseuCode_TL">
		{{# if(d.socsecuCode=='1'){}}
		是
{{# }else{}}
		否
{{# }}}
</script>
	<script type="text/html" id="trainProve_TL">
		{{# if(d.trainProveUrl!=''){}}
<span style="color:#666">    是   </span>
		{{# }else{}}
<span>   <i class="layui-icon" style="color:orange;">?</i> 否   </span>
		{{# }}}
</script>
	<script type="text/html" id="trainProveUrl_TL">
		{{# if(d.trainProveUrl!=''){}}
<a href="http://www.ccgp.gov.cn/oss/download?uuid={{d.trainProveUrl}}" data-toggle="lightbox" class="layui-btn layui-btn-xs  layui-btn-normal" data-lightbox="placeImg">浏览图片</a>
		{{# }else{}}
<span><i class="layui-icon" style="color:orange;">?</i>无相关证明</span>
		{{# }}}
</script>
	<script type="text/html" id="placePic_TL">
		<a href="http://www.ccgp.gov.cn/oss/download?uuid={{d.placePic}}" data-toggle="lightbox" class="layui-btn layui-btn-xs  layui-btn-normal" data-lightbox="placeImg">浏览图片</a>
	</script>
	<script type="text/html" id="videoDevicePic1_TL">
		<a href="http://www.ccgp.gov.cn/oss/download?uuid={{d.videoDevicePic1}}" data-toggle="lightbox" class="layui-btn layui-btn-xs  layui-btn-normal" data-lightbox="placeImg">浏览图片</a>
	</script>
	<script type="text/html" id="videoDevicePic2_TL">
		<a href="http://www.ccgp.gov.cn/oss/download?uuid={{d.videoDevicePic2}}" data-toggle="lightbox" class="layui-btn layui-btn-xs  layui-btn-normal" data-lightbox="placeImg">浏览图片</a>
	</script>
	<script type="text/html" id="xxx_TL">
		{{ localContactBtn(d) }}
	</script>
	<script type="text/html" id="selectTpl">
		{{ selectTpl(d) }}
	</script>
	<script type="text/html" id="placePermission_TL">
		<a onclick="downloadAttachFile('{{d.uuid}}','1')" class="layui-btn layui-btn-xs  layui-btn-normal">下载文件</a>
	</script>
	<script type="text/html" id="videoFile_TL">
		{{ openUrl(d.videoFileLink, d.uuid)}}
</script>
	<script type="text/html" id="writtenPromise_TL">
		<a onclick="downloadAttachFile('{{d.uuid}}','2')" class="layui-btn layui-btn-xs  layui-btn-normal">下载文件</a>
	</script>
	<script type="text/html" id="changeTypeTpl">
		{{# if(d.changeType=='01'){}}
		本地区业务联系人
{{# }else if(d.changeType=='02'){}}
		本地区专职人员
{{# }else if(d.changeType=='03'){}}
		本地区评审场所
{{# }else if(d.changeType=='04'){}}
		录音录像文件网盘链接地址
{{# }else if(d.changeType=='05'){}}
		开、评标场地使用权限证明材料
{{# }else if(d.changeType=='06'){}}
		书面承诺
{{# }}}
</script>
	<script type="text/html" id="areaValueTpl">
		<span onmouseover="showAddr('{{d.placeAddr}}','{{d.placeArea}}','{{d.areaValue}}','{{d.uuid}}')" id="{{d.uuid}}" onmouseout="hideAddr()">{{ d.areaValue }}</span>
	</script>
		</script>
		<script type="text/html" id="barDemo">
	<a class="layui-btn layui-btn-xs 
	{{# if(d.ifDefault==1){ }}
	layui-btn-disabled layui-btn-mr"
	{{# }else{ }}
	layui-btn-normal" lay-event="setDefault"
	{{# } }}
	>设为默认</a>
	<a class="layui-btn "   lay-event="editPerson" style="width:24px;"><i style="font-size:18px;line-height:38px;" class="layui-icon">&#xe642;</i></a>
	<a class="layui-btn layui-btn-danger " lay-event="del" style="width:24px;"><i style="font-size:18px;line-height:38px;" class="layui-icon">&#xe640;</i></a>
</script>
		<script type="text/html" id="indexTpl">
  {{d.LAY_TABLE_INDEX+1}}
</script>

		<!--添加  -->
		<form id="personForm" class="layui-form layui-form-pane">
			<input type="hidden" id="personUuid" name="personUuid" value=''>
			<div class="layui-container" style="width:800px">
				<br>
				<div class="layui-form-item">
					<label class="layui-form-label">开户银行</label>
					<div class="layui-input-block">
						<input name="bankNm" lay-verify="required||baseLength" width="100px" type="text"
							class="layui-input" placeholder="开户银行" />
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">银行账号</label>
					<div class="layui-input-block">
						<input name="bankAccount" lay-verify="required||number||baseLength" type="text"
							class="layui-input" placeholder="银行账号" />
					</div>
				</div>
				<div class="layui-form-item">
					<label class="layui-form-label">开户单位</label>
					<div class="layui-input-block">
						<input name="accountMan" readonly value="湖南恒丰项目管理有限公司" style="color:gray;"
							type="text" class="layui-input" placeholder="开户人" />
					</div>
				</div>
				<div class="layui-form-item" style="text-align: center">
					<span><button type="submit" lay-filter="save" lay-submit class="layui-btn ">保存</button></span>
					<span><button type="button" onclick="resetPersonForm()"
							class="layui-btn layui-btn-danger">清空</button></span>
				</div>
			</div>
		</form>
</body>

</html>
<div id="selectLocalContactDiv" style="display:none">
	<table id="selectLocalContact" />
</div>