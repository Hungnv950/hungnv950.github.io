---
layout: post
title:  The X-Y problem
description: The X-Y problem
categories:
- life
---

> XY problem là một vấn đề nan giải mà bất cứ ai hoặc bất cứ ngành nghề nào cũng có thể sẽ mắc phải trong công việc và cuộc sống.
> Mình biết tới vấn đề này thông qua một người anh trong team dự án - [Tuấn Trần](https://ttuan.github.io/), hi vọng bài viết sẽ đem lại cho bạn một cách nhìn nhận khác khi đối mặt với bất kì vấn đề nào trong cuộc sống :D

Source: [The XY Problem](http://xyproblem.info/)

### What is it ?
> Vấn đề XY xảy ra khi bạn muốn đặt câu hỏi về vấn đề X nhưng bạn lại đặt câu hỏi về  những giải pháp bạn đưa ra để giải quyết vấn đề X đó. Điều đó dẫn tới nhiều lãng phí về thời gian và năng lượng, bao gồm người hỏi và người muốn giúp đỡ.

Để dễ hiểu có thể tham khảo ví dụ:
1. Bạn muốn giải quyết vấn đề X
2. Bạn không biết làm thế nào để giải quyết X, nhưng nghĩ rằng bạn có thể tìm ra cách giải quyết vấn đề X nếu bạn làm được Y.
3. Bạn tiếp tục không biết làm thế nào để giải quyết Y.
4. Người khác giúp bạn giải quyết Y nhưng lại `confused` bởi vì Y dường như là 1 vấn đề lạ và không liên quan tới X cho lắm =))
5. Sau rất nhiều tương tác và thời gian lãng phí, cuối cùng bạn cũng hiểu được rằng bạn muốn được giúp đỡ giải quyết vấn đề X, và bạn cũng hiểu ra rằng Y cũng không liên quan tới X cho là mấy :v

Vấn đề này xảy ra khi mà chúng ta bị mắc kẹt vào những vấn đề mà chúng ta tin đó là giải pháp và không thể quay lại bước trước đó để có thể hiểu vấn đề chính một cách rõ ràng.

### What to do about it?
Vậy thì chúng ta cần phải làm gì ?? Câu hỏi tương đối khó bởi vì khi chìm sâu vào 1 vấn đề chúng ta luôn tìm cách giải quyết nó chứ ít khi chúng ta tìm hiểu nguyên nhân vấn đề đó tại sao lại xảy ra.

1. Luôn nhìn vấn đề ở một bức tranh rộng hơn và đi cùng nó là những giải pháp.
2. Nếu ai đó yêu cầu thêm về thông tin, hãy cung cấp nó một cách đầy đủ và chi tiết.
3. Loại trừ những giải pháp đã được sử dụng, chia sẻ lý do bạn loại trừ chúng. Điều này sẽ cung cấp thêm thông tin về yêu cầu của bạn.

*Nên nhớ rằng nếu bạn luôn đoán đúng, bạn không cần phải hỏi bất cứ ai cả ^^*

### Examples
#### Example 1
n00b không thực sự muốn 3 kí tự cuối cùng trong filename, anh ta muốn `file extensions`, vậy tại sao anh ấy lại hỏi về 3 kí tự cuối cùng ??

```
<n00b> Làm thế nào tôi có thể in ra 3 kí tự cuối cùng của filename ?
<feline> Nếu chúng đang trong 1 biến, bạn có thể dùng: echo ${foo: -3}
<feline> Tại sao lại là 3 kí tự ? Đó có thực sự là điều bạn muốn ?
<feline> Có phải bạn đang muốn phần mở rộng của file ?
<n00b> Đúng :)
<feline> Không có gì đảm bảo rằng mọi filename sẽ có phần mở rộng là 3 kí tự cả, vì vậy cứ bám theo sự mù quáng rằng 3 kí tự sẽ không thể giải quyết được vấn đề
<feline> echo ${foo##*.}
```
#### Example 2
Nếu Angela chỉ bắt đầu giải thích bằng cách giải thích thì cô ấy muốn ngăn người khác phát hiện hệ điều hành của mình, cuộc thảo luận đáng nhẽ ra có thể ngắn hơn rất nhiều.

```
Angela: 'nmap -O -A 127.0.0.1' trả về một số dòng bắt đầu với 'OS:'. Làm thế nào để thay đổi nó ?
Obama: Nhìn vào sourcecode của nmap, tìm cách nó tìm ra phần Linux, sau đó viết lại TCP/IP của bạn để nó không vận hành theo theo cách mà nmap hoạt động.
Angela: Đúng, nhưng tôi không biết về hệ thống api linux
Obama: Well, địa chỉ của nmap dựa trên cách hoạt động của ngăn xếp TCP/IP, không có cách nào ngoại trừ viết lại các phần thích hợp của ngăn xếp đó.
Angela: Tôi thực sự mcaanf phải tránh những tin nhắn này. Những IP nào có thể làm công việc này ?
Obama: Well, không sử dụng việc quyét hệ điều hành hoặc quét các phiên bản.
Angela: Tôi muốn ngăn người khác biết hệ điều hành của tôi.....
```
:v :v
