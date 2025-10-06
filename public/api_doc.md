# API文档


**简介**:API文档


**HOST**:localhost:18091


**联系人**:


**Version**:1.0


**接口路径**:/v2/api-docs


[TOC]






# 收货信息表对象功能接口


## 新增-更新数据


**接口地址**:`/receiverAddress`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "city": "",
  "createTime": "",
  "detailAddress": "",
  "district": "",
  "id": 0,
  "isDefault": 0,
  "postalCode": "",
  "province": "",
  "receiverName": "",
  "receiverPhone": "",
  "updateTime": "",
  "userId": 0
}
```


**请求参数**:


| 参数名称                  | 参数说明                     | 请求类型 | 是否必须 | 数据类型          | schema   |
| ------------------------- | ---------------------------- | -------- | -------- | ----------------- | -------- |
| receiverAddress           | receiverAddress              | body     | true     | 收货信息          | 收货信息 |
| city          | 城市                         |          | false    | string            |          |
| createTime    | 创建时间                     |          | false    | string(date-time) |          |
| detailAddress | 详细地址                     |          | false    | string            |          |
| district      | 区/县                        |          | false    | string            |          |
| id            | 地址ID                       |          | false    | integer(int64)    |          |
| isDefault     | 是否默认地址（0-否，1-是）   |          | false    | integer(int32)    |          |
| postalCode    | 邮政编码                     |          | false    | string            |          |
| province      | 省份                         |          | false    | string            |          |
| receiverName  | 收货人姓名                   |          | false    | string            |          |
| receiverPhone | 收货人电话                   |          | false    | string            |          |
| updateTime    | 更新时间                     |          | false    | string(date-time) |          |
| userId        | 用户ID（逻辑关联sys_user表） |          | false    | integer(int64)    |          |


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


## 列表查询


**接口地址**:`/receiverAddress/list`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明                     | 请求类型 | 是否必须 | 数据类型          | schema |
| ------------- | ---------------------------- | -------- | -------- | ----------------- | ------ |
| city          | 城市                         | query    | true     | string            |        |
| detailAddress | 详细地址                     | query    | true     | string            |        |
| isDefault     | 是否默认地址（0-否，1-是）   | query    | true     | integer(int32)    |        |
| province      | 省份                         | query    | true     | string            |        |
| receiverName  | 收货人姓名                   | query    | true     | string            |        |
| receiverPhone | 收货人电话                   | query    | true     | string            |        |
| userId        | 用户ID（逻辑关联sys_user表） | query    | true     | integer(int64)    |        |
| createTime    | 创建时间                     | query    | false    | string(date-time) |        |
| district      | 区/县                        | query    | false    | string            |        |
| id            | 地址ID                       | query    | false    | integer(int64)    |        |
| postalCode    | 邮政编码                     | query    | false    | string            |        |
| updateTime    | 更新时间                     | query    | false    | string(date-time) |        |


**响应状态**:


| 状态码 | 说明         | schema                         |
| ------ | ------------ | ------------------------------ |
| 200    | OK           | ResponseResult«List«收货信息»» |
| 401    | Unauthorized |                                |
| 403    | Forbidden    |                                |
| 404    | Not Found    |                                |


**响应参数**:


| 参数名称                  | 参数说明                     | 类型              | schema         |
| ------------------------- | ---------------------------- | ----------------- | -------------- |
| code                      |                              | integer(int32)    | integer(int32) |
| data                      |                              | array             | 收货信息       |
| city          | 城市                         | string            |                |
| createTime    | 创建时间                     | string(date-time) |                |
| detailAddress | 详细地址                     | string            |                |
| district      | 区/县                        | string            |                |
| id            | 地址ID                       | integer(int64)    |                |
| isDefault     | 是否默认地址（0-否，1-是）   | integer(int32)    |                |
| postalCode    | 邮政编码                     | string            |                |
| province      | 省份                         | string            |                |
| receiverName  | 收货人姓名                   | string            |                |
| receiverPhone | 收货人电话                   | string            |                |
| updateTime    | 更新时间                     | string(date-time) |                |
| userId        | 用户ID（逻辑关联sys_user表） | integer(int64)    |                |
| message                   |                              | string            |                |
| timestamp                 |                              | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": [
		{
			"city": "",
			"createTime": "",
			"detailAddress": "",
			"district": "",
			"id": 0,
			"isDefault": 0,
			"postalCode": "",
			"province": "",
			"receiverName": "",
			"receiverPhone": "",
			"updateTime": "",
			"userId": 0
		}
	],
	"message": "",
	"timestamp": 0
}
```


