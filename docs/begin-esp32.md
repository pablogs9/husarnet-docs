---
sidebar_label: ESP32 (beta)
title: Use Husarnet on ESP32 (beta)
custom_edit_url: https://github.com/husarnet/husarnet-docs/docs/begin-esp32
keywords:
  - vpn
  - p2p
image: https://i.imgur.com/mErPwqL.png
---

:::info
Husarnet VPN Client can run not only on servers, laptops and mobile phones (soon), but also on microcontrollers with very limited computing power and memory. Thanks to that you can run a single VPN network containing not only computers, but also cheap and low-power Wi-Fi sensors/actuators without any additional server or bridge in between. In other words you can build an IoT network connected to your computer without any kind of IoT API cloud in between. You can send messages directly to your Wi-Fi chips and this guide will show you how to do that.
:::

This quick start guide describes how to use **Husarnet VPN Client** software library on ESP32 Wi-Fi microcontrollers and how to configure a network using **Husarnet Dashboard** in a few easy steps.

Sections IV and V contain two demo project: basic and advanced. After finishing this quick start guide you will know not only how to connect your ESP32 and Linux computer together, but also how to usefull such a connection could be!

## I. Create a network

Log in to [Husarnet Dashboard](https://app.husarnet.com), click **[Create network]** button, name your network and click **[Create]** button.

![create network](/img/getting-started/docs-create-network.png)

## II. Get a join code

Click **[Add element]** button, select **[join code]** tab and copy your join code which looks something like this: 
```
fc94:b01d:1803:8dd8:b293:5c7d:7639:932a/XXXXXXXXXXXXXXXXXXXXX
```

![find joincode](/img/getting-started/docs-joincode.png)

## III. Configure Arduino IDE environment

### 1. Install Arduino IDE
First, download and install [Arduino IDE](https://www.arduino.cc/en/Main/Software).

### 2. Add ESP32 boards (powered by Husarnet) 
Open Arduino IDE and install the fork of **Arduino core for the ESP32** by following these steps:
- go to `File -> Preferences`
- in a field `Additional Board Manager URLs` paste this link:
```
https://files.husarion.com/arduino/package_esp32_index.json
```

![Board Manager URL](/img/getting-started/docs-arduino-url.png)

- go to `Tools -> Board: ... -> Boards Manager ...`
- Search for `esp32-husarnet` by Husarion
- Click install button

![ESP32 board install](/img/getting-started/docs-arduino-board.png)

### 3. Select ESP32 dev board:

- go to `Tools -> Board`
- select `ESP32 Dev Module` under **ESP32 Arduino (Husarnet)** section

## IV. Demo no. 1 (basic)

We created a simple "hello world" demo for ESP32 and Husarnet. To run it you will need the following:
- ESP32 dev board
- laptop running Linux

It looks like this: ESP32 board is sending 

```bash
Hello world! 1
Hello world! 2
Hello world! 3 
```
over the internet using Husarnet VPN to a computer with a very basic server running on 8002 port and written in Python3.

Both client and server code is available on [GitHub](https://github.com/DominikN/husarnet-esp32-minimal)

### ESP32 client code
Create and open a new folder called **husarnet-esp32-minimal** and paste the code presented bellow to the **husarnet-esp32-minimal.ino** file (remember to replace `wifi-ssid-1` and `wifi-pass-for-ssid-1` by your Wi-Fi credentials and also replace a joincode by your own obtained in [section II](/docs/begin-esp32#ii-get-a-join-code)):

```cpp
#include <WiFi.h>
#include <Husarnet.h>

// WiFi credentials
const char* ssid     = "wifi-ssid-1";
const char* password = "wifi-pass-for-ssid-1";

// Husarnet credentials
const char* hostName = "esp32basic";
const char* husarnetJoinCode = "fc94:b01d:1803:8dd8:b293:5c7d:7639:932a/xxxxxxxxxxxxxxxxxxxxxx";

// Hostname of your laptop hosting a server
const char* laptopHostname = "mylaptop1";

void setup()
{
  Serial.begin(115200);

  /* Connect to WiFi */
  Serial.printf("Connecting to %s", ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.printf("done\r\nlocal IP: %s", WiFi.localIP());

  /* Start Husarnet */
  Husarnet.join(husarnetJoinCode, hostName);
  Husarnet.start();
}

void loop()
{
    HusarnetClient client;
    uint8_t buf[100];
    int buf_s = 0;
    int cnt = 0;

    /* Try to connect to a server on port 8002 on your laptop */
    if (!client.connect(laptopHostname, 8002)) {
        Serial.printf("connection to \"%s\" failed\r\n", laptopHostname);
        delay(1000);
        return;
    }

    /* While connected send "Hello world!" + counter value */
    while(client.connected()) {
      buf_s = sprintf ((char*)buf, "Hello world! %d\r\n", cnt++);
      client.write(buf,buf_s);
      Serial.printf("sending: %s\r\n", (char*)buf);
      delay(1000);
    }
}
```
Then build the project.
![Build project](/img/getting-started/docs-arduino-build.png)

And upload the code to your ESP32.

### Python server code

First, connect your Linux laptop to the same Husarnet network as ESP32. Follow [getting started guide for Linux](/docs/begin-linux) to see how to install **Husarnet Client** app and connect your laptop to the Husarnet network.

Create a **laptopServer.py** file and paste this code:

```python
import socket

with socket.socket(socket.AF_INET6, socket.SOCK_STREAM) as s:
	s.bind((socket.gethostname(), 8002))
	s.listen(1)
	conn, addr = s.accept()
	with conn:
		print('Connected by', addr)
		while True:
			data = conn.recv(1024)
			if not data: break
			print(data.decode('ascii'))
```
Then open a linux terminal in the same location where the python project is located and execute:

```bash
python3 ./laptopServer.py
```

:::note use IPv6 in your programs
Husarnet runs on top of both IPv4 and IPv6 networks but creates only IPv6 overlay network on top.  

If you want to connect your existing code over the internet remember to change all settings to use IPv6 network like `socket.AF_INET6` in the example above.
:::

:::tip Read if you face errors during project build
1. In some configurations you may face issues with other existing Wi-Fi libraries. The simplest way to fix that is to remove ...
:::

## V. Demo no. 2 (advanced)

Demo no. 1 was really basic. Now let's create something that could be a good starting point for a real IoT project working on ESP32 board and Husarnet!

Here is a list of improvements:
- use **websockets** that are very handy to handle communication in JavaScript and Python code
- use **JSON** for data serialization and to provide elegant API
- host simple **web server** on the ESP32
- create a Python3 script that will save data in the **SQLite database**
- make ESP32 to act as **a server**, not as a client

Typical IoT devices act only as clients connected to a central server with a static IP address:

![Old IoT](/img/getting-started/iot_old.png)

Husarnet allows you to have a completely new approach to creating your own internet connected devices. They can act both as a server and as a client even with no static and public IP needed.

Thanks to that approach your sensors can be running the whole time with no additional server needed and you can connect, from a level of your laptop, to them directly over the internet whenever you want. That gives you much lower latency (comparing to central server based approach, especially if your devices are in near networks) and makes your IoT network configuration much simpler.

![Old IoT](/img/getting-started/iot_new.png)

### ESP32 client code

At first, clone [husarnet-esp32-default project from GitHub](https://github.com/DominikN/husarnet-esp32-default) containging the following files:

- **husarnet-esp32-default.ino** with a main code
- **html.h and default_js.h** header files containging c-string tables with HTML and JS code of a server hosted by ESP32
- **lut.cpp and lut.h** - library to generate fake data. Replace this with the real sensor data after finishing this quick start guide.

There is also a **python** folder containing a code that will be executed on your laptop side.

#### 1. Install ArduinoJson and arduinoWebSockets libarty in Arduino IDE
**Install ArduinoJson library:**

- open `Tools -> Manage Libraries...`
- search for `ArduinoJson`
- click install button

**Install arduinoWebSockets library (Husarnet fork):**

- download https://github.com/husarnet/arduinoWebSockets as a ZIP file (this is Husarnet compatible fork of arduinoWebSockets by Links2004 (Markus) )
- open `Sketch -> Include Library -> Add .ZIP Library ... `
- choose `arduinoWebSockets-master.zip` file that you just downloaded and click open button


#### 2. Add your own Wi-Fi and Husarnet credentials
in **husarnet-esp32-default.ino** file replace `wifi-ssid-1` and `wifi-pass-for-ssid-1` with your Wi-Fi credentials and also replace a joincode by your own, obtained in [section II](/docs/begin-esp32#ii-get-a-join-code)):

```cpp
#include <WiFi.h>
#include <WiFiMulti.h>
#include <Husarnet.h>
#include <WebSocketsServer.h>
#include <WebServer.h>
#include <ArduinoJson.h>

#include "time.h"
#include "lut.h"

/* =============== config section start =============== */
#define HTTP_PORT 8000
#define WEBSOCKET_PORT 8001

#if __has_include("credentials.h")
#include "credentials.h"
#else

// WiFi credentials
#define NUM_NETWORKS 2
const char* ssidTab[NUM_NETWORKS] = {
  "wifi-ssid-1",
  "wifi-ssid-2",
};
const char* passwordTab[NUM_NETWORKS] = {
  "wifi-pass-for-ssid-1",
  "wifi-pass-for-ssid-2",
};

// Husarnet credentials
const char* hostName = "esp32basic";
const char* husarnetJoinCode = "fc94:b01d:1803:8dd8:b293:5c7d:7639:932a/xxxxxxxxxxxxxxxxxxxxxx";

#endif
/* =============== config section end =============== */

// NTP settings
const char* ntpServer = "pool.ntp.org";
const long  gmtOffset_sec = 3600;
const int   daylightOffset_sec = 3600;

// HTTP server on port 8000
WebServer server(HTTP_PORT);

// websocket server on port 8001
WebSocketsServer webSocket = WebSocketsServer(WEBSOCKET_PORT);

// you can provide credentials to multiple WiFi networks
WiFiMulti wifiMulti;

// JSON documents
//https://arduinojson.org/v5/assistant/
StaticJsonDocument<100> jsonDocRx;  // {"set_output":"sine"}
StaticJsonDocument<200> jsonDocTx;  // {"timestamp":1000000000, "output_type":"sine", "value":129}

// global variable to store a current waveform type to be sent over websocket
String modeName = "sine"; //"square", "triangle", "none"

SemaphoreHandle_t sem = NULL;

// HTML and JS files for HTTP server on port 8000
const char* html =
#include "html.h"
  ;
const char* default_js =
#include "default_js.h"
  ;

// get local time - synchronisation with NTP server
bool getTime(time_t& rawtime) {
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("Failed to obtain time");
    return 0;
  } else {
    rawtime = mktime(&timeinfo);
    return 1;
  }
}

void onWebSocketEvent(uint8_t num, WStype_t type, uint8_t* payload, size_t length) {
  switch (type) {
    case WStype_DISCONNECTED:
      Serial.printf("[%u] Disconnected\r\n", num);
      break;
    case WStype_CONNECTED:
      Serial.printf("\r\n[%u] Connection from Husarnet \r\n", num);
      break;

    case WStype_TEXT:
      {
        Serial.printf("[%u] Text: %s\r\n", num, (char*)payload);

        jsonDocRx.clear();
        auto error = deserializeJson(jsonDocRx, payload);

        if (!error) {
          if (jsonDocRx["set_output"]) {
            String output = jsonDocRx["set_output"];
            if ( (output == "sine") || (output == "triangle") || (output == "square") || (output == "none")) {
              modeName = output;
            }
          }
        }
      }
      break;

    case WStype_BIN:
    case WStype_ERROR:
    case WStype_FRAGMENT_TEXT_START:
    case WStype_FRAGMENT_BIN_START:
    case WStype_FRAGMENT:
    case WStype_FRAGMENT_FIN:
    default:
      break;
  }
}

void onHttpReqFunc() {
  server.sendHeader("Connection", "close");
  server.send(200, "text/html", html);
}

void taskWifi( void * parameter );
void taskStatus( void * parameter );

void setup()
{
  Serial.begin(115200);

  sem = xSemaphoreCreateMutex();
  xSemaphoreTake(sem, ( TickType_t)portMAX_DELAY);

  xTaskCreate(
    taskWifi,          /* Task function. */
    "taskWifi",        /* String with name of task. */
    20000,            /* Stack size in bytes. */
    NULL,             /* Parameter passed as input of the task */
    1,                /* Priority of the task. */
    NULL);            /* Task handle. */

  xTaskCreate(
    taskStatus,          /* Task function. */
    "taskStatus",        /* String with name of task. */
    20000,            /* Stack size in bytes. */
    NULL,             /* Parameter passed as input of the task */
    1,                /* Priority of the task. */
    NULL);            /* Task handle. */
}

void taskWifi( void * parameter ) {
  uint8_t stat = WL_DISCONNECTED;

  /* Configure Wi-Fi */
  for (int i = 0; i < NUM_NETWORKS; i++) {
    wifiMulti.addAP(ssidTab[i], passwordTab[i]);
    Serial.printf("WiFi %d: SSID: \"%s\" ; PASS: \"%s\"\r\n", i, ssidTab[i], passwordTab[i]);
  }

  while (stat != WL_CONNECTED) {
    stat = wifiMulti.run();
    Serial.printf("WiFi status: %d\r\n", (int)stat);
    delay(100);
  }
  Serial.printf("WiFi connected\r\n", (int)stat);
  Serial.printf("IP address: ");
  Serial.println(WiFi.localIP());

  /* Start Husarnet */
  Husarnet.join(husarnetJoinCode, hostName);
  Husarnet.start();

  /* Configure connection to the NTP server (get accurate time for timestamps) */
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);

  /* Start websocket server */
  webSocket.begin();
  webSocket.onEvent(onWebSocketEvent);

  /* Confgiure HTTP server */
  server.on("/", HTTP_GET, onHttpReqFunc);
  server.on("/index.html", HTTP_GET, onHttpReqFunc);
  server.on("/default.js", HTTP_GET, []() {
    server.sendHeader("Connection", "close");
    server.send(200, "application/javascript", default_js);
    xSemaphoreGive( sem );
  });
  server.begin();

  xSemaphoreGive( sem );

  while (1) {
    // loop to handle websocket server and HTTP server
    while (WiFi.status() == WL_CONNECTED) {
      if (xSemaphoreTake(sem, ( TickType_t)0) == pdTRUE ) {
        webSocket.loop();
        server.handleClient();
        xSemaphoreGive( sem );
      }
      delay(2);
    }

    Serial.printf("WiFi disconnected, reconnecting\r\n");
    delay(500);
    stat = wifiMulti.run();
    Serial.printf("WiFi status: %d\r\n", (int)stat);
  }
}

void taskStatus( void * parameter )
{
  time_t currentTime;

  while (1) {
    if (xSemaphoreTake(sem, ( TickType_t)portMAX_DELAY) == pdTRUE ) {
      jsonDocTx.clear();
      if (getTime(currentTime)) {
        String output;
        jsonDocTx["timestamp"] = currentTime;
        jsonDocTx["output_type"] = modeName;
        jsonDocTx["value"] = getLutVal(modeName);
        serializeJson(jsonDocTx, output);

        // if websocket connection is opened send JSON like {"timestamp":1000000000, "output_type":"sine", "value":129}
        if (webSocket.sendTXT(0, output)) {
          xSemaphoreGive( sem );
          Serial.print(F("Sending: "));
          Serial.print(output);
          Serial.println();
        } else {
          xSemaphoreGive( sem );
        }
      }  
    }
    delay(500);
  }
}

void loop()
{
  Serial.printf("[RAM: %d]\r\n", esp_get_free_heap_size());
  delay(5000);
}
```

### Web page hosted by ESP32

After you upload a code to your ESP32 board, you should be able to access a web page hosted by ESP32 from a level of a web browser (on a laptop in the same Husarnet network).

You can just use a hostname in the URL: `http://esp32basic:8000`, where `esp32basic` is a Husarnet hostname of your ESP32 board, and `8000` is a port on which HTTP server is available.

Another option is to use Husarnet IPv6 address of your ESP32 board in the URL (you can find it in **Husarnet Dashboard**): `http://[fc94:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx]:8000/`.

![web UI ESP32](/img/getting-started/esp32-webpage.png)

### Python server code

First, connect your Linux laptop to the same Husarnet network as ESP32. Follow [getting started guide for Linux](/docs/begin-linux) to see how to install **Husarnet Client** app and connect your laptop to the Husarnet network.

In the [husarnet-esp32-default repository](https://github.com/DominikN/husarnet-esp32-default) there is a **Python** folder containing **db_example.py** file

```python
import sqlite3
import asyncio
import websockets
import argparse
import json
from sqlite3 import Error

conn = None
cur = None
sql_insert = "INSERT INTO exampledb (timestamp, output_type, value) VALUES (?, ?, ?);"

async def mainfunc():
    uri = "ws://" + args.hostname + ":8001"
    print("connecting: " + uri)
    async with websockets.connect(uri) as websocket:
        tx_msg = json.dumps({"set_output":args.outputType})

        print(tx_msg)
        await websocket.send(tx_msg)
        
        while True:
            rx_msg = await websocket.recv()
            print(rx_msg)
            rx_json = json.loads(rx_msg)

            cur.execute(sql_insert, (rx_json["timestamp"],rx_json["output_type"],rx_json["value"]))
            conn.commit()

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("hostname", nargs='?', default="esp32basic")
    parser.add_argument("outputType", nargs='?', default="sine")
    args = parser.parse_args()

    print("hostname: ", args.hostname)
    print("outputType: ", args.outputType)

    try:
        conn = sqlite3.connect("./exampledb.db")
        print("sqlite version: " + sqlite3.version)
        cur = conn.cursor()
        cur.execute("CREATE TABLE IF NOT EXISTS exampledb (timestamp, output_type, value)")
        conn.commit()

        asyncio.get_event_loop().run_until_complete(mainfunc())

    except Error as e:
        print(e)
    except KeyboardInterrupt:
        print("\r\nReceived exit, exiting")
    finally:
        print("\r\nClose database connection")
        if conn:
            conn.close()
```
Then open a linux terminal in the same location where the python project is located and execute:

```bash
python3 ./db_example.py
```

In the code we're trying to connect to a websocket port 8001 served by the ESP32 board under a defaul URL: `ws://esp32basic:8001`. If connection is established, we send a name of a waveform to be generated by ESP32 and then store each received fake sensor data in `exampledb.db` (created by Python program if not existing). 


------
That's all. Installing and using **Husarnet VPN Client** library for ESP32 is very simple. Basically it works just like standard [Arduino core for ESP32 repository](https://github.com/espressif/arduino-esp32), but instead of `<WiFiClient.h>` and `<WiFiServer.h>` libraries (that are still available) you need to use`<HusarnetClient.h>` and `<HusarnetServer.h>` libraries provied by Husarnet.

:::tip
There is a simple way to quickly port probably most of libraries available for ESP32 board that use `<WiFiClient.h>` and `<WiFiServer.h>` standard libraries.

Just open library files (both `.cpp` and `.h`) and replace each occurence of:
- `WiFiClient` string by `HusarnetClient` string
- `WiFiServer` string by `HusarnetServer` string
:::

Your Husarnet connected devices see each other like they were in the same LAN network even if one of them is a microcontroller and other is Linux computer.

Just be aware that the servers and client you are using must support IPv6 (as Husarnet is an IPv6 overlay network) - for example, you have to listen on "::", not "0.0.0.0".

#### More resources:
- [Husarnet Dashboard manual page](/docs/manual-dashboard) to read more about how you can manage your networks in an easy way.
- [Husarnet Hackster profile](https://hackster.io/husarnet/projects) containing simple projects which might inspire you.
