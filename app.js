const form = document.querySelector("#converter-form");
const amountInput = document.querySelector("#amount");
const fromSelect = document.querySelector("#from");
const toSelect = document.querySelector("#to");
const result = document.querySelector("#result");
const convertButton = form.querySelector('button[type="submit"]');

const currencies = {
  EUR: "Euro",
  USD: "US Dollar",
  GBP: "British Pound",
  CAD: "Canadian Dollar",
  JPY: "Japanese Yen",
  THB: "Thai Baht",
  KRW: "South Korean Won",
  CNY: "Chinese Yuan"
};

for (const [code, name] of Object.entries(currencies)) {
  fromSelect.add(new Option(`${code} — ${name}`, code));
  toSelect.add(new Option(`${code} — ${name}`, code));
}

fromSelect.value = "EUR";
toSelect.value = "USD";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const amount = amountInput.valueAsNumber;
  const from = fromSelect.value;
  const to = toSelect.value;

  result.textContent = "Getting the exchange rate…";
  convertButton.disabled = true;

  try {
    const rate = await getExchangeRate(from, to);
    const convertedAmount = amount * rate;

    const formattedAmount = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: to,
      currencyDisplay: "code"
    }).format(convertedAmount);

    result.textContent = `${amount} ${from} = ${formattedAmount}`;
  } catch (error) {
    result.textContent = "Could not get the exchange rate. Please try again.";
    console.error(error);
  } finally {
    convertButton.disabled = false;
  }
});