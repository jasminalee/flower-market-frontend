# API文档


**简介**:API文档


**HOST**:localhost:18091


**联系人**:


**Version**:1.0


**接口路径**:/v2/api-docs


[TOC]






# 图片查询接口


## 获取上传的图片


**接口地址**:`/images/uploads/{filename}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型 | schema |
| -------- | -------- | -------- | -------- | -------- | ------ |
| filename | 文件名   | path     | true     | string   |        |


**响应状态**:


| 状态码 | 说明         | schema   |
| ------ | ------------ | -------- |
| 200    | OK           | Resource |
| 401    | Unauthorized |          |
| 403    | Forbidden    |          |
| 404    | Not Found    |          |


**响应参数**:


| 参数名称    | 参数说明 | 类型        | schema      |
| ----------- | -------- | ----------- | ----------- |
| description |          | string      |             |
| file        |          | file        | file        |
| filename    |          | string      |             |
| inputStream |          | InputStream | InputStream |
| open        |          | boolean     |             |
| readable    |          | boolean     |             |
| uri         |          | string(uri) | string(uri) |
| url         |          | string(url) | string(url) |


**响应示例**:

```javascript
{
	"description": "",
	"file": "",
	"filename": "",
	"inputStream": {},
	"open": true,
	"readable": true,
	"uri": "",
	"url": ""
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


**响应示例**:

```javascript
{
	"code": 0,
	"data": "",
	"message": "",
	"timestamp": 0
}
```


# 论坛帖子表对象功能接口


## 新增-更新数据


**接口地址**:`/forumPost`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "categoryId": 0,
  "commentCount": 0,
  "content": "",
  "coverImage": "",
  "createTime": "",
  "favoriteCount": 0,
  "id": 0,
  "isEssence": 0,
  "isTop": 0,
  "likeCount": 0,
  "postType": 0,
  "status": 0,
  "title": "",
  "updateTime": "",
  "userId": 0,
  "videoUrl": "",
  "viewCount": 0
}
```


**请求参数**:


| 参数名称                  | 参数说明                           | 请求类型 | 是否必须 | 数据类型          | schema       |
| ------------------------- | ---------------------------------- | -------- | -------- | ----------------- | ------------ |
| forumPost                 | forumPost                          | body     | true     | 论坛帖子信息      | 论坛帖子信息 |
|     categoryId    | 板块ID（逻辑关联forum_category表） |          | false    | integer(int64)    |              |
|     commentCount  | 评论次数                           |          | false    | integer(int32)    |              |
|     content       | 帖子内容                           |          | false    | string            |              |
|     coverImage    | 视频封面图片URL                    |          | false    | string            |              |
|     createTime    | 创建时间                           |          | false    | string(date-time) |              |
|     favoriteCount | 收藏次数                           |          | false    | integer(int32)    |              |
|     id            | 帖子ID                             |          | false    | integer(int64)    |              |
|     isEssence     | 是否精华（0-否，1-是）             |          | false    | integer(int32)    |              |
|     isTop         | 是否置顶（0-否，1-是）             |          | false    | integer(int32)    |              |
|     likeCount     | 点赞次数                           |          | false    | integer(int32)    |              |
|     postType      | 帖子类型（1-普通文本，2-视频）     |          | false    | integer(int32)    |              |
|     status        | 状态（0-删除，1-正常，2-审核中）   |          | false    | integer(int32)    |              |
|     title         | 帖子标题                           |          | false    | string            |              |
|     updateTime    | 更新时间                           |          | false    | string(date-time) |              |
|     userId        | 用户ID（逻辑关联sys_user表）       |          | false    | integer(int64)    |              |
|     videoUrl      | 视频URL（仅当post_type为2时有效）  |          | false    | string            |              |
|     viewCount     | 浏览次数                           |          | false    | integer(int32)    |              |


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


## 根据用户ID查询帖子列表


**接口地址**:`/forumPost/byUser/{userId}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型       | schema |
| -------- | -------- | -------- | -------- | -------------- | ------ |
| userId   | 用户ID   | path     | true     | integer(int64) |        |
| current  | 页码     | query    | false    | integer(int64) |        |
| size     | 每页数量 | query    | false    | integer(int64) |        |


**响应状态**:


| 状态码 | 说明         | schema                             |
| ------ | ------------ | ---------------------------------- |
| 200    | OK           | ResponseResult«Page«论坛帖子信息»» |
| 401    | Unauthorized |                                    |
| 403    | Forbidden    |                                    |
| 404    | Not Found    |                                    |


**响应参数**:


| 参数名称                              | 参数说明                           | 类型               | schema             |
| ------------------------------------- | ---------------------------------- | ------------------ | ------------------ |
| code                                  |                                    | integer(int32)     | integer(int32)     |
| data                                  |                                    | Page«论坛帖子信息» | Page«论坛帖子信息» |
|     countId                   |                                    | string             |                    |
|     current                   |                                    | integer(int64)     |                    |
|     maxLimit                  |                                    | integer(int64)     |                    |
|     optimizeCountSql          |                                    | boolean            |                    |
|     orders                    |                                    | array              | OrderItem          |
|         asc           |                                    | boolean            |                    |
|         column        |                                    | string             |                    |
|     pages                     |                                    | integer(int64)     |                    |
|     records                   |                                    | array              | 论坛帖子信息       |
|         categoryId    | 板块ID（逻辑关联forum_category表） | integer            |                    |
|         commentCount  | 评论次数                           | integer            |                    |
|         content       | 帖子内容                           | string             |                    |
|         coverImage    | 视频封面图片URL                    | string             |                    |
|         createTime    | 创建时间                           | string             |                    |
|         favoriteCount | 收藏次数                           | integer            |                    |
|         id            | 帖子ID                             | integer            |                    |
|         isEssence     | 是否精华（0-否，1-是）             | integer            |                    |
|         isTop         | 是否置顶（0-否，1-是）             | integer            |                    |
|         likeCount     | 点赞次数                           | integer            |                    |
|         postType      | 帖子类型（1-普通文本，2-视频）     | integer            |                    |
|         status        | 状态（0-删除，1-正常，2-审核中）   | integer            |                    |
|         title         | 帖子标题                           | string             |                    |
|         updateTime    | 更新时间                           | string             |                    |
|         userId        | 用户ID（逻辑关联sys_user表）       | integer            |                    |
|         videoUrl      | 视频URL（仅当post_type为2时有效）  | string             |                    |
|         viewCount     | 浏览次数                           | integer            |                    |
|     searchCount               |                                    | boolean            |                    |
|     size                      |                                    | integer(int64)     |                    |
|     total                     |                                    | integer(int64)     |                    |
| message                               |                                    | string             |                    |
| timestamp                             |                                    | integer(int64)     | integer(int64)     |


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
				"categoryId": 0,
				"commentCount": 0,
				"content": "",
				"coverImage": "",
				"createTime": "",
				"favoriteCount": 0,
				"id": 0,
				"isEssence": 0,
				"isTop": 0,
				"likeCount": 0,
				"postType": 0,
				"status": 0,
				"title": "",
				"updateTime": "",
				"userId": 0,
				"videoUrl": "",
				"viewCount": 0
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