## 根据用户ID查询收货地址列表


**接口地址**:`/receiverAddress/listByUserId`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型       | schema |
| -------- | -------- | -------- | -------- | -------------- | ------ |
| userId   | 用户ID   | query    | true     | integer(int64) |        |


**响应状态**:


| 状态码 | 说明         | schema                         |
| ------ | ------------ | ------------------------------ |
| 200    | OK           | ResponseResult«List«收货信息»» |
| 401    | Unauthorized |                                |
| 403    | Forbidden    |                                |
| 404    | Not Found    |                                |


**响应参数**:


| 参数名称                  | 参数说明                     | 类型              | schema         |
| ------------------------- | ---------------------------- | ----------------- | -------------- |
| code                      |                              | integer(int32)    | integer(int32) |
| data                      |                              | array             | 收货信息       |
| city          | 城市                         | string            |                |
| createTime    | 创建时间                     | string(date-time) |                |
| detailAddress | 详细地址                     | string            |                |
| district      | 区/县                        | string            |                |
| id            | 地址ID                       | integer(int64)    |                |
| isDefault     | 是否默认地址（0-否，1-是）   | integer(int32)    |                |
| postalCode    | 邮政编码                     | string            |                |
| province      | 省份                         | string            |                |
| receiverName  | 收货人姓名                   | string            |                |
| receiverPhone | 收货人电话                   | string            |                |
| updateTime    | 更新时间                     | string(date-time) |                |
| userId        | 用户ID（逻辑关联sys_user表） | integer(int64)    |                |
| message                   |                              | string            |                |
| timestamp                 |                              | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": [
		{
			"city": "",
			"createTime": "",
			"detailAddress": "",
			"district": "",
			"id": 0,
			"isDefault": 0,
			"postalCode": "",
			"province": "",
			"receiverName": "",
			"receiverPhone": "",
			"updateTime": "",
			"userId": 0
		}
	],
	"message": "",
	"timestamp": 0
}
```


## 分页查询


**接口地址**:`/receiverAddress/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明                     | 请求类型 | 是否必须 | 数据类型          | schema |
| ------------- | ---------------------------- | -------- | -------- | ----------------- | ------ |
| city          | 城市                         | query    | true     | string            |        |
| detailAddress | 详细地址                     | query    | true     | string            |        |
| isDefault     | 是否默认地址（0-否，1-是）   | query    | true     | integer(int32)    |        |
| province      | 省份                         | query    | true     | string            |        |
| receiverName  | 收货人姓名                   | query    | true     | string            |        |
| receiverPhone | 收货人电话                   | query    | true     | string            |        |
| userId        | 用户ID（逻辑关联sys_user表） | query    | true     | integer(int64)    |        |
| createTime    | 创建时间                     | query    | false    | string(date-time) |        |
| current       | 页码                         | query    | false    | integer(int64)    |        |
| district      | 区/县                        | query    | false    | string            |        |
| id            | 地址ID                       | query    | false    | integer(int64)    |        |
| postalCode    | 邮政编码                     | query    | false    | string            |        |
| size          | 每页数量                     | query    | false    | integer(int64)    |        |
| updateTime    | 更新时间                     | query    | false    | string(date-time) |        |


**响应状态**:


| 状态码 | 说明         | schema                         |
| ------ | ------------ | ------------------------------ |
| 200    | OK           | ResponseResult«Page«收货信息»» |
| 401    | Unauthorized |                                |
| 403    | Forbidden    |                                |
| 404    | Not Found    |                                |


**响应参数**:


