# Offline-and-Online-Realtime-Dashboard
Its a dashboard built in smashing. Uses node js API to update dashboard data

# What it contains?
It contain two node js API.<br />
To run the dashboard in online realtime db we have used firebase<br />
For offline rethinkdb has been used<br />

# How to run ?
To run in offline install rethinkdb. create database there, and table as well.<br />
For sake of simplicity manually enter 10 data in the table name widget(columns: value and time)<br />
Then run get-rethinkdb-api and dashboard using smasing start<br />
Now enter any data in table widget, you will see realtime reflection in both synergy and graph widget.<br />
Same holds for online api to run with firebase
