#!/bin/bash
#
# Therapease Setup Script
#
function missing_dep {
  local cmd=${1}
  return type ${cmd} >/dev/null 2>&1
}
function p {
  echo ${1};
}

alias jake="jake --jakefile source/scripts/jake/Jakefile"

# Local environment setup
p "Setting up your development environment..."


# Homebrew installation
p "Checking for homebrew."
if missing_dep "brew"; then
  # Install Homebrew
  p "Homebrew not found, installing."
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
fi
p "Done! Using $(brew --version)"


# Node.js installation
p "Checking for node."
if missing_dep "node"; then
  p "Node.js not found, installing node via homebrew."
  brew install node
fi
p "Done! Using Node.js version: $(node --version)"


# Jake installation
p "Checking for Jake. (the javascript Rake/Make/Cmake)"
if missing_dep "jake"; then
  p "Jake not found, installing jake (globally, sorry!) via npm."
  npm install jake
  npm install jake --global
  p "installing some command line tools."
  npm install shelljs
fi
p "Done! Using jake version: $(jake --version)"

p "Listing available tasks:"

p "If you see a list of commands, you're all set! otherwise email johnnymsparks@gmail.com"