## 获取精华帖子列表


**接口地址**:`/forumPost/essence`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型       | schema |
| -------- | -------- | -------- | -------- | -------------- | ------ |
| limit    | 数量限制 | query    | false    | integer(int32) |        |


**响应状态**:


| 状态码 | 说明         | schema                             |
| ------ | ------------ | ---------------------------------- |
| 200    | OK           | ResponseResult«List«论坛帖子信息»» |
| 401    | Unauthorized |                                    |
| 403    | Forbidden    |                                    |
| 404    | Not Found    |                                    |


**响应参数**:


| 参数名称                  | 参数说明                           | 类型              | schema         |
| ------------------------- | ---------------------------------- | ----------------- | -------------- |
| code                      |                                    | integer(int32)    | integer(int32) |
| data                      |                                    | array             | 论坛帖子信息   |
|     categoryId    | 板块ID（逻辑关联forum_category表） | integer(int64)    |                |
|     commentCount  | 评论次数                           | integer(int32)    |                |
|     content       | 帖子内容                           | string            |                |
|     coverImage    | 视频封面图片URL                    | string            |                |
|     createTime    | 创建时间                           | string(date-time) |                |
|     favoriteCount | 收藏次数                           | integer(int32)    |                |
|     id            | 帖子ID                             | integer(int64)    |                |
|     isEssence     | 是否精华（0-否，1-是）             | integer(int32)    |                |
|     isTop         | 是否置顶（0-否，1-是）             | integer(int32)    |                |
|     likeCount     | 点赞次数                           | integer(int32)    |                |
|     postType      | 帖子类型（1-普通文本，2-视频）     | integer(int32)    |                |
|     status        | 状态（0-删除，1-正常，2-审核中）   | integer(int32)    |                |
|     title         | 帖子标题                           | string            |                |
|     updateTime    | 更新时间                           | string(date-time) |                |
|     userId        | 用户ID（逻辑关联sys_user表）       | integer(int64)    |                |
|     videoUrl      | 视频URL（仅当post_type为2时有效）  | string            |                |
|     viewCount     | 浏览次数                           | integer(int32)    |                |
| message                   |                                    | string            |                |
| timestamp                 |                                    | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": [
		{
			"categoryId": 0,
			"commentCount": 0,
			"content": "",
			"coverImage": "",
			"createTime": "",
			"favoriteCount": 0,
			"id": 0,
			"isEssence": 0,
			"isTop": 0,
			"likeCount": 0,
			"postType": 0,
			"status": 0,
			"title": "",
			"updateTime": "",
			"userId": 0,
			"videoUrl": "",
			"viewCount": 0
		}
	],
	"message": "",
	"timestamp": 0
}
```


## 获取热门帖子列表（按浏览量排序）


**接口地址**:`/forumPost/hot`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型       | schema |
| -------- | -------- | -------- | -------- | -------------- | ------ |
| limit    | 数量限制 | query    | false    | integer(int32) |        |


**响应状态**:


| 状态码 | 说明         | schema                             |
| ------ | ------------ | ---------------------------------- |
| 200    | OK           | ResponseResult«List«论坛帖子信息»» |
| 401    | Unauthorized |                                    |
| 403    | Forbidden    |                                    |
| 404    | Not Found    |                                    |


**响应参数**:


| 参数名称                  | 参数说明                           | 类型              | schema         |
| ------------------------- | ---------------------------------- | ----------------- | -------------- |
| code                      |                                    | integer(int32)    | integer(int32) |
| data                      |                                    | array             | 论坛帖子信息   |
|     categoryId    | 板块ID（逻辑关联forum_category表） | integer(int64)    |                |
|     commentCount  | 评论次数                           | integer(int32)    |                |
|     content       | 帖子内容                           | string            |                |
|     coverImage    | 视频封面图片URL                    | string            |                |
|     createTime    | 创建时间                           | string(date-time) |                |
|     favoriteCount | 收藏次数                           | integer(int32)    |                |
|     id            | 帖子ID                             | integer(int64)    |                |
|     isEssence     | 是否精华（0-否，1-是）             | integer(int32)    |                |
|     isTop         | 是否置顶（0-否，1-是）             | integer(int32)    |                |
|     likeCount     | 点赞次数                           | integer(int32)    |                |
|     postType      | 帖子类型（1-普通文本，2-视频）     | integer(int32)    |                |
|     status        | 状态（0-删除，1-正常，2-审核中）   | integer(int32)    |                |
|     title         | 帖子标题                           | string            |                |
|     updateTime    | 更新时间                           | string(date-time) |                |
|     userId        | 用户ID（逻辑关联sys_user表）       | integer(int64)    |                |
|     videoUrl      | 视频URL（仅当post_type为2时有效）  | string            |                |
|     viewCount     | 浏览次数                           | integer(int32)    |                |
| message                   |                                    | string            |                |
| timestamp                 |                                    | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": [
		{
			"categoryId": 0,
			"commentCount": 0,
			"content": "",
			"coverImage": "",
			"createTime": "",
			"favoriteCount": 0,
			"id": 0,
			"isEssence": 0,
			"isTop": 0,
			"likeCount": 0,
			"postType": 0,
			"status": 0,
			"title": "",
			"updateTime": "",
			"userId": 0,
			"videoUrl": "",
			"viewCount": 0
		}
	],
	"message": "",
	"timestamp": 0
}
```


## 列表查询


