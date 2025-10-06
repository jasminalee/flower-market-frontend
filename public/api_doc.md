

## 添加商品到购物车


**接口地址**:`/shoppingCart/add`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "createTime": "",
  "id": 0,
  "merchantId": 0,
  "price": 0,
  "productId": 0,
  "quantity": 0,
  "skuId": 0,
  "status": 0,
  "updateTime": "",
  "userId": 0
}
```


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|shoppingCart|shoppingCart|body|true|购物车信息|购物车信息|
|    createTime|创建时间||false|string(date-time)||
|    id|||false|integer(int64)||
|    merchantId|商户ID（逻辑关联sys_user表）||false|integer(int64)||
|    price|单价||false|number||
|    productId|产品ID（逻辑关联product表）||false|integer(int64)||
|    quantity|数量||false|integer(int32)||
|    skuId|SKU ID（逻辑关联product_sku表）||false|integer(int64)||
|    status|状态（0-无效，1-有效）||false|integer(int32)||
|    updateTime|更新时间||false|string(date-time)||
|    userId|用户ID（逻辑关联sys_user表）||false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResponseResult«购物车信息»|
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