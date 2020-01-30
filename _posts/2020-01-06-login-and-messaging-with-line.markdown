---
layout: post
title: Ruby - Login and messaging with line
categories:
- tech
---

> Gần đây mình có gặp lại task liên quan tới việc implement tính năng đăng nhập và nhắn tin thông qua mạng xã hội Line.

>

> Tuy cách đây 1 năm mình cũng đã gặp task này nhưng khi gặp lại cũng còn khá nhiều bỡ ngỡ nên mình quyết định xây 1 chiếc base nhỏ cùng những `noob` của mình để biết đâu sau này mình hoặc bạn có thể tránh phải

  

### 1. Đặt vấn đề

Để làm bất cứ task nào mà mình chưa biết thì việc tự `research` là vô cùng quan trọng. Như thường lệ, các câu hỏi đặt ra là: `what`, `why`, `when`, `where` và `how`. Và chúng ta sẽ trả lời câu hỏi đó

  

- what ? Chúng ta sẽ thực hiện chức năng login bằng Line và nhắn tin cho người dùng sử dụng Line

- why ? Do có nhu cầu từ KH hoặc là vì `mình thích` =))

- when ? Khi người dùng muốn đồng bộ hoặc sử dụng thông tin tài khoản cá nhân Line của mình với hệ thống mà không tốn thời gian đăng nhập + nhận thông báo của hệ thống thông qua line. Để sâu hơn, bạn có thể tìm hiểu về [OAuth-2](https://oauth.net/2/)

- where ? Phần này mình nghĩ sẽ liên quan tới `how` nhiều hơn nhưng không sao, chúng ta vẫn có thể tìm kiếm mọi thứ thông qua internet hoặc thông qua *`người thân`*

- how ?

    - Xác định vấn đề: Các bước trên đã có vẻ clear :D

    - Giải quyết vấn đề: Để giải quyết được các vấn đề, với mình thì nên đặt ra các câu hỏi đúng để có thể trả lời từng câu hỏi đó dẫn tới việc giải quyết bài toán. Bạn có thể tham khảo [X-Y problem](/life/2020/01/06/the-x-y-problem/){:target="_blank"}

    - Khi một service sinh ra để cung cấp tính năng thì chắc chắn nhà cung cấp phải cung cấp đi kèm service đó một document cụ thể. => Tài liệu nên tìm hiểu và đọc của Line service

  

### 2. Giải quyết vấn đề

#### 2.1. Đăng nhập với tài khoản sử dụng thông tin đăng nhập từ tài khoản Line

Document hướng dẫn của Line: [Integrating LINE Login with your web app

](https://developers.line.biz/en/docs/line-login/web/integrate-line-login/)

  
  

Quá trình Đăng nhập LINE cho web (đăng nhập web) dựa trên luồng cấp mã ủy quyền OAuth 2.0 và giao thức OpenID Connect. Ứng dụng của bạn phải có khả năng thực hiện yêu cầu phía máy chủ và nhận dữ liệu từ Nền tảng LINE. Sau đây là tổng quan về dòng đăng nhập web:

  

![](https://images.viblo.asia/18f9795d-8ce2-4550-8be5-ebca1f98b7fd.png)

  
  

Flow đăng nhập web sử dụng Line:

  

1. Ứng dụng của bạn hướng người dùng đến URL ủy quyền Đăng nhập LINE với các tham số truy vấn bắt buộc (tham khảo bên dưới).

2. Hộp thoại Đăng nhập LINE được mở trong trình duyệt và người dùng đăng nhập để được xác thực. Sau khi Nền tảng LINE xác thực thông tin đăng nhập của người dùng, người dùng cũng phải đồng ý cấp các quyền được yêu cầu cho ứng dụng của bạn.

3. Nền tảng LINE chuyển hướng người dùng quay lại ứng dụng của bạn thông qua redirect_uri với mã ủy quyền và trạng thái trong chuỗi truy vấn.

4. Ứng dụng của bạn yêu cầu mã thông báo truy cập từ https://api.line.me/oauth2/v2.1/token endpoint với mã ủy quyền.

5. Nền tảng LINE xác nhận yêu cầu của ứng dụng của bạn và trả về mã thông báo truy cập.

6. Khi bạn đã truy xuất mã thông báo truy cập, bạn có thể sử dụng mã này để gọi API đến các thông tin cần thiế để sử dụng.

  

**Trước khi bắt đầu bạn cần đăng kí tài khoản line channel của bạn: tại [https://developers.line.biz/en/docs/line-login/getting-started/](https://developers.line.biz/en/docs/line-login/getting-started/)**

  

- Lưu ý: trong phần `Callback URL` bạn cần khai báo địa url trong project của bạn mà sau khi line validate thành công sẽ redirect về project kèm theo params của Line cung cấp.
Ví dụ trong môi trường development: http://localhost:3000/auth/line/callback

![image-callback ](https://developers.line.biz/media/line-login/integrate-login-web/redirect-settings-cd7e32a6.png)

  - Tạo request url: 
	  - Để xác thực người dùng và yêu cầu quyền của ứng dụng của bạn, hãy chuyển hướng người dùng đến URL ủy quyền sau với các tham số truy vấn bắt buộc. Bạn có thể chuyển hướng người dùng bằng nút [Đăng nhập LINE](https://developers.line.biz/en/docs/line-login/login-button/) hoặc bằng liên kết trực tiếp.
	- Các tham số cần thiết trong url được generate ra:

        | Tham số        | Kiểu dữ liệu           | Bắt buộc  | Mô tả  |
        | ------------- |:-------------:| -----:| -----:|
        | response_type | String | Bắt buộc | `code`. Tham số này để thông báo cho Line Platform biết được cần trả về `authoration code` |
        | client_id | String | Bắt buộc | `Channel ID`. Định danh duy nhất mà Line cung cấp cho channel của bạn, tham số này đuợc cung cấp trong trang quản lý login channel.
        | redirect_uri | String | Bắt buộc | `Callback URL`. Là `url` bạn cung cấp trong setting của line channel như đã `chu ý ở trên` |
        | state | String | Bắt buộc | Một chuỗi ký tự chữ và số duy nhất được sử dụng để ngăn chặn giả mạo yêu cầu giữa các trang web. Giá trị này sẽ được tạo ngẫu nhiên bởi ứng dụng của bạn. Không thể là một chuỗi được mã hóa URL. |
        | scope | String | Bắt buộc | Quyền được cấp bởi người dùng. Bạn có thể chỉ định nhiều phạm vi bằng ký tự khoảng trắng được mã hóa URL (% 20). Thông thường, scope bao gồm: profile, openid và email|
        | nonce | String | Không bắt buộc | Một chuỗi được sử dụng để ngăn chặn các cuộc tấn công phát lại. Giá trị này được trả về trong mã thông báo ID. |
        | prompt | String | Không bắt buộc | `consent`. Được sử dụng để buộc màn hình chấp thuận được hiển thị ngay cả khi người dùng đã cấp tất cả các quyền được yêu cầu. |
        | max_age | Number | Không bắt buộc | Thời gian cho phép trôi qua tính bằng giây kể từ lần cuối cùng người dùng được xác thực. Tương ứng với tham số max_age được xác định trong phần "Yêu cầu xác thực" của OpenID Connect Core 1.0. |
        | ui_locales | String | Optional | Ngôn ngữ hiển thị cho màn hình Đăng nhập LINE. Chỉ định là một hoặc nhiều thẻ ngôn ngữ RFC 5646 (BCP 47), được phân tách bằng dấu cách, theo thứ tự ưu tiên. Tương ứng với tham số ui_locales được xác định trong phần "Yêu cầu xác thực" của OpenID Connect Core 1.0. |
        | bot_prompt | String | Không bắt buộc | Hiển thị tùy chọn để thêm tài khoản chính thức LINE làm bạn bè trong khi đăng nhập. Đặt giá trị `normal` thường hoặc `aggressive`. Để biết thêm thông tin, hãy xem [Liên kết tài khoản chính thức LINE với kênh Đăng nhập LINE của bạn.](https://developers.line.biz/en/docs/line-login/web/link-a-bot/) |

- Sau khi tạo reques url thành công, khi di chuyển vào link đã được tạo ra, người dùng sẽ đuợc di chuyển sang trang của Line để tiến hành đăng nhập và xác thực. Nếu xác thực thành công, Line Platform sẽ redirect tới server của bạn với confir callback đã khai báo từ trước kèm them tham số là `code`, `state` và `friendship_status_changed`
    
    | Tables        | Are           | Cool  |
    | ------------- |:-------------:| -----:|
    | code | String | Mã ủy quyền được sử dụng để nhận mã thông báo truy cập. Có giá trị trong `10 phút`. Mã ủy quyền này chỉ có thể được sử dụng một lần.|
    | state | String | tham số  `state` được bao gồm trong URL ủy quyền của yêu cầu ban đầu. Ứng dụng của bạn nên xác minh rằng giá trị này khớp với giá trị trong yêu cầu ban đầu.|
    | friendship_status_changed | Boolean | `true` nếu trạng thái tình bạn giữa người dùng và tài khoản chính thức LINE thay đổi trong quá trình đăng nhập. Nếu không, `false`. Giá trị này chỉ được trả về nếu tham số truy vấn bot_prompt được chỉ định trong yêu cầu cấp phép và màn hình chấp thuận với tùy chọn thêm tài khoản chính thức LINE của bạn khi bạn bè được hiển thị cho người dùng.|

Ví dụ về một response của Line trả về:
```
HTTP/1.1 302 Found
Location : https://client.example.org/cb?code=abcd1234&state=0987poi&friendship_status_changed=true
```

- Lấy access token:
	Để lấy accesstoken, hãy tạo một yêu cầu POST HTTP với mã ủy quyền. Khi bạn có mã thông báo truy cập, bạn có thể sử dụng nó để thực hiện các cuộc gọi API. Mã thông báo truy cập được phát hành tại điểm cuối sau.
	- Request
		> POST https://api.line.me/oauth2/v2.1/token
	- Request header:
		| Request header        | Mô tả           | 
		| ------------- |:-------------:| 
		| Content-Type | application/x-www-form-urlencoded |
	- Request body
	
        Parameters | Type | Required | Description |
        --------- | :----: | ------: | ---------: |
        grant_type| String| Required| authorization_code. |
        code| String| Required| Authorization code |
        redirect_uri| String| Required| Callback URL |
        client_id| String| Required| Channel ID. Found in the console. |
        client_secret| String| Required| Channel secret. Found in the console. |


- Response: Sau khi request, nếu thông tin truyền lên valid, Line sẽ trả về `access_token` và một số thông tin đi kèm.
- Chúng ta sẽ sử dụng accesstoken đó để request lên [LINE social enpoint](https://developers.line.biz/en/docs/line-login/web/integrate-line-login/#use-endpoint) để sử dụng các thông tin mà Line cung cấp.
		
#### 2.2. Nhắn tin sử dụng line channel

Để sử dụng tính năng nhắn tin Line, bạn cần phải tạo một channel để nhắn tin tại: [Line console](https://developers.line.biz/console/)


Các lưu ý: 

- Sử dụng channel access token: Accesstoken là token tồn tại lâu dài phải được đặt trong tiêu đề ủy quyền khi thực hiện các cuộc gọi API. Bạn có thể phát hành lại mã thông báo truy cập kênh bất cứ lúc nào thông qua bảng điều khiển.
- Để sử dụng một access token, click vào `issue` bên dưới phần `**Channel access token (long-lived)**` trong tab `Messaging API`
- Mặc định, BOT không thể nhắn tin cho người dùng mà chưa kết bạn hoặc chưa từng tuơng tác với người dùng. Vì thế bạn cần chắc chắn là bot channel của mình đã kết bạn với người dùng.  Có nhiều cách như trên trang chủ  [LINE](https://developers.line.biz/en/docs/messaging-api/building-bot/#sending-reply-messages) đã cung cấp. Trong phần này mình sẽ hướng dẫn bạn sử dụng tính năng `push_message`
*Chú ý: để có thể hiển thị tính năng kết bạn sau khi người dùng chấp nhận ủy quyền thông tin của Line, bạn cần liên kết Line bot messaging với Line login: Trong tab **## LINE Login settings** > **### General settings** > **Linked OA** chọn app liên kết là Line bot messaging bạn vừa tạo.*

Hướng dẫn sử dụng tính năng `push_message`:

- HTTP request
	POST https://api.line.me/v2/bot/message/push

- Request headers

    Request header  |	Description
    --- | ---
    Content-Type	 | application/json
    Authorization |	Bearer {channel access token}

- Request body

    Property	| Type |	Required	Description
    --- | --- | ---
    to |	String	| Required |	ID của người nhận mục tiêu. Sử dụng giá trị userId, groupId hoặc roomId được trả về trong một đối tượng sự kiện webhook. Không sử dụng ID LINE được tìm thấy trên LINE.
    messages |	Array của các đối tượng tin nhắn |	Required	Messages, Tối đa: 5
    notificationDisabled	| Boolean |	Optional

Ví dụ khi thực hiện request sử dụng `curl` :
```
curl -v -X POST https://api.line.me/v2/bot/message/push \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer {channel access token}' \
-d '{
    "to": "U4af4980629...",
    "messages":[
        {
            "type":"text",
            "text":"Hello, world1"
        },
        {
            "type":"text",
            "text":"Hello, world2"
        }
    ]
}'
```
