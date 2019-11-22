---
layout: post
title: "Multi dynamic nested attributes trong rails"
date: 2019-11-12
description: "Multi dynamic nested attributes trong rails"
categories:
- tech
---


Chào mọi người, không như những bài trước mình đi từ lí thuyết tới thực hành mà bài viết này mình sẽ đưa ra một bài toán cụ thể mà chúng ta thường gặp phải để giải quyết.

#### Bài toán:
> Hệ thống của chúng ta muốn tạo bài test trong đó có thể tùy ý thay đổi số lượng câu hỏi, trong mỗi câu hỏi sẽ có thể tùy ý thay đổi số lượng câu trả lời tương ứng.

Sau một hồi research và nghe ngóng anh em thì mình đã được đưa ra một giải pháp là sử dụng nested attributes + kết hợp sử dụng gem [Cocoon](https://github.com/nathanvda/cocoon).

Để giải quyết bài toán đề ra, chúng ta cần tìm hiểu một số vấn đề:
1. Nested attributes là gì ? Và cách sử dụng
2. Gem cocoon là gì và tại sao sử dụng
3. Áp dụng sử dụng cho bài toán multi nested attributes


### 1. Nested attributes là gì ?
[Nested attributes](https://api.rubyonrails.org/classes/ActiveRecord/NestedAttributes/ClassMethods.html) cho phép bạn lưu những thuộc tính của các bản ghi liên quan thông qua các bản ghi cha mẹ. Mặc định trong rails nested attributes được tắt và bạn có thể bật nó lên bằng lệnh `accepts_nested_attributes_for` trong model.

#### 1.1 Cách khai báo
**Quan hệ one-to-one**
> accepts_nested_attributes_for :attribute_name

Ví dụ mỗi user có một avatar, trong model user ta khai báo:
```
class User < ActiveRecord::Base
  has_one :avatar
  accepts_nested_attributes_for :avatar
end
```
Khi kích hoạt nested attributes trong liên kết one-to-one cho phép bạn tạo User và Avatar trong một lần:
```
params = { user: { name: 'Jack', avatar_attributes: { icon: 'avatar_default' } } }
user = User.create(params[:user])
user.avatar.id # => 2
user.avatar.icon # => 'avatar_default'
```

*Tương tự khi update*:
```
params = { user: { avatar_attributes: { id: '2', icon: 'sad' } } }
user.update params[:user]
user.avatar.icon # => 'sad'
```
**Quan hệ one-to-many**
> accepts_nested_attributes_for :attribute_names

Ví dụ ta có mỗi user có nhiều bài posts:

Ta tiến hành khai báo trong model:

```
class User < ActiveRecord::Base
  has_many :posts
  accepts_nested_attributes_for :posts
end
```

Ví dụ params khi tạo user đồng thời tạo luôn bài posts:
```
params = { user: {
  name: 'joe', posts_attributes: [
    { title: 'Kari, the awesome Ruby documentation browser!' },
    { title: 'The egalitarian assumption of the modern citizen' }
  ]
}}

user = User.create(params[:user])
user.posts.length # => 2
user.posts.first.title # => 'Kari, the awesome Ruby documentation browser!'
user.posts.second.title # => 'The egalitarian assumption of the modern citizen'
```
#### 1.2 Instance Public methods

1. `:allow_destroy`
Với option này, các thành phần của params gửi lên gửi kèm giá trị với key `_destroy` và value à `true` sẽ bị xóa.


Ví dụ:
```
member.avatar_attributes = { id: '2', _destroy: '1' }
member.avatar.marked_for_destruction? # => true
member.save
member.reload.avatar # => nil
```
Ở ví dụ trên, avatar với id = 2 đã được xóa thành công.


2.  `:reject_if`
Với option này. Rails cho phép bạn sử dụng `Proc` hoặc `Symbol` để trỏ đến một phương thức để kiểm tra xem giá trị của `attributes` có thỏa mãn hay không.

Ví dụ sử dụng proc:
```
class Member < ActiveRecord::Base
  has_many :posts
  accepts_nested_attributes_for :posts, reject_if: proc { |attributes| attributes['title'].blank? }
end

params = { member: {
  name: 'joe', posts_attributes: [
    { title: 'Kari, the awesome Ruby documentation browser!' },
    { title: 'The egalitarian assumption of the modern citizen' },
    { title: '' } # bản ghi này sẽ k đc lưu do không thỏa mãn điều kiện được định nghĩa trên `:reject_if`
  ]
}}
member = Member.create(params[:member])
member.posts.length # => 2
member.posts.first.title # => 'Kari, the awesome Ruby documentation browser!'
member.posts.second.title # => 'The egalitarian assumption of the modern citizen'
```

Ví dụ sử dụng `Symbol` để khai báo hàm cần thực thi của `:reject_if`
```
class Member < ActiveRecord::Base
  has_many :posts
  accepts_nested_attributes_for :posts, reject_if: :new_record?
end

class Member < ActiveRecord::Base
  has_many :posts
  accepts_nested_attributes_for :posts, reject_if: :reject_posts

  def reject_posts(attributes)
    attributes['title'].blank?
  end
end
```
3.  `:limit`
Option này cho phép bạn chỉ định số lượng bản ghi liên quan tối đa có thể được xử lý.

Ví dụ:
```
class Member < ActiveRecord::Base
  has_many :posts
  accepts_nested_attributes_for :posts, limit: 4
end
```

4.  `:update_only`
Đối với quan hệ `one-to-one`, option này cho phép bạn chỉ định cách xử lý đối với trường hợp bản ghi liên kết đã tồn tại. Thông thường, một bàn ghi tồn tại có thể được cập nhật giá bằng cách cập nhật giá trị mới cho nó hoặc chính nó được thay thế bằng bản ghi mới với giá trị cần cập nhật.

Mặc định thì `update_only` là `false` và nested attributes được sử dụng để cập nhật vào bản ghi nếu bản ghi đó tồn tại `id`. Nếu không thì một bản ghi mới sẽ được khởi tạo để thay thế bản ghi hiện có. Tuy nhiên, nếu `:update_only` option là `true`, nested attributess sẽ luôn được sử dụng để cập nhật các giá trị của bản ghi nếu thuộc tính `:id` đó đang tồn tại.

*tips: khi sử dụng `update_only: true`, bạn có thể cập nhật giá trị cho bản ghi con mà không cần thiết phải truyền `id` lên trong params.

```
class Member < ActiveRecord::Base
  has_one :avatar
  accepts_nested_attributes_for :avatar, update_only: true
end

params = { member: { avatar_attributes: { icon: 'sad' } } }
member.update params[:member]
member.avatar.id # => 2
member.avatar.icon # => 'sad'
```

### 2.Gem cocoon là gì và tại sao sử dụng ?

>Cocoon makes it easier to handle nested forms.
>
>Nested forms are forms that handle nested models and attributes in one form; e.g. a project with its tasks or an invoice with its line items.
>
>Cocoon is form builder-agnostic, so it works with standard Rails, Formtastic, or SimpleForm. It is compatible with rails 3, 4 and 5.
>
>This project is not related to Apache Cocoon.

Hiểu đơn giản, Gem `cocoon` cũng như các gem khác của rails đều sinh ra để đáp ứng một nhu cầu cụ thể để có thể tối ưu và sử dụng lại. Ở đây, gem cocoon giúp người dùng có thể dễ dàng tương tác với nested forrms(form lồng nhau) thay vì phải ngồi viết những thứ js dài dòng để build ra form với attributes tương ứng (lazy time)

#### 2.1 Cài đặt

>Thêm `gem "concoon"` vào `Gemfile` và chạy `bundle install` để update gem của bạn.

Đối với rails 5, thêm dòng dưới vào file `application.js`
>//= require cocoon

#### 2.2 Cocoon helper functions
Cocoon định nghĩa 2 helper functions:
1. [link_to_add_association](https://github.com/nathanvda/cocoon#link_to_add_association)
2. [link_to_remove_association](https://github.com/nathanvda/cocoon#link_to_remove_association)

##### 2.2.1 link_to_add_association

Hàm này thêm một liên kết vào phần hiển thị của bạn, khi click vào liên kết sẽ tự động sinh ra một partial form đã được chúng ta định nghĩa sẵn.

 Ví dụ:
```
= form_for @project do |f|
  .field
    = f.label :name_badge:
  %h3 Tasks
  #tasks
    = f.fields_for :tasks do |task|
      = render 'task_fields', f: task
    .links
      = link_to_add_association 'add task', f, :tasks
  = f.submit
  ```
 Chúng ta cần khai báo thêm partial form với tên: `_task_fields`
 ```
 .nested-fields
  .field
    = f.label :description
    %br
    = f.text_field :description
  .field
    = f.check_box :done
    = f.label :done
  ```

`= link_to_add_association 'add task', f, :tasks` sẽ tạo ra 1 thẻ `a`, khi ta click vào thẻ này, `cocoon` sẽ tự động giúp chúng ta tạo ra một form `task_field` mới với giá trị `id` được build tự động, giúp chúng ta dễ dàng hơn trong việc sử dụng nested form.

![](https://images.viblo.asia/bfe044cc-df93-488f-8690-a5349c26b382.gif)

`link_to_add_association` gồm 4 tham số:
- name: text sẽ hiển thị của link
- f: form builder
- association: tên của association (phải là số nhiều) - đối tượng mới cần được thêm vào.
- html_options: là mở rộng của html-options ([link_to](https://api.rubyonrails.org/classes/ActionView/Helpers/UrlHelper.html#method-i-link_to)). Và thêm một số tùy chỉnh đặc biệt của `cocoon`:
    - data-association-insertion-traversal : phuơng thức `jquery traversal` cho phép lựa chọn vị trí của partial khi được render. Có 3 option: `closest`, `next`, `children`.
    - data-association-insertion-node : Có thể hiểu đây là node mà field sẽ được chèn vào sau sự kiện clcik vào `link_to_add_association`
    -  data-association-insertion-method : quy định cách chèn field. Các option tương tự như jquery như:  before, after, append, prepend, etc. Mặc định sẽ là `before`.
    -  data-association-insertion-position : phương thức cũ quy định nơi chèn dữ liệu mới( Hàm này sẽ được xóa trong version mới nên có lẽ không nên dùng các bác ạ :)) )
    -  partial: tên của partial sẽ được sử dụng.
    -  render_options: các tùy chọn chuyển qua form-builder.
    -  wrap_object: một Proc sẽ cho phép bọc đối tượng của bạn, đặc biệt hữu ích nếu bạn đang sử dụng decorator (gem draper)
    -  form_name : tên của tham số form truyền vào nested partial. Mặc định là `f`.
    -  count:  số lượng mặc định nested items được chèn vào mỗi lần. Mặc định là 1.

         Ví dụ: Bạn muốn chèn field partial vào một `div#parent` nhất định, các partial sẽ nối tiếp nhau, mỗi lần nhấn vào link sẽ tạo ra 3 partial mới. `link_to_add_association` sẽ có dạng:
         ```
         = link_to_add_association "add node", f, :questions,
           data: {"association-insertion-node": "#parent_table",
           "association-insertion-method": "append"}, count: 3
         ```
   - render_options:  Bên trong `html_options` bạn có thể thêm tùy chọn `:render_option`và hàm băm chứa sẽ được chuyển xuống trình tạo biểu mẫu cho biểu mẫu được chèn.

        Ví dụ:
        Khi dùng `simple_fields_for` cần option `wrapper: 'inline'` ta sẽ làm tương tự:
        ```
        = link_to_add_association 'add something', f, :something,
            render_options: { wrapper: 'inline' }
        ```

        Hoặc muốn truyền biến xuống p
        ```
        = link_to_add_association 'add something', f, :something,
            render_options: {locals: { sherlock: 'Holmes' }}
        ```

    - partial: Để định nghĩa là partial mặc định.
       ```
          = link_to_add_association 'add something', f, :something,
          partial: 'shared/something_fields'
        ```
     - wrap_object: Nếu bạn sử dụng decorator, khởi tạo bình thường của đối tượng liên quan sẽ không đủ. Bạn thực sự muốn tạo ra các đối tượng đã được decorate.

          Ví dụ:
          ```
           = link_to_add_association('add something', @form_obj, :comments,
               wrap_object: Proc.new {|comment| CommentDecorator.new(comment) })
          ```

        Hoặc có thể sử dụng `:wrap_object` để truyền thêm biến đã được xử lý xuống partial:
        ```
        = link_to_add_association('add something', @form_obj, :comments,
          wrap_object: Proc.new { |comment| comment.name = current_user.name; comment })
       ```
##### 2.2.2 link_to_remove_association
Hàm này sẽ thêm 1 link vào phần hiển thị của bạn, khi click sẽ loại bỏ partial đó.

Thành phần chính:
- name: text hiển thị tên nút, sử dụng tương tự như `link_to`
- f: đối tượng form hiện tại
- html_options: tương tự html_options của `link_to`

### 3. Áp dụng sử dụng cho bài toán multi nested attributes
Với bài toán multi nested (nhiều form lồng), chúng ta cần nắm rõ để có thể sử dụng linh hoạt gem `cocoon`.

Trong trường hợp này mình sẽ đưa ra một ví dụ cụ thể:

> Khi tạo 1 bài kiểm tra(exam) chúng ta cần tạo luôn các câu hỏi(question) và câu trả lời (answer) cho bài kiểm tra này.
>

Khởi tạo các model:

`exam.rb`
```
# frozen_string_literal: true

class Exam < ApplicationRecord
  has_many :questions

  accepts_nested_attributes_for :questions, allow_destroy: true, reject_if: :all_blank
end
```

`question.rb`
```
# frozen_string_literal: true

class Question < ApplicationRecord
  belongs_to :exam

  has_many :answers

  accepts_nested_attributes_for :answers, allow_destroy: true, reject_if: :all_blank
end
```

`answer.rb`
```
# frozen_string_literal: true

class Answer < ApplicationRecord
  belongs_to :question
end
```

`exams_controller.rb`
```
def new
  @exam = Exam.new
  @exam.questions.build
end
```

Tiếp đó trong view:
`exams/new.html.slim`
```
= form_for @exam, url: exams_url do |f|
 .form-group.row
      label.col-md-3.form-control-label.text-primary.font-weight-bold Exam description
      #parent_table.col-md-9
        = f.fields_for :questions do |question|
      .js-new-question.ml-5
        = link_to_add_association f, :questions do
          span.fa.fa-plus
          span.ml-2 Add question
    = f.submit t(".save"),class: "btn btn-primary my-2"

javascript:
  $(document).ready(function() {
    $(".js-new-question a.add_fields").
      data("association-insertion-method", 'append').
      data("association-insertion-node", '#parent_table');
  });
```

Tiếp theo trong `_question_fields.html.slim`
```
.container-fluid.nested-fields
  .line
  .form-group.row
    .col-11
      = f.text_area :content, class: "form-control"
    .col-1
      = link_to_remove_association f do
        span.fa.fa-minus-square title="Remove question"
    .question.col-md-9
      = link_to_add_association f, :answers, class: "btn btn-info btn-sm mt-2" do # chúng ta sẽ tiến hành khai báo để  tạo partial `answer` bên trong mỗi question.
        span.fa.fa-plus-circle
        span.ml-2 Add answer
      = f.fields_for :answers do |answer|
```

Cuối cùng là `answer_fields.html.slim`
```
.col-6
  .row.pt-2
    .col-10
      = f.text_field :content, class: "form-control"
    .col-1
      = link_to_remove_association f do
        span.fa.fa-minus-square title="Remove question"
```

*Ở trên mình dùng slim và một số class bootstrap 4 cho code của mình, chú ý: phần data đã được di chuyển ra bên ngoài form và để trong đoạn `javascript` do khi chúng ta tạo ra nhiều form lồng, ta cần định nghĩa class cha của chúng (ở đây mình định nghĩa là `js-new-question`) để khi oncick vào `link_to_remove_association` *

Demo:
![](https://images.viblo.asia/792519e2-fe73-42c6-9124-b2c09b329ea8.gif)



Tham khảo:

https://github.com/nathanvda/cocoon#link_to_remove_association
https://api.rubyonrails.org/classes/ActiveRecord/NestedAttributes/ClassMethods.html
