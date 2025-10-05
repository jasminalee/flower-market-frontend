

## 通过用户ID查询用户所有购物车


**接口地址**:`/shoppingCart/list`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|userId|userId|query|false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResponseResult«List«购物车信息VO»»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||array|购物车信息VO|
|&emsp;&emsp;createTime|创建时间|string(date-time)||
|&emsp;&emsp;id|购物车项ID|integer(int64)||
|&emsp;&emsp;merchantId|商户ID（逻辑关联sys_user表）|integer(int64)||
|&emsp;&emsp;merchantName|商户名称|string||
|&emsp;&emsp;price|单价|number||
|&emsp;&emsp;productId|产品ID（逻辑关联product表）|integer(int64)||
|&emsp;&emsp;productName|产品名称|string||
|&emsp;&emsp;quantity|数量|integer(int32)||
|&emsp;&emsp;skuId|SKU ID（逻辑关联product_sku表）|integer(int64)||
|&emsp;&emsp;skuName|SKU名称|string||
|&emsp;&emsp;status|状态（0-无效，1-有效）|integer(int32)||
|&emsp;&emsp;updateTime|更新时间|string(date-time)||
|&emsp;&emsp;userId|用户ID（逻辑关联sys_user表）|integer(int64)||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": [
		{
			"createTime": "",
			"id": 0,
			"merchantId": 0,
			"merchantName": "",
			"price": 0,
			"productId": 0,
			"productName": "",
			"quantity": 0,
			"skuId": 0,
			"skuName": "",
			"status": 0,
			"updateTime": "",
			"userId": 0
		}
	],
	"message": "",
	"timestamp": 0
}
```