---
sidebar_label: Launching Husarnet in Docker
title: Launching Husarnet in a Docker container
keywords:
  - vpn
  - p2p
  - docker
---


# Running Husarnet in Docker

Launching Husarnet inside of a Docker container is not complicated and can be accomplished in a couple of steps.

--- 

1. First, we need to build an appropriate Docker image. We assume your base image might slightly differ from mine but that should not be a problem.
For the purposes of this tutorial, we will use the latest (as of today) Ubuntu image and base the installation process on it.

    Create a Dockerfile:

    ```
    FROM ubuntu:20.04
    RUN apt update && \
        apt install -y curl && \
        apt install -y gnupg2 && \
        apt install -y systemd && \
        curl https://install.husarnet.com/install.sh | bash

    ENTRYPOINT (husarnet daemon > /dev/null 2>&1 &) && /bin/bash
    ```  

    As mentioned before, I'm using the Ubuntu:20.04 image. 
    Feel free to adjust it to your needs.

    Also, it is not necessary to add the ```&& /bin/bash``` portion of ```ENTRYPOINT```. It is convenient for this sample use case because it automatically spawns a shell upon running ```docker run ...``` without the need to provide extra arguments. 

2. Build the image. This is rather straightforward: inside of the ```Dockerfile``` directory, run

    ```docker build -t husarnet_client .``` .

3. You can now run the container. We have two main options here:
    - run the container in ```privileged``` mode. This is absolutely **not** recommended as it exposes your host machine to the container and violates container isolation. We're' not going to go deeper into this method.

    - configure the container manually. This comes down to using a couple of flags.

        The command to start the container is as follows:
        
        ```
        docker run -it -v /dev/net/tun:/dev/net/tun --cap-add NET_ADMIN --sysctl net.ipv6.conf.all.disable_ipv6=0 husarnet_client
        ``` 

Having followed the steps above, a shell inside of the container should be spawned. You can now use the client as if you were on a native system.
