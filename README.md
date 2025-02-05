This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

![Esta es la pantalla de ajustes](imagesnes/pantallaAjustes.png)

# Los Hooks en React Native los Hooks son funciones

--- Los Hooks en React Native nos permiten utilizar estados y algunas partes del ciclo de vida de los comonentes de React
--- en componentes funcionales

## El useState: [state doc](https://reactnative.dev/docs/intro-react#state)

--- El useState es un Hook de React que nos permite manejar estado dentro de nuestros componentes
--- tiene la siguiente estructura const [state, setState] = useSate();
--- donde state hace referencia al estado actual y el setSate es una funcion la cual nos va a ayudar
--- a actualizar el estado

#### useSate() se le puede pasar un valor booleano, un objeto {}, un arreglo [] o una funcion

--- donde useState ejecutara lo que se le pasa la primera ves que se requiera, eje: una funcion,
--- el valor que regrese el argumento en este caso la funcion lo guardara en el estado 'state'

```bash
# en este ejemplo estamos manejando un objeto, en su estado inicial name: 'Mas', age: 25
const [person, setPerson] = useState({
    name: 'Mas',
    age: 25,
  });
# Para modificar el estado primero tenemos que cargar el estado inicial de esta dorm [...person]
 const onHandrePressName = () => {
    setPerson({
      ...person,
      name: 'Onewe',
    });
  };

```

### Cuando le pasamos una funcion a nuestro useState es mejor que lo coloquemos sin parentesis

--- de esta forma nos aseguramos que al inicializar el useState por primeraves lo que obtengamos de
--- la funcion solo sea el valor que retorna por cada ves que se llama

```sh
const [todos, setTodos] = useState(crearTodos);
```

### El Hook useEffect [link doc](https://reactnative.dev/docs/intro-react#state)

--- El Hook useEffect es un hook que nos permite ejecutar codigo albitrario cuando se monta
--- el componente y cada vez que las dependencias que le digamos que cambie ejecute de nuevo el hook
--- Hook useEffect se utiliza en el cuerpo d nuestro componente

### useEffect recibe una funcion anonima y dentro lo que querameos ejecutar

--- useEffect se ejecuta siempre despues del renderizado del componente
--- el hook useEffect recibe dos parametros primero el codigo a ejecutar y segundo la lista de dependencias

```sh
   useEffect(codeToExecute, listOfDependencies)
```

--- El useEffect como minimo se ejecutara una vez, porque cuando se monta nuestro componente se ejecuta una vez
--- el segundo parametro es opcional

```sh
  useEffect(() => {
    //funcion
    console.log('Despues de Render');
  }, []);

# En la lista lista de dependencias lo que se le tiene que pasar es un array
# si no ponemos el segundo parametro nuestro hook useEffect se ejecutara cada vez que se renderice el componente
```

--- Cada vez que queramos ejecutar un efecto cuando cambie sierta informacion en nuestra app React utilizamos
--- el hook useEffect
--- podemos tener muchos useEffect en nuestro codigo, como los useState

## AsyncStorage [state doc](https://reactnative.dev/docs/asyncstorage)

--- AsyncStorage es un sistema de almacenamiento de clave-valor persistente, asincrónico y sin cifrar que es global para la aplicación. Se debe utilizar en lugar de LocalStorage.

--- en esta app he usado AsyncStorage para hacer capturar los datos introducidos por el usuario a la hora de hacer el login
--- He sado sistema de autnticacion jwt

```sh
const token = await AsyncStorage.getItem('token');
```

#### configurando iconos

--- segun la documentacion de npm react-native-vector-icons [link doc](https://www.npmjs.com/package/react-native-vector-icons)
--- hay que Edit android/app/build.gradle (NOT android/build.gradle) and add:

```sh
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
```

# Para el backend he usado Nodejs express, mongoose y MongoDB Atlas

```bash
# usar  el siguiente script para correr el servidor
npm run dev
```
