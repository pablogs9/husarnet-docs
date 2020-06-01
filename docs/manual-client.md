---
sidebar_label: Husarnet Client app (Linux)
title: Husarnet Client app manual for Linux
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

After installation process is finished, execute the following command:
```
sudo systemctl restart husarnet
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

If you are using systemd, enable and start the service (`systemctl enable husarnet; systemctl start husarnet`). Otherwise, make sure `husarnet daemon` command is started on system startup. You need to run it as root, but don't worry - **Husarnet automatically relinquishes unnecessary permissions.**

## Managing Husarnet Client over Husarnet Dashboard

**Husarnet Dashboard** is a web application allowing you to:
- Create and remove new Husarnet networks (your device can be in one or multiple Husarnet networks in the same time).
- Share your Husarnet networks to other users with configurable access rights.
- Add devices to your networks in a few ways (websetup, join code, QR code, already linked to your account)
- Removing devices from network or from your account
- Checking your devices information (IPv6 address, online/offline, owner etc.)
- in commercial plans accessing your billing data and managing subscriptions.

![Husarnet Dashboard main page](/static/img/manual/dashboard-main.png)

If you add devices to the specific Husarnet network all devices from this network see your device like it was in the same LAN network and they are whitelisting automatically. To learn more about **Husarnet Dashboard** app visit [its documentation page](/docs/manual-dashboard).

You can add your device to a Husarnet network shared to you by other **Husarnet Dashboard** user. And your device can be in the same time connected to your other, private Husarnet networks that will be accessible only by you. Such a scenario is good if you would like to give someone an access to the specific device that is connected to your **Husarnet Dashboard** account. Just place this device in the separate, newly created Husarnet network and share this network to one or multiple users. Another use case would be creating an ad-hoc network for working group, for LAN gaming etc..

Public version of **Husarnet Dashboard** is available under this link: https://app.husarnet.com. There are also self-hosted commercial versions. For more details visit pricing page.


## Managing Husarnet Client manually

**Warning: this is not the recommended method of using Husarnet.**

Sometimes managing the devices via Husarnet Dashboard can be cumbersome. You can skip connecting your device to the Dashboard and manage whitelist and hostnames via command line.

If not the whitelist, you could reach any device connected to Husarnet without any configuration if you only know its Husarnet IPv6 address. If that suits you, simply disable it on all devices - `husarnet whitelist disable`. Be aware of security implications of this action (e.g. do this only if you are confident that your firewall is strong enough).

Otherwise, whitelist has to contain IP addresses of the devices that are authorized to connect to your host. You can manage it using two commands:

- `$ husarnet whitelist add [address]` - Add fc94 IPv6 address to the whitelist.
- `$ husarnet whitelist rm [address]` - Remove fc94 IPv6 address from the whitelist.

If you want A to communicate with B, make sure to add A to B whitelist and B to A whitelist.

## Command line

Here you can find a list of commands you can execute in Husarnet Client:
![Husarnet Client commands](/static/img/manual/husarnet-client.png)

### `whitelist add [addr]`

Adds device to the whitelist of your device running Husarnet Client. Read more about whitelisting mechanism [in this section](#managing-husarnet-client-manually). Alternatively to manualy add devices to your whitelist, you can do that by using [Husarnet Dashboard](#managing-husarnet-client-over-dashboard).

#### Usage example:
```bash
sudo husarnet whitelist add fc94:...:527f
```
Adds a device with a `fc94:...:527f` Husarnet IPv6 address to the whitelist.

### `whitelist rm [addr]`

Removes a device from the whitelist of your device running Husarnet Client. 

#### Usage example:
```bash
sudo husarnet whitelist rm fc94:...:527f
```
Will remove a device with a `fc94:...:527f` Husarnet IPv6 address from the whitelist.

### `whitelist enable`

Enables whitelist mechanism - only devices with addresses stored in your device whitelist will be able to communicate with your devices.

#### Usage example:
```bash
sudo husarnet whitelist enable
```

### `whitelist disable`

All devices, even owned by other users will be able to reach your device as long if they only know your device's IPv6 address.

#### Usage example:
```bash
sudo husarnet whitelist disable
```

### `status`

Get a status of your device with Husarnet Client installed such as:
- version of the Husarnet Client
- your device's Husarnet IPv6 address
- address of the Base Server your device is connected to
- addresses of peers with a connection status and information whether peer-to-peer connection has been established, or Base Server is used for forwarding packets with one or more peers (in such a case visit [troubleshooting guide](/docs/tutorial-troubleshooting) that will describe common issues, and how you can overcome them).

#### Usage example:
```bash
sudo husarnet status
```

#### Output example:
```bash
johny@johnylaptop:~$ sudo husarnet status
Version: 2020.05.14.1
Husarnet IP address: fc94:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:aeeb
UDP connection to base: [188.xxx.xxx.196]:5582
Peer fc94:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:c227
  source=[87.xxx.xxx.16]:5582 
  addresses from base=[87.xxx.xxx.16]:5582 [87.xxx.xxx.16]:5582 [192.xxx.xxx.150]:5582 [192.xxx.xxx.1]:5582 
  target=[87.xxx.xxx.16]:5582
  secure connection established
