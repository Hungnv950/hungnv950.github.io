---
layout: post
title: "Restful webservice"
date: 2019-11-29
description: "Restful webservice"
category: technical
author: hungnv950
usemathjax: true
thumbnail: /assets/img/posts/restful.gif
---

*Rest là gì ?*
Vậy REST là gì?

REST là viết tắt của Representational State Transfer

- là một kiểu kiến trúc lập trình, nó định nghĩa các quy tắc để thiết kết các web service chú trọng vào tài nguyên hệ thống.

- Trong kiến trúc REST mọi thứ đều được coi là tài nguyên, chúng có thể là: tệp văn bản, ảnh, trang html, video, hoặc dữ liệu động… REST server cung cấp quyền truy cập vào các tài nguyên, REST client truy cập và thay đổi các tài nguyên đó. Ở đây các tài nguyên được định danh dựa vào URI, REST sử dụng một vài đại diện để biểu diễn các tài nguyên như văn bản, JSON, XML.


- Để tạo một tài nguyên trên server ta dùng phương thức POST.
- Để lấy(đọc) tài nguyên trên server ta dùng phương thức GET.
- Để update tài nguyên trên server ta dùng phương thức PUT.
- Để xóa tài nguyển trên server ta dùng phương thức DELETE.

*PUT VS PATH*
- PUT (UPDATE): Cập nhật thông tin cho Resource.
- PATCH (UPDATE): Cập nhật một thành phần, thuộc tính của Resource.
