
Egesven

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- Node.js
- npm 
- Ionic CLI

```bash
npm install -g @ionic/cli


git clone https://github.com/cratulas/ArquitecturaDeSoftwareEFT
cd tu-repositorio

npm install

Configuración del Entorno
Abre el archivo environment.ts ubicado en src/environments/environment.ts.

Reemplaza los valores de configuración de Firebase por los de tu propia cuenta. Puedes obtener estos valores desde la consola de Firebase.


export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
  }
};

Usuarios de prueba

admin@gmail.com
123456

user@gmail.com
123456