---
layout: post
title:  Amazon Simple Email Service
date:   2021-03-15 00:48:45
description: Amazon Simple Email Service
category: technical
author: hungnv950
usemathjax: true
thumbnail: /assets/img/posts/amazon-simple-email-service.jpg
---

# Amazon Simple Email Service

https://docs.aws.amazon.com/ses/latest/DeveloperGuide/Welcome.html

Lâu rồi mới quay lại viết blog thay vì dịch tài liệu. Hôm nay có 1 task liên quan tới việc chuyển server mail từ SendGrid về ASW SES nên mình note lại các ý chính luôn. Chắc là sẽ có 1 series về phần này luôn.

Trước tiên như mọi bài blog khác thì sẽ vào phần introduction luôn.
### Giới thiệu - Amazon SES là gì ?
> Amazon SES là một nền tảng email cung cấp dễ dàng và tiết kiệm chi phí cho bạn có thể gửi và nhận email sử dụng email sử dụng địa chỉ email và domains của bạn.

Như thế thì đơn giản quá nhỉ. Nếu thế thì tại sao lại phải sử dụng AWS SES ?

Theo như trên trang chủ của AWS thì có vẻ hợp lý:
> Xây dựng một giải pháp quản lý email lớn thường rát phức tạp và tốn chi phí cho doanh nghiệp. bạn càn phải đối mặt với những thách thức về cơ sở hạ tầng cũng như quản lý máy chủ, config network và địa chỉ IP. Hơn nữa nhiều giải pháp email của bên thứ ba yêu cầu thương lượng hợp đồng và giá cả, cũng như phải trả trước một chi phí đáng kể. Amazon SES đã loại bỏ những vấn đề này và cho phép bạn thừa hưởng các lợi ích nhiều năng kinh nghiệm và cấu trúc server phức tạo từ Amazon.com đã xây dựng để phục vụ cơ sở hạ tầng lớn của họ.

### Amazon SES and other AWS services
Amazon SES integrates seamlessly with other AWS products. For example, you can:
> Amazon SES tích hợp một cách liền mạch với các sản phầm khác của AWS. Như ví dụ, bạn có thể:

Add email-sending capabilities to any application. If your application runs in [Amazon Elastic Compute Cloud](https://aws.amazon.com/ec2/) (Amazon EC2), you can use Amazon SES to send [62,000 emails every month at no additional charge](https://aws.amazon.com/ses/pricing/). You can send email from Amazon EC2 by using an [AWS SDK](https://aws.amazon.com/tools/#sdk), by using the Amazon [SES SMTP](Amazon SES SMTP interface) interface, or by making calls directly to the Amazon [SES API](https://docs.aws.amazon.com/ses/latest/APIReference/).
> Thêm khả năng gửi mail vào bất cứ ứng dụng nào. Nếu ứng dụng đang chạy trên [Amazon Elastic Compute Cloud](https://aws.amazon.com/ec2/) (Amazon EC2), bạn có thể sử dụng Amazon SES để gửi [62,000 email mỗi tháng mà không cần phải trả thêm phí](https://aws.amazon.com/ses/pricing/). Bạn có thể gửi email từ Amazon EC2 bằng cách sử dụng [AWS SDK](https://aws.amazon.com/tools/#sdk), bằng cách sử dụng phương thức Amazon [SES SMTP](Amazon SES SMTP interface), hoặc bằng cách gửi trực tiếp từ Amazon [SES API](https://docs.aws.amazon.com/ses/latest/APIReference/)

Use [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) to create an email-enabled application such as a program that uses Amazon SES to send a newsletter to customers.
> Sử dụng [AWS Elastic BeanStalk](https://aws.amazon.com/elasticbeanstalk/) để tạo 1 ứng dụng hỗ trợ email giống như một chương trình sử dụng Amazon SES để gửi tới những người dùng mới.

Set up [Amazon Simple Notification Service (Amazon SNS)](https://aws.amazon.com/sns/) to notify you of your emails that bounced, produced a complaint, or were successfully delivered to the recipient's mail server. When you use Amazon SES to receive emails, your email content can be published to Amazon SNS topics.
> Cài đặt [Amazon Simple Notification Service (Amazon SNS)](https://aws.amazon.com/sns/) để thông báo cho bạn những email bị trả lại, đưa ra phàn nàn, hoặc đã gửi thành công cho server nhận mail. Khi bạn sử dụng Amazon SES để nhận emmails, nội dung email của bạn có thể được xuất bản lên topics của Amazon SNS

Use the AWS Management Console to set up [Easy DKIM](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/send-email-authentication-dkim.html), which is a way to authenticate your emails. Although you can use Easy DKIM with any DNS provider, it is especially easy to set up when you manage your domain with Route 53.
> Sử dụng AWS Management Console để cài đặt [Easy DKIM](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/send-email-authentication-dkim.html), là cách để xác thực email của bạn. Tuy nhiên bạn có thể sử dụng Easy DKIM với bất kì nhà cung cấp DNS nào, nó cơ bản đơn giản để cài đặt khi bạn quản lý domain với Route 53

Control user access to your email sending by using [AWS Identity and Access Management (IAM)](https://aws.amazon.com/iam/).
> Quản lý truy cập người dùng vào email gửi của bạn bằng cách sử dụng [AWS Identity and Access Management (IAM)](https://aws.amazon.com/iam/).

Store emails you receive in Amazon Simple Storage [Service (Amazon S3)](https://aws.amazon.com/s3/).
> Lưu trữ những email bạn nhận được trong Amazon Simple Storage [Service (Amazon S3)](https://aws.amazon.com/s3/).

Take action on your received emails by triggering [AWS Lambda functions](https://aws.amazon.com/lambda/).
> Thực hiện hành động với các email nhận được bằng cách sử dụng trigger [AWS Lambda function](https://aws.amazon.com/lambda/).

Use [AWS Key Management Service (AWS KMS)](https://aws.amazon.com/kms/) to optionally encrypt the mail you receive in your Amazon S3 bucket.
> Sử dụng [AWS Key Management Service (AWS KMS)](https://aws.amazon.com/kms/) để có thể tuỳ chọn mã hoá email bạn nhận được trên Amazon S3 bucket.

Use AWS CloudTrail to log Amazon SES API calls that you make using the console or the Amazon SES API.
> Sử dụng AWS CloudTrail để lưu lại log Amazon SES API đã sử dụng bằng bảng điều khiển Amazon SES API.

Publish your email sending events to Amazon CloudWatch or Amazon Kinesis Data Firehose. If you publish your email sending events to Kinesis Data Firehose, you can access them in Amazon Redshift, Amazon Elasticsearch Service, or Amazon S3.
