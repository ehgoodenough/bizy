# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'CustomUser'
        db.create_table(u'social_customuser', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('username', self.gf('django.db.models.fields.CharField')(max_length=128)),
            ('last_login', self.gf('django.db.models.fields.DateTimeField')(null=True, blank=True)),
        ))
        db.send_create_signal(u'social', ['CustomUser'])


    def backwards(self, orm):
        # Deleting model 'CustomUser'
        db.delete_table(u'social_customuser')


    models = {
        u'social.customuser': {
            'Meta': {'object_name': 'CustomUser'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'null': 'True', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'max_length': '128'})
        }
    }

    complete_apps = ['social']