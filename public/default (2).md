API文档
简介:API文档

HOST:localhost:18091

联系人:

Version:1.0

接口路径:/v2/api-docs

API文档
产品SKU表对象功能接口
新增-更新数据
列表查询
分页查询
根据产品ID查询SKU列表
通过ID查询单条数据
通过主键删除数据
产品信息表对象功能接口
新增-更新数据
获取产品详情包括SKU信息
主页商品列表（支持分类和搜索）
列表查询
分页查询
通过ID查询单条数据
通过主键删除数据
产品分类表对象功能接口
新增-更新数据
获取主页用的分类列表（只包含启用的一级分类）
列表查询
分页查询
获取分类树结构
通过ID查询单条数据
通过主键删除数据
商户产品关联表对象功能接口
新增-更新数据
分页查询
查询商品在各商户的价格和库存
通过ID查询单条数据
通过主键删除数据
商户操作接口
商户产品列表
商户下架产品
商户上架产品
更新产品库存
查询产品的SKU列表
查询所有可上架的产品
通用评论表对象功能接口
新增-更新数据
分页查询
根据来源ID和类型查询评论列表
通过ID查询单条数据
通过主键删除数据

产品SKU表对象功能接口
新增-更新数据
接口地址:/productSku

请求方式:POST

请求数据类型:application/json

响应数据类型:*/*

接口描述:

请求示例:

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
请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
productSku	productSku	body	true	产品SKU信息	产品SKU信息
createTime	创建时间		false	string(date-time)	
id	SKU ID		false	integer(int64)	
price	价格		false	number	
productId	产品ID（逻辑关联product表）		false	integer(int64)	
skuCode	SKU编码		false	string	
skuName	SKU名称（如：红色-L）		false	string	
specifications	规格描述，JSON格式存储		false	string	
status	状态（0-无效，1-有效）		false	integer(int32)	
stock	库存数量		false	integer(int32)	
updateTime	更新时间		false	string(date-time)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«boolean»
201	Created	
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		boolean	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
	"code": 0,
	"data": true,
	"message": "",
	"timestamp": 0
}
列表查询
接口地址:/productSku/list

请求方式:GET

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
price	价格	query	true	number	
skuCode	SKU编码	query	true	string	
skuName	SKU名称（如：红色-L）	query	true	string	
stock	库存数量	query	true	integer(int32)	
createTime	创建时间	query	false	string(date-time)	
id	SKU ID	query	false	integer(int64)	
productId	产品ID（逻辑关联product表）	query	false	integer(int64)	
specifications	规格描述，JSON格式存储	query	false	string	
status	状态（0-无效，1-有效）	query	false	integer(int32)	
updateTime	更新时间	query	false	string(date-time)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«List«产品SKU信息»»
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		array	产品SKU信息
createTime	创建时间	string(date-time)	
id	SKU ID	integer(int64)	
price	价格	number	
productId	产品ID（逻辑关联product表）	integer(int64)	
skuCode	SKU编码	string	
skuName	SKU名称（如：红色-L）	string	
specifications	规格描述，JSON格式存储	string	
status	状态（0-无效，1-有效）	integer(int32)	
stock	库存数量	integer(int32)	
updateTime	更新时间	string(date-time)	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
	"code": 0,
	"data": [
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
	],
	"message": "",
	"timestamp": 0
}
分页查询
接口地址:/productSku/page

请求方式:GET

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
price	价格	query	true	number	
skuCode	SKU编码	query	true	string	
skuName	SKU名称（如：红色-L）	query	true	string	
stock	库存数量	query	true	integer(int32)	
createTime	创建时间	query	false	string(date-time)	
current	current	query	false	integer(int64)	
id	SKU ID	query	false	integer(int64)	
productId	产品ID（逻辑关联product表）	query	false	integer(int64)	
size	size	query	false	integer(int64)	
specifications	规格描述，JSON格式存储	query	false	string	
status	状态（0-无效，1-有效）	query	false	integer(int32)	
updateTime	更新时间	query	false	string(date-time)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«Page«产品SKU信息»»
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		Page«产品SKU信息»	Page«产品SKU信息»
countId		string	
current		integer(int64)	
maxLimit		integer(int64)	
optimizeCountSql		boolean	
orders		array	OrderItem
asc		boolean	
column		string	
pages		integer(int64)	
records		array	产品SKU信息
createTime	创建时间	string	
id	SKU ID	integer	
price	价格	number	
productId	产品ID（逻辑关联product表）	integer	
skuCode	SKU编码	string	
skuName	SKU名称（如：红色-L）	string	
specifications	规格描述，JSON格式存储	string	
status	状态（0-无效，1-有效）	integer	
stock	库存数量	integer	
updateTime	更新时间	string	
searchCount		boolean	
size		integer(int64)	
total		integer(int64)	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

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
		],
		"searchCount": true,
		"size": 0,
		"total": 0
	},
	"message": "",
	"timestamp": 0
}
根据产品ID查询SKU列表
接口地址:/productSku/product/{productId}

请求方式:GET

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
productId	productId	path	true	integer(int64)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«List«产品SKU信息»»
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		array	产品SKU信息
createTime	创建时间	string(date-time)	
id	SKU ID	integer(int64)	
price	价格	number	
productId	产品ID（逻辑关联product表）	integer(int64)	
skuCode	SKU编码	string	
skuName	SKU名称（如：红色-L）	string	
specifications	规格描述，JSON格式存储	string	
status	状态（0-无效，1-有效）	integer(int32)	
stock	库存数量	integer(int32)	
updateTime	更新时间	string(date-time)	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
	"code": 0,
	"data": [
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
	],
	"message": "",
	"timestamp": 0
}
通过ID查询单条数据
接口地址:/productSku/{id}

请求方式:GET

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
id	id	path	true	integer(int64)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«产品SKU信息»
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		产品SKU信息	产品SKU信息
createTime	创建时间	string(date-time)	
id	SKU ID	integer(int64)	
price	价格	number	
productId	产品ID（逻辑关联product表）	integer(int64)	
skuCode	SKU编码	string	
skuName	SKU名称（如：红色-L）	string	
specifications	规格描述，JSON格式存储	string	
status	状态（0-无效，1-有效）	integer(int32)	
stock	库存数量	integer(int32)	
updateTime	更新时间	string(date-time)	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
	"code": 0,
	"data": {
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
	},
	"message": "",
	"timestamp": 0
}
通过主键删除数据
接口地址:/productSku/{id}

请求方式:DELETE

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
id	id	path	true	integer(int64)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«boolean»
204	No Content	
401	Unauthorized	
403	Forbidden	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		boolean	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
	"code": 0,
	"data": true,
	"message": "",
	"timestamp": 0
}
产品信息表对象功能接口
新增-更新数据
接口地址:/product

请求方式:POST

请求数据类型:application/json

响应数据类型:*/*

