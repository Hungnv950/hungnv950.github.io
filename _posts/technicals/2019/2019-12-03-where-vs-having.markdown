---
layout: post
title: "SQL WHERE vs HAVING"
date: 2019-11-29
description: "SQL WHERE vs HAVING"
category: technical
author: hungnv950
usemathjax: true
thumbnail: /assets/img/posts/where-vs-having.png
---

```
Where : Là câu lệnh điều kiện trả kết quả đối chiếu với từng dòng .
Having : Là câu lệnh điều kiện trả kết quả đối chiếu cho nhóm (Sum,AVG,COUNT,…)

Vì vậy mà sau GROUP BY thì sẽ chỉ dùng được Having .
còn Where thì KHÔNG dùng được sau GROUP BY.

(HAVING có thể thay thế vị trí dùng cho WHERE. nhưng . ngược lại WHERE thì KHÔNG thể thay thế vị trí cho HAVING )

```
