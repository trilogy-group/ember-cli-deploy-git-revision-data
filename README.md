# ember-cli-deploy-git-revision-data

> An EmberCLI Deploy Plugin to populate the context with git metadata about the
> current revision

This plugin adds info from your git repo to the `context.revisionData` object.
This data can be used to determine a unique revision key or to save info about
the revision such as the committer, branch name, etc.

This plugin will add the following object to the `context.revisionData` property
(properties will only be visible if they are available):

```javascript
{
  git: {
    branch: 'my-branch',
    sha: '1feda252ed5084905eca96aded91365a34a87594',
    abbreviatedSha: '1feda25',
    tag: 'v1.0',
    committer: 'Larry David',
    committerDate: '2016-09-28T13:04:57.598Z',
    author: 'Larry David',
    authorDate: '2016-09-28T13:04:57.598Z',
    commitMessage: 'Initial commit.'
  }
}
```

## What is an ember-cli-deploy plugin?

A plugin is an addon that can be executed as a part of the ember-cli-deploy
pipeline. A plugin will implement one or more of the ember-cli-deploy's pipeline
hooks.

For more information on what plugins are and how they work, please refer to the
[Plugin Documentation][1].

## Quick Start
To get up and running quickly, do the following:

- Install this plugin

```bash
$ ember install ember-cli-deploy-git-revision-data
```

- Run the pipeline

```bash
$ ember deploy production
```

## Installation
Run the following command in your terminal:

```bash
ember install ember-cli-deploy-git-revision-data
```

## ember-cli-deploy Hooks Implemented

For detailed information on what plugin hooks are and how they work, please
refer to the [Plugin Documentation][1].

- `configure`
- `setup`

## Configuration Options

This plugin does not require any custom configuration.

## Prerequisites

This plugin does not have any prerequisites.

## Running Tests

- `npm test`

[1]: http://ember-cli-deploy.com/plugins "Plugin Documentation"