接口描述:

请求示例:

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
请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
product	product	body	true	产品信息	产品信息
brand	品牌		false	string	
categoryId	分类ID（逻辑关联product_category表）		false	integer(int64)	
createTime	创建时间		false	string(date-time)	
description	产品描述		false	string	
detail	产品详情		false	string	
id	产品ID		false	integer(int64)	
mainImage	主图URL		false	string	
productCode	产品编码		false	string	
productName	产品名称		false	string	
productType	产品类型（1-花卉，2-第三方产品）		false	integer(int32)	
status	状态（0-下架，1-上架）		false	integer(int32)	
subImages	子图URL集合，JSON格式存储		false	string	
updateTime	更新时间		false	string(date-time)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«boolean»
201	Created	
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		boolean	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
	"code": 0,
	"data": true,
	"message": "",
	"timestamp": 0
}
获取产品详情包括SKU信息
接口地址:/product/detail/{id}

请求方式:GET

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
id	产品ID	path	true	integer(int64)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«产品详情VO»
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		产品详情VO	产品详情VO
product	产品基本信息	产品信息	产品信息
brand	品牌	string	
categoryId	分类ID（逻辑关联product_category表）	integer	
createTime	创建时间	string	
description	产品描述	string	
detail	产品详情	string	
id	产品ID	integer	
mainImage	主图URL	string	
productCode	产品编码	string	
productName	产品名称	string	
productType	产品类型（1-花卉，2-第三方产品）	integer	
status	状态（0-下架，1-上架）	integer	
subImages	子图URL集合，JSON格式存储	string	
updateTime	更新时间	string	
skus	产品SKU列表	array	产品SKU信息
createTime	创建时间	string	
id	SKU ID	integer	
price	价格	number	
productId	产品ID（逻辑关联product表）	integer	
skuCode	SKU编码	string	
skuName	SKU名称（如：红色-L）	string	
specifications	规格描述，JSON格式存储	string	
status	状态（0-无效，1-有效）	integer	
stock	库存数量	integer	
updateTime	更新时间	string	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

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
主页商品列表（支持分类和搜索）
接口地址:/product/homepage

请求方式:GET

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
categoryId	分类ID	query	false	integer(int64)	
current	页码	query	false	integer(int64)	
keyword	搜索关键字	query	false	string	
size	每页数量	query	false	integer(int64)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«Page«产品信息»»
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		Page«产品信息»	Page«产品信息»
countId		string	
current		integer(int64)	
maxLimit		integer(int64)	
optimizeCountSql		boolean	
orders		array	OrderItem
asc		boolean	
column		string	
pages		integer(int64)	
records		array	产品信息
brand	品牌	string	
categoryId	分类ID（逻辑关联product_category表）	integer	
createTime	创建时间	string	
description	产品描述	string	
detail	产品详情	string	
id	产品ID	integer	
mainImage	主图URL	string	
productCode	产品编码	string	
productName	产品名称	string	
productType	产品类型（1-花卉，2-第三方产品）	integer	
status	状态（0-下架，1-上架）	integer	
subImages	子图URL集合，JSON格式存储	string	
updateTime	更新时间	string	
searchCount		boolean	
size		integer(int64)	
total		integer(int64)	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

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
列表查询
接口地址:/product/list

