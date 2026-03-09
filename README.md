<br/>
<div align="center">
  <img src="./public/readme-hero-image.jpeg" alt="Varant Engine Landing" width="100%" style="border-radius: 8px; margin-bottom: 2rem;" />
</div>

# Varant

> The ancient council. For modern bets.

Varant is a computational decisioning engine. It maps the 2,500-year-old Indian intellectual tradition of deliberate, structured judgment (Nyaya Shastra, Arthashastra) onto modern computing primitives. It is designed for founders making irreversible bets.

We do not optimize for the objective answer. We optimize for the decision-making process.

## Architecture

Varant operates via a multi-agent closed-loop heuristic system called the **Sabha**:

* **Vitarka (Node_01):** Pure Logic. Deliberate counter-reasoning mapping exact mechanical risks.
* **Asha (Node_02):** Upside Theory. Calculates mathematical upper-bound success potential.
* **Yukti (Node_03):** Practical Vector. Applied wisdom constrained by real-world resources.
* **Vipaksha (Node_04):** The Opposition. Adversarial reframing of the foundational premise.

These heuristics deliberate across a 3-round protocol (Pratham Paksha, Khandana, Nirnaya), generating an unalterable narrative ledger of your decision (The Shastra).

## System Requirements

* Node.js 18.17+
* OpenRouter API Key (for LLM routing)
* macOS, Linux, or Windows (WSL2)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yashpanchalhq/varant.git
cd varant
npm install
```

## Configuration

Varant requires specific environment variables to interface with the LLM routing layer. Duplicate the environment template:

```bash
cp .env.example .env.local
```

Required variables:
```env
OPENROUTER_API_KEY="sk-or-v1-..."
```

## Initialization

Start the local engine:

```bash
npm run dev
```

The system will mount at `http://localhost:3000`. 
To bypass the landing overview and directly access the engine interface, navigate to `http://localhost:3000/demo`.

## Data Privacy & Telemetry

Varant is designed for existential business decisions. 
* All session data (Smriti) currently remains localized to your instance.
* We do not capture telemetry during the Sabha deliberation phase.
* LLM provider retention policies apply according to your OpenRouter configuration. Use zero-retention models for sensitive data.

## License

Copyright © 2026 Varant. All rights reserved.
Built in India.