| 参数名称                              | 参数说明                     | 类型           | schema         |
| ------------------------------------- | ---------------------------- | -------------- | -------------- |
| code                                  |                              | integer(int32) | integer(int32) |
| data                                  |                              | Page«收货信息» | Page«收货信息» |
| countId                   |                              | string         |                |
| current                   |                              | integer(int64) |                |
| maxLimit                  |                              | integer(int64) |                |
| optimizeCountSql          |                              | boolean        |                |
| orders                    |                              | array          | OrderItem      |
| asc           |                              | boolean        |                |
| column        |                              | string         |                |
| pages                     |                              | integer(int64) |                |
| records                   |                              | array          | 收货信息       |
| city          | 城市                         | string         |                |
| createTime    | 创建时间                     | string         |                |
| detailAddress | 详细地址                     | string         |                |
| district      | 区/县                        | string         |                |
| id            | 地址ID                       | integer        |                |
| isDefault     | 是否默认地址（0-否，1-是）   | integer        |                |
| postalCode    | 邮政编码                     | string         |                |
| province      | 省份                         | string         |                |
| receiverName  | 收货人姓名                   | string         |                |
| receiverPhone | 收货人电话                   | string         |                |
| updateTime    | 更新时间                     | string         |                |
| userId        | 用户ID（逻辑关联sys_user表） | integer        |                |
| searchCount               |                              | boolean        |                |
| size                      |                              | integer(int64) |                |
| total                     |                              | integer(int64) |                |
| message                               |                              | string         |                |
| timestamp                             |                              | integer(int64) | integer(int64) |


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
				"city": "",
				"createTime": "",
				"detailAddress": "",
				"district": "",
				"id": 0,
				"isDefault": 0,
				"postalCode": "",
				"province": "",
				"receiverName": "",
				"receiverPhone": "",
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


## 通过ID查询单条数据


**接口地址**:`/receiverAddress/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型       | schema |
| -------- | -------- | -------- | -------- | -------------- | ------ |
| id       | 地址ID   | path     | true     | integer(int64) |        |


**响应状态**:


| 状态码 | 说明         | schema                   |
| ------ | ------------ | ------------------------ |
| 200    | OK           | ResponseResult«收货信息» |
| 401    | Unauthorized |                          |
| 403    | Forbidden    |                          |
| 404    | Not Found    |                          |


**响应参数**:


| 参数名称                  | 参数说明                     | 类型              | schema         |
| ------------------------- | ---------------------------- | ----------------- | -------------- |
| code                      |                              | integer(int32)    | integer(int32) |
| data                      |                              | 收货信息          | 收货信息       |
| city          | 城市                         | string            |                |
| createTime    | 创建时间                     | string(date-time) |                |
| detailAddress | 详细地址                     | string            |                |
| district      | 区/县                        | string            |                |
| id            | 地址ID                       | integer(int64)    |                |
| isDefault     | 是否默认地址（0-否，1-是）   | integer(int32)    |                |
| postalCode    | 邮政编码                     | string            |                |
| province      | 省份                         | string            |                |
| receiverName  | 收货人姓名                   | string            |                |
| receiverPhone | 收货人电话                   | string            |                |
| updateTime    | 更新时间                     | string(date-time) |                |
| userId        | 用户ID（逻辑关联sys_user表） | integer(int64)    |                |
| message                   |                              | string            |                |
| timestamp                 |                              | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": {
		"city": "",
		"createTime": "",
		"detailAddress": "",
		"district": "",
		"id": 0,
		"isDefault": 0,
		"postalCode": "",
		"province": "",
		"receiverName": "",
		"receiverPhone": "",
		"updateTime": "",
		"userId": 0
	},
	"message": "",
	"timestamp": 0
}
```


## 通过主键删除数据


**接口地址**:`/receiverAddress/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型       | schema |
| -------- | -------- | -------- | -------- | -------------- | ------ |
| id       | 地址ID   | path     | true     | integer(int64) |        |


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


# 订单表对象功能接口


## 新增-更新数据


**接口地址**:`/order`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "createTime": "",
  "deliveryTime": "",
  "discountAmount": 0,
  "id": 0,
  "merchantId": 0,
  "orderNo": "",
  "payAmount": 0,
  "paymentMethod": 0,
  "paymentTime": "",
  "receiveTime": "",
  "receiverAddress": "",
  "receiverName": "",
  "receiverPhone": "",
  "remark": "",
  "status": 0,
  "totalAmount": 0,
  "updateTime": "",
  "userId": 0
}
```


**请求参数**:


