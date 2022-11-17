#!/usr/bin/python3
from re import S
from asyncconsole import AsyncConsole
import curses
import socketio

username = input("Username: ")
sio = socketio.Client()

def getGruvboxColor(string):
  return 2 + (sum(map(ord, string))*ord(string[0]) % 10)

def main(stdscr):
  console = AsyncConsole(stdscr, prompt_string=username+'> ')
  def addMessage(message):
    console.writeWithColor(message['username'] + ': ', getGruvboxColor(message['username']))
    console.addline(message["content"])

  @sio.on('initial-posts')
  def on_initial_posts(data):
    for message in data:
      addMessage(message)
      console.rebuild_prompt()

  @sio.on('post-added')
  def on_new_post(data):
    addMessage(data)

  sio.connect('http://backend:8000')
  while console.readline():
    if console.input_string == 'quit':
      quit()
    sio.emit('new-post', {'username': username, 'content': console.input_string})

if __name__ == '__main__':
  curses.wrapper(main)
