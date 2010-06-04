from djangodblog.settings import *

class DBLogRouter(object):
    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'djangodblog':
            return DATABASE_USING

    def db_for_read(self, model, **hints):
        return self.db_for_write(model, **hints)

    def allow_syncdb(self, db, model):
        dblog_db = DATABASE_USING
        if not dblog_db:
            return None
        if model._meta.app_label == 'djangodblog' and db != dblog_db:
            return False