**接口地址**:`/forumPost/list`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明                           | 请求类型 | 是否必须 | 数据类型          | schema |
| ------------- | ---------------------------------- | -------- | -------- | ----------------- | ------ |
| categoryId    | 板块ID（逻辑关联forum_category表） | query    | true     | integer(int64)    |        |
| postType      | 帖子类型（1-普通文本，2-视频）     | query    | true     | integer(int32)    |        |
| status        | 状态（0-删除，1-正常，2-审核中）   | query    | true     | integer(int32)    |        |
| title         | 帖子标题                           | query    | true     | string            |        |
| userId        | 用户ID（逻辑关联sys_user表）       | query    | true     | integer(int64)    |        |
| commentCount  | 评论次数                           | query    | false    | integer(int32)    |        |
| content       | 帖子内容                           | query    | false    | string            |        |
| coverImage    | 视频封面图片URL                    | query    | false    | string            |        |
| createTime    | 创建时间                           | query    | false    | string(date-time) |        |
| favoriteCount | 收藏次数                           | query    | false    | integer(int32)    |        |
| id            | 帖子ID                             | query    | false    | integer(int64)    |        |
| isEssence     | 是否精华（0-否，1-是）             | query    | false    | integer(int32)    |        |
| isTop         | 是否置顶（0-否，1-是）             | query    | false    | integer(int32)    |        |
| likeCount     | 点赞次数                           | query    | false    | integer(int32)    |        |
| updateTime    | 更新时间                           | query    | false    | string(date-time) |        |
| videoUrl      | 视频URL（仅当post_type为2时有效）  | query    | false    | string            |        |
| viewCount     | 浏览次数                           | query    | false    | integer(int32)    |        |


**响应状态**:


| 状态码 | 说明         | schema                             |
| ------ | ------------ | ---------------------------------- |
| 200    | OK           | ResponseResult«List«论坛帖子信息»» |
| 401    | Unauthorized |                                    |
| 403    | Forbidden    |                                    |
| 404    | Not Found    |                                    |


**响应参数**:


| 参数名称                  | 参数说明                           | 类型              | schema         |
| ------------------------- | ---------------------------------- | ----------------- | -------------- |
| code                      |                                    | integer(int32)    | integer(int32) |
| data                      |                                    | array             | 论坛帖子信息   |
|     categoryId    | 板块ID（逻辑关联forum_category表） | integer(int64)    |                |
|     commentCount  | 评论次数                           | integer(int32)    |                |
|     content       | 帖子内容                           | string            |                |
|     coverImage    | 视频封面图片URL                    | string            |                |
|     createTime    | 创建时间                           | string(date-time) |                |
|     favoriteCount | 收藏次数                           | integer(int32)    |                |
|     id            | 帖子ID                             | integer(int64)    |                |
|     isEssence     | 是否精华（0-否，1-是）             | integer(int32)    |                |
|     isTop         | 是否置顶（0-否，1-是）             | integer(int32)    |                |
|     likeCount     | 点赞次数                           | integer(int32)    |                |
|     postType      | 帖子类型（1-普通文本，2-视频）     | integer(int32)    |                |
|     status        | 状态（0-删除，1-正常，2-审核中）   | integer(int32)    |                |
|     title         | 帖子标题                           | string            |                |
|     updateTime    | 更新时间                           | string(date-time) |                |
|     userId        | 用户ID（逻辑关联sys_user表）       | integer(int64)    |                |
|     videoUrl      | 视频URL（仅当post_type为2时有效）  | string            |                |
|     viewCount     | 浏览次数                           | integer(int32)    |                |
| message                   |                                    | string            |                |
| timestamp                 |                                    | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": [
		{
			"categoryId": 0,
			"commentCount": 0,
			"content": "",
			"coverImage": "",
			"createTime": "",
			"favoriteCount": 0,
			"id": 0,
			"isEssence": 0,
			"isTop": 0,
			"likeCount": 0,
			"postType": 0,
			"status": 0,
			"title": "",
			"updateTime": "",
			"userId": 0,
			"videoUrl": "",
			"viewCount": 0
		}
	],
	"message": "",
	"timestamp": 0
}
```


## 分页查询


**接口地址**:`/forumPost/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称      | 参数说明                           | 请求类型 | 是否必须 | 数据类型          | schema |
| ------------- | ---------------------------------- | -------- | -------- | ----------------- | ------ |
| categoryId    | 板块ID（逻辑关联forum_category表） | query    | true     | integer(int64)    |        |
| postType      | 帖子类型（1-普通文本，2-视频）     | query    | true     | integer(int32)    |        |
| status        | 状态（0-删除，1-正常，2-审核中）   | query    | true     | integer(int32)    |        |
| title         | 帖子标题                           | query    | true     | string            |        |
| userId        | 用户ID（逻辑关联sys_user表）       | query    | true     | integer(int64)    |        |
| commentCount  | 评论次数                           | query    | false    | integer(int32)    |        |
| content       | 帖子内容                           | query    | false    | string            |        |
| coverImage    | 视频封面图片URL                    | query    | false    | string            |        |
| createTime    | 创建时间                           | query    | false    | string(date-time) |        |
| current       | 页码                               | query    | false    | integer(int64)    |        |
| favoriteCount | 收藏次数                           | query    | false    | integer(int32)    |        |
| id            | 帖子ID                             | query    | false    | integer(int64)    |        |
| isEssence     | 是否精华（0-否，1-是）             | query    | false    | integer(int32)    |        |
| isTop         | 是否置顶（0-否，1-是）             | query    | false    | integer(int32)    |        |
| likeCount     | 点赞次数                           | query    | false    | integer(int32)    |        |
| size          | 每页数量                           | query    | false    | integer(int64)    |        |
| updateTime    | 更新时间                           | query    | false    | string(date-time) |        |
| videoUrl      | 视频URL（仅当post_type为2时有效）  | query    | false    | string            |        |
| viewCount     | 浏览次数                           | query    | false    | integer(int32)    |        |


**响应状态**:


| 状态码 | 说明         | schema                             |
| ------ | ------------ | ---------------------------------- |
| 200    | OK           | ResponseResult«Page«论坛帖子信息»» |
| 401    | Unauthorized |                                    |
| 403    | Forbidden    |                                    |
| 404    | Not Found    |                                    |


**响应参数**:


| 参数名称                              | 参数说明                           | 类型               | schema             |
| ------------------------------------- | ---------------------------------- | ------------------ | ------------------ |
| code                                  |                                    | integer(int32)     | integer(int32)     |
| data                                  |                                    | Page«论坛帖子信息» | Page«论坛帖子信息» |
|     countId                   |                                    | string             |                    |
|     current                   |                                    | integer(int64)     |                    |
|     maxLimit                  |                                    | integer(int64)     |                    |
|     optimizeCountSql          |                                    | boolean            |                    |
|     orders                    |                                    | array              | OrderItem          |
|         asc           |                                    | boolean            |                    |
|         column        |                                    | string             |                    |
|     pages                     |                                    | integer(int64)     |                    |
|     records                   |                                    | array              | 论坛帖子信息       |
|         categoryId    | 板块ID（逻辑关联forum_category表） | integer            |                    |
|         commentCount  | 评论次数                           | integer            |                    |
|         content       | 帖子内容                           | string             |                    |
|         coverImage    | 视频封面图片URL                    | string             |                    |
|         createTime    | 创建时间                           | string             |                    |
|         favoriteCount | 收藏次数                           | integer            |                    |
|         id            | 帖子ID                             | integer            |                    |
|         isEssence     | 是否精华（0-否，1-是）             | integer            |                    |
|         isTop         | 是否置顶（0-否，1-是）             | integer            |                    |
|         likeCount     | 点赞次数                           | integer            |                    |
|         postType      | 帖子类型（1-普通文本，2-视频）     | integer            |                    |
|         status        | 状态（0-删除，1-正常，2-审核中）   | integer            |                    |
|         title         | 帖子标题                           | string             |                    |
|         updateTime    | 更新时间                           | string             |                    |
|         userId        | 用户ID（逻辑关联sys_user表）       | integer            |                    |
|         videoUrl      | 视频URL（仅当post_type为2时有效）  | string             |                    |
|         viewCount     | 浏览次数                           | integer            |                    |
|     searchCount               |                                    | boolean            |                    |
|     size                      |                                    | integer(int64)     |                    |
|     total                     |                                    | integer(int64)     |                    |
| message                               |                                    | string             |                    |
| timestamp                             |                                    | integer(int64)     | integer(int64)     |


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
				"categoryId": 0,
				"commentCount": 0,
				"content": "",
				"coverImage": "",
				"createTime": "",
				"favoriteCount": 0,
				"id": 0,
				"isEssence": 0,
				"isTop": 0,
				"likeCount": 0,
				"postType": 0,
				"status": 0,
				"title": "",
				"updateTime": "",
				"userId": 0,
				"videoUrl": "",
				"viewCount": 0
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


## 根据板块ID分页查询帖子列表


**接口地址**:`/forumPost/pageByCategory/{categoryId}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称   | 参数说明 | 请求类型 | 是否必须 | 数据类型       | schema |
| ---------- | -------- | -------- | -------- | -------------- | ------ |
| categoryId | 板块ID   | path     | true     | integer(int64) |        |
| current    | 页码     | query    | false    | integer(int64) |        |
| size       | 每页数量 | query    | false    | integer(int64) |        |


**响应状态**:


| 状态码 | 说明         | schema                             |
| ------ | ------------ | ---------------------------------- |
| 200    | OK           | ResponseResult«Page«论坛帖子信息»» |
| 401    | Unauthorized |                                    |
| 403    | Forbidden    |                                    |
| 404    | Not Found    |                                    |


**响应参数**:


| 参数名称                              | 参数说明                           | 类型               | schema             |
| ------------------------------------- | ---------------------------------- | ------------------ | ------------------ |
| code                                  |                                    | integer(int32)     | integer(int32)     |
| data                                  |                                    | Page«论坛帖子信息» | Page«论坛帖子信息» |
|     countId                   |                                    | string             |                    |
|     current                   |                                    | integer(int64)     |                    |
|     maxLimit                  |                                    | integer(int64)     |                    |
|     optimizeCountSql          |                                    | boolean            |                    |
|     orders                    |                                    | array              | OrderItem          |
|         asc           |                                    | boolean            |                    |
|         column        |                                    | string             |                    |
|     pages                     |                                    | integer(int64)     |                    |
|     records                   |                                    | array              | 论坛帖子信息       |
|         categoryId    | 板块ID（逻辑关联forum_category表） | integer            |                    |
|         commentCount  | 评论次数                           | integer            |                    |
|         content       | 帖子内容                           | string             |                    |
|         coverImage    | 视频封面图片URL                    | string             |                    |
|         createTime    | 创建时间                           | string             |                    |
|         favoriteCount | 收藏次数                           | integer            |                    |
|         id            | 帖子ID                             | integer            |                    |
|         isEssence     | 是否精华（0-否，1-是）             | integer            |                    |
|         isTop         | 是否置顶（0-否，1-是）             | integer            |                    |
|         likeCount     | 点赞次数                           | integer            |                    |
|         postType      | 帖子类型（1-普通文本，2-视频）     | integer            |                    |
|         status        | 状态（0-删除，1-正常，2-审核中）   | integer            |                    |
|         title         | 帖子标题                           | string             |                    |
|         updateTime    | 更新时间                           | string             |                    |
|         userId        | 用户ID（逻辑关联sys_user表）       | integer            |                    |
|         videoUrl      | 视频URL（仅当post_type为2时有效）  | string             |                    |
|         viewCount     | 浏览次数                           | integer            |                    |
|     searchCount               |                                    | boolean            |                    |
|     size                      |                                    | integer(int64)     |                    |
|     total                     |                                    | integer(int64)     |                    |
| message                               |                                    | string             |                    |
| timestamp                             |                                    | integer(int64)     | integer(int64)     |


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
				"categoryId": 0,
				"commentCount": 0,
				"content": "",
				"coverImage": "",
				"createTime": "",
				"favoriteCount": 0,
				"id": 0,
				"isEssence": 0,
				"isTop": 0,
				"likeCount": 0,
				"postType": 0,
				"status": 0,
				"title": "",
				"updateTime": "",
				"userId": 0,
				"videoUrl": "",
				"viewCount": 0
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


**接口地址**:`/forumPost/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型       | schema |
| -------- | -------- | -------- | -------- | -------------- | ------ |
| id       | 帖子ID   | path     | true     | integer(int64) |        |


**响应状态**:


| 状态码 | 说明         | schema                       |
| ------ | ------------ | ---------------------------- |
| 200    | OK           | ResponseResult«论坛帖子信息» |
| 401    | Unauthorized |                              |
| 403    | Forbidden    |                              |
| 404    | Not Found    |                              |


**响应参数**:


| 参数名称                  | 参数说明                           | 类型              | schema         |
| ------------------------- | ---------------------------------- | ----------------- | -------------- |
| code                      |                                    | integer(int32)    | integer(int32) |
| data                      |                                    | 论坛帖子信息      | 论坛帖子信息   |
|     categoryId    | 板块ID（逻辑关联forum_category表） | integer(int64)    |                |
|     commentCount  | 评论次数                           | integer(int32)    |                |
|     content       | 帖子内容                           | string            |                |
|     coverImage    | 视频封面图片URL                    | string            |                |
|     createTime    | 创建时间                           | string(date-time) |                |
|     favoriteCount | 收藏次数                           | integer(int32)    |                |
|     id            | 帖子ID                             | integer(int64)    |                |
|     isEssence     | 是否精华（0-否，1-是）             | integer(int32)    |                |
|     isTop         | 是否置顶（0-否，1-是）             | integer(int32)    |                |
|     likeCount     | 点赞次数                           | integer(int32)    |                |
|     postType      | 帖子类型（1-普通文本，2-视频）     | integer(int32)    |                |
|     status        | 状态（0-删除，1-正常，2-审核中）   | integer(int32)    |                |
|     title         | 帖子标题                           | string            |                |
|     updateTime    | 更新时间                           | string(date-time) |                |
|     userId        | 用户ID（逻辑关联sys_user表）       | integer(int64)    |                |
|     videoUrl      | 视频URL（仅当post_type为2时有效）  | string            |                |
|     viewCount     | 浏览次数                           | integer(int32)    |                |
| message                   |                                    | string            |                |
| timestamp                 |                                    | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": {
		"categoryId": 0,
		"commentCount": 0,
		"content": "",
		"coverImage": "",
		"createTime": "",
		"favoriteCount": 0,
		"id": 0,
		"isEssence": 0,
		"isTop": 0,
		"likeCount": 0,
		"postType": 0,
		"status": 0,
		"title": "",
		"updateTime": "",
		"userId": 0,
		"videoUrl": "",
		"viewCount": 0
	},
	"message": "",
	"timestamp": 0
}
```


## 通过主键删除数据


**接口地址**:`/forumPost/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型       | schema |
| -------- | -------- | -------- | -------- | -------------- | ------ |
| id       | 帖子ID   | path     | true     | integer(int64) |        |


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