请求方式:GET

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
categoryId	分类ID（逻辑关联product_category表）	query	true	integer(int64)	
productCode	产品编码	query	true	string	
productName	产品名称	query	true	string	
productType	产品类型（1-花卉，2-第三方产品）	query	true	integer(int32)	
status	状态（0-下架，1-上架）	query	true	integer(int32)	
brand	品牌	query	false	string	
createTime	创建时间	query	false	string(date-time)	
description	产品描述	query	false	string	
detail	产品详情	query	false	string	
id	产品ID	query	false	integer(int64)	
mainImage	主图URL	query	false	string	
subImages	子图URL集合，JSON格式存储	query	false	string	
updateTime	更新时间	query	false	string(date-time)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«List«产品信息»»
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		array	产品信息
brand	品牌	string	
categoryId	分类ID（逻辑关联product_category表）	integer(int64)	
createTime	创建时间	string(date-time)	
description	产品描述	string	
detail	产品详情	string	
id	产品ID	integer(int64)	
mainImage	主图URL	string	
productCode	产品编码	string	
productName	产品名称	string	
productType	产品类型（1-花卉，2-第三方产品）	integer(int32)	
status	状态（0-下架，1-上架）	integer(int32)	
subImages	子图URL集合，JSON格式存储	string	
updateTime	更新时间	string(date-time)	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

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
分页查询
接口地址:/product/page

请求方式:GET

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
categoryId	分类ID（逻辑关联product_category表）	query	true	integer(int64)	
productCode	产品编码	query	true	string	
productName	产品名称	query	true	string	
productType	产品类型（1-花卉，2-第三方产品）	query	true	integer(int32)	
status	状态（0-下架，1-上架）	query	true	integer(int32)	
brand	品牌	query	false	string	
createTime	创建时间	query	false	string(date-time)	
current	页码	query	false	integer(int64)	
description	产品描述	query	false	string	
detail	产品详情	query	false	string	
id	产品ID	query	false	integer(int64)	
mainImage	主图URL	query	false	string	
size	每页数量	query	false	integer(int64)	
subImages	子图URL集合，JSON格式存储	query	false	string	
updateTime	更新时间	query	false	string(date-time)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«Page«产品信息»»
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		Page«产品信息»	Page«产品信息»
countId		string	
current		integer(int64)	
maxLimit		integer(int64)	
optimizeCountSql		boolean	
orders		array	OrderItem
asc		boolean	
column		string	
pages		integer(int64)	
records		array	产品信息
brand	品牌	string	
categoryId	分类ID（逻辑关联product_category表）	integer	
createTime	创建时间	string	
description	产品描述	string	
detail	产品详情	string	
id	产品ID	integer	
mainImage	主图URL	string	
productCode	产品编码	string	
productName	产品名称	string	
productType	产品类型（1-花卉，2-第三方产品）	integer	
status	状态（0-下架，1-上架）	integer	
subImages	子图URL集合，JSON格式存储	string	
updateTime	更新时间	string	
searchCount		boolean	
size		integer(int64)	
total		integer(int64)	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

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
通过ID查询单条数据
接口地址:/product/{id}

请求方式:GET

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
id	产品ID	path	true	integer(int64)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«产品信息»
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		产品信息	产品信息
brand	品牌	string	
categoryId	分类ID（逻辑关联product_category表）	integer(int64)	
createTime	创建时间	string(date-time)	
description	产品描述	string	
detail	产品详情	string	
id	产品ID	integer(int64)	
mainImage	主图URL	string	
productCode	产品编码	string	
productName	产品名称	string	
productType	产品类型（1-花卉，2-第三方产品）	integer(int32)	
status	状态（0-下架，1-上架）	integer(int32)	
subImages	子图URL集合，JSON格式存储	string	
updateTime	更新时间	string(date-time)	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

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
通过主键删除数据
接口地址:/product/{id}

请求方式:DELETE

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
id	产品ID	path	true	integer(int64)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«boolean»
204	No Content	
401	Unauthorized	
403	Forbidden	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		boolean	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
	"code": 0,
	"data": true,
	"message": "",
	"timestamp": 0
}
产品分类表对象功能接口
新增-更新数据
接口地址:/productCategory

请求方式:POST

请求数据类型:application/json

