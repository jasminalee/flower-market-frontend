

## 分页查询


**接口地址**:`/comment/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|content|评论内容|query|false|string||
|createTime|创建时间|query|false|string(date-time)||
|current|current|query|false|integer(int64)||
|id|评论ID|query|false|integer(int64)||
|isAnonymous|是否匿名（0-否，1-是）|query|false|integer(int32)||
|orderId|订单ID（逻辑关联order表，可为空，仅对产品评论有效）|query|false|integer(int64)||
|parentId|父评论ID（用于构建评论树，0表示顶级评论）|query|false|integer(int64)||
|rating|评分（1-5分，可为空）|query|false|integer(int32)||
|size|size|query|false|integer(int64)||
|sourceId|来源ID（可以是产品ID、文章ID等）|query|false|integer(int64)||
|sourceType|来源类型（product, article, forum等）|query|false|string||
|status|状态（0-隐藏，1-显示）|query|false|integer(int32)||
|updateTime|更新时间|query|false|string(date-time)||
|userId|用户ID（逻辑关联sys_user表）|query|false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResponseResult«Page«通用评论信息»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||Page«通用评论信息»|Page«通用评论信息»|
|&emsp;&emsp;countId||string||
|&emsp;&emsp;current||integer(int64)||
|&emsp;&emsp;maxLimit||integer(int64)||
|&emsp;&emsp;optimizeCountSql||boolean||
|&emsp;&emsp;orders||array|OrderItem|
|&emsp;&emsp;&emsp;&emsp;asc||boolean||
|&emsp;&emsp;&emsp;&emsp;column||string||
|&emsp;&emsp;pages||integer(int64)||
|&emsp;&emsp;records||array|通用评论信息|
|&emsp;&emsp;&emsp;&emsp;content|评论内容|string||
|&emsp;&emsp;&emsp;&emsp;createTime|创建时间|string||
|&emsp;&emsp;&emsp;&emsp;id|评论ID|integer||
|&emsp;&emsp;&emsp;&emsp;isAnonymous|是否匿名（0-否，1-是）|integer||
|&emsp;&emsp;&emsp;&emsp;orderId|订单ID（逻辑关联order表，可为空，仅对产品评论有效）|integer||
|&emsp;&emsp;&emsp;&emsp;parentId|父评论ID（用于构建评论树，0表示顶级评论）|integer||
|&emsp;&emsp;&emsp;&emsp;rating|评分（1-5分，可为空）|integer||
|&emsp;&emsp;&emsp;&emsp;sourceId|来源ID（可以是产品ID、文章ID等）|integer||
|&emsp;&emsp;&emsp;&emsp;sourceType|来源类型（product, article, forum等）|string||
|&emsp;&emsp;&emsp;&emsp;status|状态（0-隐藏，1-显示）|integer||
|&emsp;&emsp;&emsp;&emsp;updateTime|更新时间|string||
|&emsp;&emsp;&emsp;&emsp;userId|用户ID（逻辑关联sys_user表）|integer||
|&emsp;&emsp;searchCount||boolean||
|&emsp;&emsp;size||integer(int64)||
|&emsp;&emsp;total||integer(int64)||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"countId": "",
		"current": 0,
		"maxLimit": 0,
		"optimizeCountSql": true,
		"orders": [
			{
				"asc": true,
				"column": ""
			}
		],
		"pages": 0,
		"records": [
			{
				"content": "",
				"createTime": "",
				"id": 0,
				"isAnonymous": 0,
				"orderId": 0,
				"parentId": 0,
				"rating": 0,
				"sourceId": 0,
				"sourceType": "",
				"status": 0,
				"updateTime": "",
				"userId": 0
			}
		],
		"searchCount": true,
		"size": 0,
		"total": 0
	},
	"message": "",
	"timestamp": 0
}
```




## 通过主键删除数据


**接口地址**:`/comment/{id}`


**请求方式**:`DELETE`


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
|200|OK|ResponseResult«boolean»|
|204|No Content||
|401|Unauthorized||
|403|Forbidden||


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