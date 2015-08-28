"""my_forum URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin

from rest_framework_nested import routers

from forum import views
from .views import IndexView

router = routers.SimpleRouter()

router.register(r'forums', views.ForumViewSet)
# router.register(r'posts', views.PostViewSet)
# router.register(r'comments', views.CommentViewSet)
router.register(r'users', views.UserViewSet)

forum_threads_router = routers.NestedSimpleRouter(router, r'forums', lookup="forum")
forum_threads_router.register(r'threads', views.ForumThreadsViewSet, base_name="forum-thread")


urlpatterns = [
    url(r'^admin', include(admin.site.urls)),
    url(r'^api/v1/$', views.api_root),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(forum_threads_router.urls)),
    url(r'^api/v1/threads/$', views.ThreadList.as_view(), name='thread-list'),
    url(r'^api/v1/threads/(?P<slug>\w+)/$', views.ThreadDetails.as_view(), name='thread-detail'),
    url(r'^api/v1/rest-auth/', include('rest_auth.urls')),
    url(r'^api/v1/rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'api-auth/', include('rest_framework.urls', namespace="rest_framework")),
    url(r'^.*$', IndexView.as_view(), name='index'),
]
