![header](https://capsule-render.vercel.app/api?type=wave&color=auto&height=300&section=header&text=S%R%A%20render&fontSize=90)

 ** Skin minecRaft Assistance **
Copyright (c) 2022 [ SRA TEAM ]

SRA TEST PROJECT

@Author jeon sung yoon

Run on Rinkeby
using django
please run this project on virtual environment

# how to execute

(0) you should have python3, pip3 in your environment

(1) install virtualenv

- pip3 install virtualenv
install virtualenv

 @if you get a warning : The script virtualenv is installed in '/home/((username))/.local/bin' which is not on PATH.
 - sudo vim ~/.bashrc
 add following line
 - "$PATH":/home/((username))/.local/bin

 @vim usage
 press 'i' to write
 press 'esc' to escpae from your write mode
 press ':wq' and enter to save and quit vim (when you are in command mode)


- python3 -m venv venv
make virtual environment named venv

- source venv/bin/activate
activate your virtual environment named venv

(2) download package by requirements.txt

- pip3 install -r requirements.txt
this will install packages using in this project to your local repository

(3) run!
- ./manage.py runserver
then you can run this project