# API文档


**HOST**:localhost:18091

**联系人**:

**Version**:1.0

**接口路径**:/v2/api-docs


[TOC]


# 产品信息表对象功能接口


## 新增-更新数据


**接口地址**:`/product`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "brand": "",
  "categoryId": 0,
  "createTime": "",
  "description": "",
  "detail": "",
  "id": 0,
  "mainImage": "",
  "productCode": "",
  "productName": "",
  "productType": 0,
  "status": 0,
  "subImages": "",
  "updateTime": ""
}
```


**请求参数**:


| 参数名称                | 参数说明                             | 请求类型 | 是否必须 | 数据类型          | schema   |
| ----------------------- | ------------------------------------ | -------- | -------- | ----------------- | -------- |
| product                 | product                              | body     | true     | 产品信息          | 产品信息 |
| &emsp;&emsp;brand       | 品牌                                 |          | false    | string            |          |
| &emsp;&emsp;categoryId  | 分类ID（逻辑关联product_category表） |          | false    | integer(int64)    |          |
| &emsp;&emsp;createTime  | 创建时间                             |          | false    | string(date-time) |          |
| &emsp;&emsp;description | 产品描述                             |          | false    | string            |          |
| &emsp;&emsp;detail      | 产品详情                             |          | false    | string            |          |
| &emsp;&emsp;id          | 产品ID                               |          | false    | integer(int64)    |          |
| &emsp;&emsp;mainImage   | 主图URL                              |          | false    | string            |          |
| &emsp;&emsp;productCode | 产品编码                             |          | false    | string            |          |
| &emsp;&emsp;productName | 产品名称                             |          | false    | string            |          |
| &emsp;&emsp;productType | 产品类型（1-花卉，2-第三方产品）     |          | false    | integer(int32)    |          |
| &emsp;&emsp;status      | 状态（0-下架，1-上架）               |          | false    | integer(int32)    |          |
| &emsp;&emsp;subImages   | 子图URL集合，JSON格式存储            |          | false    | string            |          |
| &emsp;&emsp;updateTime  | 更新时间                             |          | false    | string(date-time) |          |


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


## 获取产品详情包括SKU信息


**接口地址**:`/product/detail/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型       | schema |
| -------- | -------- | -------- | -------- | -------------- | ------ |
| id       | 产品ID   | path     | true     | integer(int64) |        |


**响应状态**:


| 状态码 | 说明         | schema                     |
| ------ | ------------ | -------------------------- |
| 200    | OK           | ResponseResult«产品详情VO» |
| 401    | Unauthorized |                            |
| 403    | Forbidden    |                            |
| 404    | Not Found    |                            |


**响应参数**:


| 参数名称                               | 参数说明                             | 类型           | schema         |
| -------------------------------------- | ------------------------------------ | -------------- | -------------- |
| code                                   |                                      | integer(int32) | integer(int32) |
| data                                   |                                      | 产品详情VO     | 产品详情VO     |
| &emsp;&emsp;product                    | 产品基本信息                         | 产品信息       | 产品信息       |
| &emsp;&emsp;&emsp;&emsp;brand          | 品牌                                 | string         |                |
| &emsp;&emsp;&emsp;&emsp;categoryId     | 分类ID（逻辑关联product_category表） | integer        |                |
| &emsp;&emsp;&emsp;&emsp;createTime     | 创建时间                             | string         |                |
| &emsp;&emsp;&emsp;&emsp;description    | 产品描述                             | string         |                |
| &emsp;&emsp;&emsp;&emsp;detail         | 产品详情                             | string         |                |
| &emsp;&emsp;&emsp;&emsp;id             | 产品ID                               | integer        |                |
| &emsp;&emsp;&emsp;&emsp;mainImage      | 主图URL                              | string         |                |
| &emsp;&emsp;&emsp;&emsp;productCode    | 产品编码                             | string         |                |
| &emsp;&emsp;&emsp;&emsp;productName    | 产品名称                             | string         |                |
| &emsp;&emsp;&emsp;&emsp;productType    | 产品类型（1-花卉，2-第三方产品）     | integer        |                |
| &emsp;&emsp;&emsp;&emsp;status         | 状态（0-下架，1-上架）               | integer        |                |
| &emsp;&emsp;&emsp;&emsp;subImages      | 子图URL集合，JSON格式存储            | string         |                |
| &emsp;&emsp;&emsp;&emsp;updateTime     | 更新时间                             | string         |                |
| &emsp;&emsp;skus                       | 产品SKU列表                          | array          | 产品SKU信息    |
| &emsp;&emsp;&emsp;&emsp;createTime     | 创建时间                             | string         |                |
| &emsp;&emsp;&emsp;&emsp;id             | SKU ID                               | integer        |                |
| &emsp;&emsp;&emsp;&emsp;price          | 价格                                 | number         |                |
| &emsp;&emsp;&emsp;&emsp;productId      | 产品ID（逻辑关联product表）          | integer        |                |
| &emsp;&emsp;&emsp;&emsp;skuCode        | SKU编码                              | string         |                |
| &emsp;&emsp;&emsp;&emsp;skuName        | SKU名称（如：红色-L）                | string         |                |
| &emsp;&emsp;&emsp;&emsp;specifications | 规格描述，JSON格式存储               | string         |                |
| &emsp;&emsp;&emsp;&emsp;status         | 状态（0-无效，1-有效）               | integer        |                |
| &emsp;&emsp;&emsp;&emsp;stock          | 库存数量                             | integer        |                |
| &emsp;&emsp;&emsp;&emsp;updateTime     | 更新时间                             | string         |                |
| message                                |                                      | string         |                |
| timestamp                              |                                      | integer(int64) | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": {
		"product": {
			"brand": "",
			"categoryId": 0,
			"createTime": "",
			"description": "",
			"detail": "",
			"id": 0,
			"mainImage": "",
			"productCode": "",
			"productName": "",
			"productType": 0,
			"status": 0,
			"subImages": "",
			"updateTime": ""
		},
		"skus": [
			{
				"createTime": "",
				"id": 0,
				"price": 0,
				"productId": 0,
				"skuCode": "",
				"skuName": "",
				"specifications": "",
				"status": 0,
				"stock": 0,
				"updateTime": ""
			}
		]
	},
	"message": "",
	"timestamp": 0
}
```


## 主页商品列表（支持分类和搜索）


**接口地址**:`/product/homepage`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称   | 参数说明   | 请求类型 | 是否必须 | 数据类型       | schema |
| ---------- | ---------- | -------- | -------- | -------------- | ------ |
| categoryId | 分类ID     | query    | false    | integer(int64) |        |
| current    | 页码       | query    | false    | integer(int64) |        |
| keyword    | 搜索关键字 | query    | false    | string         |        |
| size       | 每页数量   | query    | false    | integer(int64) |        |


**响应状态**:


| 状态码 | 说明         | schema                         |
| ------ | ------------ | ------------------------------ |
| 200    | OK           | ResponseResult«Page«产品信息»» |
| 401    | Unauthorized |                                |
| 403    | Forbidden    |                                |
| 404    | Not Found    |                                |


**响应参数**:


| 参数名称                            | 参数说明                             | 类型           | schema         |
| ----------------------------------- | ------------------------------------ | -------------- | -------------- |
| code                                |                                      | integer(int32) | integer(int32) |
| data                                |                                      | Page«产品信息» | Page«产品信息» |
| &emsp;&emsp;countId                 |                                      | string         |                |
| &emsp;&emsp;current                 |                                      | integer(int64) |                |
| &emsp;&emsp;maxLimit                |                                      | integer(int64) |                |
| &emsp;&emsp;optimizeCountSql        |                                      | boolean        |                |
| &emsp;&emsp;orders                  |                                      | array          | OrderItem      |
| &emsp;&emsp;&emsp;&emsp;asc         |                                      | boolean        |                |
| &emsp;&emsp;&emsp;&emsp;column      |                                      | string         |                |
| &emsp;&emsp;pages                   |                                      | integer(int64) |                |
| &emsp;&emsp;records                 |                                      | array          | 产品信息       |
| &emsp;&emsp;&emsp;&emsp;brand       | 品牌                                 | string         |                |
| &emsp;&emsp;&emsp;&emsp;categoryId  | 分类ID（逻辑关联product_category表） | integer        |                |
| &emsp;&emsp;&emsp;&emsp;createTime  | 创建时间                             | string         |                |
| &emsp;&emsp;&emsp;&emsp;description | 产品描述                             | string         |                |
| &emsp;&emsp;&emsp;&emsp;detail      | 产品详情                             | string         |                |
| &emsp;&emsp;&emsp;&emsp;id          | 产品ID                               | integer        |                |
| &emsp;&emsp;&emsp;&emsp;mainImage   | 主图URL                              | string         |                |
| &emsp;&emsp;&emsp;&emsp;productCode | 产品编码                             | string         |                |
| &emsp;&emsp;&emsp;&emsp;productName | 产品名称                             | string         |                |
| &emsp;&emsp;&emsp;&emsp;productType | 产品类型（1-花卉，2-第三方产品）     | integer        |                |
| &emsp;&emsp;&emsp;&emsp;status      | 状态（0-下架，1-上架）               | integer        |                |
| &emsp;&emsp;&emsp;&emsp;subImages   | 子图URL集合，JSON格式存储            | string         |                |
| &emsp;&emsp;&emsp;&emsp;updateTime  | 更新时间                             | string         |                |
| &emsp;&emsp;searchCount             |                                      | boolean        |                |
| &emsp;&emsp;size                    |                                      | integer(int64) |                |
| &emsp;&emsp;total                   |                                      | integer(int64) |                |
| message                             |                                      | string         |                |
| timestamp                           |                                      | integer(int64) | integer(int64) |


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
				"brand": "",
				"categoryId": 0,
				"createTime": "",
				"description": "",
				"detail": "",
				"id": 0,
				"mainImage": "",
				"productCode": "",
				"productName": "",
				"productType": 0,
				"status": 0,
				"subImages": "",
				"updateTime": ""
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


## 列表查询


**接口地址**:`/product/list`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称    | 参数说明                             | 请求类型 | 是否必须 | 数据类型          | schema |
| ----------- | ------------------------------------ | -------- | -------- | ----------------- | ------ |
| categoryId  | 分类ID（逻辑关联product_category表） | query    | true     | integer(int64)    |        |
| productCode | 产品编码                             | query    | true     | string            |        |
| productName | 产品名称                             | query    | true     | string            |        |
| productType | 产品类型（1-花卉，2-第三方产品）     | query    | true     | integer(int32)    |        |
| status      | 状态（0-下架，1-上架）               | query    | true     | integer(int32)    |        |
| brand       | 品牌                                 | query    | false    | string            |        |
| createTime  | 创建时间                             | query    | false    | string(date-time) |        |
| description | 产品描述                             | query    | false    | string            |        |
| detail      | 产品详情                             | query    | false    | string            |        |
| id          | 产品ID                               | query    | false    | integer(int64)    |        |
| mainImage   | 主图URL                              | query    | false    | string            |        |
| subImages   | 子图URL集合，JSON格式存储            | query    | false    | string            |        |
| updateTime  | 更新时间                             | query    | false    | string(date-time) |        |


**响应状态**:


| 状态码 | 说明         | schema                         |
| ------ | ------------ | ------------------------------ |
| 200    | OK           | ResponseResult«List«产品信息»» |
| 401    | Unauthorized |                                |
| 403    | Forbidden    |                                |
| 404    | Not Found    |                                |


**响应参数**:


| 参数名称                | 参数说明                             | 类型              | schema         |
| ----------------------- | ------------------------------------ | ----------------- | -------------- |
| code                    |                                      | integer(int32)    | integer(int32) |
| data                    |                                      | array             | 产品信息       |
| &emsp;&emsp;brand       | 品牌                                 | string            |                |
| &emsp;&emsp;categoryId  | 分类ID（逻辑关联product_category表） | integer(int64)    |                |
| &emsp;&emsp;createTime  | 创建时间                             | string(date-time) |                |
| &emsp;&emsp;description | 产品描述                             | string            |                |
| &emsp;&emsp;detail      | 产品详情                             | string            |                |
| &emsp;&emsp;id          | 产品ID                               | integer(int64)    |                |
| &emsp;&emsp;mainImage   | 主图URL                              | string            |                |
| &emsp;&emsp;productCode | 产品编码                             | string            |                |
| &emsp;&emsp;productName | 产品名称                             | string            |                |
| &emsp;&emsp;productType | 产品类型（1-花卉，2-第三方产品）     | integer(int32)    |                |
| &emsp;&emsp;status      | 状态（0-下架，1-上架）               | integer(int32)    |                |
| &emsp;&emsp;subImages   | 子图URL集合，JSON格式存储            | string            |                |
| &emsp;&emsp;updateTime  | 更新时间                             | string(date-time) |                |
| message                 |                                      | string            |                |
| timestamp               |                                      | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": [
		{
			"brand": "",
			"categoryId": 0,
			"createTime": "",
			"description": "",
			"detail": "",
			"id": 0,
			"mainImage": "",
			"productCode": "",
			"productName": "",
			"productType": 0,
			"status": 0,
			"subImages": "",
			"updateTime": ""
		}
	],
	"message": "",
	"timestamp": 0
}
```


