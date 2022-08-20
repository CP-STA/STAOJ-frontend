/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	const problemUrl = `https://raw.githubusercontent.com/CP-STA/contest-problems/main/${params.slug}/statement.json`;
	const problemResponse = await fetch(problemUrl);
	const languageUrl = `https://raw.githubusercontent.com/CP-STA/contest-problems/main/supported-languages.json`;
	const languageResponse = await fetch(languageUrl);
	return { problem: await problemResponse.json(), languages: await languageResponse.json() };
}