响应数据类型:*/*

接口描述:

请求示例:

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
请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
productCategory	productCategory	body	true	产品分类信息	产品分类信息
categoryLevel	分类级别（1-一级分类，2-二级分类，3-三级分类）		false	integer(int32)	
categoryName	分类名称		false	string	
createTime	创建时间		false	string(date-time)	
id	分类ID		false	integer(int64)	
parentId	父分类ID（用于构建分类树）		false	integer(int64)	
sort	排序号		false	integer(int32)	
status	状态（0-禁用，1-正常）		false	integer(int32)	
updateTime	更新时间		false	string(date-time)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«boolean»
201	Created	
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		boolean	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
	"code": 0,
	"data": true,
	"message": "",
	"timestamp": 0
}
获取主页用的分类列表（只包含启用的一级分类）
接口地址:/productCategory/homepage

请求方式:GET

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

暂无

响应状态:

状态码	说明	schema
200	OK	ResponseResult«List«产品分类信息»»
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		array	产品分类信息
categoryLevel	分类级别（1-一级分类，2-二级分类，3-三级分类）	integer(int32)	
categoryName	分类名称	string	
createTime	创建时间	string(date-time)	
id	分类ID	integer(int64)	
parentId	父分类ID（用于构建分类树）	integer(int64)	
sort	排序号	integer(int32)	
status	状态（0-禁用，1-正常）	integer(int32)	
updateTime	更新时间	string(date-time)	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
	"code": 0,
	"data": [
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
	],
	"message": "",
	"timestamp": 0
}
列表查询
接口地址:/productCategory/list

请求方式:GET

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
categoryLevel	分类级别（1-一级分类，2-二级分类，3-三级分类）	query	true	integer(int32)	
categoryName	分类名称	query	true	string	
status	状态（0-禁用，1-正常）	query	true	integer(int32)	
createTime	创建时间	query	false	string(date-time)	
id	分类ID	query	false	integer(int64)	
parentId	父分类ID（用于构建分类树）	query	false	integer(int64)	
sort	排序号	query	false	integer(int32)	
updateTime	更新时间	query	false	string(date-time)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«List«产品分类信息»»
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		array	产品分类信息
categoryLevel	分类级别（1-一级分类，2-二级分类，3-三级分类）	integer(int32)	
categoryName	分类名称	string	
createTime	创建时间	string(date-time)	
id	分类ID	integer(int64)	
parentId	父分类ID（用于构建分类树）	integer(int64)	
sort	排序号	integer(int32)	
status	状态（0-禁用，1-正常）	integer(int32)	
updateTime	更新时间	string(date-time)	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
	"code": 0,
	"data": [
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
	],
	"message": "",
	"timestamp": 0
}
分页查询
接口地址:/productCategory/page

请求方式:GET

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
categoryLevel	分类级别（1-一级分类，2-二级分类，3-三级分类）	query	true	integer(int32)	
categoryName	分类名称	query	true	string	
status	状态（0-禁用，1-正常）	query	true	integer(int32)	
createTime	创建时间	query	false	string(date-time)	
current	页码	query	false	integer(int64)	
id	分类ID	query	false	integer(int64)	
parentId	父分类ID（用于构建分类树）	query	false	integer(int64)	
size	每页数量	query	false	integer(int64)	
sort	排序号	query	false	integer(int32)	
updateTime	更新时间	query	false	string(date-time)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«Page«产品分类信息»»
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		Page«产品分类信息»	Page«产品分类信息»
countId		string	
current		integer(int64)	
maxLimit		integer(int64)	
optimizeCountSql		boolean	
orders		array	OrderItem
asc		boolean	
column		string	
pages		integer(int64)	
records		array	产品分类信息
categoryLevel	分类级别（1-一级分类，2-二级分类，3-三级分类）	integer	
categoryName	分类名称	string	
createTime	创建时间	string	
id	分类ID	integer	
parentId	父分类ID（用于构建分类树）	integer	
sort	排序号	integer	
status	状态（0-禁用，1-正常）	integer	
updateTime	更新时间	string	
searchCount		boolean	
size		integer(int64)	
total		integer(int64)	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

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
				"categoryLevel": 0,
				"categoryName": "",
				"createTime": "",
				"id": 0,
				"parentId": 0,
				"sort": 0,
				"status": 0,
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
获取分类树结构
接口地址:/productCategory/tree

请求方式:GET

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

暂无

响应状态:

状态码	说明	schema
200	OK	ResponseResult«List«产品分类树VO»»
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		array	产品分类树VO
categoryLevel	分类级别	integer(int32)	
categoryName	分类名称	string	
children	子分类列表	array	产品分类树VO
id	分类ID	integer(int64)	
parentId	父分类ID	integer(int64)	
sort	排序号	integer(int32)	
status	状态	integer(int32)	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
	"code": 0,
	"data": [
		{
			"categoryLevel": 0,
			"categoryName": "",
			"children": [
				{
					"categoryLevel": 0,
					"categoryName": "",
					"children": [
						{}
					],
					"id": 0,
					"parentId": 0,
					"sort": 0,
					"status": 0
				}
			],
			"id": 0,
			"parentId": 0,
			"sort": 0,
			"status": 0
		}
	],
	"message": "",
	"timestamp": 0
}
通过ID查询单条数据
接口地址:/productCategory/{id}

请求方式:GET

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
id	分类ID	path	true	integer(int64)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«产品分类信息»
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		产品分类信息	产品分类信息
categoryLevel	分类级别（1-一级分类，2-二级分类，3-三级分类）	integer(int32)	
categoryName	分类名称	string	
createTime	创建时间	string(date-time)	
id	分类ID	integer(int64)	
parentId	父分类ID（用于构建分类树）	integer(int64)	
sort	排序号	integer(int32)	
status	状态（0-禁用，1-正常）	integer(int32)	
updateTime	更新时间	string(date-time)	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
	"code": 0,
	"data": {
		"categoryLevel": 0,
		"categoryName": "",
		"createTime": "",
		"id": 0,
		"parentId": 0,
		"sort": 0,
		"status": 0,
		"updateTime": ""
	},
	"message": "",
	"timestamp": 0
}
通过主键删除数据
接口地址:/productCategory/{id}

请求方式:DELETE

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
id	分类ID	path	true	integer(int64)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«boolean»
204	No Content	
401	Unauthorized	
403	Forbidden	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		boolean	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
	"code": 0,
	"data": true,
	"message": "",
	"timestamp": 0
}
商户产品关联表对象功能接口
新增-更新数据
接口地址:/merchantProduct

请求方式:POST

请求数据类型:application/json

响应数据类型:*/*

