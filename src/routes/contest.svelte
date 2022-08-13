<script context="module">
	export async function load({ fetch }) {
		const url = `https://cdn.jsdelivr.net/gh/CP-STA/contest-problems@main/upcoming-contest.json`;
		const response = await fetch(url);
		const contestSlug = await response.json();
		const contestUrl = `https://cdn.jsdelivr.net/gh/CP-STA/contest-problems@main/contests/${contestSlug}.json`;
		const response2 = await fetch(contestUrl);

		return {
			status: response2.status,
			props: {
				info: response2.ok && (await response2.json())
			}
		};
	}
</script>

<script>
	// @ts-nocheck
	import { time as currentTime } from '$lib/stores';
	import Account from './account.svelte';
	export let info;
	const problems = info.problems;
	function formatDate(dateString) {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	}
	function formatTime(dateString) {
		return new Date(dateString).toLocaleTimeString(undefined);
	}
	$: isAfterStart = new Date(info.info.startTime) <= $currentTime;
	$: isBeforeEnd = $currentTime < new Date(info.info.endTime);
	$: isAvaliable =
		Boolean($currentTime) &&
		new Date(info.info.startTime) <= $currentTime &&
		$currentTime < new Date(info.info.endTime);
</script>

{#if !$currentTime}
	<h1>Loading...</h1>
{:else if isBeforeEnd}
	<h1>{info.info.name}</h1>
	{#if isAvaliable}
		<table class="table">
			<thead>
				<tr>
					<th scope="col">Problem</th>
				</tr>
			</thead>
			<tbody>
				{#each problems as problem}
					<tr>
						<td><a sveltekit:prefetch href="/problems/{problem.slug}">{problem.name}</a></td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<p>
			This contest will begin at {formatTime(info.info.startTime)} and end at {formatTime(
				info.info.endTime
			)} on {formatDate(info.info.startTime)}
		</p>
	{/if}
{:else}
	<h1>No Upcoming Contest</h1>
	<p>There is no currently scheduled contest at the moment. Follow our facebook to stayed tuned.</p>
{/if}

<style>
</style>
