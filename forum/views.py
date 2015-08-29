from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

from rest_framework.decorators import api_view, detail_route
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import viewsets, permissions
from rest_framework import generics, status

from .models import Forum, Thread, Post
from .serializers import (
    ForumSerializer, ThreadSerializer, UserSerializer, PostSerializer
)
from .permissions import IsCreatorOrReadOnly, IsAdminUserOrReadOnly


@api_view(('GET',))
def api_root(request, format=None):
    """
    API for this forum application.

        END POINTS.
            - /api/v1/
                - API root.

            - /api/v1/forums/
                - This gives a page of all available forums.
                - If the user is an administrator, they can create a new thread
                  by posting a request with both title and description or just
                  the title to this endpoint.

            - /api/v1/forums/<slug>/
                - Takes a forum slug as the route parameter.
                - Gets a particular forum's details, or 404 if not available.
    """

    return Response({
        'forums': reverse('forum-list', format=format, request=request),
        'threads': reverse('thread-list', format=format, request=request)
    })


class ForumViewSet(viewsets.ModelViewSet):

    lookup_field = 'slug'
    serializer_class = ForumSerializer
    queryset = Forum.objects.all()
    permission_classes = (
        IsCreatorOrReadOnly,
        IsAdminUserOrReadOnly,
    )

    class Meta:
        model = Forum

    def create(self, request, *args, **kwargs):
        if not request.user.is_superuser:
            return Response({
                'status': 'Permission Denied',
                'message': 'Permission Denied. Only an administrator can perform that action.'
                }, status=status.HTTP_403_FORBIDDEN)
        return super(ForumViewSet, self).create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
        return super(ForumViewSet, self).perform_create(serializer)


class ThreadDetails(generics.RetrieveUpdateDestroyAPIView):

    """
    API endpoint that provides for updating, retrieving and deleting threads.
    """

    lookup_field = 'slug'
    serializer_class = ThreadSerializer
    queryset = Thread.objects.all()
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsCreatorOrReadOnly
    )

    class Meta:
        model = Thread


class ThreadList(generics.ListCreateAPIView):
    lookup_field = 'slug'
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsCreatorOrReadOnly
    )

    def create(self, request, *args, **kwargs):
        forum_slug = request.data.get('forum_slug', None)
        title = request.data.get('title', None)
        if not forum_slug and title:
            return Response({
                    'status': 'Bad Request',
                    'message': 'Could not complete request with received data.'
                }, status=status.HTTP_400_BAD_REQUEST)
        forum = get_object_or_404(Forum, slug=forum_slug)
        desc = request.data.get('description', None)
        thread = Thread.objects.create(
            creator=request.user, forum=forum, title=title, description=desc)
        serializer = self.serializer_class(thread, context={'request': request})
        return Response(serializer.data)


class ForumThreadsViewSet(viewsets.ViewSet):
    queryset = Thread.objects.select_related('forum').all()
    serializer_class = ThreadSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,)

    def list(self, request, forum_slug, format=None):
        queryset = self.queryset.filter(
            forum__slug=forum_slug).order_by('-created')
        serializer = self.serializer_class(queryset, many=True, context={'request': request})
        return Response(serializer.data)


class ThreadPostsViewSet(viewsets.ViewSet):
    queryset = Post.objects.select_related('thread').all()
    serializer_class = PostSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly, IsCreatorOrReadOnly
    )

    def list(self, request, thread_slug, format=None):
        queryset = self.queryset.filter(
            thread__slug=thread_slug).order_by('-created')
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = 'username'
    serializer_class = UserSerializer
    queryset = User.objects.all()

    class Meta:
        model = User

    @detail_route(methods=['GET'])
    def check(self, request, username):
        try:
            User.objects.get(username=username)
            return Response({}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({}, status=status.HTTP_400_BAD_REQUEST)
