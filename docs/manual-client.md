---
sidebar_label: Husarnet Client app
title: Husarnet Client app manual
custom_edit_url: https://github.com/husarnet/husarnet-docs/docs/manual-client
keywords:
  - vpn
  - p2p
image: https://i.imgur.com/mErPwqL.png
---

This manual describes how to use **Husarnet Client** app on Linux. Your devices with **Husarnet Client** installed communicate with each other directly, without any central server forwarding traffic. That is a true low latency, peer-to-peer connection over the internet. Your devices see each other like they were in the same LAN.

## Installation methods

### I. Single command (recommended)
The simplest way to install Husarnet is to paste the following line to your terminal:

```bash
curl https://install.husarnet.com/install.sh | sudo bash
```

That's all.

This method works on APT and Yum based Linux distributions such as Debian, Ubuntu, CentOS, RHEL, Fedora or Mint.

### II. Setting up the Debian/Ubuntu repository manually

You can also set up the Debian (works for all reasonably new versions of Ubuntu and Debian) repository manually:

```
curl https://install.husarnet.com/key.asc | apt-key add -
echo 'deb https://install.husarnet.com/deb/ all husarnet' > /etc/apt/sources.list.d/husarnet.list
apt-get install -y apt-transport-https
apt-get update
apt-get install -y husarnet
```

### III. Setting up the Yum repository manually

You can also set up the Yum repository manually:

```
rpm --import https://install.husarnet.com/key.asc
curl https://install.husarnet.com/husarnet.repo > /etc/yum.repos.d/husarnet.repo
yum install -y husarnet
```

### IV. Totally manual binary installation (advanced)

**Warning: this is not the recommended installation method. You won't get automatic software updates this way!**

If your Linux distribution is not supported by the one-command install method, you can also download the binary package. For most seamless experience, it is recommended to unpack it to the root directory (`/`):

```bash
curl https://install.husarnet.com/tgz/husarnet-latest-amd64.tgz > husarnet-latest-amd64.tgz
sudo tar --directory=/ --no-same-owner --dereference -xf husarnet-latest-amd64.tgz
```

(replace `-amd64` with `-armhf` or `-i386` if you don't have 64-bit Intel/AMD processor)

If you are using systemd, enable and start the service (`systemctl enable husarnet; systemctl start husarnet`). Otherwise, make sure `husarnet daemon` command is started on system startup. You need to run it as root, but don't worry - Husarnet automatically relinquishes unnecessary permissions.

## Managing Husarnet Client over Dashboard

**Husarnet Dashboard** is a web application allowing you to:
- Create and remove new Husarnet networks (your device can be in one or multiple Husarnet networks in the same time).
- Share your Husarnet networks to other users with configurable access rights.
- Add devices to your networks in a few ways (websetup, join code, QR code, already linked to your account)
- Removing devices from network or from your account
- Check your devices information (IPv6 address, online/offline, owner etc.)
- in commercial plans accessing your billing data and managing subscriptions.

![Husarnet Dashboard main page](/static/img/manual/dashboard-main.png)

If you add devices to the specific Husarnet network all devices from this network see you device like it was in the same LAN network and they are whitelisting automatically. To learn more about **Husarnet Dashboard** app visit [it's documentation page](/docs/manual-dashboard).

You can add your device to a network shared to you by other https//app.husarnet.com user. And your device can be in the same time connected to your other, private Husarnet networks that will be accessible only by you. Such a scenario is good if you would like to give someone an access to the specific device that is connected to your **Husarnet Dashboard** account. Just place this device in the separate, newly created Husarnet network and share this network to one or multiple users. Another use case would be creating an ad-hoc network for working group or for LAN gaming.

Public version of **Husarnet Dashboard** is available under this link: https://app.husarnet.com. There are also self-hosted commercial versions. For more details visit pricing page.


## Managing Husarnet Client manually

**Warning: this is not the recommended method of using Husarnet.**

Sometimes managing the devices via Husarnet Dashboard can be cumbersome. You can skip connecting your device to the Dashboard and manage whitelist and hostnames via command line.

If not the whitelist, you could reach any device connected to Husarnet without any configuration if you only know it's IPv6 Husarnet address. If that suits you, simply disable it on all devices - `husarnet whitelist disable`. Be aware of security implications of this action (e.g. do this only if you are confident that your firewall is strong enough).

Otherwise, whitelist has to contain IP addresses of the devices that are authorized to connect to your host. You can manage it using two commands:

- `$ husarnet whitelist add [address]` - Add fc94 IPv6 address to the whitelist.
- `$ husarnet whitelist rm [address]` - Remove fc94 IPv6 address from the whitelist.

If you want A to communicate with B, make sure to add A to B whitelist and B to A whitelist.

## Command line

### `whitelist add [addr]`

Adds device to the of your Husarnet Client. 

Usage example:
```bash
sudo husarnet whitelist add fc94:...:527f
```
Will add device with a `fc94:...:527f` Husarnet IPv6 address to the whitelist.

### `whitelist rm [addr]`

### `whitelist enable`

### `whitelist disable`

### `status`

### `genid`

### `websetup`

### `join`

## Tips

1. You may contact all other devices in the network by using their hostnames, e.g.:

    ```
    $ ping6 mydevice1
    $ ssh user@mydevice1
    $ wget http://mydevice:8000
    ```

2. You can check connection status and your Husarnet IPv6 address using `husarnet status`:

    ```bash
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

    In this example, you are connected to the first peer directly (`fc94:...:bffa`) via local network (`192.168.1.45`). Direct connection to second peer could not be established (tunneled) - this probably means that network you are using blocks UDP traffic. Tunneled means packets are transmitted over the Base Server your Husarnet Client is connected to, with a very limited throughput and much higher latency. To provide a peer-to-peer connection and prevent tunneling over Base Servers, ensure the firewall allows outgoing UDP traffic, at least on port 5582. For more information about connection troubleshooting visit this [page](/docs/tutorial-troubleshooting)

3. Just be aware that the servers and client you are using must support IPv6 (as Husarnet is an IPv6 overlay network) - for example, you have to listen on "::", not "0.0.0.0".