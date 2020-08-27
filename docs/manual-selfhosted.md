---
sidebar_label: Self-hosted Dashboard and Base Servers
title: Configuration guide for Self-hosted Dashboard and Base Servers
custom_edit_url: https://github.com/husarnet/husarnet-docs/docs/manual-selfhosted
keywords:
  - vpn
  - p2p
image: https://i.imgur.com/mErPwqL.png
---

## About

**[Husarnet Dashboard](/docs/manual-dashboard)** and **[Husarnet Base Server](/docs/manual-general#how-connections-are-established)** are hosted by Husarnet company, but the special version of them can be hosted on your own infrastructure.

To install Husarnet Dashboard and Husarnet Base Server you need to prepare at least two machines with "publicly-accessible" IP (in case of LANs, it just means that it needs to be accessible by any computer in the network without any NATs in between). The self-hosted Dashboard and Base Server can be installed on any Docker-compatible machine, but Ubuntu 20.04+ or Debian buster+ is strongly recommended. 

Bellow we show the installation procedure on the fresh Ubuntu 20.04 system running on VPS with a public IP.

## Launching a self-hosted instance

### Docker image access

First you need to select one of "Self-hosted" plans and finalize the transaction. After that you receive a read-only access to the Docker repository containing installation files.

![Download token credentials](/img/manual/download_token_credentials_.png)

Click "Download Azure token credentials" link and download `config.json` file

After that copy `config.json` to a `/root/.docker/` directory. This will allow you to download Docker images from our repository. **You will need to do this step for every Base Server machine you will have and the Dashboard Server**.

### Install Husarnet Base Servers

At least one base server is needed.

1. [Get the `install_base.py` script](https://raw.githubusercontent.com/husarnet/husarnet-docs/master/docs/scripts/install_base.py) and place it in `/root` directory.
2. execute `chmod u+x install_base.py`
3. execute `./install_base.py`
4. The script will ask you for the IP your server will be accessible at, as well as the addresses of other base servers (if any).
5. After you set up all the base servers you want to use, you can set up the Dashboard.

### Install Husarnet Dashboard
Next, the dashboard can be installed. As with the base servers, Ubuntu 20.04+ or Debian buster+ is required.

1. [Get the `install.py` script](https://raw.githubusercontent.com/husarnet/husarnet-docs/master/docs/scripts/install.py) and place it in `/root` directory..
2. execute `chmod u+x install.py`
3. execute `./install.py`
4. Installation ID, instance secret and websetup ID will show up.

```bash
Installation ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Instance secret: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Websetup host: fc94:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx
```
Click `Enter self-hosted instance details` link on https://app.husarnet.com/billing/account/ site (it's above the link used before to download a `config.json` file)

![Enter license details](/img/manual/enter_license_details_.png)

And enter Installation ID, instance secret and websetup ID along with other required data and click `Submit` button

5. Download the license file generated and place it in the same directory as `install.py`.

![Download license](/img/manual/download_license_.png)

6. Run `./install.py` again.
7. After the process finishes, you should be able to visit the dashboard in your web browser.

:::warning
Remember to backup `/var/lib/husarnet/id` file -  it will be required when you will need to reinstall your self-hosted instance for some reason. For more details visit [this section](#reinstalling-your-self-hosted-instance)
:::

To access administrator page on you self-hosted instance, visit `http://<YOUR_DASHBOARD_IP>/admin/`. You can add new users here, remove them, reset passwords etc.

## Reinstalling your self-hosted instance

The installation script does not support reinstalling right now. However, it is possible, as follows:

1. Run `install.py` once (do not proceed to stage 2).
2. Copy `/var/lib/husarnet/id` from the old instance to the new one (to the same path), and `/var/cloud/license.json` (to the directory with `install.py`).
3. In `/var/cloud/env` on the old instance, you will see a line like `SELF_HOSTED_INSTANCE_SECRET=<key>`. Copy the key and put it `config.json` that is now created next to `install.py` and change the value of `instance_secret` key there to the key you have copied.
4. Proceed with the rest of the install normally.

## Connecting clients to self-hosted Husarnet

### Linux client
```
sudo husarnet setup-server <adress>
sudo systemctl restart husarnet
```

Where `<address>` is the hostname or IP address of the dashboard, e.g. `sudo husarnet setup-server 192.168.1.100`, or `sudo husarnet setup-server app.mydomainwheredashboardisinstalled.com`.

To use the default Husarnet server by your Linux client go to `/var/lib/husarnet` and remove `license.json` file, then execute `sudo systemctl restart husarnet` on the devices you want to connect.

### ESP32 client
ESP32 client supports self-hosted instances since Arduino library version 1.2.0. The supports is implemented as `Husarnet.selfHostedSetup()` method call. Before calling `Husarnet.join()`, or `Husarnet.start()`, one has to call `Husarnet.selfHostedSetup()`, e.g.:

```cpp
Husarnet.selfHostedSetup("192.168.1.100");
Husarnet.join("<my-joincode>", "esp32");
Husarnet.start();
```

The Husarnet library saves the license file in the ESP32 memory, so in theory you do not need to call `Husarnet.selfHostedSetup()` later again. However, because the license file usually have short validity period, it's best to call `selfHostedSetup()` before each `start()` to make sure the license is always fresh.

To use the default Husarnet servers again, call:

```cpp
Husarnet.selfHostedSetup("default");
```
