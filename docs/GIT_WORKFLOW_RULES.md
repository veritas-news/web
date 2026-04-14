# Git Workflow Rules

## Purpose

This document defines the mandatory workflow rules for working on this project and its related repositories.

The goal is to prevent:

- uncommitted local changes
- lost work
- inconsistent submodule states
- code changes that are not traceable
- documentation changes that are not versioned

These rules apply to both:

- the main codebase
- the shared `docs` repository and any submodule usage

---

## Core Rule

**Whenever you make any change to the codebase or to the documentation, that change must be committed.**

This includes:

- source code changes
- configuration changes
- documentation updates
- refactors
- fixes
- new files
- deleted files
- renamed files

Do not leave important work only in an uncommitted local state.

---

## Mandatory Rules

### 1. Every meaningful change must be committed

If you changed something intentionally, commit it.

Examples:

- you updated backend logic
- you changed API behavior
- you added a new endpoint
- you updated architecture docs
- you changed implementation notes
- you fixed typos in important docs
- you added new scripts or tools

These must not remain uncommitted.

---

### 2. Code changes and documentation changes are equally important

Documentation is part of the project.

Changes to docs must be treated the same way as code changes:

- edit
- review
- commit
- push

Do not treat documentation as temporary or optional work.

---

### 3. Do not leave repositories in a dirty state

Before stopping work, switching branches, rebasing, pulling, or handing work over, check:

```bash
git status
````

A clean working tree is expected unless there is a deliberate reason not to commit yet.

Preferred state:

```bash
nothing to commit, working tree clean
```

---

### 4. Commit inside the correct repository

If a folder is a separate Git repository or submodule, changes must be committed **inside that repository**.

For example, if `docs` is a submodule:

* changes in `docs/` must be committed in the `docs` repo first
* then the parent repository must commit the updated submodule pointer

---

### 5. Never rely on uncommitted work as the source of truth

Uncommitted changes can be:

* lost
* overwritten
* reset accidentally
* ignored by other collaborators
* invisible in review history

The repository history must be the source of truth.

---

## Rules for the `docs` Repository

If `docs` is used as a standalone repository or as a submodule, the workflow is:

### Step 1: Commit the documentation change in `docs`

```bash
cd docs
git status
git add .
git commit -m "docs: update buying flow documentation"
git push
```

### Step 2: If `docs` is used as a submodule, commit the updated pointer in the parent repo

```bash
cd ..
git add docs
git commit -m "chore: update docs submodule reference"
git push
```

### Important

Committing only in the parent repository is **not enough** if the actual file changes inside `docs` were not committed first.

---

## Rules for the Main Codebase

Whenever you modify the codebase:

```bash
git status
git add .
git commit -m "feat: add vehicle inspection workflow"
git push
```

Examples of commit-worthy changes:

* backend logic updates
* database migrations
* API contract changes
* frontend UI changes
* tooling or script updates
* configuration updates
* test updates

---

## Required Workflow Before Ending a Work Session

Before you stop working, you must do all of the following:

### 1. Check repository state

```bash
git status
```

### 2. Commit all intentional changes

```bash
git add .
git commit -m "..."
```

### 3. Push committed changes

```bash
git push
```

### 4. If submodules were changed, update and commit parent repo pointers

```bash
git add <submodule-path>
git commit -m "chore: update submodule reference"
git push
```

---

## Commit Message Guidance

Use clear commit messages.

Recommended prefixes:

* `feat:` for new functionality
* `fix:` for bug fixes
* `docs:` for documentation changes
* `refactor:` for internal restructuring
* `chore:` for maintenance or repo-state updates
* `test:` for test-related changes

Examples:

```bash
docs: clarify submodule workflow
fix: handle nil seller rating in listing analyzer
feat: add final inspection recommendation endpoint
chore: update docs submodule reference
refactor: split buying flow service into stages
```

---

## Submodule Rule Summary

If a submodule is changed, there are always two Git layers:

### Layer 1: submodule repository

Commit the actual file changes there.

### Layer 2: parent repository

Commit the new submodule commit reference there.

### Example

```bash
cd backend/docs
git add .
git commit -m "docs: update architecture notes"
git push

cd ..
git add docs
git commit -m "chore: update docs submodule reference"
git push
```

---

## Things That Are Not Allowed

The following are not acceptable as normal workflow:

* making important changes and leaving them uncommitted
* changing docs without versioning them
* changing code without committing it
* committing parent repo submodule pointer changes without committing the real submodule content first
* handing work off while `git status` is dirty without explanation
* relying on memory instead of repository history

---

## Recommended Daily Practice

Use this checklist every time you finish a task:

* Did I change code?
* Did I change docs?
* Did I change a submodule?
* Did I commit in the correct repo?
* Did I push the commit?
* Is `git status` clean?

If the answer is not yes to all relevant items, finish the workflow before moving on.

---

## Minimal Working Rule

If you changed something intentionally, commit it.

That applies to:

* code
* docs
* submodules
* scripts
* configs
* architecture notes

No important project change should live only on a local machine.
