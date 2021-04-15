---
layout: post
title:  Những điều thú vị đằng sau những mã code Ruby on Rails thường xuyên được sử dụng
date:   2021-03-15 00:48:45
description: Những điều thú vị đằng sau những mã code Ruby on Rails thường xuyên được sử dụng
category: technical
author: hungnv950
usemathjax: true
thumbnail: /assets/img/posts/ruby.jpg
---


>
  Link bài viết gốc: [Explaining magic behind popular Ruby on Rails code](https://longliveruby.com/articles/the-magic-behind-ruby-code)

## Những điều thú vị đằng sau những mã code Ruby on Rails thường xuyên được sử dụng

Khám phá Ruby code đằng sau những giải pháp phổ biến để tìm hiểu cách chúng được tạo ra

Ngôn ngữ Ruby cho phép chúng ta dễ dàng tạo ra các [DSL](https://thecodest.co/blog/domain-specific-language/) đẹp và cú pháp thiết kế thư viện mà bất cứ ai cũng có thể dễ dàng sử dụng bất chấp với kinh nghiệm lập trình. Code thường xuyên trông thật hoàn hảo, nhưng đội khi lại không rõ ràng là làm thế nào mà nó lại giải quyết được vấn đề đó. Trong bài này, tôi sẽ giải thích một vài giải pháp khá phổ biến được sử dụng ở tương đối nhiều `gems`, và bạn có thể dễ dàng sử dụng nó trong dự án của bạn một khi bạn hiểu cách có thể xây dựng được 1 đoạn code tương tự.

### Bạn có thể thấy đoạn coe này ở hầu hết các Ruby gem được sử dụng để khởi tạo các biến cần thiết cho sử dụng sau này:

```
SomeGem.configure do |config|
  config.api_key = 'api_key'
  config.app_name = 'My App'
end
```
Bằng cách này các biến rất dễ dàng để đọc và mở rộng. Nó hoạt động tương tự các method về `yields`. Trong khi mỗi phương thức `yields`
Chúng ta có thể xây dựng config bằng cách:

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
Bây giờ hãy thử:

```
SomeGem.configure do |config|
  config.api_key = 'api_key'
  config.app_name = 'My App'
end

SomeGem.configuration.api_key # => 'api_key'
SomeGem.configuration.app_name # => 'My App'
```

Sau đó bạn có thể truy cập giá trị giống như bất cứ đối tượng nào khác.

### Dynamic methods

Nếu bạn đã từng sử dụng Ruby on Rails, bạn có thể thấy các method đề cập tới các phần tử của model. Vì mã code không nhận biết được tên thuộc tính nếu bạn không định nghĩa chúng, nó sẽ tự động tạo một method, và bạn sẽ khong tìm thấy nơi đã định nghĩa chúng.

Cùng xem một số ví dụ `assuming` bạn có một class User và phần tử `first_name` và `last_name` đã được định nghĩa bên trong class User:

```
user = User.new(first_name: "John", last_name: "Doe")
user.first_name_is?('John') # => true
user.last_name_is?('John') # => false
```

Dĩ nhiên, bạn có thể gọi `user.first_name == 'John'`, nhưng tôi đã quyết định cho bạn thấy `straightforward` trường hợp cho `demonstration` `purposes`. Đây là các định nghĩa class của chúng ta:

```
class User
  attr_reader :first_name, :last_name

  def initialize(first_name:, last_name:)
    @first_name = first_name
    @last_name = last_name
  end
end
```

Bây giờ, khi chúng ta gọi `#first_name_is?` hoặc `last_name_is_mike?` chúng ta sẽ nhận được lỗi `NoMethodError` bởi vĩ chúng ta đã không định nghĩa các methods đó. Lỗi này là điểm bắt đầu khi `implementtation` phương pháp động. Ruby `exposes`phương thức `method_missing` cho phép chúng ta làm nhiều việc với một method không tồn tại và từ chối nếu cúng ta muốn in ra lỗi:

```
class User
  attr_reader :first_name, :last_name

  def initialize(first_name:, last_name:)
    @first_name = first_name
    @last_name = last_name
  end

  private

  def method_missing(method_name, *args, &block)
    puts "You are missing #{method_name} method"
    super # raise the error anyway
  end
end
```

Sau khi chạy đoạn code c=trên, bạn có thể thấy đoạn text được in ra bởi error:
```
You are missing first_name_is? method
```
Phương thức `method_missing` cho phép 3 tham số truyền vào:

> method_name - tên của phương thức không tồn tại trước đó
args - tham số optional, tham số được truyền vào trước đo
block - tham số optional, khối được `excuted` bên trong phương thức

Nếu chúng ta muốn tạo một phương thức động, đầu tiên chúng ta phải định nghĩa khi nào kết thúc với `_is?` và bắt đầu với một tên thuộc tính. Sau đó chúng ta sẽ trả về lỗi nếu tên method không thoả mãn hoặc được gọi bởi một phần tử không được định nghĩa hoặc so sánh giữa một giá trị phần tử với phần tử đầu tiên và trả về lỗi:

```
def method_missing(method_name, *args, &block)
  attribute_name = method_name.to_s.match(/(.*)_is\?/)&.captures&.first

  if !attribute_name.nil? && instance_variable_defined?("@#{attribute_name}")
    instance_variable_get("@#{attribute_name}") == args.first
  else
    super
  end
end

def respond_to_missing?(method_name, include_private = false)
  method_name.to_s.end_with?('_is?') || super
end
```

Bây giờ chúng ta có thể bắt đầu với class và xem cách nó hoạt động:

```
user = User.new(first_name: 'John', last_name: 'Doe')
user.first_name_is?('John') # => true
user.last_name_is?('Tom') # => false

user.method(:first_name_is?).call('John') # => true

# call on not existing attribute
user.age_is?('John') # => NoMethodError
```
Hãy ghi nhớ rằng luôn định nghĩa `respond_to_missing?` khi ghi đè `method_missing`

Nếu bạn muốn  có nhiều phương thức phức tạp hơn, bạn có thể muốn tạo một định nghĩa phương thức động.

### Duck typing
Một số đối tượng `behave` khác nhau khi bạn gọi `to_s` tới chúng (hoặc một số phương thức từ thư viện ngôn ngữ `standard`). Bạn có thể theo dõi ví dụ:

```
response = Request.get('some_url')

puts response # => "status: 200, body: some page body"
puts response.status # => 200
puts response.body # => "some page body"
```
Hãy tạo một định nghĩa ví dụ về lớp `Response` và `Request`

```
class Response
  attr_reader :status, :body

  def initialize(status:, body:)
    @status = status
    @body = body
  end
end

class Request
  def self.get(url)
    Response.new(status: 200, body: "some page body")
  end
end
```
Fine, but when calling the same code as before, we would not get the same result:
Fine, nhưng khi gọi code giống như trước đó, bạn sẽ không lấy được kết quả giống nhau:

```
response = Request.get('some_url')

puts response # => #<Response:0x00007f9e3f1a0150>
```

It happens because each time you use puts, it calls the to_s method on the passed thing, and in our case, the default to_s method defined on an object is called. It returns the string that includes the class name.

Nó xảy ra bởi vì mỗi thời điểm bạn sử dụng lệnh `puts`, nó sẽ gọi phương thức `to_s` khi được truyền vào, và trong trường hợp này, phương thức mặc định `to_s` đã được định nghĩa và một đối tượng đã được gọi. Nó trả về đoạn `string` mà đã được `includes` vào trong class name.

Nếu chúng ta muốn thay đổi hành vi đó, chúng ta có thể định nghĩa phương thức `to_s`:

```
class Response
  attr_reader :status, :body

  def initialize(status:, body:)
    @status = status
    @body = body
  end

  def to_s
    "status: #{@status}, body: #{@body}"
  end
end
```
Bây giờ nó sẽ hoạt động giống như kì vọng:

```
response = Request.get('some_url')

puts response # => "status: 200, body: some page body"
```

If it quacks like a duck, it’s a duck. If it implements the to_s method, you can consider it as a string and use it as a string.
Nếu tiếng kêu `quacks` giống như `duck`, nó sẽ là một con `duck`. Nếu nó `implements` phương thức `to_s`, bạn có thể `consider` nó giống như `string` và sử dụng nó như là một `string`.