| 参数名称                    | 参数说明                                                     | 请求类型 | 是否必须 | 数据类型          | schema   |
| --------------------------- | ------------------------------------------------------------ | -------- | -------- | ----------------- | -------- |
| order                       | order                                                        | body     | true     | 订单信息          | 订单信息 |
| createTime      | 创建时间                                                     |          | false    | string(date-time) |          |
| deliveryTime    | 发货时间                                                     |          | false    | string(date-time) |          |
| discountAmount  | 优惠金额                                                     |          | false    | number            |          |
| id              | 订单ID                                                       |          | false    | integer(int64)    |          |
| merchantId      | 商户ID（逻辑关联sys_user表）                                 |          | false    | integer(int64)    |          |
| orderNo         | 订单编号                                                     |          | false    | string            |          |
| payAmount       | 实际支付金额                                                 |          | false    | number            |          |
| paymentMethod   | 支付方式（1-支付宝，2-微信，3-银行卡）                       |          | false    | integer(int32)    |          |
| paymentTime     | 支付时间                                                     |          | false    | string(date-time) |          |
| receiveTime     | 收货时间                                                     |          | false    | string(date-time) |          |
| receiverAddress | 收货地址                                                     |          | false    | string            |          |
| receiverName    | 收货人姓名                                                   |          | false    | string            |          |
| receiverPhone   | 收货人电话                                                   |          | false    | string            |          |
| remark          | 订单备注                                                     |          | false    | string            |          |
| status          | 订单状态（1-待付款，2-已付款，3-已发货，4-已完成，5-已取消，6-退款中，7-已退款） |          | false    | integer(int32)    |          |
| totalAmount     | 订单总金额                                                   |          | false    | number            |          |
| updateTime      | 更新时间                                                     |          | false    | string(date-time) |          |
| userId          | 用户ID（逻辑关联sys_user表）                                 |          | false    | integer(int64)    |          |


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


## 直接购买生成订单


**接口地址**:`/order/createOrderFromDirectPurchase`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称          | 参数说明   | 请求类型 | 是否必须 | 数据类型       | schema |
| ----------------- | ---------- | -------- | -------- | -------------- | ------ |
| merchantProductId | 商户产品ID | query    | true     | integer(int64) |        |
| quantity          | 购买数量   | query    | true     | integer(int32) |        |
| receiverAddressId | 收货信息ID | query    | true     | integer(int64) |        |
| userId            | 用户ID     | query    | true     | integer(int64) |        |


**响应状态**:


| 状态码 | 说明         | schema                   |
| ------ | ------------ | ------------------------ |
| 200    | OK           | ResponseResult«订单信息» |
| 201    | Created      |                          |
| 401    | Unauthorized |                          |
| 403    | Forbidden    |                          |
| 404    | Not Found    |                          |


**响应参数**:


| 参数名称                    | 参数说明                                                     | 类型              | schema         |
| --------------------------- | ------------------------------------------------------------ | ----------------- | -------------- |
| code                        |                                                              | integer(int32)    | integer(int32) |
| data                        |                                                              | 订单信息          | 订单信息       |
| createTime      | 创建时间                                                     | string(date-time) |                |
| deliveryTime    | 发货时间                                                     | string(date-time) |                |
| discountAmount  | 优惠金额                                                     | number            |                |
| id              | 订单ID                                                       | integer(int64)    |                |
| merchantId      | 商户ID（逻辑关联sys_user表）                                 | integer(int64)    |                |
| orderNo         | 订单编号                                                     | string            |                |
| payAmount       | 实际支付金额                                                 | number            |                |
| paymentMethod   | 支付方式（1-支付宝，2-微信，3-银行卡）                       | integer(int32)    |                |
| paymentTime     | 支付时间                                                     | string(date-time) |                |
| receiveTime     | 收货时间                                                     | string(date-time) |                |
| receiverAddress | 收货地址                                                     | string            |                |
| receiverName    | 收货人姓名                                                   | string            |                |
| receiverPhone   | 收货人电话                                                   | string            |                |
| remark          | 订单备注                                                     | string            |                |
| status          | 订单状态（1-待付款，2-已付款，3-已发货，4-已完成，5-已取消，6-退款中，7-已退款） | integer(int32)    |                |
| totalAmount     | 订单总金额                                                   | number            |                |
| updateTime      | 更新时间                                                     | string(date-time) |                |
| userId          | 用户ID（逻辑关联sys_user表）                                 | integer(int64)    |                |
| message                     |                                                              | string            |                |
| timestamp                   |                                                              | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": {
		"createTime": "",
		"deliveryTime": "",
		"discountAmount": 0,
		"id": 0,
		"merchantId": 0,
		"orderNo": "",
		"payAmount": 0,
		"paymentMethod": 0,
		"paymentTime": "",
		"receiveTime": "",
		"receiverAddress": "",
		"receiverName": "",
		"receiverPhone": "",
		"remark": "",
		"status": 0,
		"totalAmount": 0,
		"updateTime": "",
		"userId": 0
	},
	"message": "",
	"timestamp": 0
}
```


## 列表查询


**接口地址**:`/order/list`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称        | 参数说明                                                     | 请求类型 | 是否必须 | 数据类型          | schema |
| --------------- | ------------------------------------------------------------ | -------- | -------- | ----------------- | ------ |
| merchantId      | 商户ID（逻辑关联sys_user表）                                 | query    | true     | integer(int64)    |        |
| orderNo         | 订单编号                                                     | query    | true     | string            |        |
| payAmount       | 实际支付金额                                                 | query    | true     | number            |        |
| status          | 订单状态（1-待付款，2-已付款，3-已发货，4-已完成，5-已取消，6-退款中，7-已退款） | query    | true     | integer(int32)    |        |
| totalAmount     | 订单总金额                                                   | query    | true     | number            |        |
| userId          | 用户ID（逻辑关联sys_user表）                                 | query    | true     | integer(int64)    |        |
| createTime      | 创建时间                                                     | query    | false    | string(date-time) |        |
| deliveryTime    | 发货时间                                                     | query    | false    | string(date-time) |        |
| discountAmount  | 优惠金额                                                     | query    | false    | number            |        |
| id              | 订单ID                                                       | query    | false    | integer(int64)    |        |
| paymentMethod   | 支付方式（1-支付宝，2-微信，3-银行卡）                       | query    | false    | integer(int32)    |        |
| paymentTime     | 支付时间                                                     | query    | false    | string(date-time) |        |
| receiverAddress | 收货地址                                                     | query    | false    | string            |        |
| receiverName    | 收货人姓名                                                   | query    | false    | string            |        |
| receiverPhone   | 收货人电话                                                   | query    | false    | string            |        |
| receiveTime     | 收货时间                                                     | query    | false    | string(date-time) |        |
| remark          | 订单备注                                                     | query    | false    | string            |        |
| updateTime      | 更新时间                                                     | query    | false    | string(date-time) |        |


**响应状态**:


| 状态码 | 说明         | schema                         |
| ------ | ------------ | ------------------------------ |
| 200    | OK           | ResponseResult«List«订单信息»» |
| 401    | Unauthorized |                                |
| 403    | Forbidden    |                                |
| 404    | Not Found    |                                |


**响应参数**:


| 参数名称                    | 参数说明                                                     | 类型              | schema         |
| --------------------------- | ------------------------------------------------------------ | ----------------- | -------------- |
| code                        |                                                              | integer(int32)    | integer(int32) |
| data                        |                                                              | array             | 订单信息       |
| createTime      | 创建时间                                                     | string(date-time) |                |
| deliveryTime    | 发货时间                                                     | string(date-time) |                |
| discountAmount  | 优惠金额                                                     | number            |                |
| id              | 订单ID                                                       | integer(int64)    |                |
| merchantId      | 商户ID（逻辑关联sys_user表）                                 | integer(int64)    |                |
| orderNo         | 订单编号                                                     | string            |                |
| payAmount       | 实际支付金额                                                 | number            |                |
| paymentMethod   | 支付方式（1-支付宝，2-微信，3-银行卡）                       | integer(int32)    |                |
| paymentTime     | 支付时间                                                     | string(date-time) |                |
| receiveTime     | 收货时间                                                     | string(date-time) |                |
| receiverAddress | 收货地址                                                     | string            |                |
| receiverName    | 收货人姓名                                                   | string            |                |
| receiverPhone   | 收货人电话                                                   | string            |                |
| remark          | 订单备注                                                     | string            |                |
| status          | 订单状态（1-待付款，2-已付款，3-已发货，4-已完成，5-已取消，6-退款中，7-已退款） | integer(int32)    |                |
| totalAmount     | 订单总金额                                                   | number            |                |
| updateTime      | 更新时间                                                     | string(date-time) |                |
| userId          | 用户ID（逻辑关联sys_user表）                                 | integer(int64)    |                |
| message                     |                                                              | string            |                |
| timestamp                   |                                                              | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": [
		{
			"createTime": "",
			"deliveryTime": "",
			"discountAmount": 0,
			"id": 0,
			"merchantId": 0,
			"orderNo": "",
			"payAmount": 0,
			"paymentMethod": 0,
			"paymentTime": "",
			"receiveTime": "",
			"receiverAddress": "",
			"receiverName": "",
			"receiverPhone": "",
			"remark": "",
			"status": 0,
			"totalAmount": 0,
			"updateTime": "",
			"userId": 0
		}
	],
	"message": "",
	"timestamp": 0
}
```


