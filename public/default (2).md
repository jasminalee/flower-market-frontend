# API文档


**简介**:API文档


**HOST**:localhost:18091


**联系人**:


**Version**:1.0


**接口路径**:/v2/api-docs


[TOC]






# 产品SKU表对象功能接口


## 新增-更新数据


**接口地址**:`/productSku`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
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
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|productSku|productSku|body|true|产品SKU信息|产品SKU信息|
|&emsp;&emsp;createTime|创建时间||false|string(date-time)||
|&emsp;&emsp;id|SKU ID||false|integer(int64)||
|&emsp;&emsp;price|价格||false|number||
|&emsp;&emsp;productId|产品ID（逻辑关联product表）||false|integer(int64)||
|&emsp;&emsp;skuCode|SKU编码||false|string||
|&emsp;&emsp;skuName|SKU名称（如：红色-L）||false|string||
|&emsp;&emsp;specifications|规格描述，JSON格式存储||false|string||
|&emsp;&emsp;status|状态（0-无效，1-有效）||false|integer(int32)||
|&emsp;&emsp;stock|库存数量||false|integer(int32)||
|&emsp;&emsp;updateTime|更新时间||false|string(date-time)||


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
|data||object||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"message": "",
	"timestamp": 0
}
```


## 列表查询


**接口地址**:`/productSku/list`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|price|价格|query|true|number||
|skuCode|SKU编码|query|true|string||
|skuName|SKU名称（如：红色-L）|query|true|string||
|stock|库存数量|query|true|integer(int32)||
|createTime|创建时间|query|false|string(date-time)||
|id|SKU ID|query|false|integer(int64)||
|productId|产品ID（逻辑关联product表）|query|false|integer(int64)||
|specifications|规格描述，JSON格式存储|query|false|string||
|status|状态（0-无效，1-有效）|query|false|integer(int32)||
|updateTime|更新时间|query|false|string(date-time)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResponseResult«List«产品SKU信息»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"message": "",
	"timestamp": 0
}
```


## 分页查询


**接口地址**:`/productSku/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|price|价格|query|true|number||
|skuCode|SKU编码|query|true|string||
|skuName|SKU名称（如：红色-L）|query|true|string||
|stock|库存数量|query|true|integer(int32)||
|createTime|创建时间|query|false|string(date-time)||
|current|current|query|false|integer(int64)||
|id|SKU ID|query|false|integer(int64)||
|productId|产品ID（逻辑关联product表）|query|false|integer(int64)||
|size|size|query|false|integer(int64)||
|specifications|规格描述，JSON格式存储|query|false|string||
|status|状态（0-无效，1-有效）|query|false|integer(int32)||
|updateTime|更新时间|query|false|string(date-time)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResponseResult«Page«产品SKU信息»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"message": "",
	"timestamp": 0
}
```


## 根据产品ID查询SKU列表


**接口地址**:`/productSku/product/{productId}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|productId|productId|path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResponseResult«List«产品SKU信息»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"message": "",
	"timestamp": 0
}
```


## 通过ID查询单条数据


**接口地址**:`/productSku/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|id|path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResponseResult«产品SKU信息»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"message": "",
	"timestamp": 0
}
```


## 通过主键删除数据


