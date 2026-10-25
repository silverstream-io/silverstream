---
title: "How Do You Trust AI?"
date: 2026-10-27
description: "AI answers with confidence whether it's right or wrong. Here's why that happens, why even AI checking AI falls short, and how ground truth lets you measure what you can actually rely on."
author: "Cory Waddingham"
---

One of the first questions I hear from business owners is some version of: "How do I know it's right?"

It's a great question. AI tools write fluent, confident answers. They sound like they know what they're talking about. And most of the time, they're close. But "most of the time" and "close" aren't good enough when the answer is a customer's invoice, an employee's PTO balance, or a compliance deadline.

The good news is that trust in AI doesn't have to be a leap of faith. You can measure it. To get there, it helps to understand why AI gets things wrong in the first place, and that starts with two terms you'll hear a lot.

## First, two quick definitions

**Tokens.** AI models don't read words the way we do. They break text into small pieces called tokens. A token might be a whole word, part of a word, or a piece of punctuation. As a rule of thumb, 1,000 tokens is roughly 750 words. When someone talks about "token counts," they're talking about how much text is going into or coming out of a model. It's also how most AI services charge for usage.

**Context window.** This is how much text a model can consider at one time, measured in tokens. Think of it as the model's desk. Everything on the desk (your question, any documents you've shared, the conversation so far) is what the model can work with. Anything that isn't on the desk might as well not exist. Desks have gotten much bigger over the past few years, but they still have edges.

## Why AI sounds right even when it's wrong

General-purpose AI models like ChatGPT, Claude, and Gemini learned from enormous amounts of publicly available text: websites, books, articles, forums. That's why they can write a decent email or explain a tax concept.

What they never saw is *your* business. Your prices, your customers, your policies, your inventory, last Tuesday's conversation with a supplier. None of that was in their training.

So when you ask a question that depends on private information, the model does what it was built to do: it produces the most likely-sounding answer based on everything it has seen. Sometimes that's right. Sometimes it's a confident, well-written guess. People call those wrong guesses "hallucinations," and they're hard to spot precisely because they sound so reasonable.

## Can't AI just check its own work?

This is a natural next thought, and the industry has tried it in a couple of ways.

**AI as a judge.** One model writes an answer, and a second model grades it. This catches some obvious errors, like a reply that ignores the question or contradicts itself. But the judge learned from the same kind of public data as the writer. If neither one knows your return policy, the judge has no way of knowing the answer got it wrong. It's a bit like two students who studied from the same textbook grading each other's exams. They'll agree with each other, including on the questions the textbook never covered.

**Reasoning models.** Newer models can "think" step by step before answering, and they're genuinely better at logic, math, and multi-step problems. But more thinking doesn't create new knowledge. A reasoning model working from the wrong facts can build a careful, convincing argument that leads straight to the wrong answer.

## Giving AI your information: RAG and memory

The most common fix is to hand the model the information it's missing.

**RAG** (short for retrieval-augmented generation) means that before the model answers, a system searches your own documents, finds the most relevant pieces, and puts them on the model's desk. Ask about your refund policy, and the actual policy gets pulled in first.

**Memory** works similarly. The AI saves important facts and past conversations and brings them back when they're relevant.

Both make a real difference. They head off a lot of simple mistakes, like quoting the wrong price or inventing a policy that doesn't exist.

But both are still limited by the context window. Only so much fits on the desk, so the system has to choose what to include. If it picks the wrong document, or the right document doesn't fit, the model is back to guessing. And even when everything fits, models can overlook details buried in a long pile of text.

So RAG and memory make AI more accurate. They don't tell you *how* accurate. For that, you need something else.

## Ground truth: your answer key

**Ground truth** is a set of examples where you already know the correct answer, because a person checked it.

Think of it as the answer key for a test. Instead of asking "does this answer sound right?", you run the AI against questions you already have answers to and see how often it matches. If it matches 98% of the time on your examples, you have real evidence. If it matches 70% of the time, you've learned something important before a customer did.

## A real example: reading the mood of support tickets

A while back I worked with a small tech company that wanted to understand how their customers felt. Support tickets came in steadily, and they wanted to know which customers were frustrated, which were confused, and which were happy, without someone having to read every comment.

Asking an AI model "is this customer upset?" would have produced an answer every time. The question was whether those answers could be trusted.

So instead of relying on the model's judgment alone, we started with ground truth. On [Kaggle](https://www.kaggle.com), a site where people share datasets, we found a collection of public posts that human reviewers had already read and labeled with their emotional tone. Real people had decided which posts were angry, which were anxious, which were pleased, and how strongly.

Then we used a technique called **vector embeddings**. An embedding turns a piece of text into a list of numbers that represents its meaning. Texts with similar meanings end up with similar numbers, even if they use completely different words. "This is the third time I've asked" and "Why does nobody respond?" land close together.

For each customer comment, we calculated a similarity score against every post in the labeled dataset. The labeled posts that were most similar told us the likely emotion behind the customer's comment.

The result was grounded in human judgment. Every answer could be explained: "This comment is most similar to these examples, and people rated those examples as frustrated." That's a very different thing from "the AI said so."

## The same idea, at scale

This same approach sits at the heart of how serious teams test AI today.

Evaluation platforms like [LangSmith](https://www.langchain.com/langsmith) and [Braintrust](https://www.braintrust.dev) are built around the same idea. You collect example inputs along with the results a human reviewer has graded as correct. Every time the AI system changes (a new model, a new prompt, new documents), it runs against those examples and gets a score. If the score drops, you know before your customers do.

## What this means for your business

You probably already have more ground truth than you think:

- Invoices your bookkeeper has already checked
- Support emails your best team member wrote
- Orders, tickets, or forms your staff has already categorized
- Past decisions where you know how things turned out

A few dozen good examples is often enough to start measuring. Over time, every correction your team makes can become another example, and your answer key keeps getting better.

AI earns trust the same way a new employee does: by showing, on real work, that it gets the answers right. Ground truth is how you check.

If you need help designing your ground truth, [book a call with us today](/contact).
