#!/usr/bin/env bash

# Auto-push after each commit in boxingv2.0
# Stages all changes, creates a commit (if there are changes), and pushes to remote.

git add -A
if ! git diff-index --quiet HEAD --; then
  git commit -m "auto: push after edit"
  git push origin master
else
  echo "No changes to commit."
fi