# 论坛板块表对象功能接口


## 新增-更新数据


**接口地址**:`/forumCategory`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
{
  "createTime": "",
  "description": "",
  "icon": "",
  "id": 0,
  "level": 0,
  "name": "",
  "parentId": 0,
  "sort": 0,
  "status": 0,
  "updateTime": ""
}
```


**请求参数**:


| 参数名称                | 参数说明                                  | 请求类型 | 是否必须 | 数据类型          | schema       |
| ----------------------- | ----------------------------------------- | -------- | -------- | ----------------- | ------------ |
| forumCategory           | forumCategory                             | body     | true     | 论坛板块信息      | 论坛板块信息 |
|     createTime  | 创建时间                                  |          | false    | string(date-time) |              |
|     description | 板块描述                                  |          | false    | string            |              |
|     icon        | 板块图标URL                               |          | false    | string            |              |
|     id          | 板块ID                                    |          | false    | integer(int64)    |              |
|     level       | 板块级别（1-一级板块，2-二级板块）        |          | false    | integer(int32)    |              |
|     name        | 板块名称                                  |          | false    | string            |              |
|     parentId    | 父板块ID（用于构建板块树，0表示顶级板块） |          | false    | integer(int64)    |              |
|     sort        | 排序号                                    |          | false    | integer(int32)    |              |
|     status      | 状态（0-禁用，1-启用）                    |          | false    | integer(int32)    |              |
|     updateTime  | 更新时间                                  |          | false    | string(date-time) |              |


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


## 获取启用的板块列表（用于前端展示）


**接口地址**:`/forumCategory/available`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


暂无


**响应状态**:


| 状态码 | 说明         | schema                             |
| ------ | ------------ | ---------------------------------- |
| 200    | OK           | ResponseResult«List«论坛板块信息»» |
| 401    | Unauthorized |                                    |
| 403    | Forbidden    |                                    |
| 404    | Not Found    |                                    |


**响应参数**:


| 参数名称                | 参数说明                                  | 类型              | schema         |
| ----------------------- | ----------------------------------------- | ----------------- | -------------- |
| code                    |                                           | integer(int32)    | integer(int32) |
| data                    |                                           | array             | 论坛板块信息   |
|     createTime  | 创建时间                                  | string(date-time) |                |
|     description | 板块描述                                  | string            |                |
|     icon        | 板块图标URL                               | string            |                |
|     id          | 板块ID                                    | integer(int64)    |                |
|     level       | 板块级别（1-一级板块，2-二级板块）        | integer(int32)    |                |
|     name        | 板块名称                                  | string            |                |
|     parentId    | 父板块ID（用于构建板块树，0表示顶级板块） | integer(int64)    |                |
|     sort        | 排序号                                    | integer(int32)    |                |
|     status      | 状态（0-禁用，1-启用）                    | integer(int32)    |                |
|     updateTime  | 更新时间                                  | string(date-time) |                |
| message                 |                                           | string            |                |
| timestamp               |                                           | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": [
		{
			"createTime": "",
			"description": "",
			"icon": "",
			"id": 0,
			"level": 0,
			"name": "",
			"parentId": 0,
			"sort": 0,
			"status": 0,
			"updateTime": ""
		}
	],
	"message": "",
	"timestamp": 0
}
```


## 根据父板块ID获取子板块列表


**接口地址**:`/forumCategory/children/{parentId}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型       | schema |
| -------- | -------- | -------- | -------- | -------------- | ------ |
| parentId | 父板块ID | path     | true     | integer(int64) |        |


**响应状态**:


| 状态码 | 说明         | schema                             |
| ------ | ------------ | ---------------------------------- |
| 200    | OK           | ResponseResult«List«论坛板块信息»» |
| 401    | Unauthorized |                                    |
| 403    | Forbidden    |                                    |
| 404    | Not Found    |                                    |


**响应参数**:


| 参数名称                | 参数说明                                  | 类型              | schema         |
| ----------------------- | ----------------------------------------- | ----------------- | -------------- |
| code                    |                                           | integer(int32)    | integer(int32) |
| data                    |                                           | array             | 论坛板块信息   |
|     createTime  | 创建时间                                  | string(date-time) |                |
|     description | 板块描述                                  | string            |                |
|     icon        | 板块图标URL                               | string            |                |
|     id          | 板块ID                                    | integer(int64)    |                |
|     level       | 板块级别（1-一级板块，2-二级板块）        | integer(int32)    |                |
|     name        | 板块名称                                  | string            |                |
|     parentId    | 父板块ID（用于构建板块树，0表示顶级板块） | integer(int64)    |                |
|     sort        | 排序号                                    | integer(int32)    |                |
|     status      | 状态（0-禁用，1-启用）                    | integer(int32)    |                |
|     updateTime  | 更新时间                                  | string(date-time) |                |
| message                 |                                           | string            |                |
| timestamp               |                                           | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": [
		{
			"createTime": "",
			"description": "",
			"icon": "",
			"id": 0,
			"level": 0,
			"name": "",
			"parentId": 0,
			"sort": 0,
			"status": 0,
			"updateTime": ""
		}
	],
	"message": "",
	"timestamp": 0
}
```


## 列表查询


