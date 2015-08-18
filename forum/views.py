from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.reverse import reverse
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Forum

from .serializers import ForumSerializer
from .permissions import IsCreatorOrReadOnly


@api_view(('GET',))
def api_root(request, format=None):
    return Response({
        'forums': reverse('forum-list', request=request, format=format),
    })


class ForumViewSet(viewsets.ModelViewSet):
    queryset = Forum.objects.all()
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly, IsCreatorOrReadOnly)
    serializer_class = ForumSerializer

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
        return super(ForumViewSet, self).perform_create(serializer)
