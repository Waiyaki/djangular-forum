from django.contrib.auth.models import User

from rest_framework import serializers

from .models import Forum, Thread


class ForumSerializer(serializers.HyperlinkedModelSerializer):
    creator = serializers.ReadOnlyField(source='creator.username')
    threads = serializers.SlugRelatedField(
        many=True, read_only=True, slug_field='slug')
    url = serializers.HyperlinkedIdentityField(
        view_name='forum-detail', lookup_field='slug')

    class Meta:
        model = Forum
        fields = (
            'url',
            'title', 'description', 'created',
            'slug', 'creator', 'threads', 'num_threads'
        )
        read_only_fields = ('created', 'slug')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(ForumSerializer, self).get_validation_exclusions()
        return exclusions + ['creator']


class ForumSerializerNested(ForumSerializer):

    class Meta(ForumSerializer.Meta):
        nested_fields = list(ForumSerializer.Meta.fields)
        nested_fields.remove('threads')
        fields = nested_fields


class ThreadSerializer(serializers.HyperlinkedModelSerializer):
    creator = serializers.ReadOnlyField(source='creator.username')
    forum = ForumSerializerNested(read_only=True)

    class Meta:
        model = Thread
        fields = (
            'creator', 'title', 'description',
            'created', 'slug', 'forum'
        )
        read_only_fields = ('slug', 'created', 'forum')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(ThreadSerializer, self).get_validation_exclusions()
        return exclusions + ['creator', 'forum']


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email')
