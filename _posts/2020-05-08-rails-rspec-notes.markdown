---
layout: post
title:  Rails rspec notes
date:   2020-05-08 00:48:45
description: Rails rspec notes
categories:
- tech
---


### Mock vs stub
1. Stub
    > Returns canned responses, avoiding any meaningful computation or I/O

    => Tra ve ket qua a
    ex:
    > allow(some_object).to receive(some_method).and_return(some_value)


2. Mock
    > Expects specific messages; will raise an error if it doesn’t receive them by the end of the example

    ex:
    > expect(some_object).to receive(some_method).and_return(some_value)

### Double
  >  double(*args) public
     Shortcut for creating an instance of Spec::Mocks::Mock.

  >  name is used for failure reporting, so you should use the role that the double is playing in the example.

  >  stubs_and_options lets you assign options and stub values at the same time. The only option available is :null_object. Anything else is treated as a stub value.

  Ex:
  >   thing = double("thing", :a => "A")
      thing.a == "A" => true
      person = double("thing", :name => "Joe", :email => "joe@domain.com")
      person.name => "Joe"
      person.email => "joe@domain.com"
