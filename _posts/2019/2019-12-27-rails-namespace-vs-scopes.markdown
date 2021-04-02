---
layout: post
title: "Rails routes namespace vs scopes"
date: 2019-12-22
description: "Rails routes namespace vs scopes"
category: technical
author: hungnv950
usemathjax: true
thumbnail: /assets/img/posts/namespace-vs-scope.png
---

Bài viết được dịch từ nguồn: https://devblast.com/b/rails-5-routes-scope-vs-namespace


You may be wondering (tự hỏi) about the difference between scope and namespace for the routes in your Rails application. It’s important to know the difference, because they affect (có ảnh hưởng tới) the path of your resources and the controllers.

> Bạn có thể tự hỏi về sự khác biệt giữa `scope` và `namespace` của router trong Rails ?. Đó là một sự khác biệt quan trọng bởi vì nó sẽ ảnh hưởng tới `path` của `resources` và `controller` trong hệ thống của bạn.

## 1. namespace

This is the simple option. When you use namespace, it will prefix the URL path for the specified resources (nó sẽ thêm tiền tố url cho các resources được chỉ định), and try to locate the controller under a module named in the same manner as the namespace. (và nó sẽ cố gắng để định vị controller của bạn nằm bên trong một module với tên tương tự như tên của namespace bạn vừa đặt).

> `namespace` là một cài đặt đơn giản. Khi bạn sử dụng namespace, nó sẽ sử dụng một đoạn `prefix` (tiền tố) bên trước `path` của `resources` (dạng như thêm một tiền tố bên trước path vào controller) và đồng thời controller của bạn sẽ phải định nghĩa bên trong module với tên là tên của `namespace` bạn vừa đặt.

With the following code in the routes.rb file,

```
namespace :admin do
  resources :users
end
```

You will end up with the following routes:

```
Prefix Verb         URI Pattern               Controller#Action
admin_users GET    /admin/users(.:format)     admin/users#index
            POST   /admin/users(.:format)     admin/users#create
admin_user  GET    /admin/users/:id(.:format) admin/users#show
            PATCH  /admin/users/:id(.:format) admin/users#update
            PUT    /admin/users/:id(.:format) admin/users#update
            DELETE /admin/users/:id(.:format) admin/users#destroy
```

As you can see, `admin` was added as a prefix in the URI path (`/admin/users)` and as a module containing (chứa) the controller (`admin/users#index`). With this code, Rails will expect `Admin::UsersController` to be located at `app/controllers/admin/users_controller`.rb.

> Bạn có thể thấy `admin` đã được thêm vào dưới dạng `prefix` của URI path: `/admin/users` và module chứa controller `admin/users_controller`.

## 2. scope

### 2.1 Khi scope không có options đi kèm
`scope` is a bit more complex - but the advantage is that it gives you more options to fine-tune exactly what you want to do.

> `scope` thì phức tạp hơn nhưng có lợi thế là sẽ mang lại cho bạn nhiều lựa chọn để bạn có thể tinh chỉnh theo ý muốn.

```
# routes.rb
scope :admin do
  resources :users
end
```

Here are the generated routes:

```
Prefix Verb   URI Pattern                Controller#Action
 users GET    /admin/users(.:format)     users#index
       POST   /admin/users(.:format)     users#create
  user GET    /admin/users/:id(.:format) users#show
       PATCH  /admin/users/:id(.:format) users#update
       PUT    /admin/users/:id(.:format) users#update
       DELETE /admin/users/:id(.:format) users#destroy
```

As you can see, `/admin` was added as a prefix before `/users`, but users controller doesn'n have to be inside any module.

Như chúng ta thấy. `/admin` đã được thêm vào tiền tố trước `/users`, nhưng `users_controller` không cần thiết phải nằm trong module nào cả.


> Túm cái váy lại, khi dùng `namespace` thì router của controller phải nằm trong một thứ gọi là `prefix` (tiền tố) tương ứng với tên của module (thư mục) chứa controller đó.
> Còn với scope thì không cần thiết, nó sẽ cho phép bạn định nghĩa được `prefix` router của bạn là gì mà không cần phải tạo thêm `module` cho controller của bạn.


### 2.2 scope đi kèm với option

`scope` supports three options: `module`, `path`, `as`.

#### module
`module` let us define in which module the controller for the embedded resources will live.
> `module` cho phép chúng ta định nghĩa tên của module chứa resources - tức `controller` của chúng ta.

```
scope module: 'admin' do
  resources :users
end
```

```
Prefix Verb   URI Pattern          Controller#Action
 users GET    /users(.:format)     admin/users#index
       POST   /users(.:format)     admin/users#create
  user GET    /users/:id(.:format) admin/users#show
       PATCH  /users/:id(.:format) admin/users#update
       PUT    /users/:id(.:format) admin/users#update
       DELETE /users/:id(.:format) admin/users#destroy
```
=> Để ý `router` của `users` không cần phải đặt sau một chiếc `prefix` nào cả.

#### path
`path` allows us to set the prefix that will appear in the URI, before the resource name.

> `path` cho phép chúng ta định nghĩa `prefix` đứng trước `resources`

```
scope module: 'admin', path: 'fu' do
  resources :users
end
```

```
Prefix Verb   URI Pattern             Controller#Action
 users GET    /fu/users(.:format)     admin/users#index
       POST   /fu/users(.:format)     admin/users#create
  user GET    /fu/users/:id(.:format) admin/users#show
       PATCH  /fu/users/:id(.:format) admin/users#update
       PUT    /fu/users/:id(.:format) admin/users#update
       DELETE /fu/users/:id(.:format) admin/users#destroy
```

#### as

Finally, `as` can be used to change the name of the path method used to identify the resources.

> `as` được sử dụng để thay đổi tên của `path` của `resources` sử dụng khi định danh `resources` như khi sử dụng `redirect` hoặc gọi trên controller.

```
scope module: 'admin', path: 'fu', as: 'cool' do
  resources :users
end
```

In this case, we now have cool as a prefix for the path names cool_users and cool_user.
> Trong case này, chúng ta đã có `prefix` `fu` cho controller `admin/users_controller` với `path` là `cool_users`


```
Prefix Verb   URI Pattern             Controller#Action
cool_users GET    /fu/users(.:format)     admin/users#index
           POST   /fu/users(.:format)     admin/users#create
cool_user  GET    /fu/users/:id(.:format) admin/users#show
           PATCH  /fu/users/:id(.:format) admin/users#update
           PUT    /fu/users/:id(.:format) admin/users#update
           DELETE /fu/users/:id(.:format) admin/users#destroy
```
