

## 通过ID查询订单详情（包含订单项）


**接口地址**:`/order/{id}/detail`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|id|订单ID|path|true|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResponseResult«订单详情信息»|
|401|Unauthorized||
|403|Forbidden||
|404|Not Found||


**响应参数**:


| 参数名称 | 参数说明 | 类型 | schema |
| -------- | -------- | ----- |----- | 
|code||integer(int32)|integer(int32)|
|data||订单详情信息|订单详情信息|
|&emsp;&emsp;order|订单信息|订单信息|订单信息|
|&emsp;&emsp;&emsp;&emsp;createTime|创建时间|string||
|&emsp;&emsp;&emsp;&emsp;deliveryTime|发货时间|string||
|&emsp;&emsp;&emsp;&emsp;discountAmount|优惠金额|number||
|&emsp;&emsp;&emsp;&emsp;id|订单ID|integer||
|&emsp;&emsp;&emsp;&emsp;merchantId|商户ID（逻辑关联sys_user表）|integer||
|&emsp;&emsp;&emsp;&emsp;orderNo|订单编号|string||
|&emsp;&emsp;&emsp;&emsp;payAmount|实际支付金额|number||
|&emsp;&emsp;&emsp;&emsp;paymentMethod|支付方式（1-支付宝，2-微信，3-银行卡）|integer||
|&emsp;&emsp;&emsp;&emsp;paymentTime|支付时间|string||
|&emsp;&emsp;&emsp;&emsp;receiveTime|收货时间|string||
|&emsp;&emsp;&emsp;&emsp;receiverAddress|收货地址|string||
|&emsp;&emsp;&emsp;&emsp;receiverName|收货人姓名|string||
|&emsp;&emsp;&emsp;&emsp;receiverPhone|收货人电话|string||
|&emsp;&emsp;&emsp;&emsp;remark|订单备注|string||
|&emsp;&emsp;&emsp;&emsp;status|订单状态（1-待付款，2-已付款，3-已发货，4-已完成，5-已取消，6-退款中，7-已退款）|integer||
|&emsp;&emsp;&emsp;&emsp;totalAmount|订单总金额|number||
|&emsp;&emsp;&emsp;&emsp;updateTime|更新时间|string||
|&emsp;&emsp;&emsp;&emsp;userId|用户ID（逻辑关联sys_user表）|integer||
|&emsp;&emsp;orderItems|订单项列表|array|订单明细信息|
|&emsp;&emsp;&emsp;&emsp;createTime|创建时间|string||
|&emsp;&emsp;&emsp;&emsp;id|订单明细ID|integer||
|&emsp;&emsp;&emsp;&emsp;merchantId|商户ID（逻辑关联sys_user表）|integer||
|&emsp;&emsp;&emsp;&emsp;orderId|订单ID（逻辑关联order表）|integer||
|&emsp;&emsp;&emsp;&emsp;price|单价|number||
|&emsp;&emsp;&emsp;&emsp;productId|产品ID（逻辑关联product表）|integer||
|&emsp;&emsp;&emsp;&emsp;productName|产品名称|string||
|&emsp;&emsp;&emsp;&emsp;quantity|数量|integer||
|&emsp;&emsp;&emsp;&emsp;skuId|SKU ID（逻辑关联product_sku表）|integer||
|&emsp;&emsp;&emsp;&emsp;skuName|SKU名称|string||
|&emsp;&emsp;&emsp;&emsp;totalPrice|总价|number||
|&emsp;&emsp;&emsp;&emsp;updateTime|更新时间|string||
|message||string||
|timestamp||integer(int64)|integer(int64)|


**响应示例**:
```javascript
{
	"code": 0,
	"data": {
		"order": {
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
		"orderItems": [
			{
				"createTime": "",
				"id": 0,
				"merchantId": 0,
				"orderId": 0,
				"price": 0,
				"productId": 0,
				"productName": "",
				"quantity": 0,
				"skuId": 0,
				"skuName": "",
				"totalPrice": 0,
				"updateTime": ""
			}
		]
	},
	"message": "",
	"timestamp": 0
}
```