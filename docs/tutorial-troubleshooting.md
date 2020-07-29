---
sidebar_label: Troubleshooting
title: Fix typical connectivity issues
custom_edit_url: https://github.com/husarnet/husarnet-docs/docs/tutorial-troubleshooting
keywords:
  - vpn
  - p2p
image: https://i.imgur.com/mErPwqL.png
---

## Husarnet status

For a brief status of the established connections, execute:

```bash
sudo husarnet status
```

The output will look something like this:

```bash
Husarnet IP address: fc94:7196:e39f:23ff:fe45:81aa:39e4:b224
UDP connection to base: [::ffff:188.165.23.196]:5582
Peer fc94:9e5d:fef0:7bb4:00f1:fcb7:d85:fdaf
  tunelled
  secure connection established
Peer fc94:a2e4:7b6b:322b:b200:97fa:e32f:a867
  target=[::ffff:10.0.0.15]:5582
  secure connection established
```

Let's analyse this information.

### Connection to the Base Server

The second line contains information about connection to the Base Server. Base server helps devices find each other over the internet.

```bash
UDP connection to base: [::ffff:188.165.23.196]:5582
```

Normally, you should see information about successful UDP connection.

```
WARN: only TCP connection to base established
```

If there is only TCP connection established, you won't be able to establish direct connection to other devices over the internet. The data will be tunnelled over the base server - this will negatively impact latency and performance.

In order to fix this, unblock UDP on the firewall. You need at least UDP port 5582, but it's recommended to allow all outgoing connections.

```
ERROR: no base connection
```

This message means that most likely there is no internet connection. You will be only to contact devices in your local network.

### Connection to a peer

**Important: Make sure to ping the peer before checking its information in `husarnet status` - it is only updated when communication is attempted.**

Each `Peer fcXX:YYY` section contains information about connection to a specific peer.

If the second line contains `tunnelled`, that means that you have no direct connection to the peer - this negatively impacts latency and performance. This is most likely caused by restrictive firewall or symmetric NAT. Here are some tips on how to fix it:

- allow all UDP traffic on the firewall
- change NAT type to Full-cone or Port-restricted in your router configuration (it is often called Open or Moderate in router settings)
- enable IPv6
- restart your router
- execute `conntrack -F` on Linux router or virtual machine host

Otherwise, there will be a line containing `target=XXXX`, where XXXX is the internet address used for communication with this node.

## /etc/hosts

Hostnames of the devices in Husarnet network are stored in `/etc/hosts` in lines with `# managed by Husarnet` comment. They are modified automatically by the Husarnet daemon.

## SSH connection issue

On some machines, before accessing them over SSH (`$ssh user@husarnet_hostname` command) you might see the following error:
```bash
ssh: connect to host husarnet_hostname port 22: Connection refused
```
To overcome that issue, execute in the terminal of the device you are trying to reach over SSH: 
```bash
$ sudo apt-get install ssh
$ service ssh restart
```

## Reporting problems

If you still have problems, you can report the problem by sending mail to `support@husarnet.com`. Please describe your problem and attach Husarnet log. You can retrieve the log using the following command:

```
sudo journalctl --unit husarnet > log.txt
```
or
```
sudo journalctl --unit=husarnet --since=yesterday > log.txt
```

The log will be saved as `log.txt` in the current directory.

You can also report bugs on the [public community forum](https://community.husarnet.com).