## 分页查询


**接口地址**:`/order/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称        | 参数说明                                                     | 请求类型 | 是否必须 | 数据类型          | schema |
| --------------- | ------------------------------------------------------------ | -------- | -------- | ----------------- | ------ |
| merchantId      | 商户ID（逻辑关联sys_user表）                                 | query    | true     | integer(int64)    |        |
| orderNo         | 订单编号                                                     | query    | true     | string            |        |
| payAmount       | 实际支付金额                                                 | query    | true     | number            |        |
| status          | 订单状态（1-待付款，2-已付款，3-已发货，4-已完成，5-已取消，6-退款中，7-已退款） | query    | true     | integer(int32)    |        |
| totalAmount     | 订单总金额                                                   | query    | true     | number            |        |
| userId          | 用户ID（逻辑关联sys_user表）                                 | query    | true     | integer(int64)    |        |
| createTime      | 创建时间                                                     | query    | false    | string(date-time) |        |
| current         | 页码                                                         | query    | false    | integer(int64)    |        |
| deliveryTime    | 发货时间                                                     | query    | false    | string(date-time) |        |
| discountAmount  | 优惠金额                                                     | query    | false    | number            |        |
| id              | 订单ID                                                       | query    | false    | integer(int64)    |        |
| paymentMethod   | 支付方式（1-支付宝，2-微信，3-银行卡）                       | query    | false    | integer(int32)    |        |
| paymentTime     | 支付时间                                                     | query    | false    | string(date-time) |        |
| receiverAddress | 收货地址                                                     | query    | false    | string            |        |
| receiverName    | 收货人姓名                                                   | query    | false    | string            |        |
| receiverPhone   | 收货人电话                                                   | query    | false    | string            |        |
| receiveTime     | 收货时间                                                     | query    | false    | string(date-time) |        |
| remark          | 订单备注                                                     | query    | false    | string            |        |
| size            | 每页数量                                                     | query    | false    | integer(int64)    |        |
| updateTime      | 更新时间                                                     | query    | false    | string(date-time) |        |


**响应状态**:


| 状态码 | 说明         | schema                         |
| ------ | ------------ | ------------------------------ |
| 200    | OK           | ResponseResult«Page«订单信息»» |
| 401    | Unauthorized |                                |
| 403    | Forbidden    |                                |
| 404    | Not Found    |                                |


**响应参数**:


| 参数名称                                | 参数说明                                                     | 类型           | schema         |
| --------------------------------------- | ------------------------------------------------------------ | -------------- | -------------- |
| code                                    |                                                              | integer(int32) | integer(int32) |
| data                                    |                                                              | Page«订单信息» | Page«订单信息» |
| countId                     |                                                              | string         |                |
| current                     |                                                              | integer(int64) |                |
| maxLimit                    |                                                              | integer(int64) |                |
| optimizeCountSql            |                                                              | boolean        |                |
| orders                      |                                                              | array          | OrderItem      |
| asc             |                                                              | boolean        |                |
| column          |                                                              | string         |                |
| pages                       |                                                              | integer(int64) |                |
| records                     |                                                              | array          | 订单信息       |
| createTime      | 创建时间                                                     | string         |                |
| deliveryTime    | 发货时间                                                     | string         |                |
| discountAmount  | 优惠金额                                                     | number         |                |
| id              | 订单ID                                                       | integer        |                |
| merchantId      | 商户ID（逻辑关联sys_user表）                                 | integer        |                |
| orderNo         | 订单编号                                                     | string         |                |
| payAmount       | 实际支付金额                                                 | number         |                |
| paymentMethod   | 支付方式（1-支付宝，2-微信，3-银行卡）                       | integer        |                |
| paymentTime     | 支付时间                                                     | string         |                |
| receiveTime     | 收货时间                                                     | string         |                |
| receiverAddress | 收货地址                                                     | string         |                |
| receiverName    | 收货人姓名                                                   | string         |                |
| receiverPhone   | 收货人电话                                                   | string         |                |
| remark          | 订单备注                                                     | string         |                |
| status          | 订单状态（1-待付款，2-已付款，3-已发货，4-已完成，5-已取消，6-退款中，7-已退款） | integer        |                |
| totalAmount     | 订单总金额                                                   | number         |                |
| updateTime      | 更新时间                                                     | string         |                |
| userId          | 用户ID（逻辑关联sys_user表）                                 | integer        |                |
| searchCount                 |                                                              | boolean        |                |
| size                        |                                                              | integer(int64) |                |
| total                       |                                                              | integer(int64) |                |
| message                                 |                                                              | string         |                |
| timestamp                               |                                                              | integer(int64) | integer(int64) |


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
				"createTime": "",
				"deliveryTime": "",
				"discountAmount": 0,
				"id": 0,
				"merchantId": 0,
				"orderNo": "",
				"payAmount": 0,
				"paymentMethod": 0,
				"paymentTime": "",
				"receiveTime": "",
				"receiverAddress": "",
				"receiverName": "",
				"receiverPhone": "",
				"remark": "",
				"status": 0,
				"totalAmount": 0,
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


## 通过ID查询单条数据


**接口地址**:`/order/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型       | schema |
| -------- | -------- | -------- | -------- | -------------- | ------ |
| id       | 订单ID   | path     | true     | integer(int64) |        |


