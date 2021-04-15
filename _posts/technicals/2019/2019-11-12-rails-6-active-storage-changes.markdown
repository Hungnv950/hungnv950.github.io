---
layout: post
title: "Rails 6 - Active Storage changes"
date: 2019-11-12
description: "Rails 6 - Active Storage changes"
category: technical
author: hungnv950
usemathjax: true
thumbnail: /assets/img/posts/rails6-active-storage.jpg
---

This article found in: https://blog.saeloun.com/2019/11/04/rails-6-active-storage-updates.html

Active Storage was introduced in Rails 5.2. In rails 6, the are enhancements (nâng cao) done to Active Storage.

Let's explore them.

**mini_magick replaced by image_processing gem**

In rails 5.2, Active Storage was using `mini_magick` to handle (xử lý) image resizing(variants) (Kích thước)

In rails 6, a new gem called `image_processing` is used by default to handle image variants
(Trong rails 6, gem `image_processing` được sử dụng làm mặc định để xử lý việc thay đổi kích thước ảnh)

The `image_processing` gem has below advantages(Lợi thế):
1. New methods #resize_to_fit, #resize_to_fill, etc also sharpens the thumbnail (làm sắc nét hình ảnh) after resizing.
2. It fixes the image orientation automatically (tự động sử đổi hướng hình ảnh).
3. It provides another backend libvips that has significantly better performance than (Hiệu suất tốt hơn đáng kể) ImageMagick. With ImageMagick, resizing and sharpening (thay đổi kích cỡ và làm nét) a 1600x900 image to 800x800 is 1.87x slower, and to 300x300 is 1.18x slower. On libvips it doesn’t go above 1.20x slower, on average (trung bình) it’s only about 1.10x slower.

**New image variants support** (Hỗ trợ biến thể hình ảnh mới)
With addition (việc thêm) of image_processing gem, support for new image variants BMP (PR), TIFF (PR) and progressive JPEG (PR) was introduced (đã được giới thiệu).

**Fix for `has_many_attached` field in update query**
Let’s say we have a User class and it has field images. Users can upload multiple images to their profiles. So we add has_many_attached method to User class as shown below
```
class User < ApplicationRecord
  has_many_attached :images
end
```

*Before Rails 6:*
We attach (đính kèm)) an image to the user as shown below and verify the count
```
user = User.first
user.images.attach(filename: "profile_pic.jpg")

user.images.count
=> 1
```

Now, when we update the image field, the new image was getting appended to the existing images collection.
```
blog = ActiveStorage::Blob.create_after_upload!(filename: "updated_pic.jpg")
user.update(images: [blog])

user.images.count
=> 2
user.images.first.filename
=> "profile_pic.jpg"
user.images.last.filename
=> "updated_pic.jpg"
```
This is not consistent (Không thích hợp) with ActiveRecord update, where it replaces the existing value of a record.

*In rails 6:*
update query replaces the existing collection instead of appending to the collection.
```
user.images.attach(filename: "profile_pic.jpg")

user.images.count
=> 1

blog = ActiveStorage::Blob.create_after_upload!(filename: "updated_pic.jpg")
user.update(images: [blog])

user.images.count
=> 1
user.images.first.filename
=> "updated_pic.jpg"
```

**Note:**

We can append files by using the attach function.
