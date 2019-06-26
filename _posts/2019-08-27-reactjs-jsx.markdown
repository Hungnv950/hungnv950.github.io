---
layout: post
title:  "Những tricks khi học JSX"
date:   2019-08-27
description: Những tricks khi học JSX
categories:
- tech
---
- Nội dung bài viết xoay quanh khóa học trên [Codecademy](https://www.codecademy.com/courses/react-101/lessons/react-jsx-advanced/exercises/self-closing-tags?action=resume_content_item)


### class vs className
Trong HTML, `class` thường được sử dụng để đặt tên cho thuộc tính của đối tượng\

```
<h1 class="big">Hey</h1>
```

Trong JSX, chúng ta không thể sử dụng `class` mà phải sử dụng `className`

```
<h1 className="big">Hey</h1>
```

This is because JSX gets translated into (được định dạng sang) JavaScript, and class is a reserved word (danh từ riêng) in JavaScript. Khi JSX rendered (được biểu diễn) JSX `className` attributes (thuộc tính) are automatically rendered as `class` attributes.

Example:

```
import React from 'react';
import ReactDOM from 'react-dom';

// Write code here:
const myDiv = (
	<div className="big">
    I AM A BIG DIV
  </div>
)

ReactDOM.render(myDiv, document.getElementById('app'))
```
### Self-Closing Tags
Another JSX ‘gotcha’ (bất ngờ) involves (liên quan) self-closing tags (các thẻ tự động đóng).
