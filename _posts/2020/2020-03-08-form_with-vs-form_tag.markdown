---
layout: post
title: "form_with — Building HTML forms in Rails 5.1"
date: 2020-03-08
description: "form_with — Building HTML forms in Rails 5.1"
category: technical
author: hungnv950
usemathjax: true
thumbnail: /assets/img/posts/rails-form-with.jpg
---

> Bài viết lấy nguồn từ bài viết [form_with — Building HTML forms in Rails 5.1
](https://medium.com/@tinchorb/form-with-building-html-forms-in-rails-5-1-f30bd60ef52d)


A couple of months ago a PR created by kaspth was merged to rails 5.1, introducing the form_with view helper. The idea behind it is to unify the interface of form_tag and form_for by extracting both implementations to a common object. As long as developers start using this new helper, form_tag and form_for will softly get deprecated.

> Một vài tháng trước, một pull request [Pr](https://github.com/rails/rails/pull/26976) được tạo bởi một thím với nickname `kasspth` đã được merge vào rails 5.1 (Thời điểm tôi dịch bài này thì rails 6 đã release và sắp ra rails 7 mất rồi =))). Giới thiệu về `form_with` trong phần hỗ trợ hiển thị. Ý tưởng đằng sau là thống nhất lại giao diện của `form_tag` và `form_for`bằng cách trích xuất cả hai triển khai trên vào một đối tượng chung. Miễn là các lập trình viên bắt đầu sử dụng helper mới này, `form_tag` và `form_for` sẽ dần dần được lãng quên.

### 1. A litte bit of background
(Chém gió một chút về bối cảnh)

Let’s say that you have a Post model and want to create a new instance of it. In Rails 4, the form_for view helper allows you to create a form for it:

> Hãy tưởng tượng bạn có một model `Post` và muốn tạo thêm đối tượng cho nó. Trong rails 4, `form_for` đã hỗ trợ tận răng và cho phép bạn tạo form cho nó như sau:

```
<%= form_for @post do |form| %>
 <%= form.text_field :author %>
 <%= form.submit “Create” %>
<% end %>
```

Một view tương ứng html sẽ được sinh ra (a view html will be created)

```
<form class=”new_post” id=”new_post” action=”/posts” accept-charset=”UTF-8" method=”post”>
 <input name=”utf8" type=”hidden” value=”✓”>
 <input type=”hidden” name=”authenticity_token” value=”…”>
 <input type=”text” name=”post[author]” id=”post_author”>
 <input type=”submit” name=”commit” value=”Create” data-disable-with=”Create”>
</form>
```

The variable form yielded to the block is a FormBuilder object that incorporates the knowledge about the model object represented by :post passed to form_for.

>  Các giá trị trong block form là đối tượng được tạo ra bởi đối tượng `FormBuilder` kết hợp với thông tin được cung cấp bởi `:post` truyền vào `form_for`

What happens when you need to create a form but you don’t have an underlying model instance? Rails provides us with the form_tag helper:

> ĐIều gì sẽ xảy ra nếu bạn muốn tạo một `form` mà không muốn cung cấp một đối tượng của model ? Khi đó rails sẽ cung cấp `form_tag` helper.

```
<%= form_tag “/posts” do %>
 <%= text_field_tag “post[author]” %>
 <%= submit_tag “Create” %>
<% end %>
```

```
<form action=”/posts” accept-charset=”UTF-8" method=”post”>
 <input name=”utf8" type=”hidden” value=”✓”>
 <input type=”hidden” name=”authenticity_token” value=”…”>
 <input type=”text” name=“post[author]” id=“post_author”>
 <input type=”submit” name=”commit” value=“Create” data-disable-with=“Create”>
</form>
```

There is no FormBuilder object in this second form. For each field that you need to add to the form, you need to use the correspondent input tag, such as text_field_tag.

> Không có object `FormBuilder` trên form thứ hai.
