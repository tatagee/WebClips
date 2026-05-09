---
title: "Closing the knowledge gap with agent skills"
source: "https://developers.googleblog.com/closing-the-knowledge-gap-with-agent-skills/"
category: "[ADK_Agent_Skills]"
clipped_at: "2026-04-04"
tags: ["adk-agent-skills"]
status: "distilled"
compiled: true
---
MARCH 25, 2026

[Philipp Schmid](https://developers.googleblog.com/search/?author=Philipp+Schmid) Developer Relations Engineer

[Mark McDonald](https://developers.googleblog.com/search/?author=Mark+McDonald) Developer Relations Engineer

![Gemini API Skills Banner v2](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/Gemini_API_Skills_Banner_v2.original.png)

Large language models (LLMs) have fixed knowledge, being trained at a specific point in time. Software engineering practices are fast paced and change often, where new libraries are launched every day and best practices evolve quickly.

This leaves a knowledge gap that language models can't solve on their own. At Google DeepMind we see this in a few ways: our models don't know about themselves when they're trained, and they aren't necessarily aware of subtle changes in best practices (like [thought circulation](https://ai.google.dev/gemini-api/docs/thinking#signatures)) or SDK changes.

Many solutions exist, from web search tools to dedicated MCP services, but more recently, [agent skills](https://agentskills.io/) have surfaced as an extremely lightweight but potentially effective way to close this gap.

While there are strategies that we, as model builders, can implement, we wanted to explore what is possible for any SDK maintainer. Read on for what we did to build the [Gemini API developer skill](https://github.com/google-gemini/gemini-skills/) and the results it had on performance.

### What we built

To help coding agents building with the Gemini API, we built a skill that:

- explains the high-level feature set of the API,
- describes the current models and SDKs for each language,
- demonstrates basic sample code for each SDK, and
- lists the documentation entry points (as sources of truth).

This is a basic set of primitive instructions that guide an agent towards using our latest models and SDKs, but importantly also refers to the documentation to encourage retrieving fresh information from the source of truth.

The skill is available on [GitHub](https://github.com/google-gemini/gemini-skills/) or install it directly into your project with:

```shell
# Install with Vercel skills
npx skills add google-gemini/gemini-skills --skill gemini-api-dev --global

# Install with Context7 skills
npx ctx7 skills install /google-gemini/gemini-skills gemini-api-dev
```

### Skill tester

We created an evaluation harness with 117 prompts that generate Python or TypeScript code using the Gemini SDKs that are used to evaluate skill performance.

The prompts evaluate across different categories, including agentic coding tasks, building chatbots, document processing, streaming content and a number of specific SDK features.

We ran these tests both in "vanilla" mode (directly prompting the model) and with the skill enabled. To enable the skill, the model is given the [same system instruction](https://github.com/google-gemini/gemini-cli/blob/bb7bb11736c363f3368a61f4bc4557ab8bb660a2/packages/core/src/prompts/snippets.ts#L213-L233) that the Gemini CLI uses, and two tools: `activate_skill` and `fetch_url` (for downloading the docs).

A prompt is considered a failure if it uses one of our old SDKs.

### Skills work, but they need reasoning

The top-line results:

![Gemini API Skill Benchmark - Model](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/Gemini_API_Skill_Benchmark_-_Model.original.png)

- The latest Gemini 3 series of models achieve excellent results with the addition of the `gemini-api-dev` skill, notably coming from a low baseline without it (6.8% for both 3.0 Pro and Flash, 28% for 3.1 Pro).
- The older 2.5 series of models also benefit, but nowhere near as much. Using modern models with strong reasoning support makes a difference.

### All categories performed well

Adding the skill was effective across almost all domains for the top-performing model (`gemini-3.1-pro-preview`).

![Gemini API Skill Benchmark - Domain](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/Gemini_API_Skill_Benchmark_-_Domain.original.png)

*SDK Usage* had the lowest pass rate, at 95%. There is no stand-out reason for this; the failed prompts cover a range of tasks that include some difficult or unclear requests, but notably they include prompts that explicitly request Gemini 2.0 models.

  
Here's an example from the *SDK usage* category that failed across all models.

> <sup>When I use the Python api with the gemini 2.0 flash model, and when the output is quite long, the returned content will be an array of output chunks instead of the whole thing. i guess it was doing some kind of streaming type of input. how to turn this off and get the whole output together</sup>

### Skill issues

These initial results are quite encouraging, but we know from [Vercel's work](https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals) that direct instruction through `AGENTS.md` can be more effective than using skills, so we are exploring other ways to supply live knowledge of SDKs, such as directly using MCPs for documentation.

Skill simplicity is a huge benefit, but right now there isn't a great skill update story, other than requiring users to update manually. In the long term this could leave old skill information in user's workspaces, doing more harm than good.

Despite these minor issues we’re still excited to start using skills in our workflows. The Gemini API skill is still fairly new, but we’re keeping it maintained as we push model updates, and we will be exploring different avenues for improving it. Follow [Mark](https://x.com/m4rkmc) and [Phil](https://x.com/_philschmid) for updates as we tune the skill, and don’t forget to [try it out](https://github.com/google-gemini/gemini-skills/) and [let us know](https://github.com/google-gemini/gemini-skills/issues) your feedback!