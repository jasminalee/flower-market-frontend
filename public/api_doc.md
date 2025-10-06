# API文档


**简介**:API文档


**HOST**:localhost:18091


**联系人**:


**Version**:1.0


**接口路径**:/v2/api-docs


[TOC]






# 支付方式表对象功能接口


## 新增支付方式


**接口地址**:`/paymentMethod`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "accountName": "",
  "accountNumber": "",
  "bankBranch": "",
  "bankName": "",
  "createTime": "",
  "description": "",
  "id": 0,
  "methodCode": "",
  "methodName": "",
  "sort": 0,
  "status": 0,
  "updateTime": "",
  "userId": 0
}
```


**请求参数**:


| 参数名称                  | 参数说明                     | 请求类型 | 是否必须 | 数据类型          | schema       |
| ------------------------- | ---------------------------- | -------- | -------- | ----------------- | ------------ |
| paymentMethod             | paymentMethod                | body     | true     | 支付方式信息      | 支付方式信息 |
| &emsp;&emsp;accountName   | 账户名称                     |          | false    | string            |              |
| &emsp;&emsp;accountNumber | 账户号码/卡号                |          | false    | string            |              |
| &emsp;&emsp;bankBranch    | 开户行                       |          | false    | string            |              |
| &emsp;&emsp;bankName      | 银行名称                     |          | false    | string            |              |
| &emsp;&emsp;createTime    | 创建时间                     |          | false    | string(date-time) |              |
| &emsp;&emsp;description   | 支付方式描述                 |          | false    | string            |              |
| &emsp;&emsp;id            | 支付方式ID                   |          | false    | integer(int64)    |              |
| &emsp;&emsp;methodCode    | 支付方式编码                 |          | false    | string            |              |
| &emsp;&emsp;methodName    | 支付方式名称                 |          | false    | string            |              |
| &emsp;&emsp;sort          | 排序号                       |          | false    | integer(int32)    |              |
| &emsp;&emsp;status        | 状态（0-禁用，1-启用）       |          | false    | integer(int32)    |              |
| &emsp;&emsp;updateTime    | 更新时间                     |          | false    | string(date-time) |              |
| &emsp;&emsp;userId        | 用户ID（逻辑关联sys_user表） |          | false    | integer(int64)    |              |


**响应状态**:


| 状态码 | 说明         | schema                       |
| ------ | ------------ | ---------------------------- |
| 200    | OK           | ResponseResult«支付方式信息» |
| 201    | Created      |                              |
| 401    | Unauthorized |                              |
| 403    | Forbidden    |                              |
| 404    | Not Found    |                              |


**响应参数**:


| 参数名称                  | 参数说明                     | 类型              | schema         |
| ------------------------- | ---------------------------- | ----------------- | -------------- |
| code                      |                              | integer(int32)    | integer(int32) |
| data                      |                              | 支付方式信息      | 支付方式信息   |
| &emsp;&emsp;accountName   | 账户名称                     | string            |                |
| &emsp;&emsp;accountNumber | 账户号码/卡号                | string            |                |
| &emsp;&emsp;bankBranch    | 开户行                       | string            |                |
| &emsp;&emsp;bankName      | 银行名称                     | string            |                |
| &emsp;&emsp;createTime    | 创建时间                     | string(date-time) |                |
| &emsp;&emsp;description   | 支付方式描述                 | string            |                |
| &emsp;&emsp;id            | 支付方式ID                   | integer(int64)    |                |
| &emsp;&emsp;methodCode    | 支付方式编码                 | string            |                |
| &emsp;&emsp;methodName    | 支付方式名称                 | string            |                |
| &emsp;&emsp;sort          | 排序号                       | integer(int32)    |                |
| &emsp;&emsp;status        | 状态（0-禁用，1-启用）       | integer(int32)    |                |
| &emsp;&emsp;updateTime    | 更新时间                     | string(date-time) |                |
| &emsp;&emsp;userId        | 用户ID（逻辑关联sys_user表） | integer(int64)    |                |
| message                   |                              | string            |                |
| timestamp                 |                              | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": {
		"accountName": "",
		"accountNumber": "",
		"bankBranch": "",
		"bankName": "",
		"createTime": "",
		"description": "",
		"id": 0,
		"methodCode": "",
		"methodName": "",
		"sort": 0,
		"status": 0,
		"updateTime": "",
		"userId": 0
	},
	"message": "",
	"timestamp": 0
}
```