**接口地址**:`/forumCategory/list`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称    | 参数说明                                  | 请求类型 | 是否必须 | 数据类型          | schema |
| ----------- | ----------------------------------------- | -------- | -------- | ----------------- | ------ |
| level       | 板块级别（1-一级板块，2-二级板块）        | query    | true     | integer(int32)    |        |
| name        | 板块名称                                  | query    | true     | string            |        |
| status      | 状态（0-禁用，1-启用）                    | query    | true     | integer(int32)    |        |
| createTime  | 创建时间                                  | query    | false    | string(date-time) |        |
| description | 板块描述                                  | query    | false    | string            |        |
| icon        | 板块图标URL                               | query    | false    | string            |        |
| id          | 板块ID                                    | query    | false    | integer(int64)    |        |
| parentId    | 父板块ID（用于构建板块树，0表示顶级板块） | query    | false    | integer(int64)    |        |
| sort        | 排序号                                    | query    | false    | integer(int32)    |        |
| updateTime  | 更新时间                                  | query    | false    | string(date-time) |        |


**响应状态**:


| 状态码 | 说明         | schema                             |
| ------ | ------------ | ---------------------------------- |
| 200    | OK           | ResponseResult«List«论坛板块信息»» |
| 401    | Unauthorized |                                    |
| 403    | Forbidden    |                                    |
| 404    | Not Found    |                                    |


**响应参数**:


| 参数名称                | 参数说明                                  | 类型              | schema         |
| ----------------------- | ----------------------------------------- | ----------------- | -------------- |
| code                    |                                           | integer(int32)    | integer(int32) |
| data                    |                                           | array             | 论坛板块信息   |
|     createTime  | 创建时间                                  | string(date-time) |                |
|     description | 板块描述                                  | string            |                |
|     icon        | 板块图标URL                               | string            |                |
|     id          | 板块ID                                    | integer(int64)    |                |
|     level       | 板块级别（1-一级板块，2-二级板块）        | integer(int32)    |                |
|     name        | 板块名称                                  | string            |                |
|     parentId    | 父板块ID（用于构建板块树，0表示顶级板块） | integer(int64)    |                |
|     sort        | 排序号                                    | integer(int32)    |                |
|     status      | 状态（0-禁用，1-启用）                    | integer(int32)    |                |
|     updateTime  | 更新时间                                  | string(date-time) |                |
| message                 |                                           | string            |                |
| timestamp               |                                           | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": [
		{
			"createTime": "",
			"description": "",
			"icon": "",
			"id": 0,
			"level": 0,
			"name": "",
			"parentId": 0,
			"sort": 0,
			"status": 0,
			"updateTime": ""
		}
	],
	"message": "",
	"timestamp": 0
}
```


## 分页查询


**接口地址**:`/forumCategory/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称    | 参数说明                                  | 请求类型 | 是否必须 | 数据类型          | schema |
| ----------- | ----------------------------------------- | -------- | -------- | ----------------- | ------ |
| level       | 板块级别（1-一级板块，2-二级板块）        | query    | true     | integer(int32)    |        |
| name        | 板块名称                                  | query    | true     | string            |        |
| status      | 状态（0-禁用，1-启用）                    | query    | true     | integer(int32)    |        |
| createTime  | 创建时间                                  | query    | false    | string(date-time) |        |
| current     | 页码                                      | query    | false    | integer(int64)    |        |
| description | 板块描述                                  | query    | false    | string            |        |
| icon        | 板块图标URL                               | query    | false    | string            |        |
| id          | 板块ID                                    | query    | false    | integer(int64)    |        |
| parentId    | 父板块ID（用于构建板块树，0表示顶级板块） | query    | false    | integer(int64)    |        |
| size        | 每页数量                                  | query    | false    | integer(int64)    |        |
| sort        | 排序号                                    | query    | false    | integer(int32)    |        |
| updateTime  | 更新时间                                  | query    | false    | string(date-time) |        |


**响应状态**:


| 状态码 | 说明         | schema                             |
| ------ | ------------ | ---------------------------------- |
| 200    | OK           | ResponseResult«Page«论坛板块信息»» |
| 401    | Unauthorized |                                    |
| 403    | Forbidden    |                                    |
| 404    | Not Found    |                                    |


**响应参数**:


| 参数名称                            | 参数说明                                  | 类型               | schema             |
| ----------------------------------- | ----------------------------------------- | ------------------ | ------------------ |
| code                                |                                           | integer(int32)     | integer(int32)     |
| data                                |                                           | Page«论坛板块信息» | Page«论坛板块信息» |
|     countId                 |                                           | string             |                    |
|     current                 |                                           | integer(int64)     |                    |
|     maxLimit                |                                           | integer(int64)     |                    |
|     optimizeCountSql        |                                           | boolean            |                    |
|     orders                  |                                           | array              | OrderItem          |
|         asc         |                                           | boolean            |                    |
|         column      |                                           | string             |                    |
|     pages                   |                                           | integer(int64)     |                    |
|     records                 |                                           | array              | 论坛板块信息       |
|         createTime  | 创建时间                                  | string             |                    |
|         description | 板块描述                                  | string             |                    |
|         icon        | 板块图标URL                               | string             |                    |
|         id          | 板块ID                                    | integer            |                    |
|         level       | 板块级别（1-一级板块，2-二级板块）        | integer            |                    |
|         name        | 板块名称                                  | string             |                    |
|         parentId    | 父板块ID（用于构建板块树，0表示顶级板块） | integer            |                    |
|         sort        | 排序号                                    | integer            |                    |
|         status      | 状态（0-禁用，1-启用）                    | integer            |                    |
|         updateTime  | 更新时间                                  | string             |                    |
|     searchCount             |                                           | boolean            |                    |
|     size                    |                                           | integer(int64)     |                    |
|     total                   |                                           | integer(int64)     |                    |
| message                             |                                           | string             |                    |
| timestamp                           |                                           | integer(int64)     | integer(int64)     |


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
				"description": "",
				"icon": "",
				"id": 0,
				"level": 0,
				"name": "",
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
```


## 通过ID查询单条数据


**接口地址**:`/forumCategory/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型       | schema |
| -------- | -------- | -------- | -------- | -------------- | ------ |
| id       | 板块ID   | path     | true     | integer(int64) |        |


**响应状态**:


| 状态码 | 说明         | schema                       |
| ------ | ------------ | ---------------------------- |
| 200    | OK           | ResponseResult«论坛板块信息» |
| 401    | Unauthorized |                              |
| 403    | Forbidden    |                              |
| 404    | Not Found    |                              |


**响应参数**:


