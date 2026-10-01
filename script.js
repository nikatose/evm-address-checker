function checkAddress() {

  const input =
    document.getElementById("address");

  const result =
    document.getElementById("result");

  const address =
    input.value.trim();

  result.classList.remove(
    "hidden",
    "valid",
    "invalid"
  );

  if (!address) {

    result.classList.add("invalid");

    result.innerHTML = `
      <div class="result-title">
        Please enter an address
      </div>

      <div class="result-description">
        Paste an Ethereum or EVM-compatible address.
      </div>
    `;

    return;
  }

  const isEVM =
    /^0x[a-fA-F0-9]{40}$/.test(address);

  if (!isEVM) {

    result.classList.add("invalid");

    result.innerHTML = `
      <div class="result-title">
        ✕ Invalid address
      </div>

      <div class="result-description">
        The address must contain 40 hexadecimal
        characters after 0x.
      </div>
    `;

    return;
  }

  const body =
    address.slice(2);

  const hasLowercase =
    body === body.toLowerCase();

  const hasUppercase =
    body === body.toUpperCase();

  let type;

  if (hasLowercase) {
    type = "Lowercase address";
  } else if (hasUppercase) {
    type = "Uppercase address";
  } else {
    type = "Mixed-case address";
  }

  result.classList.add("valid");

  result.innerHTML = `
    <div class="result-title">
      ✓ Valid EVM address
    </div>

    <div class="result-description">
      ${type}
      <br>
      Length: ${address.length} characters
    </div>
  `;
}


document
  .getElementById("address")
  .addEventListener("keydown", event => {

    if (event.key === "Enter") {
      checkAddress();
    }

  });
