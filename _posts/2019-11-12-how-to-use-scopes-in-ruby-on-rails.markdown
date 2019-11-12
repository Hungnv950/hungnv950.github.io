---
layout: post
title: "Sử dụng scopes trong Ruby on Rails"
date: 2019-09-09
description: "Sử dụng scopes trong Ruby on Rails"
categories:
- tech
---

This article found in: https://www.rubyguides.com/2019/10/scopes-in-ruby-on-rails/

Let's begin!

What is scope in Rails & why is it useful (hữu ích) ?

Well...

Scopes are custom queries (Truy vấn tùy chỉnh) that you define inside (bên trong) your Rails models with the `scope` method.

**Every scope takes two arguments:**
1. A name, which you use to call this scope in your code
2. A lambda, which implements the query

It looks like this (tương tự với):
```
class Fruit < ApplicationRecord
  scope :with_juice, -> { where("juice > 0") }
end
```

As a result of calling a scope, you'll get an `ActiveRecord::Relation` object.
(Kết quả khi sử dụng `scope`, bạn sẽ nhận được một `ActiveRecord::Relation`)

Which means you can chain & combine scopes!
(Điều đó có nghĩa rằng bạn có thể kết hợp các scope lại với nhau)

Example:
```
Fruit.with_juice.with_round_shape.first(3)
```

Now:

There’s more to learn about Rails scopes, so let’s keep exploring the topic.
(Phần mở rộng)

### When to use scope ? (Khi nào sử dụng scope ?)
Ok, scopes are cool, but when should you use them?

Let’s see an example.
```
def index
  @books = Book.where("LENGTH(title) > 20")
end
```

This is an index controller action that wants to display books with titles longer than 20 characters.
(Trong action index trên muốn hiển thị những đối tượng books mà title có độ dài > 20 kí tự)

**It’s fine.**

But if you want to use this query in other places, you’re going to have duplicated code.
(Nhưng nếu bạn muốn sử dụng lại câu truy vấn trên ở nơi khác, bajnn sẽ lặp lại code)

Duplicated code makes your project harder to maintain.
(Lặp lại code khiến dự án của bạn khó khăn cho maintain)

Let’s move this query into a scope.
(Hãy di chuyển những câu truy vấn đó vào scope)

Like this:
```
class Book
  scope :with_long_title, -> { where("LENGTH(title) > 20") }
end
```

Now our controller action looks like this:
```
def index
  @books = Book.with_long_title
end
```

### How to Use Rails Scopes With Arguments (Sử dụng scope với đối số)
You may want to introduce a variable into a scope so you can make it more flexible.
(Bạn có thể muốn khai báo `biến` trong scope để có thể khiến scope trở nên linh hoạt hơn)

Here’s how:
```
class Book
  scope :with_long_title, ->(length) { where("LENGTH(title) > ?", length) }
end
```
The question mark (?) is a placeholder, it’ll be replaced by the value of length. This makes your code safer.
(Dấu `?` là một phần trống, nó sẽ được thay bằng giá trị của chiều dài tức biến truyền vào. Nó làm cho code trở nên an toàn hơn))


If you want a default value:
(Khi cần khai báo giá trị mặc định của biến truyền vào:)
```
class Book
  scope :with_long_title, ->(length = 20) { where("LENGTH(title) > ?", length) }
end
```
Give it a try!
(Hãy thử dùng nó)

### Scope vs Instance Method (So sánh scope và hàm instance)
Scopes aren’t doing anything magical or super special.
(Scope không làm bất cứ điều gì kỳ diệu hoặc siêu đặc biệt)

They are just methods.
(Chúng chỉ là methods)


In fact… You could do the same thing using class methods!
(Bạn có thể làm tương tự bằng các sử dụng `class methods`)
```
class Fruit
  def self.with_juice
    where("juice > 0")
  end
end
```

But there are design advantages to using scopes over class methods.
(Nhưng có những lợi ích về mặt design để dử dụng scopes hơn là sử dụng `class method`)

Here’s why:

1. Scopes result in cleaner code because of their syntax
(Scopes trông sạch sẽ hơn vì cú pháp đơn giản của nó)
2. Scopes are used for exactly one thing, so you know what you get the moment you see one
(Scope được sử dụng chính xác cho một mục đích, vì vậy bạn có thể biết ngay mục đích của scope đó ngay khi bạn đọc)
3. Scopes aren’t mixed with other methods, so they’re easier to spot
(Scope không trộn lẫn với các `methods` khác, vì thế nó dễ dàng có thể được phát hiện ra trong code)

In terms of functionality, the only difference is that scopes guarantee an ActiveRecord::Relation, and class methods don’t.
(Về mặt chức năng, điều khác biệt duy nhất mà scope bảo đảm đó chính là trả về một `ActiveRecord::Relation` mà `class methods` thì không.)

This helps you avoid errors when your scope returns nothing.
(Điều đó giuos tránh được lỗi khi `scope` không trả về  kết quả)

### Don’t Use Default Scopes (Không sử dụng default scope)
A default scope is one which is automatically applied to your model.
(Default scope là scope luôn được áp dụng cho model khi khởi tạo)

Example:
```
class Post
  default_scope { where(published: true) }
end
```

Default scopes are so attractive(hấp dẫn).
But they’re often the wrong choice (Lựa chọn sai) because you’ll probably forget (có thể quên) you have them defined, run into strange errors (chạy vào những lỗi lạ), and waste precious time (lãng phí thời gian quý báu) debugging.

**With that said…** (Khắc phục khi sử dụng default scope)
If you have to work with default scopes, you may need to use the unscoped method to disable all currently applied scopes.
