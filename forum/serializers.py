from django.contrib.auth.models import User

from rest_framework import serializers

from .models import Comment, Forum, Post, Thread, UserProfile


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ('user', 'posts', 'avatar')
        read_only_fields = ('user', 'posts',)


class UserSerializer(serializers.ModelSerializer):
    userprofile = UserProfileSerializer(required=False, read_only=True)

    class Meta:
        model = User
        fields = ('username', 'userprofile')
        read_only_fields = ('username',)


class CommentSerializer(serializers.ModelSerializer):
    post = serializers.PrimaryKeyRelatedField(read_only=True)
    creator = UserSerializer(required=False, read_only=True)

    class Meta:
        model = Comment
        fields = (
            'id', 'title', 'body', 'post', 'created', 'creator'
        )
        read_only_fields = ('id', 'created', 'creator',)

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(CommentSerializer, self).get_validation_exclusions()
        return exclusions + ['creator']


class PostSerializer(serializers.ModelSerializer):
    creator = UserSerializer(required=False, read_only=True)
    thread = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'title', 'body', 'created', 'updated', 'creator')

        read_only_fields = ('id', 'created', 'updated')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(PostSerializer, self).get_validation_exclusions()
        return exclusions + ['creator']


class ThreadSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True, required=False)
    forum = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Thread
        fields = ('id', 'forum', 'title', 'description', 'created', 'creator')
        read_only_fields = ('id', 'created')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(ThreadSerializer, self).get_validation_exclusions()
        return exclusions + ['creator']


class ForumSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True, required=False)

    class Meta:
        model = Forum
        fields = (
            'id', 'title', 'description', 'created')
        read_only_fields = ('id', 'created')