接口描述:

请求示例:

{
  "createTime": "",
  "id": 0,
  "merchantId": 0,
  "price": 0,
  "productId": 0,
  "skuId": 0,
  "status": 0,
  "stock": 0,
  "updateTime": ""
}
请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
merchantProduct	merchantProduct	body	true	商户产品信息	商户产品信息
createTime	创建时间		false	string(date-time)	
id	主键ID		false	integer(int64)	
merchantId	商户ID（关联sys_user表）		false	integer(int64)	
price	商户定价		false	number	
productId	产品ID		false	integer(int64)	
skuId	SKU ID		false	integer(int64)	
status	状态（0-下架，1-上架）		false	integer(int32)	
stock	商户库存		false	integer(int32)	
updateTime	更新时间		false	string(date-time)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«boolean»
201	Created	
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		boolean	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
	"code": 0,
	"data": true,
	"message": "",
	"timestamp": 0
}
分页查询
接口地址:/merchantProduct/page

请求方式:GET

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
createTime	创建时间	query	false	string(date-time)	
current	页码	query	false	integer(int64)	
id	主键ID	query	false	integer(int64)	
merchantId	商户ID（关联sys_user表）	query	false	integer(int64)	
price	商户定价	query	false	number	
productId	产品ID	query	false	integer(int64)	
size	每页数量	query	false	integer(int64)	
skuId	SKU ID	query	false	integer(int64)	
status	状态（0-下架，1-上架）	query	false	integer(int32)	
stock	商户库存	query	false	integer(int32)	
updateTime	更新时间	query	false	string(date-time)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«Page«商户产品信息»»
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		Page«商户产品信息»	Page«商户产品信息»
countId		string	
current		integer(int64)	
maxLimit		integer(int64)	
optimizeCountSql		boolean	
orders		array	OrderItem
asc		boolean	
column		string	
pages		integer(int64)	
records		array	商户产品信息
createTime	创建时间	string	
id	主键ID	integer	
merchantId	商户ID（关联sys_user表）	integer	
price	商户定价	number	
productId	产品ID	integer	
skuId	SKU ID	integer	
status	状态（0-下架，1-上架）	integer	
stock	商户库存	integer	
updateTime	更新时间	string	
searchCount		boolean	
size		integer(int64)	
total		integer(int64)	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

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
				"id": 0,
				"merchantId": 0,
				"price": 0,
				"productId": 0,
				"skuId": 0,
				"status": 0,
				"stock": 0,
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
查询商品在各商户的价格和库存
接口地址:/merchantProduct/product/{productId}