**接口地址**:`/productSku/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


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
|data||object||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"message": "",
	"timestamp": 0
}
```


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


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|product|product|body|true|产品信息|产品信息|
|&emsp;&emsp;brand|品牌||false|string||
|&emsp;&emsp;categoryId|分类ID（逻辑关联product_category表）||false|integer(int64)||
|&emsp;&emsp;createTime|创建时间||false|string(date-time)||
|&emsp;&emsp;description|产品描述||false|string||
|&emsp;&emsp;detail|产品详情||false|string||
|&emsp;&emsp;id|产品ID||false|integer(int64)||
|&emsp;&emsp;mainImage|主图URL||false|string||
|&emsp;&emsp;productCode|产品编码||false|string||
|&emsp;&emsp;productName|产品名称||false|string||
|&emsp;&emsp;productType|产品类型（1-花卉，2-第三方产品）||false|integer(int32)||
|&emsp;&emsp;status|状态（0-下架，1-上架）||false|integer(int32)||
|&emsp;&emsp;subImages|子图URL集合，JSON格式存储||false|string||
|&emsp;&emsp;updateTime|更新时间||false|string(date-time)||


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
|data||object||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
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


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|产品ID|path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResponseResult«产品详情VO»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
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


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|categoryId|分类ID|query|false|integer(int64)||
|current|页码|query|false|integer(int64)||
|keyword|搜索关键字|query|false|string||
|size|每页数量|query|false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResponseResult«Page«产品信息»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
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


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|categoryId|分类ID（逻辑关联product_category表）|query|true|integer(int64)||
|productCode|产品编码|query|true|string||
|productName|产品名称|query|true|string||
|productType|产品类型（1-花卉，2-第三方产品）|query|true|integer(int32)||
|status|状态（0-下架，1-上架）|query|true|integer(int32)||
|brand|品牌|query|false|string||
|createTime|创建时间|query|false|string(date-time)||
|description|产品描述|query|false|string||
|detail|产品详情|query|false|string||
|id|产品ID|query|false|integer(int64)||
|mainImage|主图URL|query|false|string||
|subImages|子图URL集合，JSON格式存储|query|false|string||
|updateTime|更新时间|query|false|string(date-time)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResponseResult«List«产品信息»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
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


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|categoryId|分类ID（逻辑关联product_category表）|query|true|integer(int64)||
|productCode|产品编码|query|true|string||
|productName|产品名称|query|true|string||
|productType|产品类型（1-花卉，2-第三方产品）|query|true|integer(int32)||
|status|状态（0-下架，1-上架）|query|true|integer(int32)||
|brand|品牌|query|false|string||
|createTime|创建时间|query|false|string(date-time)||
|current|页码|query|false|integer(int64)||
|description|产品描述|query|false|string||
|detail|产品详情|query|false|string||
|id|产品ID|query|false|integer(int64)||
|mainImage|主图URL|query|false|string||
|size|每页数量|query|false|integer(int64)||
|subImages|子图URL集合，JSON格式存储|query|false|string||
|updateTime|更新时间|query|false|string(date-time)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResponseResult«Page«产品信息»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
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


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|产品ID|path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResponseResult«产品信息»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
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


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|产品ID|path|true|integer(int64)||


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
|data||object||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"message": "",
	"timestamp": 0
}
```


# 产品分类表对象功能接口


## 新增-更新数据


**接口地址**:`/productCategory`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "categoryLevel": 0,
  "categoryName": "",
  "createTime": "",
  "id": 0,
  "parentId": 0,
  "sort": 0,
  "status": 0,
  "updateTime": ""
}
```


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|productCategory|productCategory|body|true|产品分类信息|产品分类信息|
|&emsp;&emsp;categoryLevel|分类级别（1-一级分类，2-二级分类，3-三级分类）||false|integer(int32)||
|&emsp;&emsp;categoryName|分类名称||false|string||
|&emsp;&emsp;createTime|创建时间||false|string(date-time)||
|&emsp;&emsp;id|分类ID||false|integer(int64)||
|&emsp;&emsp;parentId|父分类ID（用于构建分类树）||false|integer(int64)||
|&emsp;&emsp;sort|排序号||false|integer(int32)||
|&emsp;&emsp;status|状态（0-禁用，1-正常）||false|integer(int32)||
|&emsp;&emsp;updateTime|更新时间||false|string(date-time)||


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
|data||object||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"message": "",
	"timestamp": 0
}
```


## 获取主页用的分类列表（只包含启用的一级分类）


**接口地址**:`/productCategory/homepage`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResponseResult«List«产品分类信息»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"message": "",
	"timestamp": 0
}
```


## 列表查询


**接口地址**:`/productCategory/list`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|categoryLevel|分类级别（1-一级分类，2-二级分类，3-三级分类）|query|true|integer(int32)||
|categoryName|分类名称|query|true|string||
|status|状态（0-禁用，1-正常）|query|true|integer(int32)||
|createTime|创建时间|query|false|string(date-time)||
|id|分类ID|query|false|integer(int64)||
|parentId|父分类ID（用于构建分类树）|query|false|integer(int64)||
|sort|排序号|query|false|integer(int32)||
|updateTime|更新时间|query|false|string(date-time)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResponseResult«List«产品分类信息»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"message": "",
	"timestamp": 0
}
```


## 分页查询


**接口地址**:`/productCategory/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|categoryLevel|分类级别（1-一级分类，2-二级分类，3-三级分类）|query|true|integer(int32)||
|categoryName|分类名称|query|true|string||
|status|状态（0-禁用，1-正常）|query|true|integer(int32)||
|createTime|创建时间|query|false|string(date-time)||
|current|页码|query|false|integer(int64)||
|id|分类ID|query|false|integer(int64)||
|parentId|父分类ID（用于构建分类树）|query|false|integer(int64)||
|size|每页数量|query|false|integer(int64)||
|sort|排序号|query|false|integer(int32)||
|updateTime|更新时间|query|false|string(date-time)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResponseResult«Page«产品分类信息»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"message": "",
	"timestamp": 0
}
```


## 获取分类树结构


**接口地址**:`/productCategory/tree`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResponseResult«List«产品分类树VO»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"message": "",
	"timestamp": 0
}
```


## 通过ID查询单条数据


**接口地址**:`/productCategory/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|分类ID|path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResponseResult«产品分类信息»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||object||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"message": "",
	"timestamp": 0
}
```


## 通过主键删除数据


**接口地址**:`/productCategory/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|分类ID|path|true|integer(int64)||


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
|data||object||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {},
	"message": "",
	"timestamp": 0
}
```