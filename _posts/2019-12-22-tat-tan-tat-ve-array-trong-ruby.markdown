---
layout: post
title: "Tất tần tật về array trong ruby"
date: 2019-12-22
description: "Tất tần tật về array trong ruby"
categories:
- tech
---

Bài viết dựa trên nguồn [ruby-doc.org](https://ruby-doc.org/core-2.4.1/Array.html) và một số ví dụ mình sưu tầm được. Hi vọng sẽ giúp đỡ được mình và mọi người trên con đường làm chủ Ruby.

# Array (mảng)

- Array là kiểu dữ liệu được sắp xếp, đánh chỉ mục số nguyên (chỉ số) của bất kì đối tượng nào

- Array có chỉ số bắt đầu từ 0, tương tự như C hoặc Java. Một chỉ số âm được coi là có liên quan đến cuối của mảng là chỉ só `-1` chỉ ra phần tử cuối cùng của mảng, `-2` là phần tử tiếp theo cuối cùng trong mảng, và cứ thế tiếp tục `-3`, ..

# Tạo mới Arrays
- Một mảng mới có thể được tạo bằng cách sử dụng kí tự khởi tạo: `[]`. Như ví dụ dưới, mảng được tạo bao gồm kiểu dữ liệu `Integer`, `String` và `Float`:

```
arr = [1, "two", 3.0] #=> [1, "two", 3.0]
```

- Một array có thể được tạo bằng cách gọi rõ ràng lệnh `::new` với không, một (khởi tạo độ dài của mảng) hoặc hai phần tử (khởi tạo độ dài và giá trị mặc định của đối tượng)

```
arr = Array.new     #=> []
Array.new(3)        #=> [nil, nil, nil]
Array.new(3, true)  #=> [true, true, true]
```
- Chú ý rằng phần thử thứ hai điền vào mảng với các tham chiếu tới cùng một đối tượng. Do đó, cách này nên dùng trong các trường hợp bạn cần khởi tạo các mảng với các đối tượng bất biến như là `Symbols`, `numbers`, `true` hoặc `false`

- Để taọ một mảng với các đối tượng riêng biệt, chúng ta có thể sử dụng block. Phương pháp này an toàn khi sử dụng với các đối tượng có thể thay đoỏi, chẳng hạn như `hashes`, `strings` hoặc `arrays`.

```
Array.new(4) { Hash.new }   #=> [{}, {}, {}, {}]
```

- Một cách nhanh để tạo các mảng đa chiều:

```
empty_table - Array.new(3) { Array.new(3) }

#=> [[nil, nil, nil], [nil, nil, nil], [nil, nil, nil]]
```

- Một array có thể tạo bằng cách sử dụng phương thức `Array()`, cung cấp bởi Kernel, nơi mà chúng sẽ được gọi `to_ary` sau đó `to_a` trong mỗi phần tử của chúng:

```
Array({:a => "a"}, :b => "b")   #=> [[:a, "a"], [:b, "b"]]
```

# Truy cập các phần tử
- Các phần tử trong array cso thể được lấy bằng cách sử dụng phương thức `[]`. Nó có thể lấy thông qua chỉ số một giá trị duy nhất, cũng có thể lấy một phần trong khoảng (chỉ số bắt đầu và độ dài).
- Các chỉ số âm bắt đầu từ cuối, với `-1` là phần tử cuối cùng.

```
arr = [1, 2, 3, 4, 5, 6]
arr[2]      #=> 3
arr[100]    #=> nil
arr[-3]     #=> 4
arr[2, 3]   #=> [3, 4, 5]
arr[1..4]   #=> [2, 3, 4, 5]
arr[1..-3]  #=> [2, 3, 4]
```

- Một cách khác để truy cập một phần tử cụ thể của mảng là sử dụng phương thức `at`.

```
arr.at(0)   #=> 1
```

**Để hiển thị ra lỗi cho trường hợp chỉ số nhập vào vượt ra bên ngoài của mảng hoặc đặt giá trị mặc định khi điều đó xảy ra, chúng ta sử dụng `fetch` **

```
arr = ['a', 'b', 'c', 'd', 'e', 'f']

arr.fetch(100) #=> IndexError: index 100 outside of array bounds: -6...6

arr.fetch(100, "oops") #=> "oops"
arr.fetch(100, 'g') #=> "g"

```

- Phương thức `first` và `last` sẽ trả về giá trị đầu tiên và cuối cùng của mảng tương ứng

```
arr.first #=> 1
arr.last  #=> 6

```

- Để trả về `n` phần tử của mảng, sử dụng `take`.

```
arr.take(3) #=> [1, 2, 3]
```

- `drop` thực hiện ngược lại với `take`, nó sẽ trả lại mảng với `n` phần tử đã bị hủy

# Lấy thông tin của một Array

- Arrays luôn theo dõi độ dài của chúng. Để truy vấn một mảng về số lượng phần tử mà nó chứa, sử dụng `length`, `count` hoặc `size`.

```
browsers = ['Chrome', 'Firefox', 'Safari', 'Opera', 'IE']
browsers.length #=> 5
browsers.count #=> 5
browsers.size #=> 5
```

- Để kiểm mảng có chứa bất kì một phần tử nào không chúng ta sử dụng `empty?`

```
browsers.empty?   #=> false
```

- Để kiểm tra một phần tử có nằm trong array ta sử dụng hàm `include?`:
```
browsers.include?('Konqueror') #=> false
```

# Thêm phần tử vào mảng
- Các phần tử có thể được thêm vào cuối mảng bàng cách sử dụng `push` hoặc `<<`

```
arr = [1, 2, 3, 4]
arr.push(5) #=> [1, 2, 3, 4, 5]
arr << 6    #=> [1, 2, 3, 4, 5, 6]
```

- `unshift` sẽ thêm phần tử mới vào đầu mảng.

```
arr.unshift(0) #=> [0, 1, 2, 3, 4, 5, 6]
```

- Với `insert` bạn có thể thêm phần tử vào array với vị trí chỉ định

```
arr.insert(3, 'apple')  #=> [0, 1, 2, 'apple', 3, 4, 5, 6]
```

- Khi sử dụng `insert` chúng ta có thể thêm nhiều phần tử cùng 1 lúc trong 1 lần.

```
arr.insert(3, 'orange', 'pear', 'grapefruit')
#=> [0, 1, 2, "orange", "pear", "grapefruit", "apple", 3, 4, 5, 6]
```

# Xóa phần tử khỏi mảng
- Phương thức `pop` xóa phần tử cuối cùng khỏi mảng và trả về mảng đó.

```
arr =  [1, 2, 3, 4, 5, 6]
arr.pop #=> 6
arr #=> [1, 2, 3, 4, 5]
```

- Để truy xuất đồng thời xóa phần tử đầu tiên, sử dụng `shift`

```
arr.shift #=> 1
arr #=> [2, 3, 4, 5]
```

- XÓa một phần tử tại vị trí xác định:

```
arr.delete_at(2) #=> 4
arr #=> [2, 3, 5]
```

- Xóa một phần tử tại bất kì vị trí nào trong mảng, sử dụng `delete`:

```
arr = [1,2,2,3,2]
arr.delete(2) #=> 2
arr           #=> [1, 3]
```

- Sử dụng `compact` và `compact!` để xóa giá trị `nil` trong mảng:

```
arr = ['foo', 0, nil, 'bar', 7, 'baz', nil]
arr.compact  #=> ['foo', 0, 'bar', 7, 'baz']
arr          #=> ['foo', 0, nil, 'bar', 7, 'baz', nil]
arr.compact! #=> ['foo', 0, 'bar', 7, 'baz']
arr          #=> ['foo', 0, 'bar', 7, 'baz']
```

- Để xóa các phần tử trùng lặp trong mảng, sử dụng `uniq` và `uniq!`

```
arr = [2, 5, 6, 556, 6, 6, 8, 9, 0, 123, 556]
arr.uniq #=> [2, 5, 6, 556, 8, 9, 0, 123]
arr      #=> [2, 5, 6, 556, 6, 6, 8, 9, 0, 123, 556]
arr.uniq! #=> [2, 5, 6, 556, 8, 9, 0, 123]
arr      #=> [2, 5, 6, 556, 8, 9, 0, 123]
```

# Lặp mảng
- Tương tự các lớp khác bao gồm module `Enumerable`, Array có một phương thức `each`, định nghĩa các phần tử nào sẽ được lặp và làm thế nào. Trong trường hợp `each` của Array, tất cả các phần tử trong đối tượng Array đều được đưa vào khối theo trình tự.
- Lưu ý rằng thao tác này không làm thay đổi giá trị của mảng.

```
arr = [1, 2, 3, 4, 5]
arr.each { |a| print a -= 10, " " }
# prints: -9 -8 -7 -6 -5
#=> [1, 2, 3, 4, 5]
```

- Một phương thức lặp đôi khi cũng hữu ích là
