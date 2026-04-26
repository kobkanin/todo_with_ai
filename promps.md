# Promps for IDE

This file stores reusable prompts for working in this IDE.

## Keep Prompt (session memory style)

Use this when you want the assistant to keep following stable rules during the whole session.

```text
Keep this prompt for the rest of this session:
- Be concise and practical.
- Before editing, explain what you will change.
- Make small, safe changes.
- After changes, summarize files edited and why.
- If requirements are unclear, ask one short clarifying question.
```

## Quick Coding Prompt

```text
Implement the requested change directly in code.
Run relevant checks if available.
Then report:
1) what changed,
2) why it changed,
3) how to verify.
```

## Bugfix Prompt

```text
Find root cause first, then apply the smallest reliable fix.
Avoid unrelated refactors.
Show exact files touched and a short verification plan.
```

## Command

```text
I’ll create a new promps.md in your workspace with a practical “keep prompt” template you can reuse in this IDE. I’m checking whether the file already exists first, then I’ll add it.
```