## 修改支付方式


**接口地址**:`/paymentMethod`


**请求方式**:`PUT`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "accountName": "",
  "accountNumber": "",
  "bankBranch": "",
  "bankName": "",
  "createTime": "",
  "description": "",
  "id": 0,
  "methodCode": "",
  "methodName": "",
  "sort": 0,
  "status": 0,
  "updateTime": "",
  "userId": 0
}
```


**请求参数**:


| 参数名称                  | 参数说明                     | 请求类型 | 是否必须 | 数据类型          | schema       |
| ------------------------- | ---------------------------- | -------- | -------- | ----------------- | ------------ |
| paymentMethod             | paymentMethod                | body     | true     | 支付方式信息      | 支付方式信息 |
| &emsp;&emsp;accountName   | 账户名称                     |          | false    | string            |              |
| &emsp;&emsp;accountNumber | 账户号码/卡号                |          | false    | string            |              |
| &emsp;&emsp;bankBranch    | 开户行                       |          | false    | string            |              |
| &emsp;&emsp;bankName      | 银行名称                     |          | false    | string            |              |
| &emsp;&emsp;createTime    | 创建时间                     |          | false    | string(date-time) |              |
| &emsp;&emsp;description   | 支付方式描述                 |          | false    | string            |              |
| &emsp;&emsp;id            | 支付方式ID                   |          | false    | integer(int64)    |              |
| &emsp;&emsp;methodCode    | 支付方式编码                 |          | false    | string            |              |
| &emsp;&emsp;methodName    | 支付方式名称                 |          | false    | string            |              |
| &emsp;&emsp;sort          | 排序号                       |          | false    | integer(int32)    |              |
| &emsp;&emsp;status        | 状态（0-禁用，1-启用）       |          | false    | integer(int32)    |              |
| &emsp;&emsp;updateTime    | 更新时间                     |          | false    | string(date-time) |              |
| &emsp;&emsp;userId        | 用户ID（逻辑关联sys_user表） |          | false    | integer(int64)    |              |


**响应状态**:


| 状态码 | 说明         | schema                       |
| ------ | ------------ | ---------------------------- |
| 200    | OK           | ResponseResult«支付方式信息» |
| 201    | Created      |                              |
| 401    | Unauthorized |                              |
| 403    | Forbidden    |                              |
| 404    | Not Found    |                              |


**响应参数**:


| 参数名称                  | 参数说明                     | 类型              | schema         |
| ------------------------- | ---------------------------- | ----------------- | -------------- |
| code                      |                              | integer(int32)    | integer(int32) |
| data                      |                              | 支付方式信息      | 支付方式信息   |
| &emsp;&emsp;accountName   | 账户名称                     | string            |                |
| &emsp;&emsp;accountNumber | 账户号码/卡号                | string            |                |
| &emsp;&emsp;bankBranch    | 开户行                       | string            |                |
| &emsp;&emsp;bankName      | 银行名称                     | string            |                |
| &emsp;&emsp;createTime    | 创建时间                     | string(date-time) |                |
| &emsp;&emsp;description   | 支付方式描述                 | string            |                |
| &emsp;&emsp;id            | 支付方式ID                   | integer(int64)    |                |
| &emsp;&emsp;methodCode    | 支付方式编码                 | string            |                |
| &emsp;&emsp;methodName    | 支付方式名称                 | string            |                |
| &emsp;&emsp;sort          | 排序号                       | integer(int32)    |                |
| &emsp;&emsp;status        | 状态（0-禁用，1-启用）       | integer(int32)    |                |
| &emsp;&emsp;updateTime    | 更新时间                     | string(date-time) |                |
| &emsp;&emsp;userId        | 用户ID（逻辑关联sys_user表） | integer(int64)    |                |
| message                   |                              | string            |                |
| timestamp                 |                              | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": {
		"accountName": "",
		"accountNumber": "",
		"bankBranch": "",
		"bankName": "",
		"createTime": "",
		"description": "",
		"id": 0,
		"methodCode": "",
		"methodName": "",
		"sort": 0,
		"status": 0,
		"updateTime": "",
		"userId": 0
	},
	"message": "",
	"timestamp": 0
}
```


