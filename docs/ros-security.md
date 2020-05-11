---
title: 'Husarnet with ROS - Security'
layout: default
---

# Husarnet+ROS security

## Passwords

Always remember that all advanced security measures are useless when you pick weak passwords. Make sure that you have strong passwords for:

- your Husarnet Dashboard account
- SSH login to your devices (or you have disabled password SSH login at all)

Especially watch out for the default SSH passwords on your SBC images! They are useful for initial SSH login, but you **need** to change them as soon as possible.

## ROS security model

ROS itself doesn't have any built-in security. If somebody can connect to ROS master, he can control the whole robotic system. Fortunately, Husarnet makes your network secure - just make sure that you don't add untrusted devices to your Husarnet networks.

## Firewall

Husarnet provides secure network layer for ROS - but you also need to ensure that no one can connect to your nodes and services from unsecured networks. Fortunetely, with `husarnet-firewall`, this is really simple.

First, install `husarnet-ros` package, if you don't already have it:

```
apt-get install husarnet-ros
```

And enable the firewall:

```
husarnet-firewall enable
```

That's all! Now all non-Husarnet incoming connections to your system will be denied.
