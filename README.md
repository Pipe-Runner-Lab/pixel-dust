# Contribution
If you are interested in contributing to this repository, follow the steps to set things up locally.  
We are making use of a [monorepo](https://www.atlassian.com/git/tutorials/monorepos) setup in order to maintain the base library, the bindings and the website.

## 1. Yarn
Contrary to our policy of not using anything that has a default alternative, yarn was mandatory shift from npm. This is because of the fact that yarn has better support from workspaces and npm is yet to catch up with all the features.
> If npm does catch up to yarn as far as workspaces are concerned, we will happily get rid of yarn

To install yarn:
```bash
npm install -g yarn
```

## 2. Lerna
We are using lerna for the following:
- Single point command execution for multiple package. (clean, dev, build)
- Publishing
- CI/CD
- Initial bootstrapping is done using lerna commands but it is not mandatory and you can get away with `yarn install`.

If you don't have lerna installed globally, then you can keep using `npx` to execute it from the registry or from your local installation (which ever it finds first).

Go ahead and execute the following from the project root:
```bash
yarn install
```

> Note: The project is configured to make use of yarn workspaces, so you can install node modules without worrying too much about hoisting. Also, installing modules in the respective packages is the right way to go as it keeps dependencies explicit.  

## Starting development
Once all the needed packages are installed, all you have to do is run the following from the project root:
```bash
yarn dev
```