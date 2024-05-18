# Chat App

Chat App is a mobile application for 1-1 and group chatting built with React Native. Below are instructions on how to set up and run the project on your device (Android and IOS).

## System Requirements

- [Node.js](https://nodejs.org/) version 20 or higher
- [Expo CLI](https://docs.expo.dev/get-started/installation/) installed
- NPM: 10.2.4 OR YARN: 1.22.21
- Mobile device or emulator (running iOS or Android)
- Stable network connection

## Installation and Running the Project

1. **Clone the project**: Clone the project from the repository:

    ```shell
    git clone https://github.com/JennieKieu/CNM_MemeApp.git
    cd MeMe_App
    ```

2. **Install dependencies**: Use npm to install the necessary dependencies:

    ```shell
    npm install
    ```
    ```shell
    yarn install
    ```

3. **Configure `.env`**: Open the `.env` file in the project and change the value of `API_URL` to the IP address of your network.

    ```plaintext
    API_URL=http://<YOUR-NETWORK-IP>:<PORT>
    ```

    Replace `<YOUR-NETWORK-IP>` and `<PORT>` with the IP address and port number of your network.

4. **Run the project**: Use the following command to start the project:

    ```shell
    npm start
    ```
    or
   ```shell
    yarn start
    ```

6. **Use the app**: Open the Expo Go app on your device and scan the QR code displayed in the terminal to run the app.

## Test Account Information

- **Username**: `thuyduong@gmail.com`
- **Password**: `123asd@A`

Use the above account information to log in to the app and start testing the features of the project.

## Support

If you encounter any issues or have questions about the project, please create an [issue on GitHub](<REPO-URL>/issues) or contact us via email: `<YOUR-EMAIL>`.

Thank you for using the Chat App!