请求方式:GET

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
productId	产品ID	path	true	integer(int64)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«List«商户产品VO»»
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		array	商户产品VO
id	商户产品ID	integer(int64)	
merchant	商户信息	系统用户信息	系统用户信息
addr	用户地址	string	
createTime	创建时间	string	
email	用户邮箱	string	
id	用户唯一标识	integer	
nickname	用户展示昵称	string	
password	加密存储的密码	string	
phone	用户联系电话	string	
status	用户状态（0-禁用，1-正常）	integer	
updateTime	更新时间	string	
username	登录用户名	string	
merchantId	商户ID	integer(int64)	
price	商户定价	number	
productId	产品ID	integer(int64)	
skuId	SKU ID	integer(int64)	
status	状态（0-下架，1-上架）	integer(int32)	
stock	商户库存	integer(int32)	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
	"code": 0,
	"data": [
		{
			"id": 0,
			"merchant": {
				"addr": "",
				"createTime": "",
				"email": "",
				"id": 0,
				"nickname": "",
				"password": "",
				"phone": "",
				"status": 0,
				"updateTime": "",
				"username": ""
			},
			"merchantId": 0,
			"price": 0,
			"productId": 0,
			"skuId": 0,
			"status": 0,
			"stock": 0
		}
	],
	"message": "",
	"timestamp": 0
}
通过ID查询单条数据
接口地址:/merchantProduct/{id}

请求方式:GET

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
id	商户产品ID	path	true	integer(int64)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«商户产品信息»
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		商户产品信息	商户产品信息
createTime	创建时间	string(date-time)	
id	主键ID	integer(int64)	
merchantId	商户ID（关联sys_user表）	integer(int64)	
price	商户定价	number	
productId	产品ID	integer(int64)	
skuId	SKU ID	integer(int64)	
status	状态（0-下架，1-上架）	integer(int32)	
stock	商户库存	integer(int32)	
updateTime	更新时间	string(date-time)	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
	"code": 0,
	"data": {
		"createTime": "",
		"id": 0,
		"merchantId": 0,
		"price": 0,
		"productId": 0,
		"skuId": 0,
		"status": 0,
		"stock": 0,
		"updateTime": ""
	},
	"message": "",
	"timestamp": 0
}
通过主键删除数据
接口地址:/merchantProduct/{id}

请求方式:DELETE

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
id	id	path	true	integer(int64)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«boolean»
204	No Content	
401	Unauthorized	
403	Forbidden	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		boolean	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
	"code": 0,
	"data": true,
	"message": "",
	"timestamp": 0
}
商户操作接口
商户产品列表
接口地址:/merchant/myProducts

请求方式:GET

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
merchantId	merchantId	query	true	integer(int64)	
current	current	query	false	integer(int64)	
size	size	query	false	integer(int64)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«Page«商户产品信息»»
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		Page«商户产品信息»	Page«商户产品信息»
countId		string	
current		integer(int64)	
maxLimit		integer(int64)	
optimizeCountSql		boolean	
orders		array	OrderItem
asc		boolean	
column		string	
pages		integer(int64)	
records		array	商户产品信息
createTime	创建时间	string	
id	主键ID	integer	
merchantId	商户ID（关联sys_user表）	integer	
price	商户定价	number	
productId	产品ID	integer	
skuId	SKU ID	integer	
status	状态（0-下架，1-上架）	integer	
stock	商户库存	integer	
updateTime	更新时间	string	
searchCount		boolean	
size		integer(int64)	
total		integer(int64)	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

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
				"id": 0,
				"merchantId": 0,
				"price": 0,
				"productId": 0,
				"skuId": 0,
				"status": 0,
				"stock": 0,
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
商户下架产品
接口地址:/merchant/product/offShelf/{merchantProductId}

请求方式:POST

请求数据类型:application/json

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
merchantProductId	merchantProductId	path	true	integer(int64)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«boolean»
201	Created	
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		boolean	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
	"code": 0,
	"data": true,
	"message": "",
	"timestamp": 0
}
商户上架产品
接口地址:/merchant/product/onShelf

请求方式:POST

请求数据类型:application/json

响应数据类型:*/*

接口描述:

请求示例:

{
  "createTime": "",
  "id": 0,
  "merchantId": 0,
  "price": 0,
  "productId": 0,
  "skuId": 0,
  "status": 0,
  "stock": 0,
  "updateTime": ""
}
请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
merchantProduct	merchantProduct	body	true	商户产品信息	商户产品信息
createTime	创建时间		false	string(date-time)	
id	主键ID		false	integer(int64)	
merchantId	商户ID（关联sys_user表）		false	integer(int64)	
price	商户定价		false	number	
productId	产品ID		false	integer(int64)	
skuId	SKU ID		false	integer(int64)	
status	状态（0-下架，1-上架）		false	integer(int32)	
stock	商户库存		false	integer(int32)	
updateTime	更新时间		false	string(date-time)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«boolean»
201	Created	
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		boolean	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
	"code": 0,
	"data": true,
	"message": "",
	"timestamp": 0
}
更新产品库存
接口地址:/merchant/product/updateStock

请求方式:POST

请求数据类型:application/json

响应数据类型:*/*

接口描述:

请求示例:

