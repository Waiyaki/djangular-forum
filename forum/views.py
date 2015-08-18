from django.contrib.auth.models import User

from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.reverse import reverse
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Forum, Thread, Post, Comment, UserProfile

from .serializers import ForumSerializer, ThreadSerializer, PostSerializer
from .serializers import CommentSerializer
from .permissions import IsCreatorOrReadOnly


@api_view(('GET',))
def api_root(request, format=None):
    return Response({
        'forums': reverse('forum-list', request=request, format=format),
        'threads': reverse('thread-list', request=request, format=format),
        'posts': reverse('post-list', request=request, format=format),
        'comments': reverse('comment-list', request=request, format=format)
    })


class ForumViewSet(viewsets.ModelViewSet):
    queryset = Forum.objects.all()
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly, IsCreatorOrReadOnly)
    serializer_class = ForumSerializer

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
        return super(ForumViewSet, self).perform_create(serializer)


class ThreadViewSet(viewsets.ModelViewSet):
    queryset = Thread.objects.all()
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly, IsCreatorOrReadOnly)
    serializer_class = ThreadSerializer

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
        return super(ThreadViewSet, self).perform_create(serializer)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly, IsCreatorOrReadOnly)

    def perform_create(self, serializer):
        user = User.objects.get(username=self.request.user.username)
        try:
            up = UserProfile.objects.get(user=user)
            up.posts += 1
            up.save()
        except UserProfile.DoesNotExist:
            up = UserProfile.objects.create(user=user)
            up.posts += 1
            up.save()

        serializer.save(creator=self.request.user)
        return super(PostViewSet, self).perform_create(serializer)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
        return super(CommentViewSet, self).perform_create(serializer)