## 分页查询


**接口地址**:`/product/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称    | 参数说明                             | 请求类型 | 是否必须 | 数据类型          | schema |
| ----------- | ------------------------------------ | -------- | -------- | ----------------- | ------ |
| categoryId  | 分类ID（逻辑关联product_category表） | query    | true     | integer(int64)    |        |
| productCode | 产品编码                             | query    | true     | string            |        |
| productName | 产品名称                             | query    | true     | string            |        |
| productType | 产品类型（1-花卉，2-第三方产品）     | query    | true     | integer(int32)    |        |
| status      | 状态（0-下架，1-上架）               | query    | true     | integer(int32)    |        |
| brand       | 品牌                                 | query    | false    | string            |        |
| createTime  | 创建时间                             | query    | false    | string(date-time) |        |
| current     | 页码                                 | query    | false    | integer(int64)    |        |
| description | 产品描述                             | query    | false    | string            |        |
| detail      | 产品详情                             | query    | false    | string            |        |
| id          | 产品ID                               | query    | false    | integer(int64)    |        |
| mainImage   | 主图URL                              | query    | false    | string            |        |
| size        | 每页数量                             | query    | false    | integer(int64)    |        |
| subImages   | 子图URL集合，JSON格式存储            | query    | false    | string            |        |
| updateTime  | 更新时间                             | query    | false    | string(date-time) |        |


**响应状态**:


| 状态码 | 说明         | schema                         |
| ------ | ------------ | ------------------------------ |
| 200    | OK           | ResponseResult«Page«产品信息»» |
| 401    | Unauthorized |                                |
| 403    | Forbidden    |                                |
| 404    | Not Found    |                                |


**响应参数**:


| 参数名称                            | 参数说明                             | 类型           | schema         |
| ----------------------------------- | ------------------------------------ | -------------- | -------------- |
| code                                |                                      | integer(int32) | integer(int32) |
| data                                |                                      | Page«产品信息» | Page«产品信息» |
| &emsp;&emsp;countId                 |                                      | string         |                |
| &emsp;&emsp;current                 |                                      | integer(int64) |                |
| &emsp;&emsp;maxLimit                |                                      | integer(int64) |                |
| &emsp;&emsp;optimizeCountSql        |                                      | boolean        |                |
| &emsp;&emsp;orders                  |                                      | array          | OrderItem      |
| &emsp;&emsp;&emsp;&emsp;asc         |                                      | boolean        |                |
| &emsp;&emsp;&emsp;&emsp;column      |                                      | string         |                |
| &emsp;&emsp;pages                   |                                      | integer(int64) |                |
| &emsp;&emsp;records                 |                                      | array          | 产品信息       |
| &emsp;&emsp;&emsp;&emsp;brand       | 品牌                                 | string         |                |
| &emsp;&emsp;&emsp;&emsp;categoryId  | 分类ID（逻辑关联product_category表） | integer        |                |
| &emsp;&emsp;&emsp;&emsp;createTime  | 创建时间                             | string         |                |
| &emsp;&emsp;&emsp;&emsp;description | 产品描述                             | string         |                |
| &emsp;&emsp;&emsp;&emsp;detail      | 产品详情                             | string         |                |
| &emsp;&emsp;&emsp;&emsp;id          | 产品ID                               | integer        |                |
| &emsp;&emsp;&emsp;&emsp;mainImage   | 主图URL                              | string         |                |
| &emsp;&emsp;&emsp;&emsp;productCode | 产品编码                             | string         |                |
| &emsp;&emsp;&emsp;&emsp;productName | 产品名称                             | string         |                |
| &emsp;&emsp;&emsp;&emsp;productType | 产品类型（1-花卉，2-第三方产品）     | integer        |                |
| &emsp;&emsp;&emsp;&emsp;status      | 状态（0-下架，1-上架）               | integer        |                |
| &emsp;&emsp;&emsp;&emsp;subImages   | 子图URL集合，JSON格式存储            | string         |                |
| &emsp;&emsp;&emsp;&emsp;updateTime  | 更新时间                             | string         |                |
| &emsp;&emsp;searchCount             |                                      | boolean        |                |
| &emsp;&emsp;size                    |                                      | integer(int64) |                |
| &emsp;&emsp;total                   |                                      | integer(int64) |                |
| message                             |                                      | string         |                |
| timestamp                           |                                      | integer(int64) | integer(int64) |


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
				"brand": "",
				"categoryId": 0,
				"createTime": "",
				"description": "",
				"detail": "",
				"id": 0,
				"mainImage": "",
				"productCode": "",
				"productName": "",
				"productType": 0,
				"status": 0,
				"subImages": "",
				"updateTime": ""
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


**接口地址**:`/product/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型       | schema |
| -------- | -------- | -------- | -------- | -------------- | ------ |
| id       | 产品ID   | path     | true     | integer(int64) |        |


