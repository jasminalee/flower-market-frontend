

## 通过ID查询单条数据


**接口地址**:`/product/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


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
|data||产品信息|产品信息|
|        avgRating|平均评分|number||
|        brand|品牌|string||
|        categoryId|分类ID（逻辑关联product_category表）|integer(int64)||
|        createTime|创建时间|string(date-time)||
|        description|产品描述|string||
|        detail|产品详情|string||
|        id|产品ID|integer(int64)||
|        isDiscounted|是否打折(1:是,0:否)|integer(int32)||
|        isHot|是否热销(1:是,0:否)|integer(int32)||
|        mainImage|主图URL|string||
|        minPrice|最低价格|number||
|        productCode|产品编码|string||
|        productName|产品名称|string||
|        productType|产品类型（1-花卉，2-第三方产品）|integer(int32)||
|        status|状态（0-下架，1-上架）|integer(int32)||
|        subImages|子图URL集合，JSON格式存储|string||
|        totalSales|总销量|integer(int32)||
|        updateTime|更新时间|string(date-time)||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"avgRating": 0,
		"brand": "",
		"categoryId": 0,
		"createTime": "",
		"description": "",
		"detail": "",
		"id": 0,
		"isDiscounted": 0,
		"isHot": 0,
		"mainImage": "",
		"minPrice": 0,
		"productCode": "",
		"productName": "",
		"productType": 0,
		"status": 0,
		"subImages": "",
		"totalSales": 0,
		"updateTime": ""
	},
	"message": "",
	"timestamp": 0
}
```