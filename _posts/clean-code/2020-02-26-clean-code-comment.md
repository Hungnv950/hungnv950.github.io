---
layout: post
title:  Clean code - Comment
date:   2020-02-26
description: Clean code - Comment
category: technical
author: hungnv950
usemathjax: true
thumbnail: /assets/img/posts/Clean-code.jpg
---
---

Đừng bình luận trên code xấu, hãy viết lại nó.
-Brian W.Kernighan và P.J.Plaugher-

---

1. Comment donot make up for bad code.
  Thay vì dành thời gian cho việc viết bình luận cho một đống lộn xộn, bạn nên dọn dẹp nó.
2. Explain your self in code.
  Code luôn là lời giải thích tốt nhất. Trong nhiều trường hợp, bạn nên thay thế hoặc tạo thêm những hàm mới để có thể nói lên những lời mà comment của bạn thể hiện.
3. Good comment.
  - Legal comments (Bình luận pháp lý)
  - Informative comments (Bình luận thông tin)
  - Explanation of Intent (Giải thích về mục đích)
  - Clarification (Làm sáng tỏ)
  - Warning of Consquences (Cảnh báo về hậu quả)
    ```
    // Don't run unless you
    // have some time to kill.
    ```
  - TODO comments: Khi có thời gian rảnh nên quay lại giải quyết các vấn đề mà đã TODO từ trước.
  - Amplification (Phóng đại)
4. Bad comments: Tất cả những gì không phải good comments.
  - Mumbling (lẩm bẩm): Đưa ra một comment chỉ vì bạn cảm thấy nên hoặc vì quá trình yêu cầu nó, vì hack. Nếu bạn quyết định viết comment thì hãy giành thời gian để đảm bảo nó là comment tốt nhất bạn có thể viết.
  - Redundant Comment (Comment dư thừa):
  - Misleading comments (Comment sai lệch):
  - Mandated comments (Comment bắt buộc): Thật là ngớ ngẩn khi có một quy tắc nói rằng mọi hàm phải có javadoc hoặc mọi biến phải có một comment. Những comment như thế này chỉ làm lộn xộn mã, tuyên truyền những lời nói dối và để gây nhầm lẫn và vô tổ chức.
  - Jounal comments:Đôi khi mọi người thêm một comment vào đầu module mỗi khi họ chỉnh sửa nó. Những comment này tích lũy như một loại tạp chí, hoặc nhật ký, của mọi thay đổi đã từng được thực hiện. Tuy nhiên ngày nay những comment loại như này chỉ làm cho module trở nên xáo trộn hơn mà thôi.
  -