| 参数名称                | 参数说明                                  | 类型              | schema         |
| ----------------------- | ----------------------------------------- | ----------------- | -------------- |
| code                    |                                           | integer(int32)    | integer(int32) |
| data                    |                                           | 论坛板块信息      | 论坛板块信息   |
|     createTime  | 创建时间                                  | string(date-time) |                |
|     description | 板块描述                                  | string            |                |
|     icon        | 板块图标URL                               | string            |                |
|     id          | 板块ID                                    | integer(int64)    |                |
|     level       | 板块级别（1-一级板块，2-二级板块）        | integer(int32)    |                |
|     name        | 板块名称                                  | string            |                |
|     parentId    | 父板块ID（用于构建板块树，0表示顶级板块） | integer(int64)    |                |
|     sort        | 排序号                                    | integer(int32)    |                |
|     status      | 状态（0-禁用，1-启用）                    | integer(int32)    |                |
|     updateTime  | 更新时间                                  | string(date-time) |                |
| message                 |                                           | string            |                |
| timestamp               |                                           | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
{
	"code": 0,
	"data": {
		"createTime": "",
		"description": "",
		"icon": "",
		"id": 0,
		"level": 0,
		"name": "",
		"parentId": 0,
		"sort": 0,
		"status": 0,
		"updateTime": ""
	},
	"message": "",
	"timestamp": 0
}
```


## 通过主键删除数据


**接口地址**:`/forumCategory/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型       | schema |
| -------- | -------- | -------- | -------- | -------------- | ------ |
| id       | 板块ID   | path     | true     | integer(int64) |        |


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


# 通用评论表对象功能接口


## 新增-更新数据


**接口地址**:`/comment`


**请求方式**:`POST`


**请求数据类型**:`application/json`


**响应数据类型**:`*/*`


**接口描述**:


**请求示例**:


```javascript
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
```


**请求参数**:


| 参数名称                | 参数说明                                            | 请求类型 | 是否必须 | 数据类型          | schema       |
| ----------------------- | --------------------------------------------------- | -------- | -------- | ----------------- | ------------ |
| comment                 | comment                                             | body     | true     | 通用评论信息      | 通用评论信息 |
|     content     | 评论内容                                            |          | false    | string            |              |
|     createTime  | 创建时间                                            |          | false    | string(date-time) |              |
|     id          | 评论ID                                              |          | false    | integer(int64)    |              |
|     isAnonymous | 是否匿名（0-否，1-是）                              |          | false    | integer(int32)    |              |
|     orderId     | 订单ID（逻辑关联order表，可为空，仅对产品评论有效） |          | false    | integer(int64)    |              |
|     parentId    | 父评论ID（用于构建评论树，0表示顶级评论）           |          | false    | integer(int64)    |              |
|     rating      | 评分（1-5分，可为空）                               |          | false    | integer(int32)    |              |
|     sourceId    | 来源ID（可以是产品ID、文章ID等）                    |          | false    | integer(int64)    |              |
|     sourceType  | 来源类型（product, article, forum等）               |          | false    | string            |              |
|     status      | 状态（0-隐藏，1-显示）                              |          | false    | integer(int32)    |              |
|     updateTime  | 更新时间                                            |          | false    | string(date-time) |              |
|     userId      | 用户ID（逻辑关联sys_user表）                        |          | false    | integer(int64)    |              |


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


## 根据帖子ID查询论坛评论列表（包含层级结构）


**接口地址**:`/comment/forum/{postId}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型       | schema |
| -------- | -------- | -------- | -------- | -------------- | ------ |
| postId   | 帖子ID   | path     | true     | integer(int64) |        |


**响应状态**:


| 状态码 | 说明         | schema                             |
| ------ | ------------ | ---------------------------------- |
| 200    | OK           | ResponseResult«List«通用评论信息»» |
| 401    | Unauthorized |                                    |
| 403    | Forbidden    |                                    |
| 404    | Not Found    |                                    |


**响应参数**:


| 参数名称                | 参数说明                                            | 类型              | schema         |
| ----------------------- | --------------------------------------------------- | ----------------- | -------------- |
| code                    |                                                     | integer(int32)    | integer(int32) |
| data                    |                                                     | array             | 通用评论信息   |
|     content     | 评论内容                                            | string            |                |
|     createTime  | 创建时间                                            | string(date-time) |                |
|     id          | 评论ID                                              | integer(int64)    |                |
|     isAnonymous | 是否匿名（0-否，1-是）                              | integer(int32)    |                |
|     orderId     | 订单ID（逻辑关联order表，可为空，仅对产品评论有效） | integer(int64)    |                |
|     parentId    | 父评论ID（用于构建评论树，0表示顶级评论）           | integer(int64)    |                |
|     rating      | 评分（1-5分，可为空）                               | integer(int32)    |                |
|     sourceId    | 来源ID（可以是产品ID、文章ID等）                    | integer(int64)    |                |
|     sourceType  | 来源类型（product, article, forum等）               | string            |                |
|     status      | 状态（0-隐藏，1-显示）                              | integer(int32)    |                |
|     updateTime  | 更新时间                                            | string(date-time) |                |
|     userId      | 用户ID（逻辑关联sys_user表）                        | integer(int64)    |                |
| message                 |                                                     | string            |                |
| timestamp               |                                                     | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
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
```


## 分页查询


**接口地址**:`/comment/page`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称    | 参数说明                                            | 请求类型 | 是否必须 | 数据类型          | schema |
| ----------- | --------------------------------------------------- | -------- | -------- | ----------------- | ------ |
| content     | 评论内容                                            | query    | false    | string            |        |
| createTime  | 创建时间                                            | query    | false    | string(date-time) |        |
| current     | current                                             | query    | false    | integer(int64)    |        |
| id          | 评论ID                                              | query    | false    | integer(int64)    |        |
| isAnonymous | 是否匿名（0-否，1-是）                              | query    | false    | integer(int32)    |        |
| orderId     | 订单ID（逻辑关联order表，可为空，仅对产品评论有效） | query    | false    | integer(int64)    |        |
| parentId    | 父评论ID（用于构建评论树，0表示顶级评论）           | query    | false    | integer(int64)    |        |
| rating      | 评分（1-5分，可为空）                               | query    | false    | integer(int32)    |        |
| size        | size                                                | query    | false    | integer(int64)    |        |
| sourceId    | 来源ID（可以是产品ID、文章ID等）                    | query    | false    | integer(int64)    |        |
| sourceType  | 来源类型（product, article, forum等）               | query    | false    | string            |        |
| status      | 状态（0-隐藏，1-显示）                              | query    | false    | integer(int32)    |        |
| updateTime  | 更新时间                                            | query    | false    | string(date-time) |        |
| userId      | 用户ID（逻辑关联sys_user表）                        | query    | false    | integer(int64)    |        |


**响应状态**:


| 状态码 | 说明         | schema                             |
| ------ | ------------ | ---------------------------------- |
| 200    | OK           | ResponseResult«Page«通用评论信息»» |
| 401    | Unauthorized |                                    |
| 403    | Forbidden    |                                    |
| 404    | Not Found    |                                    |


