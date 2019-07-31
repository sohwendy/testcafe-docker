# testcafe-docker

[![forthebadge](https://forthebadge.com/images/badges/powered-by-responsibility.svg)](https://github.com/sohwendy)
[![forthebadge](https://forthebadge.com/images/badges/check-it-out.svg)](https://github.com/sohwendy/testcafe-docker)

> For beginners who want to run [testcafe](https://devexpress.github.io/testcafe/) on docker

## Overview

As a beginner in testcafe, docker and linux commands, I wasnt able to understand how to utilise Testcafe's offical docker image using its [documentation](https://devexpress.github.io/testcafe/documentation/using-testcafe/using-testcafe-docker-image.html)

This repo documents my learning journey.

Hope this will be useful to someone. Enjoy!  

## Prerequisites
docker, node, testcafe, chrome, firefox

## Setup

Installation
``` setup
git clone XXX
cd testcafe-docker
npm install
 
```

To verify setup is successful, run these tests. Tests should pass

```
npm run testi
npm run teste
```

testi - loads a static page and takes a screenshot
teste - loads testcafe homepage and takes a screenshot


## Option 1: Using Testcafe Docker Image


cd to testcafe-docker folder.

```
docker pull testcafe/testcafe:1.4.0-rc.1
```

With Chromium
```
# run internal.js
docker run -v `pwd`:/tests -it testcafe/testcafe:1.1.0 'chromium:headless --no-sandbox' /tests/test/internal.js -s tests/results

# run external.js
docker run -v `pwd`:/tests -it testcafe/testcafe:1.1.0 'chromium:headless --no-sandbox' /tests/test/external.js -s tests/results
```

With Firefox
```
# run internal.js
docker run -v `pwd`:/tests -it testcafe/testcafe:1.1.0 firefox /tests/test/internal.js -s tests/results

# run external.js
docker run -v `pwd`:/tests -it testcafe/testcafe:1.1.0 firefox /tests/test/external.js -s tests/results
```

```
docker run -v ${HOST_TEST_FOLDER}:/${CONTAINER_TEST_FOLDER} -it testcafe/testcafe:1.1.0 ${TESTCAFE_ARGS}
```

* `-v ${HOST_TEST_FOLDER}:/${CONTAINER_TEST_FOLDER}` maps the host's test folder to container test folder.  
in this case, host's current working dir, pwd, is mapped to container's /tests dolder.
* in docker, browsers run in headless mode
* `${TESTCAFE_ARGS}` are arguments passed to container's testcafe cmd.  
In this case, its `firefox /tests/test/external.js -s tests/results`

## Option 2: Customising on top of Testcafe docker image
Create a Dockerfile and .dockerignore

```
docker build -t me/testcafe-docker:latest .
docker run -v `pwd`/screenshots:/tests/results -it me/testcafe-docker:latest
```

* maps host's `screenshots` folder to container's `test\results` so that you can review the output of the tests

## Comparisons

### Option 1 vs Option 2 

#### Option 1 
- Docker configuration is transparent to user, no learning curve required.
- Dependent on testcafe official image changes 

#### Option 2
- Type less words, reduce cognitive load
- Customise timezone display =)
- Inflexible. Browser is fixed, test is fixed.
- Overhead to build the image if tests changes

### Potential Options? 

#### Option 3 - Build own image instead of relying on testcafe image.
- Full flexibility of customising the commands

#### Option 4 - Use docker-compose 
- Flexibility configure the options eg running in firefox, chrome or both, the tests to run, without incurring overheads on building the image (Option2) 


## Misc
1. Docker housekeeping, add `--rm` (`docker run --rm -v ...`) to remove docker container after tests end. takes up less disk space.
2. Runs `docker image prune` and `docker containers prune` regularly to delete old images & container to reclaim back precious disk space
3. add `-r teamcity` testcafe-cli to generate teamcity compatible report 