{
  "createTime": "",
  "id": 0,
  "merchantId": 0,
  "price": 0,
  "productId": 0,
  "skuId": 0,
  "status": 0,
  "stock": 0,
  "updateTime": ""
}
请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
merchantProduct	merchantProduct	body	true	商户产品信息	商户产品信息
createTime	创建时间		false	string(date-time)	
id	主键ID		false	integer(int64)	
merchantId	商户ID（关联sys_user表）		false	integer(int64)	
price	商户定价		false	number	
productId	产品ID		false	integer(int64)	
skuId	SKU ID		false	integer(int64)	
status	状态（0-下架，1-上架）		false	integer(int32)	
stock	商户库存		false	integer(int32)	
updateTime	更新时间		false	string(date-time)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«boolean»
201	Created	
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		boolean	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
	"code": 0,
	"data": true,
	"message": "",
	"timestamp": 0
}
查询产品的SKU列表
接口地址:/merchant/product/{productId}/skus

请求方式:GET

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
productId	productId	path	true	integer(int64)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«List«产品SKU信息»»
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		array	产品SKU信息
createTime	创建时间	string(date-time)	
id	SKU ID	integer(int64)	
price	价格	number	
productId	产品ID（逻辑关联product表）	integer(int64)	
skuCode	SKU编码	string	
skuName	SKU名称（如：红色-L）	string	
specifications	规格描述，JSON格式存储	string	
status	状态（0-无效，1-有效）	integer(int32)	
stock	库存数量	integer(int32)	
updateTime	更新时间	string(date-time)	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
	"code": 0,
	"data": [
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
	],
	"message": "",
	"timestamp": 0
}
查询所有可上架的产品
接口地址:/merchant/products

请求方式:GET

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
current	current	query	false	integer(int64)	
size	size	query	false	integer(int64)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«Page«产品信息»»
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		Page«产品信息»	Page«产品信息»
countId		string	
current		integer(int64)	
maxLimit		integer(int64)	
optimizeCountSql		boolean	
orders		array	OrderItem
asc		boolean	
column		string	
pages		integer(int64)	
records		array	产品信息
brand	品牌	string	
categoryId	分类ID（逻辑关联product_category表）	integer	
createTime	创建时间	string	
description	产品描述	string	
detail	产品详情	string	
id	产品ID	integer	
mainImage	主图URL	string	
productCode	产品编码	string	
productName	产品名称	string	
productType	产品类型（1-花卉，2-第三方产品）	integer	
status	状态（0-下架，1-上架）	integer	
subImages	子图URL集合，JSON格式存储	string	
updateTime	更新时间	string	
searchCount		boolean	
size		integer(int64)	
total		integer(int64)	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

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
通用评论表对象功能接口
新增-更新数据
接口地址:/comment

请求方式:POST

请求数据类型:application/json

