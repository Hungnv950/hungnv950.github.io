---
layout: post
title:  Explaining magic behind popular Ruby on Rails code
date:   2021-03-15 00:48:45
description: Explaining magic behind popular Ruby on Rails code
categories:
- tech
---


>
  Link bài viết gốc: [Explaining magic behind popular Ruby on Rails code](https://longliveruby.com/articles/the-magic-behind-ruby-code)

## Explaining magic behind popular Ruby on Rails code
> Giải thích những điều thú vị đằng sau những mã code Ruby on Rails thường xuyên được sử dụng

Explore the Ruby code behind popular solutions to learn how they were created
> Khám phá Ruby code đằng sau những giải pháp phổ biến để tìm hiểu cách chúng được tạo ra

Ruby language allows us to easily create beautiful DSL’s and design complex libraries that anybody can easily use, despite programming experience. The code often looks perfect, but sometimes it is not clear how it was achieved under the hood. In this article, I explain a few solutions that are quite popular among many gems, and you can easily use it in your projects once you understand how you can build a similar code.

>
  Ngôn ngữ Ruby cho phép chúng ta dễ dàng tạo ra các DSL đẹp và cú pháp thiết kế thư viện mà bất cứ ai cũng có thể dễ dàng sử dụng bất chấp với kinh nghiệm lập trình. Code thường xuyên trông thật hoàn hảo, nhưng đội khi lại không rõ ràng là làm thế nào mà nó lại giải quyết được vấn đề đó. Trong bài này, tôi sẽ giải thích một vài giải pháp khá phổ biến được sử dụng ở tương đối nhiều `gems`, và bạn có thể dễ dàng sử dụng nó trong dự án của bạn một khi bạn hiểu cách có thể xây dựng được 1 đoạn code tương tự.

### The config-way of setting variables (Cách để thiết lập cài đặt các biến)
You can see this code in almost every Ruby gem that utilizes initializers to set some variables needed for later use:

>
  Bạn có thể thấy đoạn coe này ở hầu hết các Ruby gem được sử dụng để khởi tạo các biến cần thiết cho sử dụng sau này:

```
SomeGem.configure do |config|
  config.api_key = 'api_key'
  config.app_name = 'My App'
end
```

This way of setting variables is very readable and easily extendable. It works like any other method that yields something. While the each method yields elements of the array, in the above example, the configure method yields the instance of the Configuration class (or any other). It allows us to set attributes of this class inside the block.

>
  Bằng cách này các biến rất dễ dàng để đọc và mở rộng. Nó hoạt động tương tự các method về `yields`. Trong khi mỗi phương thức `yields`
You can build your configurator this way:


```
module SomeGem
  class << self
    attr_accessor :configuration

    def configure
      self.configuration ||= Configuration.new
      yield(configuration)
    end
  end

  class Configuration
    attr_accessor :api_key, :app_name
  end
end
```