Peer fc94:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:932a
  source=[137.xxx.xxx.110]:5582 
  addresses from base=[137.xxx.xxx.110]:5582 [137.xxx.xxx.110]:5582 
  target=[137.xxx.xxx.110]:5582
  secure connection established
Peer fc94:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:ae4e
  source=[137.xxx.xxx.16]:5582 
  addresses from base=[137.xxx.xxx.16]:5582 [137.xxx.xxx.16]:5582 [192.xxx.xxx.153]:5582 [192.xxx.xxx.2]:5582 
  tunnelled
  establishing secure connection
```
Analyzing the output:
- Peer `fc94:...:c227` - this is a Husarnet IPv6 address of one of peers.
  - `source=[87.xxx.xxx.16]:5582` - IP addresses that were used in the past to send something from this peer. 
  - `addresses from base= ... [87.xxx.xxx.16]:5582 ...` - all known addresses of this peer obtained from a **Base Server**. They are used while trying to establish a peer-to-peer connection.
  - `target=[87.xxx.xxx.16]:5582` - address of a peer that is actually used by the **Husarnet Client** during a peer-to-peer connection.
  - `secure connection established` - connection with this peer is established. You can ping it.

- Peer `fc94:...:932a` is a Websetup Server address that is a part of **Husarnet Dashboard**. It provides a list of peers to your device running **Husarnet Client** with their hostnames and is also used to connect devices to Husarnet networks.

- Peer `fc94:...:ae4e` output is a little bit diffrent that in case of `fc94:...:c227`. Instead of `target= ... ` there is `tunnelled`. That means peer-to-peer connection was not possbile for some reason, and tunneling a traffic through a **Husarnet Base Server** was needed. This is not expected behavior - probably you will need to change your network configuration. Read more in a [troubleshooting guide](/docs/tutorial-troubleshooting).

<!-- ### `genid`

TODO -->

### `websetup`

It is one of the methods to connect your device to an account at **Husarnet Dashboard**. After executing this command, the unique link is generated. If you open it in the web browser and you are logged into your **Husarnet Dashboard** account you will see something like this:

![websetup page in dashboard](/static/img/manual/websetup.png)

Name your device here (this hostname will be used by other devices in your Husarnet networks to reach your devices. This is more handy than using Husarnet IPv6 address) and select a network from your **Husarnet Dasbhoard** account to which you want to add this device. By selecting a checkbox `Change device hostname to [hostnameYouJustUsed]. Recommended for ROS`, also the hostname in your OS level will be changed. In other words if you will open your Linux terminal you will see:

```bash
user@hostnameYouJustUsed:~$ _
```

#### Usage example:
```bash
sudo husarnet websetup
```

#### Output example:
```bash
Go to https://app.husarnet.com/husarnet/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx to manage your network from web browser.
```

### `join`

This is second, next to `websetup`, command way to connect your device to a Husarnet network that is also described in the [first start guide for Linux](/docs/begin-linux). If you have many devices that you want to connect to your Husarnet network at once, or you do not have access to a web browser this method is the most convenient. To find your **join code**, unique for each network, you need to log into your account at https://app.husarnet.com, select a network, click **Add element** button and go to a **[join code]** tab.

:::warning
Keep your **join code** secret! If you consider your **join code** might be compromised, click **[Reset join code]** button in a **[join code]** tab. Devices that already were connected using previous join code, still will be in you Husarnet networks, however previous join code will not be valid for adding new devices to your networks. 
:::

#### Usage example:
```bash
husarnet join fc94:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:932a/xxxxxxxxxxxxxxxxxxxxxx mydevhostname
```

#### Output example:
```bash
johny@johnylaptop:~$ sudo husarnet join fc94:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:932a/xxxxxxxxxxxxxxxxxxxxxx johnylaptop
[sudo] password for johny: 
[16699016] joining...
[16701017] joining...
johny@johnylaptop:~$
```

## Tips

1. You may contact all other devices in the network by using their hostnames, e.g.:

    ```bash
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