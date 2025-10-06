# API文档


**简介**:API文档


**HOST**:localhost:18091


**联系人**:


**Version**:1.0


**接口路径**:/v2/api-docs


[TOC]






# 通用评论表对象功能接口


## 新增-更新数据


**接口地址**:`/comment`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
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
```


**请求参数**:


| 参数名称                | 参数说明                                            | 请求类型 | 是否必须 | 数据类型          | schema       |
| ----------------------- | --------------------------------------------------- | -------- | -------- | ----------------- | ------------ |
| comment                 | comment                                             | body     | true     | 通用评论信息      | 通用评论信息 |
|     content     | 评论内容                                            |          | false    | string            |              |
|     createTime  | 创建时间                                            |          | false    | string(date-time) |              |
|     id          | 评论ID                                              |          | false    | integer(int64)    |              |
|     isAnonymous | 是否匿名（0-否，1-是）                              |          | false    | integer(int32)    |              |
|     orderId     | 订单ID（逻辑关联order表，可为空，仅对产品评论有效） |          | false    | integer(int64)    |              |
|     parentId    | 父评论ID（用于构建评论树，0表示顶级评论）           |          | false    | integer(int64)    |              |
|     rating      | 评分（1-5分，可为空）                               |          | false    | integer(int32)    |              |
|     sourceId    | 来源ID（可以是产品ID、文章ID等）                    |          | false    | integer(int64)    |              |
|     sourceType  | 来源类型（product, article, forum等）               |          | false    | string            |              |
|     status      | 状态（0-隐藏，1-显示）                              |          | false    | integer(int32)    |              |
|     updateTime  | 更新时间                                            |          | false    | string(date-time) |              |
|     userId      | 用户ID（逻辑关联sys_user表）                        |          | false    | integer(int64)    |              |


**响应状态**:


| 状态码 | 说明         | schema                  |
| ------ | ------------ | ----------------------- |
| 200    | OK           | ResponseResult«boolean» |
| 201    | Created      |                         |
| 401    | Unauthorized |                         |
| 403    | Forbidden    |                         |
| 404    | Not Found    |                         |


**响应参数**:


| 参数名称  | 参数说明 | 类型           | schema         |
| --------- | -------- | -------------- | -------------- |
| code      |          | integer(int32) | integer(int32) |
| data      |          | boolean        |                |
| message   |          | string         |                |
| timestamp |          | integer(int64) | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": true,
	"message": "",
	"timestamp": 0
}
```


## 分页查询


**接口地址**:`/comment/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称    | 参数说明                                            | 请求类型 | 是否必须 | 数据类型          | schema |
| ----------- | --------------------------------------------------- | -------- | -------- | ----------------- | ------ |
| content     | 评论内容                                            | query    | false    | string            |        |
| createTime  | 创建时间                                            | query    | false    | string(date-time) |        |
| current     | current                                             | query    | false    | integer(int64)    |        |
| id          | 评论ID                                              | query    | false    | integer(int64)    |        |
| isAnonymous | 是否匿名（0-否，1-是）                              | query    | false    | integer(int32)    |        |
| orderId     | 订单ID（逻辑关联order表，可为空，仅对产品评论有效） | query    | false    | integer(int64)    |        |
| parentId    | 父评论ID（用于构建评论树，0表示顶级评论）           | query    | false    | integer(int64)    |        |
| rating      | 评分（1-5分，可为空）                               | query    | false    | integer(int32)    |        |
| size        | size                                                | query    | false    | integer(int64)    |        |
| sourceId    | 来源ID（可以是产品ID、文章ID等）                    | query    | false    | integer(int64)    |        |
| sourceType  | 来源类型（product, article, forum等）               | query    | false    | string            |        |
| status      | 状态（0-隐藏，1-显示）                              | query    | false    | integer(int32)    |        |
| updateTime  | 更新时间                                            | query    | false    | string(date-time) |        |
| userId      | 用户ID（逻辑关联sys_user表）                        | query    | false    | integer(int64)    |        |


**响应状态**:


| 状态码 | 说明         | schema                             |
| ------ | ------------ | ---------------------------------- |
| 200    | OK           | ResponseResult«Page«通用评论信息»» |
| 401    | Unauthorized |                                    |
| 403    | Forbidden    |                                    |
| 404    | Not Found    |                                    |


**响应参数**:


| 参数名称                            | 参数说明                                            | 类型               | schema             |
| ----------------------------------- | --------------------------------------------------- | ------------------ | ------------------ |
| code                                |                                                     | integer(int32)     | integer(int32)     |
| data                                |                                                     | Page«通用评论信息» | Page«通用评论信息» |
|     countId                 |                                                     | string             |                    |
|     current                 |                                                     | integer(int64)     |                    |
|     maxLimit                |                                                     | integer(int64)     |                    |
|     optimizeCountSql        |                                                     | boolean            |                    |
|     orders                  |                                                     | array              | OrderItem          |
|         asc         |                                                     | boolean            |                    |
|         column      |                                                     | string             |                    |
|     pages                   |                                                     | integer(int64)     |                    |
|     records                 |                                                     | array              | 通用评论信息       |
|         content     | 评论内容                                            | string             |                    |
|         createTime  | 创建时间                                            | string             |                    |
|         id          | 评论ID                                              | integer            |                    |
|         isAnonymous | 是否匿名（0-否，1-是）                              | integer            |                    |
|         orderId     | 订单ID（逻辑关联order表，可为空，仅对产品评论有效） | integer            |                    |
|         parentId    | 父评论ID（用于构建评论树，0表示顶级评论）           | integer            |                    |
|         rating      | 评分（1-5分，可为空）                               | integer            |                    |
|         sourceId    | 来源ID（可以是产品ID、文章ID等）                    | integer            |                    |
|         sourceType  | 来源类型（product, article, forum等）               | string             |                    |
|         status      | 状态（0-隐藏，1-显示）                              | integer            |                    |
|         updateTime  | 更新时间                                            | string             |                    |
|         userId      | 用户ID（逻辑关联sys_user表）                        | integer            |                    |
|     searchCount             |                                                     | boolean            |                    |
|     size                    |                                                     | integer(int64)     |                    |
|     total                   |                                                     | integer(int64)     |                    |
| message                             |                                                     | string             |                    |
| timestamp                           |                                                     | integer(int64)     | integer(int64)     |


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


## 根据来源ID和类型查询评论列表


**接口地址**:`/comment/source`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称   | 参数说明   | 请求类型 | 是否必须 | 数据类型       | schema |
| ---------- | ---------- | -------- | -------- | -------------- | ------ |
| sourceId   | sourceId   | query    | true     | integer(int64) |        |
| sourceType | sourceType | query    | true     | string         |        |
| parentId   | parentId   | query    | false    | integer(int64) |        |


**响应状态**:


| 状态码 | 说明         | schema                             |
| ------ | ------------ | ---------------------------------- |
| 200    | OK           | ResponseResult«List«通用评论信息»» |
| 401    | Unauthorized |                                    |
| 403    | Forbidden    |                                    |
| 404    | Not Found    |                                    |


**响应参数**:


| 参数名称                | 参数说明                                            | 类型              | schema         |
| ----------------------- | --------------------------------------------------- | ----------------- | -------------- |
| code                    |                                                     | integer(int32)    | integer(int32) |
| data                    |                                                     | array             | 通用评论信息   |
|     content     | 评论内容                                            | string            |                |
|     createTime  | 创建时间                                            | string(date-time) |                |
|     id          | 评论ID                                              | integer(int64)    |                |
|     isAnonymous | 是否匿名（0-否，1-是）                              | integer(int32)    |                |
|     orderId     | 订单ID（逻辑关联order表，可为空，仅对产品评论有效） | integer(int64)    |                |
|     parentId    | 父评论ID（用于构建评论树，0表示顶级评论）           | integer(int64)    |                |
|     rating      | 评分（1-5分，可为空）                               | integer(int32)    |                |
|     sourceId    | 来源ID（可以是产品ID、文章ID等）                    | integer(int64)    |                |
|     sourceType  | 来源类型（product, article, forum等）               | string            |                |
|     status      | 状态（0-隐藏，1-显示）                              | integer(int32)    |                |
|     updateTime  | 更新时间                                            | string(date-time) |                |
|     userId      | 用户ID（逻辑关联sys_user表）                        | integer(int64)    |                |
| message                 |                                                     | string            |                |
| timestamp               |                                                     | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": [
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
	"message": "",
	"timestamp": 0
}
```