## 查询所有支付方式


**接口地址**:`/paymentMethod/list`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明         | schema                             |
| ------ | ------------ | ---------------------------------- |
| 200    | OK           | ResponseResult«List«支付方式信息»» |
| 401    | Unauthorized |                                    |
| 403    | Forbidden    |                                    |
| 404    | Not Found    |                                    |


**响应参数**:


| 参数名称                  | 参数说明                     | 类型              | schema         |
| ------------------------- | ---------------------------- | ----------------- | -------------- |
| code                      |                              | integer(int32)    | integer(int32) |
| data                      |                              | array             | 支付方式信息   |
| &emsp;&emsp;accountName   | 账户名称                     | string            |                |
| &emsp;&emsp;accountNumber | 账户号码/卡号                | string            |                |
| &emsp;&emsp;bankBranch    | 开户行                       | string            |                |
| &emsp;&emsp;bankName      | 银行名称                     | string            |                |
| &emsp;&emsp;createTime    | 创建时间                     | string(date-time) |                |
| &emsp;&emsp;description   | 支付方式描述                 | string            |                |
| &emsp;&emsp;id            | 支付方式ID                   | integer(int64)    |                |
| &emsp;&emsp;methodCode    | 支付方式编码                 | string            |                |
| &emsp;&emsp;methodName    | 支付方式名称                 | string            |                |
| &emsp;&emsp;sort          | 排序号                       | integer(int32)    |                |
| &emsp;&emsp;status        | 状态（0-禁用，1-启用）       | integer(int32)    |                |
| &emsp;&emsp;updateTime    | 更新时间                     | string(date-time) |                |
| &emsp;&emsp;userId        | 用户ID（逻辑关联sys_user表） | integer(int64)    |                |
| message                   |                              | string            |                |
| timestamp                 |                              | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": [
		{
			"accountName": "",
			"accountNumber": "",
			"bankBranch": "",
			"bankName": "",
			"createTime": "",
			"description": "",
			"id": 0,
			"methodCode": "",
			"methodName": "",
			"sort": 0,
			"status": 0,
			"updateTime": "",
			"userId": 0
		}
	],
	"message": "",
	"timestamp": 0
}
```


## 分页查询


**接口地址**:`/paymentMethod/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明                     | 请求类型 | 是否必须 | 数据类型          | schema |
| ------------- | ---------------------------- | -------- | -------- | ----------------- | ------ |
| methodCode    | 支付方式编码                 | query    | true     | string            |        |
| methodName    | 支付方式名称                 | query    | true     | string            |        |
| status        | 状态（0-禁用，1-启用）       | query    | true     | integer(int32)    |        |
| userId        | 用户ID（逻辑关联sys_user表） | query    | true     | integer(int64)    |        |
| accountName   | 账户名称                     | query    | false    | string            |        |
| accountNumber | 账户号码/卡号                | query    | false    | string            |        |
| bankBranch    | 开户行                       | query    | false    | string            |        |
| bankName      | 银行名称                     | query    | false    | string            |        |
| createTime    | 创建时间                     | query    | false    | string(date-time) |        |
| current       | 页码                         | query    | false    | integer(int64)    |        |
| description   | 支付方式描述                 | query    | false    | string            |        |
| id            | 支付方式ID                   | query    | false    | integer(int64)    |        |
| size          | 每页数量                     | query    | false    | integer(int64)    |        |
| sort          | 排序号                       | query    | false    | integer(int32)    |        |
| updateTime    | 更新时间                     | query    | false    | string(date-time) |        |