**响应参数**:


| 参数名称                            | 参数说明                                            | 类型               | schema             |
| ----------------------------------- | --------------------------------------------------- | ------------------ | ------------------ |
| code                                |                                                     | integer(int32)     | integer(int32)     |
| data                                |                                                     | Page«通用评论信息» | Page«通用评论信息» |
|     countId                 |                                                     | string             |                    |
|     current                 |                                                     | integer(int64)     |                    |
|     maxLimit                |                                                     | integer(int64)     |                    |
|     optimizeCountSql        |                                                     | boolean            |                    |
|     orders                  |                                                     | array              | OrderItem          |
|         asc         |                                                     | boolean            |                    |
|         column      |                                                     | string             |                    |
|     pages                   |                                                     | integer(int64)     |                    |
|     records                 |                                                     | array              | 通用评论信息       |
|         content     | 评论内容                                            | string             |                    |
|         createTime  | 创建时间                                            | string             |                    |
|         id          | 评论ID                                              | integer            |                    |
|         isAnonymous | 是否匿名（0-否，1-是）                              | integer            |                    |
|         orderId     | 订单ID（逻辑关联order表，可为空，仅对产品评论有效） | integer            |                    |
|         parentId    | 父评论ID（用于构建评论树，0表示顶级评论）           | integer            |                    |
|         rating      | 评分（1-5分，可为空）                               | integer            |                    |
|         sourceId    | 来源ID（可以是产品ID、文章ID等）                    | integer            |                    |
|         sourceType  | 来源类型（product, article, forum等）               | string             |                    |
|         status      | 状态（0-隐藏，1-显示）                              | integer            |                    |
|         updateTime  | 更新时间                                            | string             |                    |
|         userId      | 用户ID（逻辑关联sys_user表）                        | integer            |                    |
|     searchCount             |                                                     | boolean            |                    |
|     size                    |                                                     | integer(int64)     |                    |
|     total                   |                                                     | integer(int64)     |                    |
| message                             |                                                     | string             |                    |
| timestamp                           |                                                     | integer(int64)     | integer(int64)     |


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
```


## 根据来源ID和类型查询评论列表


**接口地址**:`/comment/source`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称   | 参数说明   | 请求类型 | 是否必须 | 数据类型       | schema |
| ---------- | ---------- | -------- | -------- | -------------- | ------ |
| sourceId   | sourceId   | query    | true     | integer(int64) |        |
| sourceType | sourceType | query    | true     | string         |        |
| parentId   | parentId   | query    | false    | integer(int64) |        |


**响应状态**:


| 状态码 | 说明         | schema                             |
| ------ | ------------ | ---------------------------------- |
| 200    | OK           | ResponseResult«List«通用评论信息»» |
| 401    | Unauthorized |                                    |
| 403    | Forbidden    |                                    |
| 404    | Not Found    |                                    |


**响应参数**:


| 参数名称                | 参数说明                                            | 类型              | schema         |
| ----------------------- | --------------------------------------------------- | ----------------- | -------------- |
| code                    |                                                     | integer(int32)    | integer(int32) |
| data                    |                                                     | array             | 通用评论信息   |
|     content     | 评论内容                                            | string            |                |
|     createTime  | 创建时间                                            | string(date-time) |                |
|     id          | 评论ID                                              | integer(int64)    |                |
|     isAnonymous | 是否匿名（0-否，1-是）                              | integer(int32)    |                |
|     orderId     | 订单ID（逻辑关联order表，可为空，仅对产品评论有效） | integer(int64)    |                |
|     parentId    | 父评论ID（用于构建评论树，0表示顶级评论）           | integer(int64)    |                |
|     rating      | 评分（1-5分，可为空）                               | integer(int32)    |                |
|     sourceId    | 来源ID（可以是产品ID、文章ID等）                    | integer(int64)    |                |
|     sourceType  | 来源类型（product, article, forum等）               | string            |                |
|     status      | 状态（0-隐藏，1-显示）                              | integer(int32)    |                |
|     updateTime  | 更新时间                                            | string(date-time) |                |
|     userId      | 用户ID（逻辑关联sys_user表）                        | integer(int64)    |                |
| message                 |                                                     | string            |                |
| timestamp               |                                                     | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
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
```


## 通过ID查询单条数据


**接口地址**:`/comment/{id}`


**请求方式**:`GET`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型       | schema |
| -------- | -------- | -------- | -------- | -------------- | ------ |
| id       | id       | path     | true     | integer(int64) |        |


**响应状态**:


| 状态码 | 说明         | schema                       |
| ------ | ------------ | ---------------------------- |
| 200    | OK           | ResponseResult«通用评论信息» |
| 401    | Unauthorized |                              |
| 403    | Forbidden    |                              |
| 404    | Not Found    |                              |


**响应参数**:


| 参数名称                | 参数说明                                            | 类型              | schema         |
| ----------------------- | --------------------------------------------------- | ----------------- | -------------- |
| code                    |                                                     | integer(int32)    | integer(int32) |
| data                    |                                                     | 通用评论信息      | 通用评论信息   |
|     content     | 评论内容                                            | string            |                |
|     createTime  | 创建时间                                            | string(date-time) |                |
|     id          | 评论ID                                              | integer(int64)    |                |
|     isAnonymous | 是否匿名（0-否，1-是）                              | integer(int32)    |                |
|     orderId     | 订单ID（逻辑关联order表，可为空，仅对产品评论有效） | integer(int64)    |                |
|     parentId    | 父评论ID（用于构建评论树，0表示顶级评论）           | integer(int64)    |                |
|     rating      | 评分（1-5分，可为空）                               | integer(int32)    |                |
|     sourceId    | 来源ID（可以是产品ID、文章ID等）                    | integer(int64)    |                |
|     sourceType  | 来源类型（product, article, forum等）               | string            |                |
|     status      | 状态（0-隐藏，1-显示）                              | integer(int32)    |                |
|     updateTime  | 更新时间                                            | string(date-time) |                |
|     userId      | 用户ID（逻辑关联sys_user表）                        | integer(int64)    |                |
| message                 |                                                     | string            |                |
| timestamp               |                                                     | integer(int64)    | integer(int64) |


**响应示例**:

```javascript
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
```


## 通过主键删除数据


**接口地址**:`/comment/{id}`


**请求方式**:`DELETE`


**请求数据类型**:`application/x-www-form-urlencoded`


**响应数据类型**:`*/*`


**接口描述**:


**请求参数**:


| 参数名称 | 参数说明 | 请求类型 | 是否必须 | 数据类型       | schema |
| -------- | -------- | -------- | -------- | -------------- | ------ |
| id       | id       | path     | true     | integer(int64) |        |


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