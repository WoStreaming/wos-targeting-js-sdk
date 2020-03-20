#!/usr/bin/env bash

current_version=$(node -p "require('./package.json').version")
major="false"
minor="false"
patch="false"
prerelease="false"

ask_question() {
  local question=$1
  local answer
  read -rn1 -p "$question (y/n) " answer

  if [ "$answer" == 'y' ]; then
    echo -n "true"
  else
    echo -n "false"
  fi
}

is_major() {
  major=$(ask_question "Does this release introduce breaking / backward incompatible changes from the current version ($current_version)?")
  printf "\n"
}

is_minor() {
  minor=$(ask_question "Does this release introduce *new* backward compatible functionality from the current version ($current_version)?")
  printf "\n"
}

is_patch() {
  patch=$(ask_question "Does this release patch bugs from the current version ($current_version)?")
  printf "\n"
}

is_prerelease() {
  prerelease=$(ask_question "Is this release intended to be a pre-release version?")
  printf "\n"
}

is_prerelease
is_major
if [ "$major" == "false" ]; then
  is_minor
  if [ "$minor" == "false" ]; then
    is_patch
  fi
fi

version_cmd=""
if [ "$major" == "true" ]; then
  version_cmd="major"
elif [ "$minor" == "true" ]; then
  version_cmd="minor"
elif [ "$patch" == "true" ]; then
  version_cmd="patch"
fi

if [ "$prerelease" == "true" ]; then
  if [ -z "$version_cmd" ]; then
    version_cmd="prerelease"
  else
    version_cmd="pre${version_cmd}"
  fi
fi

cmd="npm version $version_cmd"
echo -e "> $cmd\n"
eval "$cmd"
