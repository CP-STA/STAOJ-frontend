<script context="module">
	/** @type {import('./__types/[slug]').Load} */
	export async function load({ params, fetch }) {
		const url = `https://raw.githubusercontent.com/CP-STA/contest-problems/main/${params.slug}/statement.json`;
		const response = await fetch(url);

		return {
			status: response.status,
			props: {
				problem: response.ok && (await response.json())
			}
		};
	}
</script>

<script>
	// @ts-nocheck

	export let problem;
	import { page } from '$app/stores';
	let slug = $page.params.slug;
</script>

<h1 class="text-center">{problem.name}</h1>
<p class="text-center">By {problem.author}</p>
<div class="container">
	<div class="row align-items-start">
		<div class="col text-end">
			Time: {problem.allowedTime} ms
		</div>
		<div class="col text-start">
			Memory: {problem.allowedMemory} kb
		</div>
	</div>
</div>
<h2>Problem Statement</h2>
<p>
	{problem.problemStatement}
</p>
<h2>Constrains</h2>
<p>{problem.constrains}</p>

{#if problem.subtasks}
	{#each problem.subtasks as subtask, i}
		<h3>
			Subtask {i + 1} ({subtask.percentage * 100} %)
		</h3>
		<p>
			{subtask.constrains}
		</p>
	{/each}
{/if}

<h2>Examples</h2>
{#each problem.examples as example}
	<div class="card my-3">
		<div class="card-body">
			<h3>Input</h3>
			<div class="card">
				<div class="card-body">
					<code>{example.input}</code>
				</div>
			</div>
			<h3>Output</h3>
			<div class="card">
				<div class="card-body">
					<code>{example.input}</code>
				</div>
			</div>
		</div>
	</div>
{/each}
