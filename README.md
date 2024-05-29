# Torrent_NodeJS
A Torrent-like application build with NodeJS. This application includes two subprograms: Tracker and Client.
## Steps to run the program
### Step 1: Clone the repository to local
For example, clone it to the folder `D:\Documents\NodeJS\test`.
```
D:\Documents\NodeJS\test> git clone https://github.com/duyenle7103/Torrent_NodeJS
```
### Step 2: Run the tracker
Navigate to the `Torrent_NodeJS/tracker` folder and run the NodeJS program.
```
D:\Documents\NodeJS\test> cd Torrent_NodeJS/tracker
D:\Documents\NodeJS\test\Torrent_NodeJS\tracker> node main.js
```
Enter the desired port number. For example, enter `1234`.
```
Enter your port: 1234
````
### Step 3:  Run the client for upload purposes
Open another terminal and navigate to the `Torrent_NodeJS/client` folder. Run the NodeJS program.
```
D:\Documents\NodeJS\test> cd Torrent_NodeJS/client
D:\Documents\NodeJS\test\Torrent_NodeJS\client> node main.js
```
Enter a port number different from the tracker's port number. For example, enter `3333`. Choose `2` to upload a file.
```
Enter your port: 3333
Enter:
        1: To download a file
        2: To upload a file
        3: Do nothing
Your choice: 2
```
Enter the information requested by the program. For example:
```
Enter the path to the file to upload: testdata\input\test.txt
Enter the path to save the torrent file: testdata\output\test.torrent
Enter the tracker URL: http://192.168.74.170:1234/announce
Enter the comment: Just a test.txt file
Enter the creator: Duyen
Enter the filename: test.txt
```
Keep this terminal running.
### Step 4: Run the client for download purposes
Open another terminal and navigate to the `Torrent_NodeJS/client` folder. Run the NodeJS program.
```
D:\Documents\NodeJS\test> cd Torrent_NodeJS/client
D:\Documents\NodeJS\test\Torrent_NodeJS\client> node main.js
```
Enter a port number different from the tracker and other clients. For example, enter `7878`. Choose `1` to download a file.
```
Enter your port: 7878
Enter:
        1: To download a file
        2: To upload a file
        3: Do nothing
Your choice: 1
```
Enter the information requested by the program. For example:
```
Enter the path to the torrent file: testdata\output\test.torrent
Enter the path to save the file: testdata\output\test.txt
```
The program will download pieces from other clients and concatenate them into a file.
