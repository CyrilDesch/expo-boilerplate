<div align="center">
  <p></p>
  <h1>Expo Boilerplate</h1>
  <p></p>
  <sup>
    <a href="https://github.com/Cyril-Deschamps/expo-boilerplate/actions">
      <img src="https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2FCyril-Deschamps%2Fexpo-boilerplate%2Fbadge%3Fref%3Dproduction&style=flat" alt="builds" />
    </a>
    <a href="/LICENSE">
      <img src="https://img.shields.io/github/license/Cyril-Deschamps/expo-boilerplate?style=flat-square" alt="license" />
    </a>
  </sup>
  <br />
  <p align="center">
    <a href="#-intro"><b>What is this?</b></a>
    &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
    <a href="#-getting-started"><b>How to use it ?</b></a>
    &nbsp;&nbsp;&mdash;&nbsp;&nbsp;
    <a href="#-further-help"><b>Need help?</b></a>
  </p>
  <br />
</div>

## 👋 Intro

The project is _super_ helpful to kick-start your next project, as it provides a lot of the common tools you may reach for, all ready to go. Specifically :

- **Flux architecture (boilerplate contains example)**
  - Application logic is stored on **services** folder
  - Navgiation is stored on **router** folder
  - UI are stored in **views** and **components** folder (**view** folder follow the routing tree)
- **Flux architecture**
  - [Context](https://reactjs.org/docs/context.html)
  - With a smart Context management
- **Routing and navigation**
  - [React Navigation](https://reactnavigation.org/)
- **Data Caching / Offline**
  - [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- **UI Toolkit/s**
  - [React Native Elements](https://reactnativeelements.com/)
- **Code Linting** with
  - ESLint & Prettier
- **Deployment strategy**
  - Expo & EAS
- **GIT**
  - Husky and Commitizen to format commit message
  - GitHub action to start linter on PR and branches
- **Others**
  - date-fns / react-native-dotenv / axios / required libs of Expo

## 🚀 Getting Started

- Install `eslint` and `prettier` plugins into your IDE
- Create your project with this command :

```bash
# Create Expo project with this template
npx create-expo-app --template @cyril-deschamps/expo-boilerplate
```

- Install Husky

```bash
# Create Expo project with this template
npx husky install
```

## 👊 Further Help?

This repo is a great place to start. But...if you'd prefer to sit back and have your new project built for you or just need some consultation, get in touch with me directly and I can organise a quote