**响应状态**:


| 状态码 | 说明         | schema                             |
| ------ | ------------ | ---------------------------------- |
| 200    | OK           | ResponseResult«Page«支付方式信息»» |
| 401    | Unauthorized |                                    |
| 403    | Forbidden    |                                    |
| 404    | Not Found    |                                    |


**响应参数**:


| 参数名称                              | 参数说明                     | 类型               | schema             |
| ------------------------------------- | ---------------------------- | ------------------ | ------------------ |
| code                                  |                              | integer(int32)     | integer(int32)     |
| data                                  |                              | Page«支付方式信息» | Page«支付方式信息» |
| &emsp;&emsp;countId                   |                              | string             |                    |
| &emsp;&emsp;current                   |                              | integer(int64)     |                    |
| &emsp;&emsp;maxLimit                  |                              | integer(int64)     |                    |
| &emsp;&emsp;optimizeCountSql          |                              | boolean            |                    |
| &emsp;&emsp;orders                    |                              | array              | OrderItem          |
| &emsp;&emsp;&emsp;&emsp;asc           |                              | boolean            |                    |
| &emsp;&emsp;&emsp;&emsp;column        |                              | string             |                    |
| &emsp;&emsp;pages                     |                              | integer(int64)     |                    |
| &emsp;&emsp;records                   |                              | array              | 支付方式信息       |
| &emsp;&emsp;&emsp;&emsp;accountName   | 账户名称                     | string             |                    |
| &emsp;&emsp;&emsp;&emsp;accountNumber | 账户号码/卡号                | string             |                    |
| &emsp;&emsp;&emsp;&emsp;bankBranch    | 开户行                       | string             |                    |
| &emsp;&emsp;&emsp;&emsp;bankName      | 银行名称                     | string             |                    |
| &emsp;&emsp;&emsp;&emsp;createTime    | 创建时间                     | string             |                    |
| &emsp;&emsp;&emsp;&emsp;description   | 支付方式描述                 | string             |                    |
| &emsp;&emsp;&emsp;&emsp;id            | 支付方式ID                   | integer            |                    |
| &emsp;&emsp;&emsp;&emsp;methodCode    | 支付方式编码                 | string             |                    |
| &emsp;&emsp;&emsp;&emsp;methodName    | 支付方式名称                 | string             |                    |
| &emsp;&emsp;&emsp;&emsp;sort          | 排序号                       | integer            |                    |
| &emsp;&emsp;&emsp;&emsp;status        | 状态（0-禁用，1-启用）       | integer            |                    |
| &emsp;&emsp;&emsp;&emsp;updateTime    | 更新时间                     | string             |                    |
| &emsp;&emsp;&emsp;&emsp;userId        | 用户ID（逻辑关联sys_user表） | integer            |                    |
| &emsp;&emsp;searchCount               |                              | boolean            |                    |
| &emsp;&emsp;size                      |                              | integer(int64)     |                    |
| &emsp;&emsp;total                     |                              | integer(int64)     |                    |
| message                               |                              | string             |                    |
| timestamp                             |                              | integer(int64)     | integer(int64)     |


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
				"accountName": "",
				"accountNumber": "",
				"bankBranch": "",
				"bankName": "",
				"createTime": "",
				"description": "",
				"id": 0,
				"methodCode": "",
				"methodName": "",
				"sort": 0,
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


## 根据用户ID查询支付方式


