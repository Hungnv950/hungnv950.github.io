---
layout: default
title: Những điều lảm nhảm
---
<div class="page-content wc-container">
  <h1>Những điều lảm nhảm</h1>  
  {% assign posts = site.posts | where_exp: "post", "post.categories contains 'life'" %}
  {% for post in posts %}
    {% capture currentyear %}{{post.date | date: "%Y"}}{% endcapture %}
  	{% if currentyear != year %}
    	{% unless forloop.first %}</ul>{% endunless %}
    		<h5>{{ currentyear }}</h5>
    		<ul class="posts">
    		{% capture year %}{{currentyear}}{% endcapture %}
  		{% endif %}
    <li><a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></li>
    {% if forloop.last %}</ul>{% endif %}
  {% endfor %}
</div>