**响应状态**:


| 状态码 | 说明         | schema                   |
| ------ | ------------ | ------------------------ |
| 200    | OK           | ResponseResult«订单信息» |
| 401    | Unauthorized |                          |
| 403    | Forbidden    |                          |
| 404    | Not Found    |                          |


**响应参数**:


| 参数名称                    | 参数说明                                                     | 类型              | schema         |
| --------------------------- | ------------------------------------------------------------ | ----------------- | -------------- |
| code                        |                                                              | integer(int32)    | integer(int32) |
| data                        |                                                              | 订单信息          | 订单信息       |
| createTime      | 创建时间                                                     | string(date-time) |                |
| deliveryTime    | 发货时间                                                     | string(date-time) |                |
| discountAmount  | 优惠金额                                                     | number            |                |
| id              | 订单ID                                                       | integer(int64)    |                |
| merchantId      | 商户ID（逻辑关联sys_user表）                                 | integer(int64)    |                |
| orderNo         | 订单编号                                                     | string            |                |
| payAmount       | 实际支付金额                                                 | number            |                |
| paymentMethod   | 支付方式（1-支付宝，2-微信，3-银行卡）                       | integer(int32)    |                |
| paymentTime     | 支付时间                                                     | string(date-time) |                |
| receiveTime     | 收货时间                                                     | string(date-time) |                |
| receiverAddress | 收货地址                                                     | string            |                |
| receiverName    | 收货人姓名                                                   | string            |                |
| receiverPhone   | 收货人电话                                                   | string            |                |
| remark          | 订单备注                                                     | string            |                |
| status          | 订单状态（1-待付款，2-已付款，3-已发货，4-已完成，5-已取消，6-退款中，7-已退款） | integer(int32)    |                |
| totalAmount     | 订单总金额                                                   | number            |                |
| updateTime      | 更新时间                                                     | string(date-time) |                |
| userId          | 用户ID（逻辑关联sys_user表）                                 | integer(int64)    |                |
| message                     |                                                              | string            |                |
| timestamp                   |                                                              | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": {
		"createTime": "",
		"deliveryTime": "",
		"discountAmount": 0,
		"id": 0,
		"merchantId": 0,
		"orderNo": "",
		"payAmount": 0,
		"paymentMethod": 0,
		"paymentTime": "",
		"receiveTime": "",
		"receiverAddress": "",
		"receiverName": "",
		"receiverPhone": "",
		"remark": "",
		"status": 0,
		"totalAmount": 0,
		"updateTime": "",
		"userId": 0
	},
	"message": "",
	"timestamp": 0
}
```


## 通过主键删除数据


**接口地址**:`/order/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型       | schema |
| -------- | -------- | -------- | -------- | -------------- | ------ |
| id       | 订单ID   | path     | true     | integer(int64) |        |


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