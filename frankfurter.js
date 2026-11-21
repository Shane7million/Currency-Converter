async function getExchangeRate(from, to) {
  if (from === to) {
    return 1;
  }

  const url = `https://api.frankfurter.dev/v2/rate/${from}/${to}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Frankfurter returned HTTP ${response.status}`);
  }

  const data = await response.json();
  return data.rate;
}