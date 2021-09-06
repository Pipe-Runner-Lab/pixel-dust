# Pixel-Dust
[![Netlify Status](https://api.netlify.com/api/v1/badges/9e59fd98-662d-489d-ae72-0ce0f7a19ca3/deploy-status)](https://app.netlify.com/sites/pixel-dust/deploys)

## Contribution
If you are interested in contributing to this repository, follow the steps to set things up locally.  
We are making use of a [monorepo](https://www.atlassian.com/git/tutorials/monorepos) setup in order to maintain the base library, the bindings and the website.

### 1. NPM Workspaces
We are making use of [workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) in order to manages dependencies and enhance local development ease. In order to make use of **npm workspaces** you need to make sure that npm has a version of **7 or above**.  
If you have a version that satisfies the requirement then there is nothing to be done in this step, else run the following command to get the latest version of npm.
```bash
npm install -g npm@latest
```

### 2. Lerna
We are using lerna for the following:
- Single point command execution for multiple package. (clean, dev, build)
- Publishing
- CI/CD
- Initial bootstrapping is done using lerna which includes installation and local package linking. This is a very important step and needs to be done only once. Subsequent package installations can be done using `npm install` only.

If you don't have lerna installed globally, then you can keep using `npx` to execute it from the registry or from your local installation (whichever it finds first).

Go ahead and execute the following from the project root:
```bash
npm run bootstrap
```
This command will install, link local dependencies and will do an instal build of required packages in order to make sure development bundlers on watch mode end up having the required dependencies as topology is hard to maintain during parallel execution. [#1444](/home/humble_d/.npm/_logs/2021-09-06T19_13_19_598Z-debug.log)
> Note: The project is configured to make use of yarn workspaces, so you can install node modules without worrying too much about hoisting. Also, installing modules in the respective packages is the right way to go as it keeps dependencies explicit.  

### Starting development
Once all the needed packages are installed, all you have to do is run the following from the project root:
```bash
npm run dev
```