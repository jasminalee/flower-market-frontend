

## 新增-更新系统与用户(包含角色信息)


**接口地址**:`/sysUser`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "addr": "",
  "avatar": "",
  "createTime": "",
  "email": "",
  "id": 0,
  "nickname": "",
  "password": "",
  "phone": "",
  "roleId": 0,
  "status": 0,
  "updateTime": "",
  "username": ""
}
```


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|sysUserWithRole|sysUserWithRole|body|true|系统用户信息(包含角色信息)|系统用户信息(包含角色信息)|
|    addr|用户地址||false|string||
|    avatar|用户头像URL||false|string||
|    createTime|创建时间||false|string(date-time)||
|    email|用户邮箱||false|string||
|    id|用户唯一标识||false|integer(int64)||
|    nickname|用户展示昵称||false|string||
|    password|加密存储的密码||false|string||
|    phone|用户联系电话||false|string||
|    roleId|角色ID||false|integer(int64)||
|    status|用户状态（0-禁用，1-正常）||false|integer(int32)||
|    updateTime|更新时间||false|string(date-time)||
|    username|登录用户名||false|string||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResponseResult«boolean»|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||boolean||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": true,
	"message": "",
	"timestamp": 0
}
```



## 通过ID查询用户


**接口地址**:`/sysUser/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResponseResult«系统用户信息»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||系统用户信息|系统用户信息|
|    addr|用户地址|string||
|    avatar|用户头像URL|string||
|    createTime|创建时间|string(date-time)||
|    email|用户邮箱|string||
|    id|用户唯一标识|integer(int64)||
|    nickname|用户展示昵称|string||
|    password|加密存储的密码|string||
|    phone|用户联系电话|string||
|    status|用户状态（0-禁用，1-正常）|integer(int32)||
|    updateTime|更新时间|string(date-time)||
|    username|登录用户名|string||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"addr": "",
		"avatar": "",
		"createTime": "",
		"email": "",
		"id": 0,
		"nickname": "",
		"password": "",
		"phone": "",
		"status": 0,
		"updateTime": "",
		"username": ""
	},
	"message": "",
	"timestamp": 0
}
```