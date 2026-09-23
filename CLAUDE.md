# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Repository structure

This repo is the deployed static site for khalifaindia.com. The repo root maps
directly to the `site/` folder of the corresponding Claude Design project —
i.e. `index.html` here corresponds to `site/index.html` in the design
project, `about/index.html` to `site/about/index.html`, etc.

## Claude Design import workflow

When the user asks to implement changes from their Claude Design project into
this repository, follow this workflow without stopping for confirmation
between steps:

1. **Import/sync** — use the `DesignSync` tool (`get_project`, `list_files`,
   `get_file`) to pull the latest content for the relevant file(s) from the
   Claude Design project. (Authorization: `/design-login` if not already
   granted in the session.)
2. **Update** — write the synced content into the corresponding file(s) in
   this repo, preserving the repo's existing file layout and paths. Do not
   delete or redesign existing files unless the change explicitly requires
   it — keep edits scoped to what the design update actually changed.
3. **Verify** — confirm the written file matches the design source (e.g. hash
   or diff comparison) and sanity-check the change makes sense in context
   (links, asset paths, etc. still resolve correctly).
4. **git add** the changed file(s) only (avoid broad `git add .` unless
   verified clean).
5. **Commit** with a concise, descriptive message summarizing what changed.
6. **Push** the commit to `origin main`.

After a successful push:
- Report the commit hash.
- State clearly that the changes are pushed to `main` and ready for
  Cloudflare deployment.

This auto-push authorization is scoped specifically to design-import tasks
pulling content from the Claude Design project into this repo. Other
destructive or shared-state git operations (force-push, resetting history,
pushing to other branches/repos) still require explicit confirmation.
