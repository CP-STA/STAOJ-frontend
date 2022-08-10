<script context="module">
	export async function load({ params, fetch }) {
		const url = `https://raw.githubusercontent.com/CP-STA/contest-problems/main/index.json`;
		const response = await fetch(url);

		return {
			status: response.status,
			props: {
				problems: response.ok && (await response.json())
			}
		};
	}
</script>

<script>
	// @ts-nocheck
	export let problems;
	const formatDate = (dateString) => {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};
</script>

<h1>Past Problems</h1>

<table class="table">
	<thead>
		<tr>
			<th scope="col">Problem</th>
			<th scope="col">Date</th>
			<th scope="col">Difficulty</th>
		</tr>
	</thead>
	<tbody>
		{#each problems as problem}
			<tr>
				<td><a sveltekit:prefetch href="/past-problems/{problem.slug}">{problem.name}</a></td>
				<td>{formatDate(new Date(problem.date))}</td>
				<td>{problem.difficulty}</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
</style>
