from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
#from django.conf import settings
from django.core.urlresolvers import reverse


class Forum(models.Model):
    creator = models.ForeignKey(User, blank=True, null=True)

    title = models.CharField(max_length=60)
    created = models.DateTimeField(default=timezone.now)
    description = models.CharField(max_length=255, blank=True, null=True)

    def num_posts(self):
        return sum([thread.num_posts() for thread in self.thread_set.all()])

    def num_threads(self):
        return self.thread_set.count()

    def last_post(self):
        if self.thread_set.count():
            last = None
            for thread in self.thread_set.all():
                l = thread.last_post()
                if l:
                    if not last:
                        last = l
                    elif l.created > last.created:
                        last = l
            return last

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('forum:forum', kwargs={'pk': self.pk})


class Thread(models.Model):
    creator = models.ForeignKey(User, blank=True, null=True)
    forum = models.ForeignKey(Forum)

    title = models.CharField(max_length=60)
    created = models.DateTimeField(default=timezone.now)
    description = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return str(self.creator) + " - " + self.title

    def num_posts(self):
        return self.post_set.count()

    def last_post(self):
        if self.post_set.count():
            return self.post_set.last()

    def get_absolute_url(self):
        return reverse('forum:thread', kwargs={'pk': self.pk})


class Post(models.Model):
    creator = models.ForeignKey(User, blank=True, null=True)
    thread = models.ForeignKey(Thread)

    title = models.CharField(max_length=60)
    body = models.TextField(max_length=10000)
    created = models.DateTimeField(default=timezone.now)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{} - {} - {}".format(self.creator, self.thread, self.title)

    def short(self):
        return "{} - {}".format(self.creator, self.title)
    short.allow_tags = True


class Comment(models.Model):
    creator = models.ForeignKey(User)
    post = models.ForeignKey(Post)

    title = models.CharField(max_length=60)
    body = models.TextField(max_length=10000)
    created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title


class UserProfile(models.Model):
    user = models.OneToOneField(User)
    avatar = models.ImageField(
        upload_to='profile_images', blank=True, null=True,
        default="static/images/defaultuserimage.png")
    posts = models.IntegerField(default=0)

    # thumbnail1 = models.ImageField(upload_to='profile_images/thumbs/', blank=True, null=True)
    # thumbnail2 = models.ImageField(upload_to='profile_images/thumbs/', blank=True, null=True)

    # def __str__(self):
    #     return self.user.username

    # def get_thumb_one(self):
    #     # Have to check if user.userprofile.avatar in template,
    #     # lest avatar be empty and the link reads /media/None
    #     return str(settings.MEDIA_URL + (
    #         self.thumbnail1.name if self.thumbnail1.name else self.avatar.name))

    # def get_thumb_two(self):
    #     return str(settings.MEDIA_URL + (
    #         self.thumbnail2.name if self.thumbnail2.name else self.avatar.name))

    # def get_avatar(self):
    #     return self.get_thumb_one() if self.thumbnail1.name else str(
    #         settings.MEDIA_URL + self.avatar.name)

    # def get_absolute_url(self):
    #     return reverse('forum:edit_profile', kwargs={'pk': self.user.pk})
