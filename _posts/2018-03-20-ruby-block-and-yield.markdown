---
layout: post
title:  Block và yield trong ruby
date:   2018-03-20 22:48:45
description: Block và yield trong ruby
categories:
- tech
---

#  **`Blocks`**
Về cơ bản, `blocks` trong ruby là một cách để nhóm các câu lệnh sao cho chúng ta có thể kết hợp với các lời gọi phương thức như thể chúng là các tham số.

 Ruby cung cấp hai cách để viết `blocks` là:
1. Sử dụng dấu `{}` đối với những blocks ngắn gọn có thể viêt trên một dòng.
```
array = [1,2,3,4]
```
2. Sử dụng cụm `do..end`
```
array.map! do |n|
  n * n
end
=> [1, 4, 9, 16]
```

## **`Procs`**
Một proc là một instance của lớp Proc. Proc là `object` còn `blocks` thì không.
```
p = Proc.new { puts "Hello World" }
```
Điều này cho phép chúng ta gọi các phương thức trên nó và gán nó cho các biến. Procs cũng có thể gọi lại chính nó.
```
p.call  # prints 'Hello World'
p.class # returns 'Proc'
a = p   # a now equals p, a Proc instance
p       # returns a proc object '#<Proc:0x007f96b1a60eb0@(irb):46>'
```
## ` Lambdas`
Lambda function hầu như giống với Procs nhưng có hai điểm khác biệt:
*  Thứ nhất: Lambda kiểm tra số lượng phần tử đầu vào. Báo lỗi nếu không chính xác. Còn Procs thì không
```
l = lambda { "I'm a lambda" }
l.call
=> "I'm a lambda"
l.call('arg')
ArgumentError: wrong number of arguments (1 for 0)
```
* Thứ hai:  Lambdas và Procs xử lý khi gặp từ khóa `return` khác nhau:


```
def lambda_test
  lam = lambda { return }
  lam.call
  puts "Hello world"
end

lambda_test                 # calling lambda_test prints 'Hello World'
```
```
def proc_test
  proc = Proc.new { return }
  proc.call
  puts "Hello world"
end

proc_test                 # calling proc_test prints nothing
```
# **`Yield`**
Yield là một cách rất hay của Ruby để thực hiện một khối trong một phương thức bất kì mà không làm ảnh hưởng. Để hiểu rõ hơn chúng ta cùng theo dõi một ví dụ:
```
def rb_block
  puts 'Start'
  yield
  yield
  puts 'End'
end

rb_block {puts "We're in the block"}
```
`Kết quả:`
```
Start
We're in the block
We're in the block
End
```
Dễ hiểu, khi thực thi method `rb_block`, ruby thực hiện câu bình thường cho tới khi gặp từ khóa `yield` , ruby sẽ dừng và thực hiện block này sau đó sẽ thực thi tiếp tục các logic của method `rb_block`
## Yield với tham số
Để dễ hiểu, ta quan sát ví dụ:
```
def rb_block
    yield('hello', 'ruby')
end

rb_block { |s, r| puts s + ' ' + r
```
`Kết quả:`
```
hello ruby
```
Ta thấy, ruby cho phép truyển tham số vào yield trong các khối. Trong khối, chúng ta liệt kê tên của các đối số để nhận các tham số qua các dấu `||`

`Lưu ý:` Khi định nghĩa `yield` `có tham số`, việc truyền vào tham số bắt buộc. Nếu không nhận được tham số phù hợp ruby sẽ báo lỗi.
```
rb_block   #`rb_block': no block given (yield) (LocalJumpError)
```
# Tài liệu tham khảo
http://www.bogotobogo.com/RubyOnRails/RubyOnRails_Blocks_and_Yield.php

https://code.tutsplus.com/tutorials/ruby-on-rails-study-guide-blocks-procs-and-lambdas--net-29811

http://awaxman11.github.io/blog/2013/08/05/what-is-the-difference-between-a-block/

https://viblo.asia/p/thanh-thao-ruby-block-trong-5-phut-L4x5xg2alBM/

https://viblo.asia/p/block-trong-ruby-wjAM7yNOvmWe
