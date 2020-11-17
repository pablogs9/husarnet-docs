---
sidebar_label: Using Husarnet & ROS
title: Using Husarnet & ROS
custom_edit_url: https://github.com/husarnet/husarnet-docs/docs/tutorial-ros1
keywords:
  - vpn
  - p2p
image: https://i.imgur.com/mErPwqL.png
---

## Setting up the environment

Add these lines to .bashrc (or .zshrc if you use zsh) of the user who will use ROS:

```bash
source /opt/ros/kinetic/setup.bash

export ROS_IPV6=on
export ROS_MASTER_URI=http://master:11311
```

Sourcing the `/opt/ros/kinetic/setup.bash` enables all ROS tools. 

`ROS_IPV6` makes ROS enable IPv6 mode - Husarnet is a IPv6 network. Setting `ROS_MASTER_URI` to `http://master:11311` ensures ROS will always connect to host called `master` - which extact machine it is depends on the setting on the Husarnet Dashboard.

You can also set `ROS_MASTER_URI` to other hostname - just be aware that Husarnet Dashboard ROS integration might not work as intended.

:::info
Note that after changing `master` to other device on the Husarnet Dashboard you have to make sure that line starting from `127.0.01` in `/etc/hosts` file  contain host `master`. Husarnet doesn't change this automatically for now.
:::

## Use ROS

Run `roscore` on the device selected as master in Husarnet Dashboard. Now you can use ROS on all devices connected via Husarnet as if they were one device.

## Husarnet+ROS security

### Passwords

Always remember that all advanced security measures are useless when you pick weak passwords. Make sure that you have strong passwords for:

- your Husarnet Dashboard account
- SSH login to your devices (or you have disabled password SSH login at all)

Especially watch out for the default SSH passwords on your SBC images! They are useful for initial SSH login, but you **need** to change them as soon as possible.

### ROS security model

ROS itself doesn't have any built-in security. If somebody can connect to ROS master, he can control the whole robotic system. Fortunately, Husarnet makes your network secure - just make sure that you don't add untrusted devices to your Husarnet networks.

### Firewall

Husarnet provides secure network layer for ROS - but you also need to ensure that no one can connect to your nodes and services from unsecured networks. Fortunetely, with `husarnet-firewall`, this is really simple.

First, install `husarnet-ros` package, if you don't already have it:

```bash
apt-get install husarnet-ros
```

And enable the firewall:

```bash
husarnet-firewall enable
```

That's all! Now all non-Husarnet incoming connections to your system will be denied.
