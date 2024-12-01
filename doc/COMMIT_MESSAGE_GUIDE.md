# 🐉 Dominant Color Detector - Commit Message Guidelines

## Commit Message Structure

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

## Types of Changes

### 1. Feature Types
- `feat`: New feature or enhancement
- `fix`: Bug fix
- `docs`: Documentation updates
- `style`: Code formatting, missing semi-colons
- `refactor`: Code restructuring without changing functionality
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks, dependency updates

## Scope Examples
- `frontend`: React component changes
- `backend`: Flask server modifications
- `ui`: User interface updates
- `color-algo`: Color extraction algorithm
- `deps`: Dependency-related changes
- `config`: Configuration file updates

## Commit Message Examples

### 1. Feature Addition
```
feat(frontend): add image upload validation

- Implement file type checking
- Add error messages for invalid uploads
- Enhance user feedback mechanism
```

### 2. Bug Fix
```
fix(backend): resolve color extraction edge case

- Handle images with transparent backgrounds
- Improve color detection for low-contrast images
- Add error logging for problematic image processing
```

### 3. Documentation Update
```
docs(readme): update system design documentation

- Add architecture diagrams
- Clarify installation instructions
- Include contribution guidelines
```

### 4. Refactoring
```
refactor(color-algo): optimize dominant color extraction

- Simplify resize and pixel extraction logic
- Improve performance for large images
- Remove redundant type conversions
```

## Commit Message Best Practices

### Do's
- Use imperative mood
- Capitalize first letter
- No period at the end of subject line
- Explain "what" and "why", not "how"
- Keep subject line under 50 characters
- Use body to provide detailed context

### Don'ts
- Avoid vague messages like "fix stuff"
- Don't mix multiple types of changes
- Avoid commit messages without context

## Conventional Commits Compatibility

This template follows the [Conventional Commits](https://www.conventionalcommits.org/) specification, enabling:
- Automatic changelog generation
- Semantic versioning
- Easier code review

## Commit Message Template

```
# [Type]([Scope]): [Brief Description]

# What was done and why:
# - 

# Related issues (optional):
# Fixes #123
# Ref #456
```

## Git Commit Template Setup

```bash
# Create a global commit template
git config --global commit.template ~/.gitmessage

# Create the template file
touch ~/.gitmessage
```

## Commit Signature and Identity

```bash
# Configure name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Optional: Sign commits with GPG
git config --global commit.gpgsign true
```