# Automated Version Bumping

This project uses [semantic-release](https://github.com/semantic-release/semantic-release) to automatically manage versioning and releases.

## How It Works

When you merge a pull request to the `main` branch:

1. **semantic-release** analyzes your commit messages using [Conventional Commits](https://www.conventionalcommits.org/)
2. It determines the version bump type and automatically:
   - Updates `package.json` and `package-lock.json` with the new version
   - Creates a GitHub release
   - Creates a git tag
   - Commits the changes back to main with `[skip ci]` to avoid infinite loops

**No manual PR review needed** - The automation only modifies version-related files (`package.json`, `package-lock.json`), providing safety while automating releases.

## Commit Message Format

Use conventional commit prefixes to control version bumping:

### Patch Version (0.0.X)
```
fix: correct word generation bug
chore: update dependencies
docs: fix typo in README
```

### Minor Version (0.X.0)
```
feat: add new word category
feat: improve statistics page
```

### Major Version (X.0.0)

Option 1 - Breaking change footer:
```
feat: redesign API

BREAKING CHANGE: The word generation API has changed
```

Option 2 - Exclamation mark:
```
feat!: redesign API
fix!: change word combination logic
```

## Using PR Labels

You can also use labels on pull requests to override version detection:
- `release` - Force a release even if commits don't trigger one
- `skip-release` - Skip release even if commits would normally trigger one

Note: Unlike release-please, semantic-release determines version bumps purely from commit messages, not PR labels.

## Examples

### Example 1: Bug Fix
```bash
git commit -m "fix: resolve duplicate word generation"
```
→ Bumps from 0.3.1 to 0.3.2

### Example 2: New Feature
```bash
git commit -m "feat: add word favoriting functionality"
```
→ Bumps from 0.3.1 to 0.4.0

### Example 3: Breaking Change
```bash
git commit -m "feat!: change word data format

BREAKING CHANGE: Word data is now stored in YAML format instead of JSON"
```
→ Bumps from 0.3.1 to 1.0.0

## Workflow

1. Make your changes and commit using conventional commit messages
2. Open and merge your PR to `main`
3. semantic-release automatically:
   - Determines version bump from commits
   - Updates package.json and package-lock.json
   - Creates GitHub release and tag
   - Commits changes back to main
4. **No manual review required** - Release happens automatically!

## Why semantic-release?

We chose semantic-release over other alternatives for several reasons:

### Alternatives Considered

1. **automated-version-bump** (originally suggested)
   - ❌ Limited commit message parsing
   - ❌ Less flexible versioning control
   - ❌ Doesn't generate changelogs
   - ❌ Smaller community and maintenance

2. **release-please** (initially implemented)
   - ✅ Simple setup with minimal configuration
   - ✅ Automatic changelog generation
   - ✅ Maintained by Google with large community
   - ❌ Creates a Release PR that requires manual review/merge
   - ❌ Two-step process (merge PR, then merge Release PR)

3. **semantic-release** (chosen approach)
   - ✅ Fully automatic releases - no manual review needed
   - ✅ Fully automatic releases - no manual review needed
   - ✅ Highly configurable and extensible
   - ✅ Large community with many plugins
   - ✅ Supports conventional commits out of the box
   - ✅ **Limited scope** - Only modifies version files (package.json, package-lock.json)
   - ✅ Commits changes back with `[skip ci]` to avoid infinite loops

### Key Advantages

- **No manual review needed**: Automatically releases after PR merge - saves time
- **Limited file modifications**: Only updates version-related files, providing safety
- **Conventional commits**: Native support for the standard commit message format
- **Configurable**: Extensive plugin ecosystem for customization
- **Safe automation**: Only modifies package.json and package-lock.json
- **Maintained**: Actively maintained by Google with excellent documentation
- **Package.json integration**: Automatically updates version in package.json

## Troubleshooting

### Release not created
- Check that commits follow conventional commit format
- Ensure commits are on the `main` branch
- Check GitHub Actions logs for errors
- Verify semantic-release ran (check commit history for `chore(release):` commits)

### Wrong version bump
- Review your commit messages
- Use `!` or `BREAKING CHANGE:` for major versions
- Check the CHANGELOG.md to see what was detected

### Multiple commits
semantic-release analyzes all commits since the last release. If you have:
- 3 fix commits + 1 feat commit → Minor version bump (0.X.0)
- 2 feat commits + 1 breaking change → Major version bump (X.0.0)

### Avoiding infinite loops
semantic-release commits changes with `[skip ci]` in the message, which prevents the workflow from running again on the release commit.

## References

- [semantic-release documentation](https://github.com/semantic-release/semantic-release)
- [Conventional Commits specification](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
