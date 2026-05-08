# Duri

## Register

**brand** — this surface (the public landing) is marketing/identity work. The desktop app is the product register.

## Product purpose

Duri is an AI workspace that learns and runs the back-office of a small or mid-sized business. The user types what they need in plain English ("create a QuickBooks invoice from new Shopify orders and update inventory"); Duri figures out how, executes across live browsers, APIs, and a code sandbox, asks for clarification when uncertain, and encodes what it learns into the company's operational playbook so the next run is faster and more autonomous.

Duri replaces the daily flow that would otherwise live in Zapier graphs, hired developers, copy-pasting between tabs, or shared spreadsheets. It is delivered as a desktop app (Electron + React) backed by a Python agent that orchestrates LangGraph, browser automation, and direct integrations.

## Users

**Primary**: non-technical operators at small and mid-sized businesses (4 to 50 employees). Office managers, ops leads, accountants, store managers, customer-success people. Specifically:

- Multi-location operators of consumer businesses (cafés, shops, restaurants) running daily ops across accounting, inventory, payroll, and customer comms.
- Logistics dispatchers and ops people coordinating schedules, invoicing, and vendor work across spreadsheets, accounting, and email.
- Retail and e-commerce operators connecting orders, accounting, inventory, and customer touchpoints.

**Their state of mind on the landing page**: skeptical and tired. They have been burned by graph-builder automation tools, by AI tools that look smart but break in production, and by developers who quoted high and shipped late. They are not impressed by AI per se. They want a workspace they can speak to and a reason to trust it will keep working tomorrow.

**Secondary** (read but rarely the buyer): the SMB owner who signs the check, and the IT-adjacent person at a slightly larger SMB who vets tools.

**Public-facing rule**: do not name specific customers, partners, or competitor products on marketing surfaces. Reference categories ("graph workflows," "pipelines," "contract developers") instead of brand names. Customer names appear only in private demos, decks, and references.

## Brand voice

Confident, plainspoken, structural. Not chirpy SaaS optimism, not academic AI explainer. Closer to how a competent operator talks: short sentences, specific verbs, real numbers, no hedging.

- **Yes**: "It updates QuickBooks. It tells you what it changed. It remembers next time."
- **No**: "Empower your operations team to unlock unprecedented productivity gains."
- **No** em dashes anywhere in copy.
- Avoid the word "seamlessly." Avoid "leverage." Avoid "supercharge."

## Anchor references (named)

- **Linear**: structural confidence, type rhythm, a single committed brand color, restraint in motion, no decorative flourish.
- **Plaid (early-2020s)**: sober-credible for finance-adjacent SMB buyers; lets imagery and integration logos do the trust work.
- **Notion (mid era)**: clarity for non-technical readers; explanations that respect the reader's intelligence without assuming engineering vocabulary.

**Anti-references** (must not look like):
- **Stripe-cream + italic display serif + ruled separators** (the editorial-typographic trap that every AI-tool brand has landed in by 2026).
- **Navy + gold corporate B2B** (IBM-/Salesforce-adjacent staid).
- **Neon-green-on-black "AI" cyber** (the first-order training reflex for "AI workflow tool").
- **Glassmorphic dashboard mockup hero** with gradient text and three icon-and-heading feature cards.
- **Graph-builder technicolor automation tools** with multi-coloured zigzags and node trees.

## Visual DNA already shipped

This is the existing identity to extend, not replace:

- **Color**: green primary `#00a86b`, deeper variant `#009760`, foreground forest `#003220` for type, divider warm-grey `#e6e4e2`, single highlight purple `#8f00ff` reserved for sparing accent. Background white tinted toward warmth.
- **Type**: Inter Variable, single family, weight contrast carries hierarchy.
- **Geometry**: sharp corners (`rounded-xs` only), full 1px borders on all sides of frames (no side-stripes), boxy structural composition.
- **Motif**: the offset-triangle indicator (a small triangle that sits beside an active label). The "d" mark is a curved drop/leaf shape suggesting both a "d" and growth.
- **Logo**: lowercase "duri" wordmark, calm.

## Product surface (the thing being sold)

The desktop app's New Chat view greets the user with: *"What can I __automate__ for you?"* with `automate` in primary green. The composer accepts plain text, file attachments, and recorded browser demos. Once the user describes work, Duri:

1. Plans the steps and shows them.
2. Asks for any missing connections (OAuth into QuickBooks, Shopify, Google Workspace, M365, Airtable, Extensiv, Clover, etc.).
3. Executes across live browsers (visible to the user), API calls, and a Python code sandbox.
4. Pauses to ask the user when uncertain rather than guessing.
5. Saves the run as a reusable skill that can be scheduled or re-triggered.

**Integrations live or in active development**: M365, Google Workspace, Shopify, QuickBooks Online, Airtable, Extensiv, Clover, Gmail, Excel, Google Sheets. Pipeline: Slack, Notion, Mailchimp, Jira.

## Strategic principles for brand surfaces

- **Position as the AI workspace a company runs on**, not as another automation tool. The big idea: the workspace makes the business itself queryable, runnable, and schedulable in plain language. This is how a company introduces AI as foundation, not as a feature.
- **Show, don't claim.** The hero must show one realistic operation as it would appear inside the actual desktop app, not a generic mock.
- **Name the buyer's reality**, not the technology stack. Reference how the work happens today (manual, wired graphs, hired developers) and what changes (one conversation, instant or scheduled, a workspace that adapts).
- **Treat learning and adaptation as a first-class concept**, not a footnote. The system itself adapts to the shape of the business; this is what separates a workspace from one-shot automation.
- **No technical jargon on the landing.** Avoid "OAuth," "webhooks," "API keys," "schemas," "endpoints." Avoid "browser automation" as a category claim; "operates the screens your team works in" is the user-language version.
- **Avoid framing tools as a cost the buyer is locked into** ("the tools you already pay for"). Use neutral framing: "the systems your team works in," "the tools your operations live in." Same idea, no implied dependency.
- **The buyer is not a developer.** No code samples on marketing pages. No "copy this prompt." No cURL.

## Pricing (current, public-facing)

- Per-user, per-month, USD billed CAD at parity. Currently CAD 25/user/month for the Solo plan. Business plan (org features) priced on demo.
- No free tier on the marketing site at this stage (request-a-demo gate is intentional while the product is invitation-only).

## Out of scope for the landing surface

- Detailed pricing pages.
- Documentation or developer references.
- Login flow (the app handles auth post-download).
- Anything that pretends Duri is generally available without a demo (it is not yet).