**接口地址**:`/paymentMethod/user/{userId}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型       | schema |
| -------- | -------- | -------- | -------- | -------------- | ------ |
| userId   | userId   | path     | true     | integer(int64) |        |


**响应状态**:


| 状态码 | 说明         | schema                             |
| ------ | ------------ | ---------------------------------- |
| 200    | OK           | ResponseResult«List«支付方式信息»» |
| 401    | Unauthorized |                                    |
| 403    | Forbidden    |                                    |
| 404    | Not Found    |                                    |


**响应参数**:


| 参数名称                  | 参数说明                     | 类型              | schema         |
| ------------------------- | ---------------------------- | ----------------- | -------------- |
| code                      |                              | integer(int32)    | integer(int32) |
| data                      |                              | array             | 支付方式信息   |
| &emsp;&emsp;accountName   | 账户名称                     | string            |                |
| &emsp;&emsp;accountNumber | 账户号码/卡号                | string            |                |
| &emsp;&emsp;bankBranch    | 开户行                       | string            |                |
| &emsp;&emsp;bankName      | 银行名称                     | string            |                |
| &emsp;&emsp;createTime    | 创建时间                     | string(date-time) |                |
| &emsp;&emsp;description   | 支付方式描述                 | string            |                |
| &emsp;&emsp;id            | 支付方式ID                   | integer(int64)    |                |
| &emsp;&emsp;methodCode    | 支付方式编码                 | string            |                |
| &emsp;&emsp;methodName    | 支付方式名称                 | string            |                |
| &emsp;&emsp;sort          | 排序号                       | integer(int32)    |                |
| &emsp;&emsp;status        | 状态（0-禁用，1-启用）       | integer(int32)    |                |
| &emsp;&emsp;updateTime    | 更新时间                     | string(date-time) |                |
| &emsp;&emsp;userId        | 用户ID（逻辑关联sys_user表） | integer(int64)    |                |
| message                   |                              | string            |                |
| timestamp                 |                              | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": [
		{
			"accountName": "",
			"accountNumber": "",
			"bankBranch": "",
			"bankName": "",
			"createTime": "",
			"description": "",
			"id": 0,
			"methodCode": "",
			"methodName": "",
			"sort": 0,
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


**接口地址**:`/paymentMethod/{id}`


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
| 200    | OK           | ResponseResult«支付方式信息» |
| 401    | Unauthorized |                              |
| 403    | Forbidden    |                              |
| 404    | Not Found    |                              |


**响应参数**:


| 参数名称                  | 参数说明                     | 类型              | schema         |
| ------------------------- | ---------------------------- | ----------------- | -------------- |
| code                      |                              | integer(int32)    | integer(int32) |
| data                      |                              | 支付方式信息      | 支付方式信息   |
| &emsp;&emsp;accountName   | 账户名称                     | string            |                |
| &emsp;&emsp;accountNumber | 账户号码/卡号                | string            |                |
| &emsp;&emsp;bankBranch    | 开户行                       | string            |                |
| &emsp;&emsp;bankName      | 银行名称                     | string            |                |
| &emsp;&emsp;createTime    | 创建时间                     | string(date-time) |                |
| &emsp;&emsp;description   | 支付方式描述                 | string            |                |
| &emsp;&emsp;id            | 支付方式ID                   | integer(int64)    |                |
| &emsp;&emsp;methodCode    | 支付方式编码                 | string            |                |
| &emsp;&emsp;methodName    | 支付方式名称                 | string            |                |
| &emsp;&emsp;sort          | 排序号                       | integer(int32)    |                |
| &emsp;&emsp;status        | 状态（0-禁用，1-启用）       | integer(int32)    |                |
| &emsp;&emsp;updateTime    | 更新时间                     | string(date-time) |                |
| &emsp;&emsp;userId        | 用户ID（逻辑关联sys_user表） | integer(int64)    |                |
| message                   |                              | string            |                |
| timestamp                 |                              | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": {
		"accountName": "",
		"accountNumber": "",
		"bankBranch": "",
		"bankName": "",
		"createTime": "",
		"description": "",
		"id": 0,
		"methodCode": "",
		"methodName": "",
		"sort": 0,
		"status": 0,
		"updateTime": "",
		"userId": 0
	},
	"message": "",
	"timestamp": 0
}
```


## 删除支付方式


**接口地址**:`/paymentMethod/{id}`


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

