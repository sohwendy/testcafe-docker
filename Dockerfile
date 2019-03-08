# use testcafe base image
FROM testcafe/testcafe:1.1.0

# set the working dir - path is defined in testcafe
WORKDIR /tests

# use root as user does not have enough permission
USER root

# Set the time zone
ENV TZ=Asia/Singapore
RUN apk add tzdata
RUN echo "Asia/Singapore" > /etc/timezone

# switch back to user
USER user

COPY . /tests/

CMD ["chromium --no-sandbox", "test/external.js", "-s", "results"]
