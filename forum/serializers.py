from django.contrib.auth.models import User

from rest_framework import serializers

from .models import Comment, Forum, Post, Thread, UserProfile


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ('posts', 'avatar')
        read_only_fields = ('user', 'posts',)


class UserSerializer(serializers.ModelSerializer):
    userprofile = UserProfileSerializer(required=False, read_only=True)

    class Meta:
        model = User
        fields = ('username', 'userprofile')
        read_only_fields = ('username',)


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    post = serializers.HyperlinkedRelatedField(
        queryset=Post.objects.all(), view_name="post-detail")
    creator = UserSerializer(required=False, read_only=True)

    class Meta:
        model = Comment
        fields = (
            'url', 'title', 'body', 'post', 'created', 'creator'
        )
        read_only_fields = ('id', 'created', 'creator', 'post')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(CommentSerializer, self).get_validation_exclusions()
        return exclusions + ['creator']


class PostSerializer(serializers.ModelSerializer):
    creator = UserSerializer(required=False, read_only=True)
    thread = serializers.PrimaryKeyRelatedField(queryset=Thread.objects.all())
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = (
            'id', 'title', 'body', 'created', 'updated', 'creator',
            'comments', 'thread')

        read_only_fields = ('id', 'created', 'updated',)

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(PostSerializer, self).get_validation_exclusions()
        return exclusions + ['creator']


class ThreadSerializer(serializers.HyperlinkedModelSerializer):
    creator = UserSerializer(read_only=True, required=False)
    forum = serializers.HyperlinkedRelatedField(
        queryset=Forum.objects.all(), view_name="forum-detail")
    posts = serializers.HyperlinkedRelatedField(
        many=True, view_name="post-detail", read_only=True)

    class Meta:
        model = Thread
        fields = (
            'url', 'forum', 'title', 'description', 'created',
            'creator', 'posts', 'slug')
        read_only_fields = ('id', 'created', 'slug')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(ThreadSerializer, self).get_validation_exclusions()
        return exclusions + ['creator']


class ForumSerializer(serializers.HyperlinkedModelSerializer):
    creator = UserSerializer(read_only=True, required=False)
    threads = serializers.HyperlinkedRelatedField(
        many=True, view_name="thread-detail", read_only=True)

    class Meta:
        model = Forum
        fields = (
            'url', 'title', 'description', 'created',
            'creator', 'threads', 'slug')
        read_only_fields = ('id', 'created', 'slug')
