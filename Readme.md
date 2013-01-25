systemd-journald-gatewayd monitor
=================================

This application can be used if you want to remotely monitor the journal of multiple
systems running systemd.  Each journal entry is prefixed with the hostname.  If the connection
is lost, the application will continuously try to re-connect.

Install
-------

* Install nodejs
* git clone git://github.com/cbrake/systemd-journald-gatewayd-monitor
* cd systemd-gatewayd-monitor
* node app.js http://<hostname 1>:19531/entries?follow http://<hostname 2>:19531/entries?follow ...

