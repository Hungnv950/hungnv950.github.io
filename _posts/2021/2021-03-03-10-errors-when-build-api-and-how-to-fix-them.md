---
layout: post
title:  10 Error status codes khi xây dựng API và cách giải quyết chúng
date:   2021-03-10 00:48:45
description: 10 Error status codes khi xây dựng API và cách giải quyết chúng
categories:
- tech
---

Link bài viết gốc:
[https://www.moesif.com/blog/technical/monitoring/10-Error-Status-Codes-When-Building-APIs-For-The-First-Time-And-How-To-Fix-Them/](https://www.moesif.com/blog/technical/monitoring/10-Error-Status-Codes-When-Building-APIs-For-The-First-Time-And-How-To-Fix-Them/)

Mọi thứ không phải lúc nào cũng dễ dàng khi bạn lần đầu sử dụng API, đặc biệt hơn nếu đây là lần đầu bạn tích hợp API sang một hệ thống khác. Thông thường tài liệu hay bị thiếu các quy định về lỗi, căn bản là do việc đoán trước ra việc chạy đúng có vẻ dễ dàng hơn, hơn là suy nghĩ về việc sẽ chạy sai.

Trong HTTP, có nhiều status codes có thể cung cấp cho bạn ý tưởng về việc gì sẽ xảy ra khi bạn gọi tới một API. Các status code tiêu chuẩn từ 100 tới 511, và mỗi status đều mang một ý nghĩa riêng, nhưng chỉ có lỗi từ 400 tới 511 là thông báo về lỗi.

Hãy cùng xem 10 status codes phổ biến nhất, về cả phía client và server.

---
## Client-side Errors (Lỗi phía người dùng)
---

Nhóm status codes 4XX luôn luôn liên quan tới client-side (lỗi phía người dùng hay browser), nhưng những thay đổi trên API có thể gây ra chúng. Dưới đây là 5 lỗi phổ biến nhất và cách để giải quyết chúng:

### 404 Not found

Đây là lỗi phổ biến nhất mà chúng ta thường gặp. Nó chỉ ra url bạn đã sử dụng không tồn tại trên server.

Khi mà đó là lỗi 4XX, điều này có nghĩa là phía client đang có gì đó sai, nó cũng có thể chỉ ra là phía server cũng đang tồi tại vấn đề.

Cách giải quyết tốt nhất là giữ nguyên trang thái của client trước khi chắc chắn răng API đang không có vấn đề gì cả.

### 401 Unauthorized

Lỗi này có nghĩa rằng bạn chưa xác thực đối với API đó. API đang không biết bạn là ai và sẽ không phục vụ yêu cầu của bạn.

Điều bạn cần làm nhất là đăng kí và sử dụng một một phương thức xác thực thoả mãn để có thể sử dụng API đó.
### 403 Forbidden

Lỗi forbidden (bị cấm) cho thấy rằng bạn không có quyền truy cập vào URL đó. Điểm khác biệt với Unauthorized (401) là bạn đã được xác thực, nhưng vai trò của người dùng đó không được cho phép vào request đó.

Điều đó cũng xảy ra khi bạn có vấn đề với việc xác thực, giống như là sử dụng sai API key hoặc là cố gắng truy cập vào 1 tính năng gói đăng kí của bạn không cho phép sử dụng.

### 400 Bad Request

Bad reques status là 1 trong những lỗi thông báo chung nhất. Nó ngụ ý rằng bạn đã làm điều gì đó chưa đúng trong request của bạn. Nếu không có thêm thông tin được cung cấp trong body của kết quả trả về, bạn phải check lại tài liệu. Bạn có thể bị thiếu truy vấn hoặc trong thẻ body của request, hoặc là header có thể đang bị lỗi. Nó có thể cũng là một số request của bạn đang không đúng format.

### 429 Too Many Requests

Hầu hết các gói đăng kí API đều có giới hạn - đối với các gói rẻ hơn, càng ít hơn số lượng request mỗi giây được cho phép API của bạn truy cập. Có

Nếu bạn đang gửi nhiều request trên 1 khoảng thời gian ngắn, xem xét điều chỉnh chúng ở phía client. Status này cũng biểu thị rằng bạn bạn đã đạt giới hạn hàng ngày, hàng tuần, hàng tháng trong tài khoản đó.

Đôi khi API nghe có vẻ phù hợp cho tới khi bạn thấy giới hạn, và đột ngột nó không hoạt động cho trường hợp của bạn nữa. Kiểm tra phần nào của API bạn đã đăng kí trước khi tích hợp, nếu không bạn có thể gặp sự cố vài tuần hoặc vài tháng sau khi tích hợp API.

---
## Server-Side Errors (Lỗi phía server)
---


Nhóm 5XX các status luôn luôn được sử dụng cho lỗi phía server (server-side), nhưng một yêu cầu không hợp lệ sẽ phản hồi cho phía client bằng 4XX dãn tới lỗi 5XX nếu không được bắt đúng trên máy chủ. Dưới đây là 5 lỗi phổ biến nhất và cách khắc phục chúng:

### 500 Internal Server Error

Status này có thể có nghĩa rằng có bất cứ lỗi gì, nhưng luôn luôn thể hiện rằng server đang có vấn đề.  Nó có thể được gây ra bởi 1 yêu cầu có vấn đề.

Kiểm tra kĩ lại tài liệu để chắc chắn rằng mọi thứ đang hoạt động đúng: query, body, headers, format,...

Nếu không giải quyể được vấn đề, nó có nghĩa rằng bản cập nhật API đã có lỗi về code, hoặc dữ liệu từ API đã được lấy từ một server khác mà ở đó có vấn đề. Trong trường hợp này, bạn nên liên hệ lại với đội cung cấp API để được hỗ trợ.

### 502 Bad Gateway

Trạng thái này cho biết server bạn đang sử dụng không phải là máy chủ thực tế. Máy chủ proxy cố gắng sử dụng API server bằng tên của bạn. Status này cũng chỉ ra rằng API server không phản hồi lại request. Điều đó cũng có thể liên quan tới vấn đề về mạng, hoặc đơn giản là server API đang bị crashed hoặc là đang bị tắt cho việc maintenance.

Vấn đề này thì luôn luôn là vấn đề tạm thời và có nên được giải quyết bởi nhà cung cấp API, nhưng bạn cần phải liên hệ giúp đỡ nếu nó vẫn tiếp tục diễn ra.

### 503 Service Unavailable

Dịch vụ không sẵn sàng có nghĩa là server đang bị quá tải (overloaded). Quá nhiều request API đã được gửi và hiện tại API không thể xử lý thêm. Vấn đề này tự giải quyết khi client gửi ít request đi, nhưng nó cũng có thể có nghĩa rằng API đã không có kể hoặc đủ nguồn lực cung cấp cho tất cả người dùng của họ.

Nếu nó phù hợp với trường hợp sử dụng của bạn, bạn có thể làm cho phía client đợi và gửi lại request một vài lần nữa. Nhưng nếu vấn đề này vẫn tiếp tục hiển thị, bạn cần phải liên hệ với nhà cung cấp API.

### 504 Gateway Timed Out

Giống như lỗi 502 (Bad gateway), điều này cho bạn biết rằng server bạn đang gọi là một proxy cho 1 server API. Lần này, vấn đề là máy chủ API trả lời không kịp thời.

Điều này có thê rlieen quan đến đội trễ matngj cao giữa proxy và máy chủ API. Điều đó cũng có nghĩa rằng máy chủ API tốn nhiều thời gian để xử lý request của bạn.

Để giải quyết vấn đề này, kiểm tra nếu nội dung của request có thể liên quan tới việc timeout. Nếu bạn request quá nhiều dữ liệu hoặc tín toán tốn quá nhiều thời gian, bạn cần phải thử lại.

Nếu bạn nghĩ rằng request của bạn đang hợp lý và trạng thái không thay đổi, liên hệ hộ trợ ngay.

### 501 Not Implemented

Trạng thái không được triểm khai có liên quan tới phương thức HTTP bạn đã sử dụng để request URL. Bạn có thể thử lại bằng phương thức khác.

Thông thường, request với phương thức (method) sai thường nhận được với kết quả là 404 not found. Trạng thái not-implemented ngụ ý rằng phương thức này đã không được triển khai. Nhà cung cấp API có thể sử dụng status đó để thông báo với client rằng phương thức này sẽ có thể truy cập được trong tương lai.
