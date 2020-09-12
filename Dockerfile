FROM node:14-alpine as base

# Set necessary environment variables.
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin:/home/node/node_modules/.bin:$PATH
ENV PORT=3000

# Create the working directory, including the node_modules folder for the sake of assigning ownership in the next command
RUN mkdir -p /home/node/app/node_modules

# Change ownership of the working directory to the node:node user:group
# This ensures that npm install can be executed successfully with the correct permissions
RUN chown -R node:node /home/node/app

# Expose API port
EXPOSE ${PORT}

#*********
# * PROD *
#*********
FROM base as production

# Set necessary environment variables.
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set the user to use when running this image
# Non previlage mode for better security (this user comes with official NodeJS image).
USER node

# Set the default working directory for the app
# It is a best practice to use the /usr/src/app directory
WORKDIR /home/node/app

# Copy package.json, package-lock.json
# Copying this separately prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./
COPY --chown=node:node yarn.lock ./

# Install dependencies.
# RUN npm i -g @nestjs/cli
RUN yarn install --prod

# Necessary to run before adding application code to leverage Docker cache
RUN npm cache clean --force
# RUN mv node_modules ../

# Bundle app source
COPY --chown=node:node . ./

# Run the web service on container startup
CMD [ "node", "dist/main" ]

#********
# * DEV *
#********
FROM base as development

# Install make.
RUN apk add --update --no-cache make=4.2.1-r2