响应数据类型:*/*

接口描述:

请求示例:

{
  "content": "",
  "createTime": "",
  "id": 0,
  "isAnonymous": 0,
  "orderId": 0,
  "parentId": 0,
  "rating": 0,
  "sourceId": 0,
  "sourceType": "",
  "status": 0,
  "updateTime": "",
  "userId": 0
}
请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
comment	comment	body	true	通用评论信息	通用评论信息
content	评论内容		false	string	
createTime	创建时间		false	string(date-time)	
id	评论ID		false	integer(int64)	
isAnonymous	是否匿名（0-否，1-是）		false	integer(int32)	
orderId	订单ID（逻辑关联order表，可为空，仅对产品评论有效）		false	integer(int64)	
parentId	父评论ID（用于构建评论树，0表示顶级评论）		false	integer(int64)	
rating	评分（1-5分，可为空）		false	integer(int32)	
sourceId	来源ID（可以是产品ID、文章ID等）		false	integer(int64)	
sourceType	来源类型（product, article, forum等）		false	string	
status	状态（0-隐藏，1-显示）		false	integer(int32)	
updateTime	更新时间		false	string(date-time)	
userId	用户ID（逻辑关联sys_user表）		false	integer(int64)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«boolean»
201	Created	
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		boolean	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
	"code": 0,
	"data": true,
	"message": "",
	"timestamp": 0
}
分页查询
接口地址:/comment/page

请求方式:GET

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
content	评论内容	query	false	string	
createTime	创建时间	query	false	string(date-time)	
current	current	query	false	integer(int64)	
id	评论ID	query	false	integer(int64)	
isAnonymous	是否匿名（0-否，1-是）	query	false	integer(int32)	
orderId	订单ID（逻辑关联order表，可为空，仅对产品评论有效）	query	false	integer(int64)	
parentId	父评论ID（用于构建评论树，0表示顶级评论）	query	false	integer(int64)	
rating	评分（1-5分，可为空）	query	false	integer(int32)	
size	size	query	false	integer(int64)	
sourceId	来源ID（可以是产品ID、文章ID等）	query	false	integer(int64)	
sourceType	来源类型（product, article, forum等）	query	false	string	
status	状态（0-隐藏，1-显示）	query	false	integer(int32)	
updateTime	更新时间	query	false	string(date-time)	
userId	用户ID（逻辑关联sys_user表）	query	false	integer(int64)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«Page«通用评论信息»»
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		Page«通用评论信息»	Page«通用评论信息»
countId		string	
current		integer(int64)	
maxLimit		integer(int64)	
optimizeCountSql		boolean	
orders		array	OrderItem
asc		boolean	
column		string	
pages		integer(int64)	
records		array	通用评论信息
content	评论内容	string	
createTime	创建时间	string	
id	评论ID	integer	
isAnonymous	是否匿名（0-否，1-是）	integer	
orderId	订单ID（逻辑关联order表，可为空，仅对产品评论有效）	integer	
parentId	父评论ID（用于构建评论树，0表示顶级评论）	integer	
rating	评分（1-5分，可为空）	integer	
sourceId	来源ID（可以是产品ID、文章ID等）	integer	
sourceType	来源类型（product, article, forum等）	string	
status	状态（0-隐藏，1-显示）	integer	
updateTime	更新时间	string	
userId	用户ID（逻辑关联sys_user表）	integer	
searchCount		boolean	
size		integer(int64)	
total		integer(int64)	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

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
				"content": "",
				"createTime": "",
				"id": 0,
				"isAnonymous": 0,
				"orderId": 0,
				"parentId": 0,
				"rating": 0,
				"sourceId": 0,
				"sourceType": "",
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
根据来源ID和类型查询评论列表
接口地址:/comment/source

请求方式:GET

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
sourceId	sourceId	query	true	integer(int64)	
sourceType	sourceType	query	true	string	
parentId	parentId	query	false	integer(int64)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«List«通用评论信息»»
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		array	通用评论信息
content	评论内容	string	
createTime	创建时间	string(date-time)	
id	评论ID	integer(int64)	
isAnonymous	是否匿名（0-否，1-是）	integer(int32)	
orderId	订单ID（逻辑关联order表，可为空，仅对产品评论有效）	integer(int64)	
parentId	父评论ID（用于构建评论树，0表示顶级评论）	integer(int64)	
rating	评分（1-5分，可为空）	integer(int32)	
sourceId	来源ID（可以是产品ID、文章ID等）	integer(int64)	
sourceType	来源类型（product, article, forum等）	string	
status	状态（0-隐藏，1-显示）	integer(int32)	
updateTime	更新时间	string(date-time)	
userId	用户ID（逻辑关联sys_user表）	integer(int64)	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
	"code": 0,
	"data": [
		{
			"content": "",
			"createTime": "",
			"id": 0,
			"isAnonymous": 0,
			"orderId": 0,
			"parentId": 0,
			"rating": 0,
			"sourceId": 0,
			"sourceType": "",
			"status": 0,
			"updateTime": "",
			"userId": 0
		}
	],
	"message": "",
	"timestamp": 0
}
通过ID查询单条数据
接口地址:/comment/{id}

请求方式:GET

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
id	id	path	true	integer(int64)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«通用评论信息»
401	Unauthorized	
403	Forbidden	
404	Not Found	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		通用评论信息	通用评论信息
content	评论内容	string	
createTime	创建时间	string(date-time)	
id	评论ID	integer(int64)	
isAnonymous	是否匿名（0-否，1-是）	integer(int32)	
orderId	订单ID（逻辑关联order表，可为空，仅对产品评论有效）	integer(int64)	
parentId	父评论ID（用于构建评论树，0表示顶级评论）	integer(int64)	
rating	评分（1-5分，可为空）	integer(int32)	
sourceId	来源ID（可以是产品ID、文章ID等）	integer(int64)	
sourceType	来源类型（product, article, forum等）	string	
status	状态（0-隐藏，1-显示）	integer(int32)	
updateTime	更新时间	string(date-time)	
userId	用户ID（逻辑关联sys_user表）	integer(int64)	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
	"code": 0,
	"data": {
		"content": "",
		"createTime": "",
		"id": 0,
		"isAnonymous": 0,
		"orderId": 0,
		"parentId": 0,
		"rating": 0,
		"sourceId": 0,
		"sourceType": "",
		"status": 0,
		"updateTime": "",
		"userId": 0
	},
	"message": "",
	"timestamp": 0
}
通过主键删除数据
接口地址:/comment/{id}

请求方式:DELETE

请求数据类型:application/x-www-form-urlencoded

响应数据类型:*/*

接口描述:

请求参数:

参数名称	参数说明	请求类型	是否必须	数据类型	schema
id	id	path	true	integer(int64)	
响应状态:

状态码	说明	schema
200	OK	ResponseResult«boolean»
204	No Content	
401	Unauthorized	
403	Forbidden	
响应参数:

参数名称	参数说明	类型	schema
code		integer(int32)	integer(int32)
data		boolean	
message		string	
timestamp		integer(int64)	integer(int64)
响应示例:

{
    "code": 0,
    "data": true,
    "message": "",
    "timestamp": 0
}