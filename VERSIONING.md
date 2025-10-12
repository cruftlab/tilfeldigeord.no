# Automated Version Bumping

This project uses [release-please](https://github.com/googleapis/release-please) to automatically manage versioning and releases.

## How It Works

When you merge a pull request to the `main` branch:

1. **release-please** analyzes your commit messages
2. It determines the version bump type based on [Conventional Commits](https://www.conventionalcommits.org/)
3. It creates/updates a "Release PR" with:
   - Updated version in `package.json`
   - Generated CHANGELOG
   - Release notes
4. When you merge the Release PR, it creates a GitHub release with a git tag

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

You can also use labels on pull requests:
- `release-as: patch` - Force a patch release
- `release-as: minor` - Force a minor release
- `release-as: major` - Force a major release

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
3. release-please will create/update a "Release PR"
4. Review the Release PR (check version bump, changelog)
5. Merge the Release PR when ready to release
6. A GitHub release and tag will be created automatically

## Why release-please?

We chose release-please over other alternatives for several reasons:

### Alternatives Considered

1. **automated-version-bump** (originally suggested)
   - ❌ Limited commit message parsing
   - ❌ Less flexible versioning control
   - ❌ Doesn't generate changelogs
   - ❌ Smaller community and maintenance

2. **semantic-release**
   - ✅ Very powerful and flexible
   - ❌ Complex configuration
   - ❌ Opinionated defaults that may not fit all projects
   - ❌ Automatic releases (can't review before release)

3. **release-please** (chosen approach)
   - ✅ Simple setup with minimal configuration
   - ✅ Creates a reviewable Release PR before releasing
   - ✅ Automatic changelog generation
   - ✅ Supports conventional commits out of the box
   - ✅ Maintained by Google with large community
   - ✅ Language-specific support (updates package.json automatically)
   - ✅ Flexible: supports both commit message and PR label approaches
   - ✅ No automatic releases - you control when to release by merging the Release PR

### Key Advantages

- **Review before release**: Unlike semantic-release, you can review the version bump and changelog before it's released
- **Conventional commits**: Native support for the standard commit message format
- **Automatic changelog**: Generates beautiful changelogs from commit messages
- **Flexibility**: Supports multiple ways to control versioning (commits, labels)
- **Maintained**: Actively maintained by Google with excellent documentation
- **Package.json integration**: Automatically updates version in package.json

## Troubleshooting

### Release PR not created
- Check that commits follow conventional commit format
- Ensure commits are on the `main` branch
- Check GitHub Actions logs for errors

### Wrong version bump
- Review your commit messages
- Use `!` or `BREAKING CHANGE:` for major versions
- Use PR labels to override automatic detection

### Multiple commits
release-please analyzes all commits since the last release. If you have:
- 3 fix commits + 1 feat commit → Minor version bump (0.X.0)
- 2 feat commits + 1 breaking change → Major version bump (X.0.0)

## References

- [release-please documentation](https://github.com/googleapis/release-please)
- [Conventional Commits specification](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
