---
title: 'Husarnet with ROS - Getting started'
layout: default
---

# Getting started with Husarnet+ROS

## Installing Husarnet

First, install Husarnet by pasting the following line into your terminal:

```
curl https://install.husarnet.com/install.sh | sudo bash
```

You can learn about [other installation methods](/install-linux/).

## Managing networks

Right after installing Husarnet, you should link the device to your Husarnet Dashboard account. (You can also [manage your device manually](/manual-mgmt/), but that's recommended only in special cases).

```
sudo husarnet websetup
```

You will need to login/sign-up and then you will be presented with the following dialog:

<div class="image"><img src="/img/getting-started/add.png"/></div>

You can create a new network or join existing one (if you already have one before). All devices should be connected to some Husarnet network - by default, only devices in the same network are able to communicate.

## Installing ROS on Ubuntu 16.04

This section is based on [ROS wiki article](http://wiki.ros.org/kinetic/Installation/Ubuntu). Consult ROS documentation on how to install ROS on other systems.

1. Execute the following commands to add ROS repository:

    ```
    $ sudo apt-key adv --keyserver hkp://ha.pool.sks-keyservers.net:80 --recv-key 421C365BD9FF1F717815A3895523BAEEB01FA116
    $ sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu xenial main" > /etc/apt/sources.list.d/ros.list'
    $ sudo apt-get update
    ```

2. Install the packages you need, for example:

    ```
    $ sudo apt-get install -y ros-kinetic-find-object-2d
    ```



## Setting up the environment

Add these lines to .bashrc (or .zshrc if you use zsh) of the user who will use ROS:

```
source /opt/ros/kinetic/setup.bash

export ROS_IPV6=on
export ROS_MASTER_URI=http://master:11311
```

Sourcing the `/opt/ros/kinetic/setup.bash` enables all ROS tools. 

`ROS_IPV6` makes ROS enable IPv6 mode - Husarnet is a IPv6 network. Setting `ROS_MASTER_URI` to `http://master:11311` ensures ROS will always connect to host called `master` - which extactly machine it is depends on the setting on the Husarnet Dashboard.

You can also set `ROS_MASTER_URI` to other hostname - just be aware that Husarnet Dashboard ROS integration might not work as intended.

## Use ROS

Run `roscore` on the device selected as master in Husarnet Dashboard. Now you can use ROS on all devices connected via Husarnet as if they were one device.

If you are considering running your robot in production, don't forget to  read about [ROS security](/ros-security/).