## 通过ID查询单条数据


**接口地址**:`/comment/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型       | schema |
| -------- | -------- | -------- | -------- | -------------- | ------ |
| id       | id       | path     | true     | integer(int64) |        |


**响应状态**:


| 状态码 | 说明         | schema                       |
| ------ | ------------ | ---------------------------- |
| 200    | OK           | ResponseResult«通用评论信息» |
| 401    | Unauthorized |                              |
| 403    | Forbidden    |                              |
| 404    | Not Found    |                              |


**响应参数**:


| 参数名称                | 参数说明                                            | 类型              | schema         |
| ----------------------- | --------------------------------------------------- | ----------------- | -------------- |
| code                    |                                                     | integer(int32)    | integer(int32) |
| data                    |                                                     | 通用评论信息      | 通用评论信息   |
|     content     | 评论内容                                            | string            |                |
|     createTime  | 创建时间                                            | string(date-time) |                |
|     id          | 评论ID                                              | integer(int64)    |                |
|     isAnonymous | 是否匿名（0-否，1-是）                              | integer(int32)    |                |
|     orderId     | 订单ID（逻辑关联order表，可为空，仅对产品评论有效） | integer(int64)    |                |
|     parentId    | 父评论ID（用于构建评论树，0表示顶级评论）           | integer(int64)    |                |
|     rating      | 评分（1-5分，可为空）                               | integer(int32)    |                |
|     sourceId    | 来源ID（可以是产品ID、文章ID等）                    | integer(int64)    |                |
|     sourceType  | 来源类型（product, article, forum等）               | string            |                |
|     status      | 状态（0-隐藏，1-显示）                              | integer(int32)    |                |
|     updateTime  | 更新时间                                            | string(date-time) |                |
|     userId      | 用户ID（逻辑关联sys_user表）                        | integer(int64)    |                |
| message                 |                                                     | string            |                |
| timestamp               |                                                     | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": {
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


| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型       | schema |
| -------- | -------- | -------- | -------- | -------------- | ------ |
| id       | id       | path     | true     | integer(int64) |        |


**响应状态**:


| 状态码 | 说明         | schema                  |
| ------ | ------------ | ----------------------- |
| 200    | OK           | ResponseResult«boolean» |
| 204    | No Content   |                         |
| 401    | Unauthorized |                         |
| 403    | Forbidden    |                         |


**响应参数**:


| 参数名称  | 参数说明 | 类型           | schema         |
| --------- | -------- | -------------- | -------------- |
| code      |          | integer(int32) | integer(int32) |
| data      |          | boolean        |                |
| message   |          | string         |                |
| timestamp |          | integer(int64) | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": true,
	"message": "",
	"timestamp": 0
}
```