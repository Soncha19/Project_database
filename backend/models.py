from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship,declarative_base,scoped_session


engine = create_engine('mysql+pymysql://root:root1234@localhost:3306/music')
SessionFactory=sessionmaker(bind=engine)
Session = scoped_session(SessionFactory)
Base = declarative_base()
class User(Base):
    tablename = 'user'

    id = Column('id', Integer, primary_key=True, autoincrement=True)
    is_admin = Column('is_admin', Boolean)
    user_name = Column('user_name', String(45))
    first_name = Column('first_name', String(45))
    email = Column('email', String(45))
class Playlist(Base):
    tablename = 'playlist'

    id = Column('id', Integer, primary_key=True, autoincrement=True)
    name = Column('name', String(45))
    genre = Column('genre', String(45))
    access_status = Column('access_status', String(45))
    user_id=Column(Integer, ForeignKey(User.id))
    user = relationship(User,backref='playlist',lazy='joined')
class Song(Base):
    tablename = 'song'

    id = Column('id', Integer, primary_key=True, autoincrement=True)
    name = Column('name', String(45))
    album = Column('album', String(45))
    genre = Column('genre', String(45))
    artist = Column('artist', String(45))
    creation_date = Column('creation_date', DATE)

class playlist_has_song(Base):
        tablename = 'playlist_has_song'


        playlist_id = Column('playlist_id', Integer, ForeignKey(Playlist.id), primary_key=True)
        song_id = Column('song_id', Integer, ForeignKey(Song.id), primary_key=True)
        playlistid=relationship(Playlist,backref='playlist_has_song',lazy='joined')
        songid = relationship(Song, backref='playlist_has_song', lazy='joined')