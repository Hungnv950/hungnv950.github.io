---
layout: post
title: "SQL WHERE vs HAVING"
date: 2019-11-29
description: "SQL WHERE vs HAVING"
categories:
- tech
---

```
Where : Là câu lệnh điều kiện trả kết quả đối chiếu với từng dòng .
Having : Là câu lệnh điều kiện trả kết quả đối chiếu cho nhóm (Sum,AVG,COUNT,…)

Vì vậy mà sau GROUP BY thì sẽ chỉ dùng được Having .
còn Where thì KHÔNG dùng được sau GROUP BY đâu nhé. bạn cứ cmd thì biết liền ý mà.

(HAVING có thể thay thế vị trí dùng cho WHERE. nhưng . ngược lại WHERE thì KHÔNG thể thay thế vị trí cho HAVING nhé bạn)

```