**响应状态**:


| 状态码 | 说明         | schema                   |
| ------ | ------------ | ------------------------ |
| 200    | OK           | ResponseResult«产品信息» |
| 401    | Unauthorized |                          |
| 403    | Forbidden    |                          |
| 404    | Not Found    |                          |


**响应参数**:


| 参数名称                | 参数说明                             | 类型              | schema         |
| ----------------------- | ------------------------------------ | ----------------- | -------------- |
| code                    |                                      | integer(int32)    | integer(int32) |
| data                    |                                      | 产品信息          | 产品信息       |
| &emsp;&emsp;brand       | 品牌                                 | string            |                |
| &emsp;&emsp;categoryId  | 分类ID（逻辑关联product_category表） | integer(int64)    |                |
| &emsp;&emsp;createTime  | 创建时间                             | string(date-time) |                |
| &emsp;&emsp;description | 产品描述                             | string            |                |
| &emsp;&emsp;detail      | 产品详情                             | string            |                |
| &emsp;&emsp;id          | 产品ID                               | integer(int64)    |                |
| &emsp;&emsp;mainImage   | 主图URL                              | string            |                |
| &emsp;&emsp;productCode | 产品编码                             | string            |                |
| &emsp;&emsp;productName | 产品名称                             | string            |                |
| &emsp;&emsp;productType | 产品类型（1-花卉，2-第三方产品）     | integer(int32)    |                |
| &emsp;&emsp;status      | 状态（0-下架，1-上架）               | integer(int32)    |                |
| &emsp;&emsp;subImages   | 子图URL集合，JSON格式存储            | string            |                |
| &emsp;&emsp;updateTime  | 更新时间                             | string(date-time) |                |
| message                 |                                      | string            |                |
| timestamp               |                                      | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": {
		"brand": "",
		"categoryId": 0,
		"createTime": "",
		"description": "",
		"detail": "",
		"id": 0,
		"mainImage": "",
		"productCode": "",
		"productName": "",
		"productType": 0,
		"status": 0,
		"subImages": "",
		"updateTime": ""
	},
	"message": "",
	"timestamp": 0
}
```


## 通过主键删除数据


**接口地址**:`/product/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型       | schema |
| -------- | -------- | -------- | -------- | -------------- | ------ |
| id       | 产品ID   | path     | true     | integer(int64) |        |


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


