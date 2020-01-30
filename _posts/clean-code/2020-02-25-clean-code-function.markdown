---
layout: post
title:  Clean code - function
date:   2020-02-25
description: Clean code - function
categories:
- tech
---

---

### Function là động từ, class là danh từ. Nghệ thuật của lập trình là nghệ thuật của ngôn ngữ thiết kế.

### Các lập trình viên bậc thầy nghĩ rằng các hệ thống như một câu chuyện để kể chứ không phải là một chương trình để viết một cách thuần tuý.

---

- Small: Nguyên tắc đầu tiên của function là chúng càn phải nhỏ. Nguyên tắc thứ 2 là chúng cần phải nhỏ hơn nữa. (function không nên dài quá 20 dòng, mỗi dòng không nên dài quá 150 kí tự)
- Những khối lệnh if, else, while nên đặt trên cùng 1 dòng và những dòng này nên đặt tới 1 lời gọi tới hàm khác.
- Mức thụt lề của function nên ở mức 1 hoặc 2. Nếu quá mức này, hãy nghĩ tới việc tách function mới.
- Do one thing: Function chỉ nên thực hiện một thứ. Nó nên thực hiện điều đó cho tốt. Nó nên thực hiện 1 điều duy nhất.
- One level of Abstraction per Function: Để đảm bảo chắc chắn rằng function đang làm 1 việc duy nhất cần đảm bảo các câu lệnh trong function đang cùng nằm ở 1 mức độ trừu tượng.
- Reading code from top to bottom (the StepDown rule): Chúng ta muốn đọc code như một câu chuyện từ trên xuống. Mỗi function được sắp xếp đều được tuân theo mức độ của sự trừu tượng từ trên xuống. Giảm dần mức độ trừu tượng từ trên xuống.
- Use Descriptive Names: Sử dụng tên mô tả những gì function làm. Đừng ngần ngại vì đó là một cái tên dài. Tên mô tả dài sẽ tốt hơn là 1 tên mô tả ngắn và bí ẩn, tên mô tả dài sẽ tốt hơn là một đoạn comment bình luận để mô tả về function đó.
- Function arguments: Số lượng tham số lý tưởng trong 1 funciton là = 0 (niladic), tiếp đến là 1 (monadic), 2 (dyadic), 3 (triadic) thì nên tránh nếu có thể. Nhiều hơn 3 (polyadic) thì cần phải có một lý do đặc biệt và không nên sử dụng.
- Common Monadic Form:
  Hai hình thức phổ biến khi sử dụng function 1 tham số là:
    - Một hàm lý luận, trả về true hoặc false
    - Một hàm lập luận, biến nó thành một thứ gì khác và trả về giá trị
    - Một hình thức ít phổ biến hơn là hàm xử lý sự kiện, có 1 tham số đầu vào nhưng không có tham số đầu ra.
- Flag argument: Nên tách nó thành 2 hàm, bởi vì hàm này đã làm hơn 1 điều: 1 là flag có giá trị đúng, hai là flag có giá trị sai.
- Dyalic function: Hai tham số phải có sự gắn kết tự nhiên hoặc là sắp xếp của một trật tự tự nhiên.
- Triads: Những hàm phải đưa ra tới 3 đối số càng khó để hiểu hơn là hai. Khuyên bạn nên thực sự cẩn thận khi đưa ra một hàm với một bộ 3 tham số.
- Argument Object: Khi một số hàm thực sự cần nhiều hơn 2 hay 3 tham số, có khả năng một số trong những args đó có thể được gói gọn trong 1 lớp chứa các tham số đó.
- Argument List: Đôi khi chúng ta muốn vượt qua số lượng biến số của tham số vào 1 hàm. Nếu các tham số đều được đối xử tương tự nhau, có thể gộp chung lại thành một tham số đơn kiểu List.
- Verbs and Keywords: Trong trường hợp là 1 monad function, hàm và tham số nên tạo thành 1 động từ hoặc danh từ đẹp. Ví dụ: assertEquals có thể được viết tốt hơn là assertExpectedEqualsActual(expected, actual), điều này giảm nhẹ vấn đề phải nhớ thứ tự các tham số.
- Have no sideeffecs:
  - Do one thinh
  - Tránh các tham số đầu ra nếu sử dụng được this/self.
