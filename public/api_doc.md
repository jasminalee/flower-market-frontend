


## 购物车-或者单个商品结账


**接口地址**:`/order/cartPurchase`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
[
  {
    "createTime": "",
    "id": 0,
    "merchantId": 0,
    "merchantProductId": 0,
    "price": 0,
    "quantity": 0,
    "skuId": 0,
    "status": 0,
    "updateTime": "",
    "userId": 0
  }
]
```


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|remark|备注|query|true|string||
|shoppingCarts|shoppingCarts|body|true|array|购物车信息|
|&emsp;&emsp;createTime|创建时间||false|string(date-time)||
|&emsp;&emsp;id|||false|integer(int64)||
|&emsp;&emsp;merchantId|商户ID（逻辑关联sys_user表）||false|integer(int64)||
|&emsp;&emsp;merchantProductId|商品ID（逻辑关联MerchantProduct表）||false|integer(int64)||
|&emsp;&emsp;price|单价||false|number||
|&emsp;&emsp;quantity|数量||false|integer(int32)||
|&emsp;&emsp;skuId|SKU ID（逻辑关联product_sku表）||false|integer(int64)||
|&emsp;&emsp;status|状态（0-无效，1-有效）||false|integer(int32)||
|&emsp;&emsp;updateTime|更新时间||false|string(date-time)||
|&emsp;&emsp;userId|用户ID（逻辑关联sys_user表）||false|integer(int64)||
|userId|用户ID|query|true|integer(int64)||
|receiverAddressId|收货信息ID|query|false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResponseResult«订单信息»|
|201|Created||
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||订单信息|订单信息|
|&emsp;&emsp;createTime|创建时间|string(date-time)||
|&emsp;&emsp;deliveryTime|发货时间|string(date-time)||
|&emsp;&emsp;discountAmount|优惠金额|number||
|&emsp;&emsp;id|订单ID|integer(int64)||
|&emsp;&emsp;orderNo|订单编号|string||
|&emsp;&emsp;payAmount|实际支付金额|number||
|&emsp;&emsp;paymentMethod|支付方式（1-支付宝，2-微信，3-银行卡）|integer(int32)||
|&emsp;&emsp;paymentTime|支付时间|string(date-time)||
|&emsp;&emsp;receiveTime|收货时间|string(date-time)||
|&emsp;&emsp;receiverAddress|收货地址|string||
|&emsp;&emsp;receiverName|收货人姓名|string||
|&emsp;&emsp;receiverPhone|收货人电话|string||
|&emsp;&emsp;remark|订单备注|string||
|&emsp;&emsp;status|订单状态（1-待付款，2-已付款，3-已发货，4-已完成，5-已取消，6-退款中，7-已退款）|integer(int32)||
|&emsp;&emsp;totalAmount|订单总金额|number||
|&emsp;&emsp;updateTime|更新时间|string(date-time)||
|&emsp;&emsp;userId|用户ID（逻辑关联sys_user表）|integer(int64)||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"createTime": "",
		"deliveryTime": "",
		"discountAmount": 0,
		"id": 0,
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