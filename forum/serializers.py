from django.contrib.auth.models import User

from rest_framework import serializers

from .models import Forum, Thread


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email')


class ForumSerializer(serializers.HyperlinkedModelSerializer):
    creator = UserSerializer(read_only=True)
    threads = serializers.SlugRelatedField(
        many=True, read_only=True, slug_field='slug')
    url = serializers.HyperlinkedIdentityField(
        view_name='forum-detail', lookup_field='slug')

    class Meta:
        model = Forum
        fields = (
            'url',
            'title', 'description', 'slug', 'created', 'num_threads', 'threads',
            'creator'
        )
        read_only_fields = ('created', 'slug', 'creator')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(ForumSerializer, self).get_validation_exclusions()
        return exclusions + ['creator']


class ForumSerializerNested(ForumSerializer):

    class Meta(ForumSerializer.Meta):
        nested_fields = list(ForumSerializer.Meta.fields)
        nested_fields.remove('threads')
        fields = nested_fields


class ThreadSerializer(serializers.HyperlinkedModelSerializer):
    creator = UserSerializer(read_only=True)
    forum = ForumSerializerNested(read_only=True)

    class Meta:
        model = Thread
        fields = (
            'title', 'description', 'slug', 'created', 'forum', 'creator'
        )
        read_only_fields = ('slug', 'created', 'forum')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(ThreadSerializer, self).get_validation_exclusions()
        return exclusions + ['creator', 'forum']