- Comman query separation (Tách lệnh truy vấn): Hàm nên thực hiện hoặc làm 1 điều gì đó hoặc trả lời một điều gì đó, nhưng không bao gồm cả hai. Hàm của bạn nên thay đổi trạng thái của một đối tượng hoặc trả về thông tin của một đối tượng. Làm cả hai sẽ gây ra nhầm lẫn.
- Prefer exceptions to returning erros code:
  Trả về đoạn code báo lỗi bên trong các câu lệnh của hàm là một sự vi phạm tới việc tách câu lệnh truy vấn.
- Extract Try/Catch blocks:
  Tách các khối xử lý Try/Catch ra khỏi các thành phần chức năng riêng của chính nó.
- Errors handing Is one thing:
  Function nên làm một việc, xử lý lỗi nên làm một việc. Vậy nên một chức năng xử lý lỗi thì không nên làm bất cứ điều gì nữa.
- The Error.java Dependency Magnet:
  Một class hoặc enum chứa tất cả các định nghĩa lỗi. Khi sử dụng chúng thì các class khác đều phụ thuộc vào class định nghĩa này. Nhưng khi danh sách lỗi này được thay đổi thì tất cả các class khác cần được biên dịch và bố trí lại.
  => Nên sử dụng các exception hơn là errors code.
- **Don't repeat your self**:
  Sự trùng lặp là một vấn đề vì nó thổi phồng mã lên và sẽ phải yêu cầu thay đổi nhiều lần nếu thuật toán có sự thay đổi. Nó cũng cấp số nhân nhiều lần cho một lỗi thiếu sót nào đó.

  Mục tiêu là giảm thiểu sự trùng lặp.

  Trùng lặp có thể là gốc rễ mọi tội lỗi ở trong phần mềm. Nhiều nguyên tắc và thông lệ được tạo ra nhằm kiếm soát và hạn chế sự trùng lặp đó. Lập trình hướng đối tượng, lập trình cấu trúc,...
- Structed Programing: Nguyên tắc Dijktra trong lập trình cấu trúc: Mọi function và mọi block ở trong function nên có một đầu vào và một đầu ra. Điều đó có nghĩa là chỉ nên có một statement trả về trong hàm, không có break hay continue trong một vòng lặp, và không bao giờ có ever hay bất cứ phát biểu goto nào.
- How do you write function like this ?
  Viết phần mềm cũng như đang viết một bài văn vậy. Khi bạn viết một bài văn hay một bài báo, bạn sẽ có những ý tưởng đầu tiên, sau đó sẽ uốn nắn đề có thể đọc được tốt hơn. Phác thảo đầu tiên có thể vụng về và thiếu tổ chức. Nhưng bạn có thẻ rèn câu cú, tái cấu trúc và sàng lọc cho đến khi nó đọc được theo cách mà bạn muốn.

  Khi viết một hàm, nó bắt đầu rất dài và phức tạp, nó có nhiều phần chưa rõ ràng và vòng lặp lồng nhau. Nó có một danh sách dài các tham số. Tên thì tuỳ tiện và code thì trùng lặp. Và chắc chắn là đi cùng nó là một bộ unit test để cover hết đống lộn xộn đó.

  Vì vậy, uốn nắn và sàng lọc code, phân chia các chức năng, thay đổi tên, loại bỏ sự trùng lặp. Co gọn các phương pháp để rút ngắn lại. Đôi khi sẽ xảy ra việc tạo ra rất nhiều class. Nhưng đừng quên giữ cho pass các Unit test trước đó nhé =))
