---
title: 'Web UI'
layout: default
---

# Web UI

Husarnet Dashboard provides a service that makes it possible to access HTTP server running on a Husarnet device using standard web browser over the internet (i.e. without Husarnet installed).

If there is a HTTP server listening on port 8000 on the Husarnet interface, "Web UI" button will appear in the network screen.

<div class="image"><img src="/img/web-ui/net.png"/></div>

Clicking the button will navigate you to a page with URL like `https://XXXX.husarnetusers.com`. On that address there is a server that securely proxies the requests to your device. The page is available only to you (and requires you to login to your account).

**Warning**: Login page will always have URL starting with `https://app.husarnet.com/`. `husarnetusers.com` URLs are controlled by users and you should not trust them implicitly.

## Public Web UI

By default, the interface is accessiable only to you. However, you can make the web UI public, so anyone who knows the address, will be able to access the interface.

To make the interface public, open element settings (by clicking its name in the network screen) and toggle "Make the Web UI public" checkbox. Then you can copy the address of the page accessible using "Open Web UI" button and send it to someone.

**Warning**: Everyone will be able to access the Web UI! Make sure it is written in a secure way. Most elements from the Husarnet Marketplace assume that they won't be made public.

<div class="image"><img src="/img/web-ui/public.png"/></div>

## Details

The Web UI URL has form `https://fcXXXXXXXXXXXXXX-PORT.husarnetusers.com` where `fcXXXXXXXXXXXXXX` is the Husarnet device IP (without colons) and `PORT` is the TCP port of the service running on a device. For security, only ports 8000 and 8001 are allowed. URLs in form `https://fcXXXXXXXXXXXXXX-PORT.husarnetusers.com/__port_PORT2/` (e.g. `https://fcXXXXXXXXXXXXXX-8000.husarnetusers.com/__port_8001/`) are special - PORT2 overwrites PORT. This form is useful for accessing websocket servers.
