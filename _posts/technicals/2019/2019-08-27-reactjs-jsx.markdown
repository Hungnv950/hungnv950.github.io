---
layout: post
title:  "Những tricks khi học JSX"
date:   2019-08-27
description: Những tricks khi học JSX
category: technical
author: hungnv950
usemathjax: true
thumbnail: /assets/img/posts/jsx.png
---

- Nội dung bài viết xoay quanh khóa học trên [Codecademy](https://www.codecademy.com/courses/react-101/lessons/react-jsx-advanced/exercises/self-closing-tags?action=resume_content_item)


### class vs className
Trong HTML, `class` thường được sử dụng để đặt tên cho thuộc tính của đối tượng

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
Another JSX ‘gotcha’ (Một bất ngờ của JSX) involves (liên quan) self-closing tags (các thẻ tự động đóng).

What’s a self-closing tag?

Most (phần lớn) HTML elements(thành phần) use two tags: an opening tag (`<div>`), and a closing tag (`</div>`). However, some HTML elements such as (như là) `<img>` and `<input>` use only one tag. The tag that belongs to(thuộc về) a single-tag element isn’t an opening tag nor a closing tag; it’s a self-closing tag.

When you write a self-closing tag in HTML, it is optional to include a forward-slash (dấu gạch chéo) immediately before (ngay trước) the final angle-bracket (dấu ngoặc nhọn cuối cùng):

```
Fine in HTML with a slash:

  <br />

Also fine, without the slash:

  <br>
```

But!

In JSX, you have to include (phải bao gồm) the slash (dấu gạch chéo). If you write a self-closing tag in JSX and forget the slash (quên dấu gạch chéo), you will raise (nhận) an error:

```
Fine in JSX:

  <br />

NOT FINE AT ALL in JSX:

  <br>
```

### Curly Braces (Dấu ngoặc nhọn) in JSX

Any code in between (nằm giữa) the tags of a JSX element will be read as JSX (đọc dưới dạng JSX), not as regular (cú pháp) JavaScript! JSX doesn’t add numbers - it reads them as text, just like HTML.

You need a way to write code that says, “Even though I am located in between JSX tags, treat me like ordinary JavaScript and not like JSX.”

You can do this by wrapping (đóng gói) your code in curly braces (dấu ngoặc nhọn).

```
# 5
<h1>{2 + 3}</h1>
```

### Variables (biến) in JSX

When you inject (đưa) JavaScript into JSX, that JavaScript is part of the same environment (một phần của môi trường tương ứng) as the rest (phần còn lại) of the JavaScript in your file.

That means that you can access (truy cập) variables while inside (trong khi bên trong) of a JSX expression, even if those (ngay cả khi) variables were declared (được khai báo) on the outside.

```
// Declare a variable:
const name = 'Gerdo';

// Access your variable
// from inside of a JSX expression:
const greeting = <p>Hello, {name}!</p>;
```

### Variable Attributes (các thuộc tính biến) in JSX

When writing JSX, it’s common to use variables (các biến) to set attributes (các thuộc tính).

Here’s an example of how that might work (cách nó hoạt động):

```
// Use a variable to set the `height` and `width` attributes:

const sideLength = "200px";

const panda = (
  <img
    src="images/panda.jpg"
    alt="panda"
    height={sideLength}
    width={sideLength} />
);
```

Notice how in this example, the `<img />`‘s attributes each get their own line. This can make your code more readable (dễ đọc) if you have a lot of attributes (có nhiều thuộc tính) on one element (thành phần).

Object properties (thuộc tính đối tượng) are also often used to set attributes (đặt thuộc tính):

```
const pics = {
  panda: "http://bit.ly/1Tqltv5",
  owl: "http://bit.ly/1XGtkM3",
  owlCat: "http://bit.ly/1Upbczi"
};

const panda = (
  <img
    src={pics.panda}
    alt="Lazy Panda" />
);

const owl = (
  <img
    src={pics.owl}
    alt="Unimpressed Owl" />
);

const owlCat = (
  <img
    src={pics.owlCat}
    alt="Ghastly Abomination" />
);
```

### Event (sự kiện) Listeners  (lắng nghe) in JSX
https://www.codecademy.com/courses/react-101/lessons/react-jsx-advanced/exercises/jsx-event-listeners?action=resume_content_item

JSX elements (các phần tử ) can have event listeners (sự kiện lắng nghe), just like HTML elements can. Programming (lập trình) in React means constantly working (liên tục làm việc) with event listeners.

You create an event listener by giving a (cung cấp) JSX element a special attribute (thuộc tính đặc biệt). Here’s an example:

`<img onClick={myFunc} />`

An event listener attribute’s name should be something like onClick or onMouseOver: the word on, plus the type of event that you’re listening for. You can see a list of valid event names here.

An event listener attribute’s value should be a function. The above example would only work if myFunc were a valid function that had been defined elsewhere:

```
function myFunc() {
  alert('Make myFunc the pFunc... omg that was horrible i am so sorry');
}

<img onClick={myFunc} />
```

Note that in HTML, event listener names are written in all lowercase, such as onclick or onmouseover. In JSX, event listener names are written in camelCase, such as onClick or onMouseOver.
