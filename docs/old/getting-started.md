---
layout: default
title: Husarnet documentation
---

# Getting started with Husarnet

## Installing Husarnet

First, install Husarnet by pasting the following line into your terminal:

```
curl https://install.husarnet.com/install.sh | sudo bash
```

You can learn about [other installation methods](/install/).

## Managing networks

Right after installing Husarnet, you should link the device to your Husarnet Dashboard account. (You can also [manage your device manually](/manual-mgmt/), but that's recommended only in special cases).

```
sudo husarnet websetup
```

You will need to login/sign-up and then you will be presented with the following dialog:

<div class="image"><img src="/img/getting-started/add.png"/></div>

You can create a new network or join existing one (if you already have one before). All devices should be connected to some Husarnet network - by default, only devices in the same network are able to communicate.

## Using Husarnet

1. You may contact all other devices in the network by using their hostnames, e.g.:

    ```
    $ ping6 mydevice1
    $ ssh user@mydevice1
    $ wget http://mydevice:8000
    ```

2. You can check connection status and your Husarnet IPv6 address using `husarnet status`:

    ```
    $ sudo husarnet status
    Husarnet IP address: fc94:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx
    UDP connection to base: [::ffff:188.165.23.196]:5582
    Peer fc94:b57c:c306:595f:9933:320a:a77:bffa
      target=[::ffff:192.168.1.45]:5582
      secure connection established
    Peer fc94:a1e4:7b6b:3222:b1f0:90fa:e41f:9857
      tunneled
      secure connection established
    ```

    In this example, you are connected to the first peer directly (fc94:...:bffa) via local network (192.168.1.45). Direct connection to second peer could not be established (tunneled) - this probably means that network you are using blocks UDP traffic. Ensure the firewall allows outgoing UDP traffic, at least on port 5582.

3. Just be aware that the servers and client you are using must support IPv6 (as Husarnet is an IPv6 overlay network) - for example, you have to listen on "::", not "0.0.0.0".
