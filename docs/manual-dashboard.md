---
sidebar_label: Husarnet Dashboard web app
title: Husarnet Dashboard web app manual
custom_edit_url: https://github.com/husarnet/husarnet-docs/docs/manual-dashboard
keywords:
  - vpn
  - p2p
image: https://i.imgur.com/mErPwqL.png
---

This manual describes how to use **Husarnet Dashboard** web app which public version is available under this link: [https://app.husarnet.com ](https://app.husarnet.com). 

**Husarnet Dashboard** allows you to:
- Create and remove new Husarnet networks (your device can be in one or multiple Husarnet networks in the same time).
- Removing devices or adding them to your networks in a few ways (websetup, join code, QR code, already linked to your account)
- Share your Husarnet networks to other users with configurable access rights.
- Check your devices information (IPv6 address, online/offline, owner etc.)
- in commercial plans accessing your billing data and managing subscriptions.
- accessing your Dashboard API tokens (available only in some of commercial plans)

![Husarnet Dashboard main page](/static/img/manual/dashboard-main.png)

## Creating and removing networks


## Adding and removing devices


## Sharing networks to other users


## Check status of your networks and devices


## Account security


## Managing subscriptions and billing


## Husarnet Dashboard API

:::info
Access to Husarnet Dashboard API is possible only in **Public/Enterprise** plan and all **Self hosted** plans.
:::

Thanks to **Husarnet Dashboard API** you can manage your network, add devices etc. without doing that manually from a level of http://app.husarnet.com. Thanks to that approach you can automate those processes by your own scripts that might be useful if you want for example to embed Husarnet functionality into products your are going to provide to a third party.

### Authorization

Go to https://app.husarnet.com/api-token to retrieve your token.

### `GET /api/networks/`

This endpoint returns list of networks which are owned by the current user.

```bash
$ curl -H 'Authorization: Token yourtoken' -v 'https://app.husarnet.com/api/networks/'
```

```json
{
  "networks": [
    {
      "url": "/api/network/5",
      "owner": 2,
      "name": "my-network",
    }
  ]
}
```

### `GET /api/network/`

This endpoint returns detailed information about a network, including list of members.

```bash
$ curl -H 'Authorization: Token yourtoken' -v 'https://app.husarnet.com/api/network/5'
```

```json
{
  "url": "/api/network/5",
  "owner": 2,
  "name": "my-network",
  "ros-master": 3,
  "members": [
    {
      "id": 18,
      "name": "test",
      "device-id": "fc94:XXX",
      "online": false
    },
    {
      "id": 3,
      "name": "mymachine",
      "device-id": "fc94:YYY",
      "online": null
    }
  ]
}
```

### `DELETE /api/network/`

Deletes the network with specified ID.

### `PUT /api/network/`

Changes attributes of the network. Supported attributes: `ros-master`, `name`.

```bash
curl -H 'authorization: Token yourtoken' -v 'https://app.husarnet.com/api/network/5' --data '{"name": "newname"}' -H 'content-type: application/json' -X PUT
```

### `PATCH /api/network/`

Adds or removes members of the network.

#### `{"op": "add-member"}`

Add a member to the network specified by the link.

request body:

```json
{
    "op": "add-member",
    "link": "https://app.husarnet.com/husarnet/fc94XXXXX",
    "name": "[name-of-the-device]",
    "is-fully-managed": true/false,
}
```

arguments:
- `name` - hostname of the device in Husarnet (should match [a-z0-9-]+ regex)
- `is-fully-managed` - should Husarnet change hostname of the device to name? true is recommended for ROS.
- `link` - URL displayed by husarnet websetup

response:

- `{"status": "invalid-hostname"}` - device name is not a valid hostname
- `{"status": "connect"}` - it wasn't possible to contact the device (e.g. it is turned off)
- `{"status": "ok"}` - the member was added successfully

Warning: this call may take up to 30 seconds (it needs to contact the device), make sure to adjust your timeouts.

#### `{"op": "delete-member"}`

Removes a member with specified ID from the network.

request body:
```json
{
    "op": "delete-member",
    "id": <id>
}
```