# 文件上传接口


## 上传图片


**接口地址**:`/api/upload/image`


**请求方式**:`POST`


**请求数据类型**:`multipart/form-data`


**响应数据类型**:`*/*`


**接口描述**:<p>上传图片文件，支持jpg、png、gif格式，文件大小不超过5MB</p>



**请求参数**:


| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| -------- | -------- | -------- | -------- | -------- | ------ |
| file     |          | formData | false    | file     |        |


**响应状态**:


| 状态码 | 说明         | schema                 |
| ------ | ------------ | ---------------------- |
| 200    | OK           | ResponseResult«string» |
| 201    | Created      |                        |
| 401    | Unauthorized |                        |
| 403    | Forbidden    |                        |
| 404    | Not Found    |                        |


**响应参数**:


| 参数名称  | 参数说明 | 类型           | schema         |
| --------- | -------- | -------------- | -------------- |
| code      |          | integer(int32) | integer(int32) |
| data      |          | string         |                |
| message   |          | string         |                |
| timestamp |          | integer(int64) | integer(int64) |

**响应示例**: data为url后缀, 前端需要附带上服务器的地址再拼接这个data才对例如

http://localhost:18091/images/uploads/2025/10/01/bf6632b94e9e4fb6b6cc7c8b2dd30a4a.jpg

```javascript
{
  "code": 200,
  "message": "上传成功",
  "data": "/images/uploads/2025/10/01/bf6632b94e9e4fb6b6cc7c8b2dd30a4a.jpg",
  "timestamp": 1759314456887
}
```