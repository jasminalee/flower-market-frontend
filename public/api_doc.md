

## 分页查询（支持根据产品名称或编码查询）


**接口地址**:`/merchantProduct/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|current|页码|query|false|integer(int64)||
|merchantId|商户id(用户id)|query|false|string||
|productCode|产品编码|query|false|string||
|productName|产品名称|query|false|string||
|size|每页数量|query|false|integer(int64)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResponseResult«Page«商户产品信息»»|
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
  "code": 200,
  "message": "操作成功",
  "data": {
    "records": [
      {
        "id": 1,
        "merchantId": 1,
        "productId": 1,
        "skuId": 1,
        "merchantName": "红玫瑰11朵装-花语",
        "price": 109,
        "brand": "花语",
        "description": "鲜艳的红玫瑰，适合表达爱意",
        "subImages": "[\"http://localhost:18091/images/uploads/9497d8b9074b4652bc2bf04804a451a3.jpg\", \"http://localhost:18091/images/uploads/760c4697d3d640ce82faa0652d9c97ff.jpg\"]",
        "detail": "<ul><li><span style=\"color: rgb(255, 77, 79);\">测试标签</span></li></ul><p><img src=\"http://localhost:18091/images/uploads/760c4697d3d640ce82faa0652d9c97ff.jpg\" alt=\"image.png\" data-href=\"图片加载中...\" style=\"\"/></p>",
        "stock": 20,
        "avgRating": 4.8,
        "totalSales": 150,
        "minPrice": 109,
        "isHot": 1,
        "isDiscounted": 1,
        "status": 1,
        "createTime": "2025-09-29 13:17:22",
        "updateTime": "2025-09-29 13:17:22"
      },
      {
        "id": 2,
        "merchantId": 1,
        "productId": 1,
        "skuId": 2,
        "merchantName": "红玫瑰21朵装-花语",
        "price": 178,
        "brand": "花语",
        "description": "21朵红玫瑰礼盒装，浪漫升级",
        "subImages": "[\"http://localhost:18091/images/uploads/9497d8b9074b4652bc2bf04804a451a3.jpg\"]",
        "detail": "<p>21朵红玫瑰礼盒，适合重要节日和纪念日</p>",
        "stock": 10,
        "avgRating": 4.8,
        "totalSales": 80,
        "minPrice": 178,
        "isHot": 1,
        "isDiscounted": 0,
        "status": 1,
        "createTime": "2025-09-29 13:17:22",
        "updateTime": "2025-09-29 13:17:22"
      }
    ],
    "total": 6,
    "size": 10,
    "current": 1,
    "orders": [],
    "optimizeCountSql": true,
    "searchCount": true,
    "maxLimit": null,
    "countId": null,
    "pages": 1
  },
  "timestamp": 1759729169075
}
```




## 新增-更新数据


**接口地址**:`/merchantProduct`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "avgRating": 0,
  "brand": "",
  "createTime": "",
  "description": "",
  "detail": "",
  "id": 0,
  "isDiscounted": 0,
  "isHot": 0,
  "merchantId": 0,
  "merchantName": "",
  "minPrice": 0,
  "price": 0,
  "productId": 0,
  "skuId": 0,
  "status": 0,
  "stock": 0,
  "subImages": "",
  "totalSales": 0,
  "updateTime": ""
}
```


**请求参数**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型    | 是否必须 | 数据类型 | schema |
| -------- | -------- | ----- | -------- | -------- | ------ |
|merchantProduct|merchantProduct|body|true|商户产品信息|商户产品信息|
|    avgRating|平均评分||false|number||
|    brand|品牌||false|string||
|    createTime|创建时间||false|string(date-time)||
|    description|产品描述||false|string||
|    detail|产品详情||false|string||
|    id|ID||false|integer(int64)||
|    isDiscounted|是否打折(1:是,0:否)||false|integer(int32)||
|    isHot|是否热销(1:是,0:否)||false|integer(int32)||
|    merchantId|商户ID（逻辑关联sys_user表）||false|integer(int64)||
|    merchantName|商品名称||false|string||
|    minPrice|最低价格||false|number||
|    price|商户定价||false|number||
|    productId|产品ID（逻辑关联product表）||false|integer(int64)||
|    skuId|SKU ID（逻辑关联product_sku表）||false|integer(int64)||
|    status|状态（0-下架，1-上架）||false|integer(int32)||
|    stock|商户库存||false|integer(int32)||
|    subImages|子图URL集合，JSON格式存储||false|string||
|    totalSales|总销量||false|integer(int32)||
|    updateTime|更新时间||false|string(date-time)||


**响应状态**:


| 状态码 | 说明 | schema |
| -------- | -------- | ----- | 
|200|OK|ResponseResult|
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